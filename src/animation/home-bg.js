// Import the core Three.js framework directly via CDN module pipeline
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

export function initHomeShader() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    // 1. Core GLSL Shader Programs
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
        uniform float angle;
        
        // ✅ NEW: Variables to control the macro "S" curve path
        uniform float pathFrequency;
        uniform float pathAmplitude;

        void main() {
            vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
            
            // 1. Rotate the grid to set the base direction
            float c = cos(angle);
            float s = sin(angle);
            p = vec2(p.x * c - p.y * s, p.x * s + p.y * c);

            // ✅ 2. Warp the grid to create the macro "S" curve pattern
            // This bends the straight line into the red shape you drew
            p.y += cos(p.x * pathFrequency) * pathAmplitude;

            // 3. Draw the glowing micro waves along the newly warped path
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

    // 2. Initialize Three.js Structural Architecture
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color(0x000000));

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // 3. Mapping Configuration Values
    const uniforms = {
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
        angle: { value: 0.0 },
        pathFrequency: { value: 0.0 },
        pathAmplitude: { value: 0.0 }
    };

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
    
    // 1. Tell Three.js to adjust the viewport size
    renderer.setSize(width, height, false);
    
    // 2. Capture the TRUE hardware pixels from the canvas buffer
    const physicalWidth = renderer.domElement.width;
    const physicalHeight = renderer.domElement.height;

    // 3. Pass the physical dimensions to the shader uniform (DO NOT OVERWRITE THIS BELOW!)
    uniforms.resolution.value.set(physicalWidth, physicalHeight);

    // 4. Responsive parameters based on viewport width
    if (width <= 768) {
        // Mobile layout parameters
        uniforms.angle.value = -0.1; 
        uniforms.pathFrequency.value = 1; 
        uniforms.pathAmplitude.value = 0.1; 
        uniforms.yScale.value = 1;
    } else {
        // Desktop layout parameters
        uniforms.angle.value = 0.0;
        uniforms.pathFrequency.value = 0.0;
        uniforms.pathAmplitude.value = 0.0;
        uniforms.yScale.value = 0.5;
    }
}

    // 5. The Active Animation Render Frame Loop 
    let animationId;
    function animate() {
        uniforms.time.value += 0.01;
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
    }

    handleResize();
    animate();
    window.addEventListener("resize", handleResize);

    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", handleResize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
    };
}