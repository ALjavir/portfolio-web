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
        // Change .innerText to .innerHTML
        document.getElementById('detail-description').innerHTML = currentProject.description || 'No description provided.';
        document.getElementById('github-link').href = currentProject.link || '#';

        return currentProject;

    } catch (error) {
        console.log("Failed to load project details:", error);
        return null;
    }
}




export function initProjectMedia() {
    if (!currentProject) return;
    const liveLinkCard = document.querySelector('.live-link');
    const videoCard = document.querySelector('.video-player');

    const hasLiveLink = Boolean(currentProject.liveLink);
    const hasVideo = Boolean(currentProject.video);

    const videoTrigger = document.getElementById('video-trigger');
    const ytPlayer = document.getElementById('modal-youtube-player');
    const videoOverlay = document.getElementById('video-overlay');
    const videoCancel = document.getElementById('video-cancel');


    if (hasLiveLink) {
        if (liveLinkCard) liveLinkCard.style.display = 'flex';
        if (videoCard) videoCard.style.display = 'none';

        const thumbImg = liveLinkCard?.querySelector('#thumbImage-image');
        thumbImg.src = currentProject.thumbImage;


        if (liveLinkCard) {
            liveLinkCard.onclick = () => {
                window.open(currentProject.liveLink, '_blank', 'noopener,noreferrer');
            };
        }

    } else if (hasVideo) {
        if (liveLinkCard) liveLinkCard.style.display = 'none';
        if (videoCard) videoCard.style.display = 'flex';

        const thumbImg = videoCard?.querySelector('#thumbImage-image');
        thumbImg.src = currentProject.thumbImage;
        if (videoTrigger && ytPlayer && videoOverlay && videoCancel) {
            document.body.appendChild(videoOverlay);

            videoTrigger.onclick = () => {
                const rawVideoData = currentProject.video || '';
                let videoId = '';
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                const match = rawVideoData.match(regExp);

                if (match && match[2].length === 11) {
                    videoId = match[2];
                } else {
                    videoId = rawVideoData;
                }

                ytPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                videoOverlay.classList.add('is-active');
            };

            videoCancel.onclick = () => {
                videoOverlay.classList.remove('is-active');
                ytPlayer.src = '';
            };

            videoOverlay.onclick = (event) => {
                if (event.target === videoOverlay) {
                    videoOverlay.classList.remove('is-active');
                    ytPlayer.src = '';
                }
            };
        }
    } else {
        if (liveLinkCard) liveLinkCard.style.display = 'none';
        if (videoCard) videoCard.style.display = 'none';
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
                
                         onerror="image not fount!!!">
                         </div>
                <div class="feature-title-box">
                    <div class="feature-accent-bar"></div>
                    <span class="feature-title-text">${techName}</span>
                </div>
                
                <p class="feature-description-text">${data.text || 'Integration and implementation description.'}</p>
            </div>
        `;
    }).join('');
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
            <button class="video-cancel-btn" id="lightbox-close" aria-label="Close Video">✕</button>
                
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