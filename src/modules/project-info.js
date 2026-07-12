// Import your central project data array
import { projectList } from './projects.js'; 

document.addEventListener("DOMContentLoaded", () => {
    // 1. Extract the '?id=X' variable value from the current browser URL bar
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    // 2. Locate the specific project match inside your data array
    // (Checks both string IDs or numerical array positions safely)
    const currentProject = projectList.find(p => p.id == projectId) || projectList[projectId];

    // Safety net: Redirect home if a bad/empty layout ID is passed
    if (!currentProject) {
        window.location.href = 'index.html';
        return;
    }

    // 3. Populate your target DOM text layouts dynamically
    document.title = `${currentProject.name} | Project Details`;
    document.getElementById('detail-title').innerText = currentProject.name || 'Untitled Project';
    document.getElementById('detail-subtext').innerText = currentProject.subName || '';
    document.getElementById('detail-description').innerText = currentProject.description || 'No description provided.';
    
    const imgElement = document.getElementById('detail-image');
    imgElement.src = currentProject.fullImage || currentProject.thumbImage || 'https://via.placeholder.com/800x400';
    imgElement.alt = currentProject.name;

    // 4. Populate tech tag elements
    const tagsContainer = document.getElementById('detail-tags');
    if (currentProject.tags && currentProject.tags.length > 0) {
        currentProject.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.innerText = tag;
            tagsContainer.appendChild(span);
        });
    }

    // 5. Update external link anchor paths
    const githubBtn = document.getElementById('detail-github');
    if (currentProject.githubUrl || currentProject.link) {
        githubBtn.href = currentProject.githubUrl || currentProject.link;
    } else {
        githubBtn.style.display = 'none'; // Hide if no source file exists
    }
});