export class SparkEffect {
    constructor(options = {}) {
        // Map all your original properties with their defaults
        this.OPT = {
            selector: options.selector || '#sparks',
            amount: options.amount || 5000,
            speed: options.speed || 0.05,
            lifetime: options.lifetime || 200,
            direction: options.direction || { x: -0.5, y: 1 },
            size: options.size || [2, 2],
            maxopacity: options.maxopacity || 1,
            color: options.color || '150, 150, 150',
            randColor: options.randColor !== undefined ? options.randColor : true,
            acceleration: options.acceleration || [5, 40]
        };

        // Mobile responsiveness override from your original code
        if (window.innerWidth < 520) {
            this.OPT.speed = 0.05;
            this.OPT.color = '150, 150, 150';
        }

        // Grab the canvas from the DOM
        this.canvas = document.querySelector(this.OPT.selector);
        if (!this.canvas) {
            console.error(`❌ SparkEffect: Canvas with selector "${this.OPT.selector}" not found.`);
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.sparks = [];
        this.animationId = null;
        this.intervalId = null;

        // Bind our context so 'this' works correctly inside event listeners and animation frames
        this.setCanvasWidth = this.setCanvasWidth.bind(this);
        this.draw = this.draw.bind(this);

        this.init();
    }

    // Helper math function
    rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Creates a single spark object
    createSpark() {
    const x = this.rand(-200, window.innerWidth + 200);
    const y = this.rand(-200, window.innerHeight + 200);
    const acceleration = this.rand(this.OPT.acceleration[0], this.OPT.acceleration[1]);
    const color = this.OPT.randColor
        ? `${this.rand(0, 255)},${this.rand(0, 255)},${this.rand(0, 255)}`
        : this.OPT.color;

    return {
        x: x,
        y: y,
        age: 0,
        acceleration: acceleration,
        color: color,
        opacity: this.OPT.maxopacity,
        
        // ✅ MUST BE WRITTEN AS A REGULAR METHOD (NOT AN ARROW FUNCTION)
        // This ensures 'this' references the individual spark coordinate variables
        go(OPT) { 
            this.x += OPT.speed * OPT.direction.x * this.acceleration / 2;
            this.y += OPT.speed * OPT.direction.y * this.acceleration / 2;
            this.opacity = OPT.maxopacity - (++this.age / OPT.lifetime);
        }
    };
}

    addSpark() {
        this.sparks.push(this.createSpark());
    }

    drawSpark(spark) {
        spark.go(this.OPT); // Apply movement physics
        
        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(${spark.color}, ${spark.opacity})`;
        // Note: ctx.rect uses (x, y, width, height). The React code had extra 0, 0, Math.PI*2 which belongs to ctx.arc, not ctx.rect.
        this.ctx.rect(spark.x, spark.y, this.OPT.size[0], this.OPT.size[1]);
        this.ctx.fill();
    }

    draw() {
        // Clear the canvas for the next frame
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Loop backwards through sparks so we can safely remove dead ones without breaking the index
        for (let i = this.sparks.length - 1; i >= 0; i--) {
            const spark = this.sparks[i];
            if (spark.opacity <= 0) {
                this.sparks.splice(i, 1);
            } else {
                this.drawSpark(spark);
            }
        }
        
        // Loop the animation
        this.animationId = window.requestAnimationFrame(this.draw);
    }

    setCanvasWidth() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.setCanvasWidth();
        window.addEventListener('resize', this.setCanvasWidth);
        
        // Start pumping out sparks
        this.intervalId = window.setInterval(() => {
            if (this.sparks.length < this.OPT.amount) {
                this.addSpark();
            }
        }, 1000 / this.OPT.amount);
        
        // Ignite the engine
        this.animationId = window.requestAnimationFrame(this.draw);
        console.log("✨ Spark background active.");
    }

    // Call this if you ever need to safely remove the effect from the page
    destroy() {
        window.removeEventListener('resize', this.setCanvasWidth);
        window.clearInterval(this.intervalId);
        window.cancelAnimationFrame(this.animationId);
        this.sparks = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

