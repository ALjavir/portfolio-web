
import { getLoadedSkills } from "./home.js";
import { CubeLoader } from "../animation/cubeLoader.js";
import { GradientColor } from "../animation/gradientColor.js";

export async function initSkills() {
    console.log("🔹 Skills fetch starting...");
    const data = getLoadedSkills();

    
    try {

const masterWrapper = document.getElementById("skills-detailed-grid");
    CubeLoader.mount(masterWrapper);
   
        if (data) {
            const entries = Object.entries(data);

            // Sort by index to keep your order intact
            entries.sort((a, b) => a[1].index - b[1].index);

           
            const cardGradients = GradientColor().cardGradients;

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
               
            }
       
        }
   
             CubeLoader.unmount(masterWrapper);
        
    
    } catch (error) {


    }
}