import { initProjects } from './projects.js';

let currentProject = null; // Shared module-level state

export async function getCurrentProject() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    try {
        const projectList = await initProjects();
        if (!projectList || !Array.isArray(projectList)) {
            console.error("initProjects did not return a valid array");
            return null;
        }

        currentProject = projectList.find(p => p.id == projectId) || projectList[projectId];

        if (!currentProject) {
            window.location.href = 'index.html';
            return null;
        }

        document.title = `${currentProject.name} | Project Details`;
        document.getElementById('detail-title').innerText = currentProject.name || 'Untitled Project';
        document.getElementById('detail-subtext').innerText = currentProject.subName || '';
        document.getElementById('detail-description').innerText = currentProject.description || 'No description provided.';

        return currentProject;

    } catch (error) {
        console.log("Failed to load project details:", error);
        return null;
    }
}

export function initVideo() {
    // Safety guard to prevent crashes if project didn't load
    if (!currentProject) return;

    const thumbImg = document.getElementById('thumbImage-image');
    const videoTrigger = document.getElementById('video-trigger');
    const ytPlayer = document.getElementById('modal-youtube-player');
    const videoOverlay = document.getElementById('video-overlay');
    const videoCancel = document.getElementById('video-cancel');

    // 1. Inject the thumbnail image data safely
    if (thumbImg) {
        thumbImg.src = currentProject.thumbImage || 'assets/images/default-thumbnail.png';
    }

    // 2. Control Play / Cancel logic
    if (videoTrigger && ytPlayer && videoOverlay && videoCancel) {

        videoTrigger.onclick = () => {
            const rawVideoData = currentProject.video || '';

            // 🎯 SMART EXTRACTOR: Strips out full URLs and leaves ONLY the 11-character ID code
            let videoId = '';
            const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
            const match = rawVideoData.match(regExp);

            if (match && match[1]) {
                videoId = match[1]; // Successfully caught '_JXjAi11lCk'
            } else {
                // Fallback: If it's already a clean 11-character ID string
                videoId = rawVideoData;
            }

            console.log("🎥 Cleaned YouTube Video ID target:", videoId);

            if (videoId) {
                // Set the iframe source using ONLY the clean ID code
                ytPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                videoOverlay.classList.add('is-active');
            } else {
                console.error("❌ Link parsing failed. Ensure you provided a valid YouTube URL format.");
            }
        };

        // Close and clean up player link when clicking close cross button
        videoCancel.onclick = () => {
            videoOverlay.classList.remove('is-active');
            ytPlayer.src = '';
        };

        // Close if clicking outside the video container box on the dark overlay background
        videoOverlay.onclick = (event) => {
            if (event.target === videoOverlay) {
                videoOverlay.classList.remove('is-active');
                ytPlayer.src = '';
            }
        };
    }

}


export function initTech() {
    // 1. Target the element container on the page
    const gridContainer = document.getElementById('project-tech-grid');
    if (!gridContainer) return;

    // 2. Safety guard: verify tech stack object map structure exists
    if (!currentProject || !currentProject.tech || typeof currentProject.tech !== 'object') {
        gridContainer.innerHTML = '<p class="feature-description-text">No technology specifications declared.</p>';
        return;
    }

    // 3. Destructure the Map Object into a workable Array loop list
    const techEntries = Object.entries(currentProject.tech);

    // 4. Construct the UI Elements Template String Loop
    const generatedHtml = techEntries.map(([techName, data], index) => {
        
        // 🎯 Compute border utility rules to exactly mirror Aceternity grid architecture
        // Left border applies to column starts on large viewports (index 0, index 4, etc.)
        const isLeftEdge = (index === 0 || index === 4) ? 'border-left-edge' : '';
        
        // Bottom border applies to the horizontal row break dividing the first tier row items (items 0-3)
        const isBottomRow = (index < 4) ? 'border-bottom-row' : '';
        
        // Gradient background fades upwards for tier 1 row elements, downwards for tier 2 row elements
        const isTopGradient = (index < 4) ? 'gradient-top' : 'gradient-bottom';

        return `
            <div class="feature-item ${isLeftEdge} ${isBottomRow}">
                <div class="feature-hover-bg ${isTopGradient}"></div>
                
                <div class="feature-icon-box">
                    <img src="${data.image || 'assets/icons/default-tech.svg'}" 
                         alt="${techName} Logo" 
                         class="tech-icon-img"
                         onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23666\'><circle cx=\'12\' cy=\'12\' r=\'10\' stroke-width=\'2\'/></svg>'">
                </div>
                
                <div class="feature-title-box">
                    <div class="feature-accent-bar"></div>
                    <span class="feature-title-text">${techName}</span>
                </div>
                
                <p class="feature-description-text">${data.text || 'Integration and implementation description.'}</p>
            </div>
        `;
    }).join('');

    // 5. Mount the node payload to the viewport layout engine
    gridContainer.innerHTML = generatedHtml;
    console.log("🛠️ Tech grid generated successfully with entries count:", techEntries.length);
}