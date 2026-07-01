
import { getLoadedSkills } from "./home.js";


export async function initSkills() {
    console.log("🔹 Skills fetch starting...");
    const data = getLoadedSkills();

    if (data) {
        const entries = Object.entries(data);

        // Sort by index to keep your order intact
        entries.sort((a, b) => a[1].index - b[1].index);

        // 🎨 Define the gradients mapped from your Flutter/Image design
     const cardGradients = [
    "linear-gradient(135deg, #ef4444, #f97316)", // Red to Orange
    "linear-gradient(135deg, #3b82f6, #06b6d4)", // Blue to Cyan
    "linear-gradient(135deg, #10b981, #34d399)", // Emerald/Green
    "linear-gradient(135deg, #8b5cf6, #c084fc)", // Purple
    "linear-gradient(135deg, #f43f5e, #fb7185)"  // Rose/Pink
];

        let groupHTML = "";
        // Inside your Firebase loop...
entries.forEach(([skillname, skillDetail], iterationIndex) => {
    // This will now successfully find the array and grab a color!
    const activeGradient = cardGradients[iterationIndex % cardGradients.length];

    const techBadgesHTML = skillDetail.tech && Array.isArray(skillDetail.tech)
        ? skillDetail.tech.map(techName => `<span class="glass-tech-badge">${techName}</span>`).join('')
        : '';

   groupHTML += `
            <div class="skill-skew-card" style="min-width: 300px; height: 400px; background: #333; color: white; padding: 20px;">
                <h3>${skillDetail.name}</h3>
                <p>${skillDetail.text}</p>
            </div>
        `;
    console.log("🔹 Skill card generated for:", skillDetail.name);
});
// 1. Inject the HTML into the new target
// ... after your existing data fetching and loop logic ...

track.innerHTML = groupHTML;
    console.log("Injection complete. Check the page.");
    } else {
        console.warn("Skills data has not been initialized or loaded yet.");
    }
}