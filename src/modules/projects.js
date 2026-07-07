import { db } from "../config/firebase_init.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { CubeLoader } from "../animation/cubeLoader.js";
import { GradientColor } from "../animation/gradientColor.js";







export async function initProjects() {
    console.log("🔹 Projects fetch starting...");
    const scrollView = document.getElementById("projects-View");


try {
    CubeLoader.mount(scrollView);
    const projectsCollectionRef = collection(db, "project");
    const querySnapshot = await getDocs(projectsCollectionRef);
    const projectList = [];

    querySnapshot.forEach((doc) => {
        projectList.push({
            id: doc.id,
            ...doc.data()
        });
    });

    if (!scrollView)
        return projectList;

    const cardGradientsBorder = GradientColor().borderGradients;
    let projectsHTML = "";

    // 1. Render cards exactly as before (without individual counters inside)
    projectList.forEach((project, iterationIndex) => {
        const activeGradientBorder = cardGradientsBorder[iterationIndex % cardGradientsBorder.length];
        const imageUrl = project.thumbImage || "https://via.placeholder.com/400x500";
        
        projectsHTML += `
  <div class="project-card">
            <div class="gradient-border-container" style="--glow-gradient: ${activeGradientBorder};">
                <span class="border-line line-top"></span>
                <span class="border-line line-bottom"></span>
                <span class="border-line line-left"></span>
                <span class="border-line line-right"></span>
            </div>
            
            <div class="project-img-wrapper">
                <img src="${imageUrl}" alt="${project.name}" loading="lazy" />
            </div>
            
            <div class="project-info-row">
                <h3 class="project-name">${project.name || ''}</h3>
                <p class="project-subtext">${project.subName || ''}</p>
            </div>
        </div>
        `;
    });

    scrollView.innerHTML = projectsHTML;

    /* ==========================================================================
       DYNAMIC RUNTIME MOBILE COUNTER SETUP
       ========================================================================== */
    const totalItems = projectList.length;

    // Check if counter container already exists to avoid duplication on re-renders
    let counterContainer = document.getElementById("global-mobile-counter");
    if (!counterContainer) {
        counterContainer = document.createElement("div");
        counterContainer.id = "global-mobile-counter";
        // Insert it right after your horizontal cards container
        scrollView.parentNode.insertBefore(counterContainer, scrollView.nextSibling);
    }

    // Set initial layout state
    counterContainer.innerHTML = `<span class="active-index">1</span> / ${totalItems}`;

    // Tracks horizontal scrolling position to update the indicator perfectly on swipe
    scrollView.addEventListener("scroll", () => {
        const cardElement = scrollView.querySelector(".project-card");
        if (!cardElement) return;

        // Calculate card layout step boundaries including its gap margins
        const cardWidth = cardElement.getBoundingClientRect().width;
        const computeGap = parseFloat(window.getComputedStyle(scrollView).gap) || 0;
        const totalStepWidth = cardWidth + computeGap;

        // Find current card index based on your current horizontal viewport alignment
        const currentActiveIndex = Math.round(scrollView.scrollLeft / totalStepWidth) + 1;
        
        // Ensure boundaries don't break during rubber-banding momentum scrolls
        const boundedIndex = Math.max(1, Math.min(currentActiveIndex, totalItems));

        // Smoothly update the number display container
        const indexSpan = counterContainer.querySelector(".active-index");
        if (indexSpan && indexSpan.textContent !== String(boundedIndex)) {
            indexSpan.textContent = boundedIndex;
        }
    });

    CubeLoader.unmount(scrollView);
    return projectList;

} catch (error) {

        console.error("❌ Error loading projects:", error);
        return [];
    }
}