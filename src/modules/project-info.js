import { initProjects } from './projects.js'; 
document.addEventListener("DOMContentLoaded", async () => {
    

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    try {
        
        const projectList = await initProjects();

       
        if (!projectList || !Array.isArray(projectList)) {
            console.error("initProjects did not return a valid array");
            return;
        }

 
        const currentProject = projectList.find(p => p.id == projectId) || projectList[projectId];

        
        if (!currentProject) {
            window.location.href = 'index.html';
            return;
        }

        document.title = `${currentProject.name} | Project Details`;
        document.getElementById('detail-title').innerText = currentProject.name || 'Untitled Project';
        document.getElementById('detail-subtext').innerText = currentProject.subName || '';
        document.getElementById('detail-description').innerText = currentProject.description || 'No description provided.';
        
        const imgElement = document.getElementById('detail-image');
        imgElement.src = currentProject.fullImage || currentProject.thumbImage || 'https://via.placeholder.com/800x400';
        imgElement.alt = currentProject.name;

    } catch (error) {
        console.log("Failed to load project details:", error);
    }
});