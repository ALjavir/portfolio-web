/* ==========================================================================
   MAIN ENTRY POINT (Your main.dart / void main() equivalent)
   ========================================================================== */

// 1. Import initialization functions from your feature modules
import { initNavbar } from './modules/navbar.js';
import { initHome } from './modules/home.js';
import { initSkills } from './modules/skills.js';
import { initProjects } from './modules/projects.js';
import { initContact } from './modules/contact.js';
import { initlottie } from './animation/lottie-ani.js';
import { initHomeShader } from "./animation/home-bg.js";
import { SparkEffect } from "./animation/sparkEffect.js";
/**
 * document.addEventListener("DOMContentLoaded", ...) acts exactly like 
 * Flutter's initialization blocks before calling runApp().
 * It ensures the HTML elements are fully loaded in the browser DOM 
 * before JavaScript tries to look for them or modify them.
 */
document.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 Portfolio system initializing...");



    // 2. Initialize the UI layouts sequentially
    initNavbar();
    try {
        await initHome();
    } catch (error) {
        console.error("💥 Critical error during initHome initialization:", error);
    }

    try {
        await initSkills();
    } catch (error) {
        console.error("💥 Critical error during initSkills initialization:", error);
    }

    try {
        await initProjects();
    } catch (error) {
        console.error("💥 Critical error during initProjects initialization:", error);
    }

    try {
        await initContact();
    } catch (error) {
        console.error("💥 Critical error during initContact initialization:", error);
    }

    // cssJavaScript-----------------------------------------------------
    initHomeShader();
    initlottie("lottie-smile", "assets/icons/smile.json");
    initlottie("scroll-next-lottie", "assets/icons/scroll_down.json");


    new SparkEffect({
        selector: '#sparks',
        amount: 3000,
        direction: { x: -0.5, y: 1 }
    });

    //------------------------------------------------------------------



});

