import { db } from "../config/firebase_init.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function initProjects() {
    console.log("🔹 Projects fetch starting...");
    try {
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
        const scrollView = document.getElementById("projects-detailed-scrollView");
        if (!scrollView) return projectList;

        let projectsHTML = "";

        // Build the HTML using your Flutter hierarchy
        projectList.forEach((project) => {
            // Check if imageUrl exists, otherwise use a placeholder fallback
            const imageUrl = project.thumbImage || "https://via.placeholder.com/400x500";
            
            projectsHTML += `
                <div class="project-card-item">
                    <div class="project-stack-container">
                        <div class="project-image-layer">
                            <img src="${imageUrl}" alt="${project.name}" loading="lazy" />
                        </div>
                        
                        <div class="project-info-overlay">
                            <h3 class="project-title">${project.name || ''}</h3>
                            <p class="project-subtitle">${project.subName || ''}</p>
                        </div>
                    </div>
                </div>
            `;
        });

        scrollView.innerHTML = projectsHTML;
        return projectList;

    } catch (error) {
        console.error("❌ Error loading projects:", error);
        return [];
    }
}