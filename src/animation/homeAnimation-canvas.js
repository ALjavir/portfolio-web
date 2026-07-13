// Import the core Three.js framework directly via CDN module pipeline
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

export function initHomeShader() {
    const canvas = document.getElementById("homeAnimation-canvas");
    if (!canvas) return;

    const isMobile = window.innerWidth <= 768;

    // Vertex shader unchanged
    const vertexShader = `
        attribute vec3 position;
        void main() {
            gl_Position = vec4(position, 1.0);
        }
    `;

    // Desktop: full shader with macro path warp
    const fragmentShaderDesktop = `
        precision mediump float;
        uniform vec2 resolution;
        uniform float time;
        uniform float xScale;
        uniform float yScale;
        uniform float distortion;
        uniform float angle;
        uniform float pathFrequency;
        uniform float pathAmplitude;

        void main() {
            vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
            float c = cos(angle);
            float s = sin(angle);
            p = vec2(p.x * c - p.y * s, p.x * s + p.y * c);
            p.y += cos(p.x * pathFrequency) * pathAmplitude;

            float d = length(p) * distortion;
            float rx = p.x * (1.0 + d);
            float gx = p.x;
            float bx = p.x * (1.0 - d);

            float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
            float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
            float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

            gl_FragColor = vec4(r, g, b, 1.0);
        }
    `;

    // Mobile: angle/pathFrequency/pathAmplitude are always 0 in your own
    // config, so strip that math out of the shader entirely instead of
    // computing and discarding it every pixel, every frame.
    const fragmentShaderMobile = `
        precision mediump float;
        uniform vec2 resolution;
        uniform float time;
        uniform float xScale;
        uniform float yScale;
        uniform float distortion;

        void main() {
            vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

            float d = length(p) * distortion;
            float rx = p.x * (1.0 + d);
            float gx = p.x;
            float bx = p.x * (1.0 - d);

            float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
            float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
            float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

            gl_FragColor = vec4(r, g, b, 1.0);
        }
    `;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: false,       // full-screen soft shader doesn't need MSAA
        powerPreference: "low-power",
        alpha: false,
    });

    // Cap DPR hard on mobile — 1.5 is visually indistinguishable for this
    // kind of blurred glow effect but is ~55% fewer pixels than DPR 3 at 2x
    const maxDpr = isMobile ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr));
    renderer.setClearColor(new THREE.Color(0x000000));

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: isMobile ? 1 : 0.5 },
        distortion: { value: 0.05 },
        // Desktop-only uniforms omitted from the object on mobile builds
        ...(isMobile ? {} : {
            angle: { value: 0.0 },
            pathFrequency: { value: 0.0 },
            pathAmplitude: { value: 0.0 },
        }),
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader: isMobile ? fragmentShaderMobile : fragmentShaderDesktop,
        uniforms,
        side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderScale = isMobile ? 0.6 : 1.0;

    function handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        renderer.setSize(width * renderScale, height * renderScale, false);
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        const physicalWidth = renderer.domElement.width;
        const physicalHeight = renderer.domElement.height;
        uniforms.resolution.value.set(physicalWidth, physicalHeight);
    }

    // Only animate while the canvas is actually visible on screen
    let isVisible = true;
    const observer = new IntersectionObserver(
        (entries) => {
            isVisible = entries[0].isIntersecting;
            if (isVisible) startLoop();
        },
        { threshold: 0 }
    );
    observer.observe(canvas);

    // Also pause when the tab itself isn't visible
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && isVisible) startLoop();
    });

    let animationId = null;
    function animate() {
        if (!isVisible || document.hidden) {
            animationId = null;
            return; // stop the loop; startLoop() restarts it
        }
        uniforms.time.value += 0.01;
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
    }
    function startLoop() {
        if (animationId === null) animate();
    }

    handleResize();
    startLoop();
    window.addEventListener("resize", handleResize);

    return () => {
        if (animationId !== null) cancelAnimationFrame(animationId);
        window.removeEventListener("resize", handleResize);
        observer.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
    };
}