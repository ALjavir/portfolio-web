/**
 * Reusable 3D Isometric Cube Loader Component
 */
export class CubeLoader {
    /**
     * @param {HTMLElement} parentElement - The wrapper DOM node that needs to show the loader
     */
    constructor(parentElement) {
        this.parent = parentElement;
        this.element = null;
        this.statusInterval = null;
        this.statuses = ["Please, wait", "Loading",];
    }

    /**
     * Mounts the HTML structural divs and activates the text tracking loop
     */
    mount() {
        if (!this.parent) return;

        // Apply masking helper classes to hide background content safely
        this.parent.classList.add("is-loading-component");
        this.parent.classList.remove("is-loaded");

        // Compile HTML template architecture
        this.element = document.createElement('div');
        this.element.className = 'cube-loader-container';
        
        const plusIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;

        this.element.innerHTML = `
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

        this.parent.appendChild(this.element);
        this._startTextTransitionLoop();
    }

    /**
     * @private Low impact tracking helper for background labels
     */
    _startTextTransitionLoop() {
        let index = 0;
        const textNode = this.element.querySelector('.cube-status');

        this.statusInterval = setInterval(() => {
            index = (index + 1) % this.statuses.length;
            if (textNode) {
                textNode.textContent = `${this.statuses[index]}...`;
            }
        }, 600);
    }

    /**
     * Clears tracking tasks and detaches all element nodes from DOM tree
     */
    unmount() {
        // Halt active asynchronous intervals to prevent memory leaks
        if (this.statusInterval) {
            clearInterval(this.statusInterval);
        }

        // Lift masking state limits from parent element
        if (this.parent) {
            this.parent.classList.remove("is-loading-component");
        }

        // Wipe layout markup cleanly out of document memory
        if (this.element && this.element.parentNode) {
            this.element.remove();
        }
    }
}