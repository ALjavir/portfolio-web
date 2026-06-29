import { db } from "../config/firebase_init.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



let activeSliderFrameId = null;

export async function initHome() {
    console.log("🔹 Fetching technical armory catalog maps...");
    try {
        const docRef = doc(db, "skill", "main");
        const docSnap = await getDoc(docRef);

        const masterWrapper = document.getElementById("homepage-skills-wrapper");
        const container = document.getElementById("skills-slider-container");
        const track = document.getElementById("skills-track");

        if (docSnap.exists() && track && container) {
            const skillsData = docSnap.data().data;
            const entries = Object.entries(skillsData);
            let groupHTML = ""; 

            entries.forEach(([skillName, skillDetails]) => {
                groupHTML += `
                    <div class="skill-card-column">
                        <img src="${skillDetails.image}" alt="${skillName}" />
                        <span class="skill-card-subtext">${skillName}</span>
                    </div>
                `;
            });

            track.innerHTML = `
                <div class="scroll-group">${groupHTML}</div>
                <div class="scroll-group">${groupHTML}</div>
                <div class="scroll-group">${groupHTML}</div>
                <div class="scroll-group">${groupHTML}</div>
            `;

            requestAnimationFrame(() => {
                bindVelocityScrollEngine(masterWrapper, container, track);
                if (masterWrapper) masterWrapper.classList.add("is-loaded");
            });
        }
    }
    catch (error) {
        console.error("❌ Slider compilation halted:", error);
    }
}

function bindVelocityScrollEngine(masterWrapper, container, track) {
    // 2. GHOST HUNTER: If a loop is already running from a previous page visit, kill it immediately.
    if (activeSliderFrameId) {
        cancelAnimationFrame(activeSliderFrameId);
    }

    let baseSpeed = 1.0;       
    let scrollDirection = -1; 
    let clickBoost = 0; 
    const scrollGroup = track.querySelector('.scroll-group');
    
    // Safety check: Ensure the group actually exists before doing math
    if (!scrollGroup) return;

    let exactScroll = scrollGroup.getBoundingClientRect().width; 
    container.scrollLeft = exactScroll;

    // Hover listeners
    container.addEventListener("mouseenter", () => {
        baseSpeed = 0.25; 
        if (masterWrapper) masterWrapper.classList.add("hovered-state");
    });
    
    container.addEventListener("mouseleave", () => {
        baseSpeed = 1.0;  
        if (masterWrapper) masterWrapper.classList.remove("hovered-state");
    });

    // The Engine Loop
    function scrollTick() {
        // 3. PAGE CHANGE SAFETY: Did the user navigate away? If the container is gone from the DOM, shut down the engine.
        if (!document.getElementById("skills-slider-container")) {
            activeSliderFrameId = null;
            return; 
        }

        let groupWidth = scrollGroup.getBoundingClientRect().width;

        // 4. RENDER SAFETY: If the page is hidden or CSS hasn't fully painted, width is 0. 
        // Do not run the math, just wait for the next frame.
        if (groupWidth === 0) {
            activeSliderFrameId = requestAnimationFrame(scrollTick);
            return;
        }

        // Apply friction to the manual click momentum
        clickBoost *= 0.92; 
        if (clickBoost < 0.1) clickBoost = 0;

        let totalSpeed = baseSpeed + clickBoost;
        exactScroll += (totalSpeed * scrollDirection);

        // Infinite loop math
        if (exactScroll >= groupWidth * 2) {
            exactScroll -= groupWidth;
        } 
        else if (exactScroll <= 0) {
            exactScroll += groupWidth;
        }

        // Apply math to physical DOM
        container.scrollLeft = exactScroll;

        // Keep the loop running and track its ID
        activeSliderFrameId = requestAnimationFrame(scrollTick);
    }
    
    // Boot the engine
    activeSliderFrameId = requestAnimationFrame(scrollTick);

    // Button controls
    const btnLeft = document.getElementById("slider-btn-left");
    const btnRight = document.getElementById("slider-btn-right");

    if (btnLeft && btnRight) {
        // Overwrite old event listeners by cloning nodes (prevents duplicate click events if initHome runs twice)
        const newBtnLeft = btnLeft.cloneNode(true);
        const newBtnRight = btnRight.cloneNode(true);
        btnLeft.parentNode.replaceChild(newBtnLeft, btnLeft);
        btnRight.parentNode.replaceChild(newBtnRight, btnRight);

        newBtnLeft.addEventListener("click", () => {
            scrollDirection = -1; 
            clickBoost = 25; 
        });

        newBtnRight.addEventListener("click", () => {
            scrollDirection = 1; 
            clickBoost = 25; 
        });
    }
}