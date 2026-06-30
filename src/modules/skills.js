
import { getLoadedSkills } from "./home.js";


export async function initSkills() {
    console.log("🔹 Skills fetch starting...");
    const data = getLoadedSkills();

    if (data) {



        const entries = Object.entries(data);

        entries.sort((a, b) => a[1].index - b[1].index);

        let groupHTML = "";

        entries.forEach(([skillname, skillDetail]) => {
            // 1. Map the 'tech' array into clean HTML badge elements
            const techBadgesHTML = skillDetail.tech && Array.isArray(skillDetail.tech)
                ? skillDetail.tech.map(techName => `<span class="tech-badge">${techName}</span>`).join('')
                : '';

            // 2. Construct the full card using the exact keys from your Firestore database
            groupHTML += `
        <div class="skill-details-card" data-index="${skillDetail.index}">
            
            <div class="card-header">
                <h3 class="skill-card-title">${skillDetail.name}</h3>
                <span class="skill-score">Score: ${skillDetail.score}/10</span>
            </div>

            <p class="skill-card-text">${skillDetail.text}</p>

            <div class="skill-tech-stack">
                ${techBadgesHTML}
            </div>

        </div>
    `;

            console.log(skillDetail.name, skillDetail.index)
            
            
        });

     

        // Finally, mount your newly compiled markup into your details wrapper container
        const targetElement = document.getElementById("your-details-container-id");
        if (targetElement) {
            targetElement.innerHTML = groupHTML;
        }
    } else {
        console.warn("Skills data has not been initialized or loaded yet.");
    }
}