#version 460
#include <flutter/runtime_effect.glsl>

// Flutter passes uniforms as sequential float indices
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_xScale;
uniform float u_yScale;
uniform float u_distortion;

out vec4 fragColor;

void main() {
    // Local pixel coordinates centered and normalized
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

    // SOLUTION 2: If portrait orientation (Mobile), rotate coordinates 45 degrees
    if (u_resolution.y > u_resolution.x) {
        float angle = 0.7853; // 45 degrees in radians
        float cosA = cos(angle);
        float sinA = sin(angle);
        p = vec2(p.x * cosA - p.y * sinA, p.x * sinA + p.y * cosA);
    }

    float d = length(p) * u_distortion;
    
    float rx = p.x * (1.0 + d);
    float gx = p.x;
    float bx = p.x * (1.0 - d);

    // Calculate light ribbons with slight chromatic split
    float r = 0.05 / abs(p.y + sin((rx + u_time) * u_xScale) * u_yScale);
    float g = 0.05 / abs(p.y + sin((gx + u_time) * u_xScale) * u_yScale);
    float b = 0.05 / abs(p.y + sin((bx + u_time) * u_xScale) * u_yScale);
    
    fragColor = vec4(r, g, b, 1.0);
}