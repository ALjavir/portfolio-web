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

        // Target the scroll view container

        if (!scrollView)
            return projectList;

        const cardGradientsBorder = GradientColor().borderGradients;
        let projectsHTML = "";

        // Build the HTML using your Flutter hierarchy
        projectList.forEach((project,iterationIndex) => {
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

        CubeLoader.unmount(scrollView);
        return projectList;

    } catch (error) {

        console.error("❌ Error loading projects:", error);
        return [];
    }
}