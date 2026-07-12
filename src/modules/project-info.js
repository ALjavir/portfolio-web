import { initProjects } from './projects.js'; 

// 💡 1. Mark this callback function as 'async' so we can use 'await' inside it
document.addEventListener("DOMContentLoaded", async () => {
    
    // 2. Extract the '?id=X' variable value from the current browser URL bar
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    try {
        // 💡 3. Execute the function () AND await the promise to resolve into the actual array!
        const projectList = await initProjects();

        // Safety net: Make sure we actually got an array back
        if (!projectList || !Array.isArray(projectList)) {
            console.error("initProjects did not return a valid array");
            return;
        }

        // 💡 4. Now you can safely use .find() on the resolved array
        const currentProject = projectList.find(p => p.id == projectId) || projectList[projectId];

        // Safety net: Redirect home if a bad/empty layout ID is passed
        if (!currentProject) {
            window.location.href = 'index.html';
            return;
        }

        // --- Your DOM population code goes here ---
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