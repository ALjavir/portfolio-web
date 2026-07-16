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
        document.getElementById('github-link').href = currentProject.link || '#';

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
    const gridContainer = document.getElementById('project-tech-grid');
    if (!gridContainer) return;
    if (!currentProject || !currentProject.tech || typeof currentProject.tech !== 'object') {
        gridContainer.innerHTML = '<p class="feature-description-text">No technology specifications declared.</p>';
        return;
    }
    const techEntries = Object.entries(currentProject.tech);
    const generatedHtml = techEntries.map(([techName, data], index) => {
        const isLeftEdge = (index === 0 || index === 4) ? 'border-left-edge' : '';
        const isBottomRow = (index < 4) ? 'border-bottom-row' : '';
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



export function initPage() {
    const projectPage = document.getElementById('project-rows-target');
    if (!projectPage) return;

    if (!currentProject || !currentProject.page || typeof currentProject.page !== 'object') {
        projectPage.innerHTML = '';
        return;
    }

    // Convert map to workable arrays and sort chronologically by index
    const projectPageEntries = Object.entries(currentProject.page);
    projectPageEntries.sort((a, b) => (a[1].index || 0) - (b[1].index || 0));

    // 🎯 SIMPLE EVEN/ODD LOOP CONDITIONAL ARCHITECTURE
    const sectionsHtml = projectPageEntries.map(([pageName, data], index) => {
        const imageUrl = data.image || 'assets/images/placeholder-ui.png';
        const textContent = data.text || 'Interface view context details specification.';

        if (index % 2 === 0) {
            // EVEN INDEX: text (left) ---- image (right)
            return `
        <div class="project-row">
            <div class="text-col reveal-from-left">
                <h3>${pageName}</h3>
                <p>${textContent}</p>
            </div>
            <div class="image-wrapper reveal-from-right">
                <img src="${imageUrl}" alt="${pageName}" class="page-img">
                
                <div class="zoom-overlay">
                    <div class="zoom-blur-ring">
                        <div class="zoom-icon-btn">
                            <img src="/assets/icons/zoom.svg" alt="Zoom In" height="25px" loading="lazy"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
        } else {
            // ODD INDEX: image (left) ---- text (right)
            return `
        <div class="project-row">
            <div class="image-wrapper reveal-from-left">
                <img src="${imageUrl}" alt="${pageName}" class="page-img">
                
                <div class="zoom-overlay">
                    <div class="zoom-blur-ring">
                        <div class="zoom-icon-btn">
                            <img src="/assets/icons/zoom.svg" alt="Zoom In" height="25px" loading="lazy"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-col reveal-from-right">
                <h3>${pageName}</h3>
                <p>${textContent}</p>
            </div>
        </div>
    `;
        }
    }).join('');

    // Reusable Fullscreen Lightbox structure injection
    const lightboxHtml = `
        <div id="image-lightbox" class="image-lightbox-overlay">
            <div class="lightbox-content-box">
                <button id="lightbox-close" class="lightbox-close-btn">×</button>
                <img id="lightbox-expanded-img" class="lightbox-expanded-img" src="" alt="">
            </div>
        </div>
    `;

    projectPage.innerHTML = sectionsHtml + lightboxHtml;

    // ==========================================================================
    // ⚡ LIGHTBOX INTERACTIVE BINDINGS
    // ==========================================================================
    const lightboxOverlay = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-expanded-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const rowImages = projectPage.querySelectorAll('.image-wrapper img');

    rowImages.forEach(img => {
        img.onclick = () => {
            if (lightboxOverlay && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxOverlay.classList.add('is-open');
                document.body.style.overflow = 'hidden'; // Lock background scrolling
            }
        };
    });

    const closeLightbox = () => {
        if (lightboxOverlay) {
            lightboxOverlay.classList.remove('is-open');
            document.body.style.overflow = ''; // Release scroll
        }
    };

    if (lightboxClose) lightboxClose.onclick = closeLightbox;
    if (lightboxOverlay) {
        lightboxOverlay.onclick = (e) => { if (e.target === lightboxOverlay) closeLightbox(); };
    }

    // ==========================================================================
    // 🧱 OPTIMIZED INTERSECTION OBSERVER PIPELINE (Triggers Once)
    // ==========================================================================
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observation instantly
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    const rowsToTrack = projectPage.querySelectorAll('.project-row');
    rowsToTrack.forEach(row => revealObserver.observe(row));
}