"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type ThreeBackgroundVariant = "network" | "grid" | "waves" | "field";

type ThreeBackgroundProps = {
  className?: string;
  variant?: ThreeBackgroundVariant;
  opacity?: number;
};

type Driver = {
  tick: (elapsed: number, width: number, height: number) => void;
  setColor: (color: number) => void;
  dispose: () => void;
};

function createNetworkDriver(scene: THREE.Scene, width: number, height: number, color: number, count: number): Driver {
  const nodes = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
  }));
  const linkDistance = Math.max(90, Math.min(150, width / 6));

  const pointsGeometry = new THREE.BufferGeometry();
  const pointsMaterial = new THREE.PointsMaterial({ color, size: 3, transparent: true, opacity: 0.6, sizeAttenuation: false });
  const points = new THREE.Points(pointsGeometry, pointsMaterial);
  scene.add(points);

  const lineMaterial = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.14 });
  let lines = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
  scene.add(lines);

  function sync(w: number, h: number) {
    const positions = new Float32Array(nodes.length * 3);
    nodes.forEach((node, i) => {
      positions[i * 3] = node.x;
      positions[i * 3 + 1] = h - node.y;
      positions[i * 3 + 2] = 0;
    });
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const linePositions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < linkDistance) {
          linePositions.push(nodes[i].x, h - nodes[i].y, 0, nodes[j].x, h - nodes[j].y, 0);
        }
      }
    }
    scene.remove(lines);
    lines = new THREE.LineSegments(
      new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3)),
      lineMaterial,
    );
    scene.add(lines);
  }

  sync(width, height);

  return {
    tick(_elapsed, w, h) {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
      }
      sync(w, h);
    },
    setColor(next) {
      pointsMaterial.color.setHex(next);
      lineMaterial.color.setHex(next);
    },
    dispose() {
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineMaterial.dispose();
      lines.geometry.dispose();
      scene.remove(points);
      scene.remove(lines);
    },
  };
}

function createFieldDriver(scene: THREE.Scene, width: number, height: number, color: number, count: number): Driver {
  const nodes = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.12,
  }));

  const geometry = new THREE.BufferGeometry();
  const material = new THREE.PointsMaterial({ color, size: 2.5, transparent: true, opacity: 0.5, sizeAttenuation: false });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function sync(h: number) {
    const positions = new Float32Array(nodes.length * 3);
    nodes.forEach((node, i) => {
      positions[i * 3] = node.x;
      positions[i * 3 + 1] = h - node.y;
      positions[i * 3 + 2] = 0;
    });
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }
  sync(height);

  return {
    tick(_elapsed, w, h) {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
      }
      sync(h);
    },
    setColor(next) {
      material.color.setHex(next);
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      scene.remove(points);
    },
  };
}

function createGridDriver(scene: THREE.Scene, width: number, height: number, color: number): Driver {
  const spacing = 34;
  const cols = Math.ceil(width / spacing) + 1;
  const rows = Math.ceil(height / spacing) + 1;
  const cells: { x: number; y: number; phase: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ x: c * spacing, y: r * spacing, phase: Math.random() * Math.PI * 2 });
    }
  }

  const geometry = new THREE.BufferGeometry();
  const material = new THREE.PointsMaterial({ color, size: 2.5, transparent: true, opacity: 0.5, sizeAttenuation: false });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function sync(elapsed: number, h: number) {
    const positions = new Float32Array(cells.length * 3);
    cells.forEach((cell, i) => {
      const bob = Math.sin(elapsed * 0.6 + cell.phase) * 4;
      positions[i * 3] = cell.x;
      positions[i * 3 + 1] = h - cell.y + bob;
      positions[i * 3 + 2] = 0;
    });
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }
  sync(0, height);

  return {
    tick(elapsed, _w, h) {
      sync(elapsed, h);
    },
    setColor(next) {
      material.color.setHex(next);
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      scene.remove(points);
    },
  };
}

function createWavesDriver(scene: THREE.Scene, width: number, height: number, color: number): Driver {
  const waveCount = 4;
  const segments = 48;
  const lineObjects: THREE.Line[] = [];
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 });

  for (let i = 0; i < waveCount; i++) {
    const geometry = new THREE.BufferGeometry();
    const line = new THREE.Line(geometry, material);
    scene.add(line);
    lineObjects.push(line);
  }

  function sync(elapsed: number, w: number, h: number) {
    lineObjects.forEach((line, i) => {
      const baseY = h * ((i + 1) / (waveCount + 1));
      const amplitude = 18 + i * 4;
      const positions = new Float32Array((segments + 1) * 3);
      for (let s = 0; s <= segments; s++) {
        const x = (w / segments) * s;
        const y = baseY + Math.sin(x * 0.02 + elapsed * (0.4 + i * 0.08) + i) * amplitude;
        positions[s * 3] = x;
        positions[s * 3 + 1] = y;
        positions[s * 3 + 2] = 0;
      }
      line.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    });
  }
  sync(0, width, height);

  return {
    tick(elapsed, w, h) {
      sync(elapsed, w, h);
    },
    setColor(next) {
      material.color.setHex(next);
    },
    dispose() {
      material.dispose();
      lineObjects.forEach((line) => {
        line.geometry.dispose();
        scene.remove(line);
      });
    },
  };
}

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

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, width, 0, height, -10, 10);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const color = getAccentColor();
    let driver: Driver;
    switch (variant) {
      case "grid":
        driver = createGridDriver(scene, width, height, color);
        break;
      case "waves":
        driver = createWavesDriver(scene, width, height, color);
        break;
      case "field":
        driver = createFieldDriver(scene, width, height, color, 34);
        break;
      default:
        driver = createNetworkDriver(scene, width, height, color, 70);
    }

    let frameId: number | null = null;
    let animating = false;
    let inView = false;
    let tabVisible = document.visibilityState === "visible";
    const clock = new THREE.Clock();

    function renderFrame() {
      driver.tick(clock.getElapsedTime(), width, height);
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
      camera.right = width;
      camera.bottom = height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderFrame();
    });
    resizeObserver.observe(container);

    const themeObserver = new MutationObserver(() => {
      driver.setColor(getAccentColor());
      renderFrame();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      stop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      driver.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [variant]);

  return <div ref={containerRef} aria-hidden className={className} style={{ opacity }} />;
}
