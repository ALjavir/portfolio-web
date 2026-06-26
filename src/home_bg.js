// Import the core Three.js framework directly via CDN module pipeline
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

export function initHomeShader() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    // 1. Core GLSL Shader Programs extracted from your code asset
    const vertexShader = `
        attribute vec3 position;
        void main() {
            gl_Position = vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        precision highp float;
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

    // 2. Initialize Three.js Structural Architecture Environment
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Lock performance curves safely
    renderer.setClearColor(new THREE.Color(0x000000));

    // Orthographic Camera is used for flat 2D shader plane projections
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // 3. Mapping Configuration Values (The Uniform Blocks)
    const uniforms = {
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
    };

    // Create a simple full-screen bounding box quad plane geometry
    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4. Smooth Layout Canvas Resizing Engine
    function handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        renderer.setSize(width, height, false);
        uniforms.resolution.value.set(width, height);
    }

    // 5. The Active Animation Render Frame Loop 
    let animationId;
    function animate() {
        uniforms.time.value += 0.01; // Updates elapsed time matrix variables step by step
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
    }

    // Initialize systems, subscribe window metrics triggers
    handleResize();
    animate();
    window.addEventListener("resize", handleResize);

    // Return an optional teardown hook function (Just like disposing a Flutter state)
    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", handleResize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
    };
}