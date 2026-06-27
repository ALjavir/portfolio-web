import { db } from "../config/firebase_init.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";




export async function initHome() {
    console.log("🔹 Fetching technical armory catalog maps...");
    try {
        const docRef = doc(db, "skill", "main");
        const docSnap = await getDoc(docRef);

        const masterWrapper = document.querySelector(".homepage-skills-wrapper");
        const container = document.getElementById("skills-slider-container");
        const track = document.getElementById("skills-track");

        if (docSnap.exists() && track && container) {
            const skillsData = docSnap.data().data;
            const entries = Object.entries(skillsData);

            let trackHTML = "";

            // Duplicate array sequences to maintain loop logic chains
            for (let loopCount = 0; loopCount < 2; loopCount++) {
                entries.forEach(([skillName, skillDetails]) => {
                    trackHTML += `
                        <div class="skill-card-column">
                            <img src="${skillDetails.image}" alt="${skillName}" loading="lazy" />
                            <span class="skill-card-subtext">${skillName}</span>
                        </div>
                    `;
                });
            }
            track.innerHTML = trackHTML;

            // Initialize scroll manager configurations
            bindVelocityScrollEngine(masterWrapper, container, track);
        }
    }
    catch (error) {
        console.error("❌ Slider compilation halted:", error);
    }
}

function bindVelocityScrollEngine(masterWrapper, container, track) {
    let scrollSpeed = 1.0;       // Velocity configuration default
    let scrollDirection = 1;     // Tracks dynamic wheel slide orientation
    let frameId;

    // Set scroll position to center index space mimicking initialScrollOffset
    container.scrollLeft = track.scrollWidth / 4;

    // Mouse interactive state listeners matching your widget state actions
    container.addEventListener("mouseenter", () => {
        scrollSpeed = 0.25; // Slow down velocity smoothly down to 0.25
        if (masterWrapper) masterWrapper.classList.add("hovered-state");
    });
    
    container.addEventListener("mouseleave", () => {
        scrollSpeed = 1.0;  // Restore normal velocity trace speed
        if (masterWrapper) masterWrapper.classList.remove("hovered-state");
    });

    // High performance UI runtime looping step ticker sequence
    function scrollTick() {
        container.scrollLeft += (scrollSpeed * scrollDirection);

        // Infinite positioning warp boundaries configuration
        const boundaryLimit = track.scrollWidth / 2;
        if (container.scrollLeft >= boundaryLimit) {
            container.scrollLeft = 0;
        } else if (container.scrollLeft <= 0) {
            container.scrollLeft = boundaryLimit;
        }

        frameId = requestAnimationFrame(scrollTick);
    }
    frameId = requestAnimationFrame(scrollTick);

    // Manual Nav Arrow Controls Click Binding Actions
    const btnLeft = document.getElementById("slider-btn-left");
    const btnRight = document.getElementById("slider-btn-right");

    if (btnLeft && btnRight) {
        btnLeft.addEventListener("click", () => {
            scrollDirection = -1; // Change loop direction trajectory
            scrollSpeed = 1.0;
            container.scrollBy({ left: -180, behavior: "smooth" }); // 180px jump increments
        });

        btnRight.addEventListener("click", () => {
            scrollDirection = 1;  // Restore forward trajectory loop parameters
            scrollSpeed = 1.0;
            container.scrollBy({ left: 180, behavior: "smooth" });
        });
    }
}