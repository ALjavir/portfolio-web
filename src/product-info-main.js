
import { initaddanimationtoitem } from './animation/addAnimationToItem.js';
import { SparkEffect } from "./animation/sparksAnimation-canvas.js";
import { initFooter } from './modules/footer.js';
import { getCurrentProject, initVideo, initTech } from './modules/project-info.js';

document.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 Portfolio system initializing...");
    
    try {
        await getCurrentProject();
    } catch (error) {
        console.error("💥 Critical error during project fetching:", error);
    }

    try {
        initVideo();
    } catch (error) {
        console.error("💥 Critical error during video player initialization:", error);
    }

        try {
        initTech();
    } catch (error) {
        console.error("💥 Critical error during tech initialization:", error);
    }

    initFooter();
    new SparkEffect({});
    initaddanimationtoitem();
});