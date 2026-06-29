// 📦 Define the default animation frames once, right here inside the component file
const DEFAULT_FRAMES = [
    [0, 1, 2, 3, 4, 5, 6],       // Frame 1: Highlight top horizontal row
    [6, 13, 20, 27, 34, 41, 48], // Frame 2: Highlight right vertical side line
    [42, 43, 44, 45, 46, 47, 48], // Frame 3: Highlight bottom row
    [0, 7, 14, 21, 28, 35, 42]   // Frame 4: Highlight left side line
];

export class DotLoader {
    constructor(options = {}) {
        if (Array.isArray(options)) {
            this.frames = options;
            this.duration = 100;
            this.repeatCount = -1;
            this.onComplete = null;
            this.isPlaying = true;
        } else {
            // 🚀 THE FIX: Fallback to DEFAULT_FRAMES if no custom frames are passed in
            this.frames = options.frames || options.frame || DEFAULT_FRAMES;
            
            this.duration = options.duration !== undefined ? options.duration : 100;
            this.repeatCount = options.repeatCount !== undefined ? options.repeatCount : -1;
            this.onComplete = options.onComplete || null;
            this.isPlaying = options.isPlaying !== undefined ? options.isPlaying : true;
        }
        
        this.currentIndex = 0;
        this.repeats = 0;
        this.intervalId = null;
        this.dots = [];
        
        const cName = options.className || '';
        const dName = options.dotClassName || '';
        this.element = this.createLoaderMarkup(cName, dName);
        
        if (this.isPlaying) {
            this.start();
        }
    }

    createLoaderMarkup(className = '', dotClassName = '') {
        const container = document.createElement('div');
        container.className = `dot-loader-grid ${className}`.trim();
        
        for (let i = 0; i < 49; i++) {
            const dot = document.createElement('div');
            dot.className = `dot-loader-item ${dotClassName}`.trim();
            container.appendChild(dot);
            this.dots.push(dot);
        }
        return container;
    }

    applyFrameToDots(frameIndex) {
        const frame = this.frames[frameIndex];
        if (!frame) return;

        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', frame.includes(index));
        });
    }

    start() {
        if (this.intervalId) clearInterval(this.intervalId);
        if (this.frames.length === 0) return;

        this.applyFrameToDots(this.currentIndex);

        this.intervalId = setInterval(() => {
            this.applyFrameToDots(this.currentIndex);
            
            if (this.currentIndex + 1 >= this.frames.length) {
                if (this.repeatCount !== -1 && this.repeats + 1 >= this.repeatCount) {
                    this.stop();
                    if (this.onComplete) this.onComplete();
                    return;
                }
                this.repeats++;
            }
            
            this.currentIndex = (this.currentIndex + 1) % this.frames.length;
        }, this.duration);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    destroy() {
        this.stop();
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}