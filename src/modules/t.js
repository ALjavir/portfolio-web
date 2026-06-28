export async function initHome() {
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
                        <img src="${skillDetails.image}" alt="${skillName}" loading="lazy" />
                        <span class="skill-card-subtext">${skillName}</span>
                    </div>
                `;
            });

            /* THE FLUTTER BUFFER TRICK: 
               We duplicate the group 4 times to create an endless buffer in both directions. 
               This prevents the browser from hitting the physical scroll limit and stalling. */
            track.innerHTML = `
                <div class="scroll-group">${groupHTML}</div>
                <div class="scroll-group">${groupHTML}</div>
                <div class="scroll-group">${groupHTML}</div>
                <div class="scroll-group">${groupHTML}</div>
            `;

            // Wait one frame for the HTML to actually paint on the screen, 
            // then calculate sizes and start the auto-scroll engine.
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
    let scrollSpeed = 1.0;       // Flutter equivalent: _currentSpeed.value = 1.0;
    let scrollDirection = 1;     // Flutter equivalent: _direction.value = 1;
    let frameId;

    // Grab the physical width of ONE data group
    const scrollGroup = track.querySelector('.scroll-group');
    let groupWidth = scrollGroup.offsetWidth;

    // Flutter equivalent: initialScrollOffset = 10000.0;
    // We start exactly in the middle of our cloned track so we can immediately scroll left or right.
    container.scrollLeft = groupWidth;

    // Flutter equivalent: MouseRegion hover detection
    container.addEventListener("mouseenter", () => {
        scrollSpeed = 0.25; 
        if (masterWrapper) masterWrapper.classList.add("hovered-state");
    });
    
    container.addEventListener("mouseleave", () => {
        scrollSpeed = 1.0;  
        if (masterWrapper) masterWrapper.classList.remove("hovered-state");
    });

    // Flutter equivalent: Timer.periodic running at ~60fps
    function scrollTick() {
        // Recalculate width on the fly in case the user resizes their browser window
        groupWidth = scrollGroup.offsetWidth;

        // Apply velocity delta
        container.scrollLeft += (scrollSpeed * scrollDirection);

        /* THE INFINITE LOOP MAGIC:
           If we scroll too far right, instantly jump back exactly one group width.
           If we scroll too far left, instantly jump forward exactly one group width. */
        if (container.scrollLeft >= groupWidth * 2) {
            container.scrollLeft -= groupWidth;
        } 
        else if (container.scrollLeft <= 0) {
            container.scrollLeft += groupWidth;
        }

        frameId = requestAnimationFrame(scrollTick);
    }
    
    // Boot up the engine loop immediately
    frameId = requestAnimationFrame(scrollTick);

    // Flutter equivalent: _manualScroll(int newDirection)
    const btnLeft = document.getElementById("slider-btn-left");
    const btnRight = document.getElementById("slider-btn-right");

    if (btnLeft && btnRight) {
        btnLeft.addEventListener("click", () => {
            scrollDirection = -1; 
            scrollSpeed = 1.0;
            container.scrollBy({ left: -150, behavior: "smooth" }); 
        });

        btnRight.addEventListener("click", () => {
            scrollDirection = 1;  
            scrollSpeed = 1.0;
            container.scrollBy({ left: 150, behavior: "smooth" });  
        });
    }
}