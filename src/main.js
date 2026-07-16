/* ==========================================================================
   MAIN ENTRY POINT (Your main.dart / void main() equivalent)
   ========================================================================== */

// 1. Import initialization functions from your feature modules
import { initNavbar } from './modules/navbar.js';
import { initaddanimationtoitem } from './animation/addAnimationToItem.js';
import { initHome } from './modules/home.js';
import { initSkills } from './modules/skills.js';
import { initProjects } from './modules/projects.js';
import { initContact } from './modules/contact.js';
import { initFooter } from './modules/footer.js';
import { initlottie } from './animation/lottie-ani.js';
import { initHomeShader } from "./animation/homeAnimation-canvas.js";
import { SparkEffect } from "./animation/sparksAnimation-canvas.js";

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


    initContact();
    initFooter()

    // cssJavaScript-----------------------------------------------------

    initlottie("lottie-smile", "assets/icons/smile.json");
    initlottie("scroll-next-lottie", "assets/icons/scroll_down.json");


    initHomeShader();
    const homeCanvas = document.querySelector('#homeAnimation-canvas');
    const sparksCanvas = document.querySelector('#sparksAnimation-canvas');
    new SparkEffect();

    function toggleCanvasesVisibility() {
        const homeHeight = window.innerHeight;
        const isAtHomeSection = window.scrollY < homeHeight - 100;

        if (isAtHomeSection) {
            if (homeCanvas) homeCanvas.style.display = 'block';
            if (sparksCanvas) sparksCanvas.style.display = 'none';
        } else {
         
            if (homeCanvas) homeCanvas.style.display = 'none';
            if (sparksCanvas) sparksCanvas.style.display = 'block'; 
        }
    }

    toggleCanvasesVisibility();
    window.addEventListener('scroll', toggleCanvasesVisibility);

    //------------------------------------------------------------------


    initaddanimationtoitem();
});

