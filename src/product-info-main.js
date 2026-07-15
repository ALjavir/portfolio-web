
import { initaddanimationtoitem } from './animation/addAnimationToItem.js';
import { SparkEffect } from "./animation/sparksAnimation-canvas.js";
import { initFooter } from './modules/footer.js';
import { getCurrentProject, initVideo, initTech, initPage } from './modules/project-info.js';
import { CubeLoader } from "./animation/cubeLoader.js";


document.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 Portfolio system initializing...");

    try {
        CubeLoader.mount(".innerSection");
        await getCurrentProject(); initVideo(); initTech(); initPage()
         CubeLoader.unmount(".innerSection");
    } catch (error) {
        console.error("💥 Critical error during project fetching:", error);
    }

    // try {

    // } catch (error) {
    //     console.error("💥 Critical error during tech initialization:", error);
    // }


    initFooter();
    new SparkEffect({});
    initaddanimationtoitem();
});