"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type ThreeBackgroundVariant = "network" | "grid" | "waves" | "field";

type ThreeBackgroundProps = {
  className?: string;
  variant?: ThreeBackgroundVariant;
  opacity?: number;
};

type VariantPreset = {
  scale: number;
  speed: number;
  intensity: number;
  lineIntensity: number;
};

const PRESETS: Record<ThreeBackgroundVariant, VariantPreset> = {
  network: { scale: 1.6, speed: 0.1, intensity: 0.09, lineIntensity: 0.14 },
  grid: { scale: 2.6, speed: 0.06, intensity: 0.05, lineIntensity: 0.08 },
  waves: { scale: 2.0, speed: 0.14, intensity: 0.06, lineIntensity: 0.1 },
  field: { scale: 3.8, speed: 0.04, intensity: 0.025, lineIntensity: 0.04 },
};

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uScale;
  uniform float uSpeed;
  uniform float uIntensity;
  uniform float uLineIntensity;
  uniform vec2 uResolution;

  vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
          + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.55;
    for (int i = 0; i < 4; i++) {
      value += amplitude * snoise(p);
      p *= 2.05;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = vec2(vUv.x * aspect, vUv.y) * uScale;
    float t = uTime * uSpeed;

    float n1 = fbm(p + vec2(t, -t * 0.6));
    float n2 = fbm(p * 1.6 - vec2(-t * 0.35, t * 0.25) + 7.3);
    float field = fbm(p + n1 * 0.6 + n2 * 0.4 + t * 0.1);

    float glow = smoothstep(-0.5, 0.9, field) * uIntensity;

    float contour = abs(fract(field * 3.0) - 0.5);
    float lines = smoothstep(0.44, 0.5, 0.5 - contour) * uLineIntensity;

    float alpha = clamp(glow + lines, 0.0, 1.0);
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export function ThreeBackground({ className, variant = "network", opacity = 1 }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;
    const container = containerEl;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const getAccentColor = () => (document.documentElement.classList.contains("dark") ? 0xff6a2c : 0xff4405);

    let width = Math.max(container.clientWidth, 1);
    let height = Math.max(container.clientHeight, 1);

    const preset = PRESETS[variant];

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const color = new THREE.Color(getAccentColor());
    const uniforms = {
      uTime: { value: 0 },
      uColor: { value: color },
      uScale: { value: preset.scale },
      uSpeed: { value: preset.speed },
      uIntensity: { value: preset.intensity },
      uLineIntensity: { value: preset.lineIntensity },
      uResolution: { value: new THREE.Vector2(width, height) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    let geometry = new THREE.PlaneGeometry(width, height);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number | null = null;
    let animating = false;
    let inView = false;
    let tabVisible = document.visibilityState === "visible";
    const clock = new THREE.Clock();

    function renderFrame() {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    }

    function animate() {
      if (!animating) return;
      renderFrame();
      frameId = requestAnimationFrame(animate);
    }

    function start() {
      if (prefersReducedMotion || animating || !inView || !tabVisible) return;
      animating = true;
      frameId = requestAnimationFrame(animate);
    }

    function stop() {
      animating = false;
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
    }

    renderFrame();

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    function handleVisibility() {
      tabVisible = document.visibilityState === "visible";
      if (tabVisible) start();
      else stop();
    }
    document.addEventListener("visibilitychange", handleVisibility);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      width = Math.max(entry.contentRect.width, 1);
      height = Math.max(entry.contentRect.height, 1);
      camera.left = width / -2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = height / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      geometry.dispose();
      geometry = new THREE.PlaneGeometry(width, height);
      mesh.geometry = geometry;
      uniforms.uResolution.value.set(width, height);
      renderFrame();
    });
    resizeObserver.observe(container);

    const themeObserver = new MutationObserver(() => {
      uniforms.uColor.value.setHex(getAccentColor());
      renderFrame();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      stop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [variant]);

  return <div ref={containerRef} aria-hidden className={className} style={{ opacity }} />;
}
