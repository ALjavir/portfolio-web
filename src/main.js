/* ==========================================================================
   MAIN ENTRY POINT (Your main.dart / void main() equivalent)
   ========================================================================== */

// 1. Import initialization functions from your feature modules
import { initNavbar } from './modules/navbar.js';
import { initHome } from './modules/home.js';
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


        console.log("🎯 All features loaded successfully.");
    } catch (error) {
        console.error("💥 Critical error during portfolio initialization:", error);
    }
});