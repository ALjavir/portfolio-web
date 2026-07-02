
import { getLoadedSkills } from "./home.js";
import { CubeLoader } from "../animation/cubeLoader.js";

export async function initSkills() {
    console.log("🔹 Skills fetch starting...");
    const data = getLoadedSkills();

    
    try {

const masterWrapper = document.getElementById("skills-detailed-grid");
    const loader = new CubeLoader(masterWrapper);
   
        if (data) {
            const entries = Object.entries(data);

            // Sort by index to keep your order intact
            entries.sort((a, b) => a[1].index - b[1].index);

            // 🎨 Define the gradients mapped from your Flutter/Image design
            const cardGradients = [
                "linear-gradient(to bottom right, #f59e0b, #ef4444)", // Orange to Red
                "linear-gradient(to bottom right, #3b82f6, #ec4899)", // Blue to Pink
                "linear-gradient(to bottom right, #10b981, #06b6d4)", // Green to Cyan
                "linear-gradient(to bottom right, #0ea5e9, #8b5cf6)"  // Cyan to Purple
            ];

            let groupHTML = "";
            // Inside your Firebase loop...
            entries.forEach(([skillname, skillDetail], iterationIndex) => {
                const activeGradient = cardGradients[iterationIndex % cardGradients.length];

                const techBadgesHTML = skillDetail.tech && Array.isArray(skillDetail.tech)
                    ? skillDetail.tech.map(techName => `<span class="glass-tech-badge">${techName}</span>`).join('')
                    : '';

                // Notice the onclick event and the new blob/wrapper elements
                groupHTML += `
        <div class="skill-skew-card" onclick="this.classList.toggle('is-active')">
            <div class="skewed-beam aura-glow" style="background: ${activeGradient};"></div>
            <div class="skewed-beam crisp-core" style="background: ${activeGradient};"></div>

            <div class="glass-blob blob-top-left"></div>
            <div class="glass-blob blob-bottom-right"></div>

            <div class="glass-content-panel">
                
                <div class="score-display">
                    <span class="score-highlight">${skillDetail.score}</span>
                    <span class="score-muted"> / 10</span>
                </div>

                <div class="content-center-wrapper">
                    <h3 class="card-title">${skillDetail.name}</h3>
                    
                    <div class="tech-badges-wrap">
                        ${techBadgesHTML}
                    </div>

                    <p class="description-text">${skillDetail.text}</p>
                </div>

                <div class="see-more-indicator">
                    See More &rarr;
                </div>

            </div>
        </div>
    `;
            });

         //   const masterWrapper = document.getElementById("skills-detailed-grid");
            if (masterWrapper) {
                masterWrapper.innerHTML = groupHTML;
                 masterWrapper.classList.add("is-loaded");
            }
       
        }
        else {
               loader.mount();
        }
    
    } catch (error) {


    }
}