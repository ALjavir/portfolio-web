export class CubeLoader {
    static statusIntervals = new Map(); // Tracks intervals individually per parent element
    static statuses = ["Please, wait", "Loading", "Check your internet connection"];

    /**
     * Mounts the loader inside the specified parent element
     * @param {HTMLElement|string} parentElement - DOM element or CSS Selector string
     */
    static mount(parentElement) {
        // 1. Resolve parent wrapper
        const parent = typeof parentElement === 'string' 
            ? document.querySelector(parentElement) 
            : parentElement;

        if (!parent) {
            console.error("❌ CubeLoader: Target parent element not found.");
            return;
        }

        // 2. Prevent duplicate loaders inside the exact same parent
        if (parent.querySelector('.cube-loader-container')) return;

        // Apply masking css helper classes
        parent.classList.add("is-loading-component");
        parent.classList.remove("is-loaded");

        // 3. Compile HTML structure locally
        const loaderElement = document.createElement('div');
        loaderElement.className = 'cube-loader-container';
        
        const plusIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;

        loaderElement.innerHTML = `
            <div class="cube">
                <div class="cube-face face-front">${plusIconSVG}</div>
                <div class="cube-face face-back">${plusIconSVG}</div>
                <div class="cube-face face-right">${plusIconSVG}</div>
                <div class="cube-face face-left">${plusIconSVG}</div>
                <div class="cube-face face-top">${plusIconSVG}</div>
                <div class="cube-face face-bottom">${plusIconSVG}</div>
            </div>
            <div class="cube-status">${this.statuses[0]}...</div>
        `;

        parent.appendChild(loaderElement);
        this._startTextTransitionLoop(parent, loaderElement);
    }

    /**
     * @private Individualized tracker helper for background text updates
     */
    static _startTextTransitionLoop(parent, loaderElement) {
        let index = 0;
        const textNode = loaderElement.querySelector('.cube-status');

        const intervalId = setInterval(() => {
            index = (index + 1) % this.statuses.length;
            if (textNode) {
                textNode.textContent = `${this.statuses[index]}...`;
            }
        }, 600);

        // Store this specific interval linked directly to this parent element
        this.statusIntervals.set(parent, intervalId);
    }

    /**
     * Clears tracking tasks and detaches the element from its parent
     * @param {HTMLElement|string} parentElement - DOM element or CSS Selector string
     */
    static unmount(parentElement) {
        const parent = typeof parentElement === 'string' 
            ? document.querySelector(parentElement) 
            : parentElement;

        if (!parent) return;

        // 1. Clear the specific interval tracking this parent
        if (this.statusIntervals.has(parent)) {
            clearInterval(this.statusIntervals.get(parent));
            this.statusIntervals.delete(parent);
        }

        // 2. Lift structural CSS masking states
        parent.classList.remove("is-loading-component");
        parent.classList.add("is-loaded");

        // 3. Find and cleanly rip out only this parent's specific loader element
        const loaderElement = parent.querySelector('.cube-loader-container');
        if (loaderElement) {
            loaderElement.remove();
        }
    }
}