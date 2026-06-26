/* ==========================================================================
   MAIN ENTRY POINT (Your main.dart / void main() equivalent)
   ========================================================================== */

// 1. Import initialization functions from your feature modules
import { initNavbar } from './modules/navbar.js';
import { initHome } from './modules/home.js';
import { initHomeShader } from "./home_bg.js";
import { initSkills } from './modules/skills.js';
import { initProjects } from './modules/projects.js';
import { initContact } from './modules/contact.js';

/**
 * document.addEventListener("DOMContentLoaded", ...) acts exactly like 
 * Flutter's initialization blocks before calling runApp().
 * It ensures the HTML elements are fully loaded in the browser DOM 
 * before JavaScript tries to look for them or modify them.
 */
document.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 Portfolio system initializing...");

    try {
        
        // 2. Initialize the UI layouts sequentially
        initNavbar();
        await initHome();
        await initSkills();
        await initProjects();
        await initContact();


        // cssJavaScript-----------------------------------------------------
        initHomeShader();
        const smileContainer = document.getElementById("lottie-smile");
    if (smileContainer) {
        lottie.loadAnimation({
            container: smileContainer,
            renderer: "svg",
            loop: true,
            autoplay: true,
            // Pulls the animation configuration path directly out of your asset files
            path: "assets/icons/smile.json" 
        });
    }


        console.log("🎯 All features loaded successfully.");
    } catch (error) {
        console.error("💥 Critical error during portfolio initialization:", error);
    }
});

