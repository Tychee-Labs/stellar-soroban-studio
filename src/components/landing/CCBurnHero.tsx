import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import "./CCBurnHero.css";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Particle2D {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  originalAlpha: number;
  life: number;
  time: number;
  startX: number;
  twinkleSpeed: number;
  twinkleAmount: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CARD_IMAGES = [
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b55e654d1341fb06f8_4.1.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5a080a31ee7154b19_1.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5c1e4919fd69672b8_3.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5f6a5e232e7beb4be_2.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5bea2f1b07392d936_4.png",
];

const CARDS_COUNT = 30;
const CARD_WIDTH = 500;
const CARD_GAP = 60;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateCode(width: number, height: number): string {
  const randInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = (arr: string[]) => arr[randInt(0, arr.length - 1)];

  const header = [
    "// compiled preview • scanner demo",
    "/* generated for visual effect – not executed */",
    "const SCAN_WIDTH = 8;",
    "const FADE_ZONE = 35;",
    "const MAX_PARTICLES = 2500;",
    "const TRANSITION = 0.05;",
  ];
  const helpers = [
    "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
    "function lerp(a, b, t) { return a + (b - a) * t; }",
    "const now = () => performance.now();",
    "function rng(min, max) { return Math.random() * (max - min) + min; }",
  ];
  const particleBlock = (idx: number) => [
    `class Particle${idx} {`,
    " constructor(x, y, vx, vy, r, a) {",
    " this.x = x; this.y = y;",
    " this.vx = vx; this.vy = vy;",
    " this.r = r; this.a = a;",
    " }",
    " step(dt) { this.x += this.vx * dt; this.y += this.vy * dt; }",
    "}",
  ];
  const scannerBlock = [
    "const scanner = {",
    " x: Math.floor(window.innerWidth / 2),",
    " width: SCAN_WIDTH,",
    " glow: 3.5,",
    "};",
    "",
    "function drawParticle(ctx, p) {",
    " ctx.globalAlpha = clamp(p.a, 0, 1);",
    " ctx.drawImage(gradient, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);",
    "}",
  ];
  const loopBlock = [
    "function tick(t) {",
    " // requestAnimationFrame(tick);",
    " const dt = 0.016;",
    " // update & render",
    "}",
  ];
  const misc = [
    "const state = { intensity: 1.2, particles: MAX_PARTICLES };",
    "const bounds = { w: window.innerWidth, h: 300 };",
    "const gradient = document.createElement('canvas');",
    "const ctx = gradient.getContext('2d');",
    "ctx.globalCompositeOperation = 'lighter';",
    "// ascii overlay is masked with a 3-phase gradient",
  ];

  const library: string[] = [];
  header.forEach((l) => library.push(l));
  helpers.forEach((l) => library.push(l));
  for (let b = 0; b < 3; b++) particleBlock(b).forEach((l) => library.push(l));
  scannerBlock.forEach((l) => library.push(l));
  loopBlock.forEach((l) => library.push(l));
  misc.forEach((l) => library.push(l));
  for (let i = 0; i < 40; i++) {
    library.push(`const v${i} = (${randInt(1, 9)} + ${randInt(10, 99)}) * 0.${randInt(1, 9)};`);
  }
  for (let i = 0; i < 20; i++) {
    library.push(`if (state.intensity > ${1 + (i % 3)}) { scanner.glow += 0.01; }`);
  }

  let flow = library.join(" ").replace(/\s+/g, " ").trim();
  const totalChars = width * height;
  while (flow.length < totalChars + width) {
    flow += " " + pick(library).replace(/\s+/g, " ").trim();
  }

  let out = "";
  let offset = 0;
  for (let row = 0; row < height; row++) {
    let line = flow.slice(offset, offset + width);
    if (line.length < width) line += " ".repeat(width - line.length);
    out += line + (row < height - 1 ? "\n" : "");
    offset += width;
  }
  return out;
}

function calcCodeDimensions(cardW: number, cardH: number) {
  const fontSize = 11;
  const lineHeight = 13;
  const charWidth = 6;
  return {
    width: Math.floor(cardW / charWidth),
    height: Math.floor(cardH / lineHeight),
    fontSize,
    lineHeight,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CardScannerDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardLineRef = useRef<HTMLDivElement>(null);
  const speedValueRef = useRef<HTMLSpanElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);

  // ── Card stream state (refs so animation loop can access without re-renders)
  const streamState = useRef({
    position: 0,
    velocity: 180,
    direction: -1,
    isAnimating: true,
    isDragging: false,
    lastTime: 0,
    lastMouseX: 0,
    mouseVelocity: 0,
    friction: 0.95, // Still useful for post-drag momentum
    minVelocity: 150,
    containerWidth: 0,
    cardLineWidth: 0,
  });

  const rafCardRef = useRef<number>(0);
  const rafScannerRef = useRef<number>(0);
  const rafThreeRef = useRef<number>(0);

  // ── Scanner state
  const scannerRef = useRef({
    particles: [] as (Particle2D | undefined)[],
    count: 0,
    maxParticles: 800,
    intensity: 0.8,
    lightBarX: 0,
    lightBarWidth: 3,
    fadeZone: 60,
    scanTargetIntensity: 1.8,
    scanTargetParticles: 2500,
    scanTargetFadeZone: 35,
    scanningActive: false,
    baseIntensity: 0.8,
    baseMaxParticles: 800,
    baseFadeZone: 60,
    currentIntensity: 0.8,
    currentMaxParticles: 800,
    currentFadeZone: 60,
    currentGlowIntensity: 1,
    transitionSpeed: 0.05,
    w: 0,
    h: 480,
    gradientCanvas: null as HTMLCanvasElement | null,
  });

  // ─── Card stream helpers ────────────────────────────────────────────────────

  const updateCardClipping = useCallback(() => {
    const cardLine = cardLineRef.current;
    if (!cardLine) return;

    const s = streamState.current;
    // Anchor the scanner position - match the responsive shifts used elsewhere
    const scannerX = window.innerWidth < 1000 ? window.innerWidth - 150 : window.innerWidth * 0.65;
    const scannerWidth = 8;
    const sl = scannerX - scannerWidth / 2;
    const sr = scannerX + scannerWidth / 2;
    let anyScanningActive = false;

    // Use direct child access to avoid querySelectorAll overhead in hot loop
    const cards = cardLine.children;
    const fullCardStep = CARD_WIDTH + CARD_GAP;

    for (let i = 0; i < cards.length; i++) {
      const wrapper = cards[i] as HTMLDivElement;
      // Calculate viewport-relative positions mathematically to avoid getBoundingClientRect (layout thrashing)
      const cardLeft = s.position + i * fullCardStep;
      const cardRight = cardLeft + CARD_WIDTH;

      const normalCard = wrapper.children[0] as HTMLDivElement;
      const asciiCard = wrapper.children[1] as HTMLDivElement;
      if (!normalCard || !asciiCard) continue;

      if (cardLeft < sr && cardRight > sl) {
        anyScanningActive = true;
        const intersectLeft = Math.max(sl - cardLeft, 0);
        const intersectRight = Math.min(sr - cardLeft, CARD_WIDTH);
        const normalClipRight = (intersectLeft / CARD_WIDTH) * 100;
        const asciiClipLeft = (intersectRight / CARD_WIDTH) * 100;

        normalCard.style.setProperty("--clip-right", `${normalClipRight}%`);
        asciiCard.style.setProperty("--clip-left", `${asciiClipLeft}%`);

        if (!wrapper.hasAttribute("data-scanned") && intersectLeft > 0) {
          wrapper.setAttribute("data-scanned", "true");
          const fx = document.createElement("div");
          fx.className = "csd-scan-effect";
          wrapper.appendChild(fx);
          setTimeout(() => fx.parentNode?.removeChild(fx), 600);
        }
      } else {
        if (cardRight < sl) {
          normalCard.style.setProperty("--clip-right", "100%");
          asciiCard.style.setProperty("--clip-left", "100%");
        } else {
          normalCard.style.setProperty("--clip-right", "0%");
          asciiCard.style.setProperty("--clip-left", "0%");
        }
        wrapper.removeAttribute("data-scanned");
      }
    }

    scannerRef.current.scanningActive = anyScanningActive;
  }, []);

  const updateCardPosition = useCallback(() => {
    const s = streamState.current;
    const cardLine = cardLineRef.current;
    if (!cardLine) return;

    if (s.position < -s.cardLineWidth) s.position = s.containerWidth;
    else if (s.position > s.containerWidth) s.position = -s.cardLineWidth;

    cardLine.style.transform = `translate3d(${s.position}px, 0, 0)`;
    updateCardClipping();
  }, [updateCardClipping]);

  const updateSpeedIndicator = useCallback(() => {
    if (speedValueRef.current) {
      speedValueRef.current.textContent = String(Math.round(streamState.current.velocity));
    }
  }, []);

  const animateCards = useCallback(
    (currentTime: number) => {
      const s = streamState.current;
      const deltaTime = (currentTime - s.lastTime) / 1000;
      s.lastTime = currentTime;

      if (s.isAnimating && !s.isDragging) {
        if (s.velocity > s.minVelocity) {
          s.velocity *= s.friction;
        } else {
          s.velocity = Math.max(s.minVelocity, s.velocity);
        }
        s.position += s.velocity * s.direction * deltaTime;
        updateCardPosition();
        updateSpeedIndicator();
      }

      rafCardRef.current = requestAnimationFrame(animateCards);
    },
    [updateCardPosition, updateSpeedIndicator]
  );

  // ─── Drag / Wheel ────────────────────────────────────────────────────────

  const startDrag = useCallback((clientX: number) => {
    const s = streamState.current;
    const cardLine = cardLineRef.current;
    if (!cardLine) return;

    s.isDragging = true;
    s.isAnimating = false;
    s.lastMouseX = clientX;
    s.mouseVelocity = 0;

    const transform = window.getComputedStyle(cardLine).transform;
    if (transform !== "none") {
      s.position = new DOMMatrix(transform).m41;
    }

    cardLine.style.animation = "none";
    cardLine.classList.add("dragging");
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
  }, []);

  const onDrag = useCallback(
    (clientX: number) => {
      const s = streamState.current;
      const cardLine = cardLineRef.current;
      if (!s.isDragging || !cardLine) return;

      const deltaX = clientX - s.lastMouseX;
      s.position += deltaX;
      s.mouseVelocity = deltaX * 60;
      s.lastMouseX = clientX;
      cardLine.style.transform = `translateX(${s.position}px)`;
      updateCardClipping();
    },
    [updateCardClipping]
  );

  const endDrag = useCallback(() => {
    const s = streamState.current;
    const cardLine = cardLineRef.current;
    if (!s.isDragging) return;

    s.isDragging = false;
    cardLine?.classList.remove("dragging");

    if (Math.abs(s.mouseVelocity) > s.minVelocity) {
      s.velocity = Math.abs(s.mouseVelocity);
      s.direction = s.mouseVelocity > 0 ? 1 : -1;
    } else {
      s.velocity = 120;
    }
    s.isAnimating = true;
    updateSpeedIndicator();
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  }, [updateSpeedIndicator]);


  // ─── Three.js particle system ─────────────────────────────────────────────

  const initThreeParticles = useCallback(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      125,
      -125,
      1,
      1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, 312);
    renderer.setClearColor(0x000000, 0);

    const particleCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocitiesArr = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);

    const texCanvas = document.createElement("canvas");
    texCanvas.width = 100;
    texCanvas.height = 100;
    const ctx = texCanvas.getContext("2d")!;
    const half = 50;
    const hue = 14;
    const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0.025, "#fff");
    grad.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`);
    grad.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`);
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(half, half, half, 0, Math.PI * 2);
    ctx.fill();
    const texture = new THREE.CanvasTexture(texCanvas);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 312;
      positions[i * 3 + 2] = 0;
      colors[i * 3] = colors[i * 3 + 1] = colors[i * 3 + 2] = 1;
      const orbitRadius = Math.random() * 200 + 100;
      sizes[i] = (Math.random() * (orbitRadius - 60) + 60) / 8;
      velocitiesArr[i] = Math.random() * 60 + 30;
      alphas[i] = (Math.random() * 8 + 2) / 10;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture }, size: { value: 15.0 } },
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        varying vec3 vColor;
        uniform float size;
        void main() {
          vAlpha = alpha;
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size;
          gl_Position = projectionMatrix * mvPosition;
        }`,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying float vAlpha;
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, vAlpha) * texture2D(pointTexture, gl_PointCoord);
        }`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const particleMesh = new THREE.Points(geometry, material);
    scene.add(particleMesh);

    const animateThree = () => {
      rafThreeRef.current = requestAnimationFrame(animateThree);
      const pos = particleMesh.geometry.attributes.position.array as Float32Array;
      const alp = particleMesh.geometry.attributes.alpha.array as Float32Array;
      const time = Date.now() * 0.001;

      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += velocitiesArr[i] * 0.016;
        if (pos[i * 3] > window.innerWidth / 2 + 100) {
          pos[i * 3] = -window.innerWidth / 2 - 100;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 312;
        }
        pos[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;

        const twinkle = Math.floor(Math.random() * 10);
        if (twinkle === 1 && alp[i] > 0) alp[i] -= 0.05;
        else if (twinkle === 2 && alp[i] < 1) alp[i] += 0.05;
        alp[i] = Math.max(0, Math.min(1, alp[i]));
      }

      particleMesh.geometry.attributes.position.needsUpdate = true;
      particleMesh.geometry.attributes.alpha.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animateThree();

    const onResize = () => {
      camera.left = -window.innerWidth / 2;
      camera.right = window.innerWidth / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 312);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafThreeRef.current);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      particleMesh.geometry.dispose();
      (particleMesh.material as THREE.Material).dispose();
    };
  }, []);

  // ─── 2D Scanner (canvas) ──────────────────────────────────────────────────

  const initParticleScanner = useCallback(() => {
    const canvas = scannerCanvasRef.current;
    if (!canvas) return;

    const sc = scannerRef.current;
    sc.w = window.innerWidth;
    sc.lightBarX = sc.w < 1000 ? sc.w - 150 : sc.w * 0.65;
    canvas.width = sc.w;
    canvas.height = sc.h;

    const gradCanvas = document.createElement("canvas");
    gradCanvas.width = 16;
    gradCanvas.height = 16;
    const gctx = gradCanvas.getContext("2d")!;
    const h2 = 8;
    const grd = gctx.createRadialGradient(h2, h2, 0, h2, h2, h2);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.3, "rgba(251,146,60,0.8)");
    grd.addColorStop(0.7, "rgba(242,87,43,0.4)");
    grd.addColorStop(1, "transparent");
    gctx.fillStyle = grd;
    gctx.beginPath();
    gctx.arc(h2, h2, h2, 0, Math.PI * 2);
    gctx.fill();
    sc.gradientCanvas = gradCanvas;

    const rndF = (min: number, max: number) => Math.random() * (max - min) + min;

    const makeParticle = (): Particle2D => {
      const intensityRatio = sc.intensity / sc.baseIntensity;
      const sm = 1 + (intensityRatio - 1) * 1.2;
      const szm = 1 + (intensityRatio - 1) * 0.7;
      return {
        x: sc.lightBarX + rndF(-sc.lightBarWidth * 2, sc.lightBarWidth * 2),
        y: rndF(0, sc.h),
        vx: rndF(0.2, 1.5) * sm,
        vy: rndF(-0.4, 0.4) * sm,
        radius: rndF(0.6, 1.5) * szm,
        alpha: rndF(0.6, 1),
        decay: rndF(0.003, 0.015) * (2 - intensityRatio * 0.5),
        originalAlpha: 0,
        life: 1.0,
        time: 0,
        startX: sc.lightBarX,
        twinkleSpeed: rndF(0.02, 0.08) * sm,
        twinkleAmount: rndF(0.1, 0.25),
      };
    };

    for (let i = 0; i < sc.maxParticles; i++) {
      const p = makeParticle();
      p.originalAlpha = p.alpha;
      p.startX = p.x;
      sc.count++;
      sc.particles[sc.count] = p;
    }

    const ctx = canvas.getContext("2d")!;

    const drawLightBar = () => {
      const vg = ctx.createLinearGradient(0, 0, 0, sc.h);
      vg.addColorStop(0, "rgba(255,255,255,0)");
      vg.addColorStop(sc.fadeZone / sc.h, "rgba(255,255,255,1)");
      vg.addColorStop(1 - sc.fadeZone / sc.h, "rgba(255,255,255,1)");
      vg.addColorStop(1, "rgba(255,255,255,0)");

      ctx.globalCompositeOperation = "lighter";

      const targetGlow = sc.scanningActive ? 3.5 : 1;
      sc.currentGlowIntensity += (targetGlow - sc.currentGlowIntensity) * sc.transitionSpeed;
      const gi = sc.currentGlowIntensity;
      const lw = sc.lightBarWidth;
      const lx = sc.lightBarX;

      const drawRound = (x: number, w: number, r: number, fillStyle: CanvasGradient, alpha: number) => {
        ctx.globalAlpha = alpha;
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        (ctx as CanvasRenderingContext2D & { roundRect?: (...a: unknown[]) => void }).roundRect?.(x, 0, w, sc.h, r);
        ctx.fill();
      };

      const coreG = ctx.createLinearGradient(lx - lw / 2, 0, lx + lw / 2, 0);
      coreG.addColorStop(0, "rgba(255,255,255,0)");
      coreG.addColorStop(0.3, `rgba(255,255,255,${0.9 * gi})`);
      coreG.addColorStop(0.5, `rgba(255,255,255,${gi})`);
      coreG.addColorStop(0.7, `rgba(255,255,255,${0.9 * gi})`);
      coreG.addColorStop(1, "rgba(255,255,255,0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = coreG;
      ctx.beginPath();
      (ctx as CanvasRenderingContext2D & { roundRect?: (...a: unknown[]) => void }).roundRect?.(lx - lw / 2, 0, lw, sc.h, 15);
      ctx.fill();

      const g1 = ctx.createLinearGradient(lx - lw * 2, 0, lx + lw * 2, 0);
      g1.addColorStop(0, "rgba(242,87,43,0)");
      g1.addColorStop(0.5, `rgba(251,146,60,${0.8 * gi})`);
      g1.addColorStop(1, "rgba(242,87,43,0)");
      drawRound(lx - lw * 2, lw * 4, 25, g1, sc.scanningActive ? 1.0 : 0.8);

      const g2 = ctx.createLinearGradient(lx - lw * 4, 0, lx + lw * 4, 0);
      g2.addColorStop(0, "rgba(242,87,43,0)");
      g2.addColorStop(0.5, `rgba(242,87,43,${0.4 * gi})`);
      g2.addColorStop(1, "rgba(242,87,43,0)");
      drawRound(lx - lw * 4, lw * 8, 35, g2, sc.scanningActive ? 0.8 : 0.6);

      if (sc.scanningActive) {
        const g3 = ctx.createLinearGradient(lx - lw * 8, 0, lx + lw * 8, 0);
        g3.addColorStop(0, "rgba(242,87,43,0)");
        g3.addColorStop(0.5, "rgba(242,87,43,0.2)");
        g3.addColorStop(1, "rgba(242,87,43,0)");
        drawRound(lx - lw * 8, lw * 16, 45, g3, 0.6);
      }

      ctx.globalCompositeOperation = "destination-in";
      ctx.globalAlpha = 1;
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, sc.w, sc.h);
    };

    const renderScanner = () => {
      const targetI = sc.scanningActive ? sc.scanTargetIntensity : sc.baseIntensity;
      const targetMP = sc.scanningActive ? sc.scanTargetParticles : sc.baseMaxParticles;
      const targetFZ = sc.scanningActive ? sc.scanTargetFadeZone : sc.baseFadeZone;

      sc.currentIntensity += (targetI - sc.currentIntensity) * sc.transitionSpeed;
      sc.currentMaxParticles += (targetMP - sc.currentMaxParticles) * sc.transitionSpeed;
      sc.currentFadeZone += (targetFZ - sc.currentFadeZone) * sc.transitionSpeed;
      sc.intensity = sc.currentIntensity;
      sc.maxParticles = Math.floor(sc.currentMaxParticles);
      sc.fadeZone = sc.currentFadeZone;

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, sc.w, sc.h);

      drawLightBar();

      ctx.globalCompositeOperation = "lighter";
      for (let i = 1; i <= sc.count; i++) {
        const p = sc.particles[i];
        if (!p) continue;

        p.x += p.vx;
        p.y += p.vy;
        p.time++;
        p.alpha = p.originalAlpha * p.life + Math.sin(p.time * p.twinkleSpeed) * p.twinkleAmount;
        p.life -= p.decay;

        if (p.x > sc.w + 10 || p.life <= 0) {
          p.x = sc.lightBarX + rndF(-sc.lightBarWidth / 2, sc.lightBarWidth / 2);
          p.y = rndF(0, sc.h);
          p.vx = rndF(0.2, 1.0);
          p.vy = rndF(-0.15, 0.15);
          p.alpha = rndF(0.6, 1);
          p.originalAlpha = p.alpha;
          p.life = 1.0;
          p.time = 0;
        }

        if (p.life > 0) {
          let fadeAlpha = 1;
          if (p.y < sc.fadeZone) fadeAlpha = p.y / sc.fadeZone;
          else if (p.y > sc.h - sc.fadeZone) fadeAlpha = (sc.h - p.y) / sc.fadeZone;
          fadeAlpha = Math.max(0, Math.min(1, fadeAlpha));
          ctx.globalAlpha = p.alpha * fadeAlpha;
          ctx.drawImage(sc.gradientCanvas!, p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
        }
      }

      const ir = sc.intensity / sc.baseIntensity;
      const spawnParticle = () => {
        const np = makeParticle();
        np.originalAlpha = np.alpha;
        np.startX = np.x;
        sc.count++;
        sc.particles[sc.count] = np;
      };

      if (Math.random() < sc.intensity && sc.count < sc.maxParticles) spawnParticle();
      if (ir > 1.1 && Math.random() < (ir - 1.0) * 1.2) spawnParticle();
      if (ir > 1.3 && Math.random() < (ir - 1.3) * 1.4) spawnParticle();
      if (ir > 1.5 && Math.random() < (ir - 1.5) * 1.8) spawnParticle();
      if (ir > 2.0 && Math.random() < (ir - 2.0) * 2.0) spawnParticle();

      if (sc.count > sc.maxParticles + 200) {
        const excess = Math.min(15, sc.count - sc.maxParticles);
        for (let i = 0; i < excess; i++) delete sc.particles[sc.count - i];
        sc.count -= excess;
      }

      rafScannerRef.current = requestAnimationFrame(renderScanner);
    };

    renderScanner();

    const onResize = () => {
      sc.w = window.innerWidth;
      sc.lightBarX = sc.w < 1000 ? sc.w - 150 : sc.w * 0.65;
      canvas.width = sc.w;
      canvas.height = sc.h;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafScannerRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  // ─── Populate card line ───────────────────────────────────────────────────

  const populateCards = useCallback(() => {
    const cardLine = cardLineRef.current;
    if (!cardLine) return;
    cardLine.innerHTML = "";

    for (let i = 0; i < CARDS_COUNT; i++) {
      const wrapper = document.createElement("div");
      wrapper.className = "csd-card-wrapper";

      const normalCard = document.createElement("div");
      normalCard.className = "csd-card csd-card-normal";

      const img = document.createElement("img");
      img.className = "csd-card-image";
      img.src = CARD_IMAGES[i % CARD_IMAGES.length];
      img.alt = "Credit Card";
      img.onerror = () => {
        const fb = document.createElement("canvas");
        fb.width = CARD_WIDTH;
        fb.height = 312;
        const c = fb.getContext("2d")!;
        const g = c.createLinearGradient(0, 0, CARD_WIDTH, 312);
        g.addColorStop(0, "#f2572b");
        g.addColorStop(1, "#fb923c");
        c.fillStyle = g;
        c.fillRect(0, 0, CARD_WIDTH, 312);
        img.src = fb.toDataURL();
      };
      normalCard.appendChild(img);

      const asciiCard = document.createElement("div");
      asciiCard.className = "csd-card csd-card-ascii";

      const asciiContent = document.createElement("div");
      asciiContent.className = "csd-ascii-content";
      const { width, height, fontSize, lineHeight } = calcCodeDimensions(CARD_WIDTH, 312);
      asciiContent.style.fontSize = fontSize + "px";
      asciiContent.style.lineHeight = lineHeight + "px";
      asciiContent.textContent = generateCode(width, height);

      asciiCard.appendChild(asciiContent);
      wrapper.appendChild(normalCard);
      wrapper.appendChild(asciiCard);
      cardLine.appendChild(wrapper);
    }
  }, []);

  // ─── Mount / cleanup ──────────────────────────────────────────────────────

  useEffect(() => {
    const container = containerRef.current;
    const cardLine = cardLineRef.current;
    if (!container || !cardLine) return;

    populateCards();

    const s = streamState.current;
    s.containerWidth = container.offsetWidth;
    s.cardLineWidth = (CARD_WIDTH + CARD_GAP) * CARDS_COUNT;
    s.position = s.containerWidth;
    updateCardPosition();

    rafCardRef.current = requestAnimationFrame(animateCards);

    initThreeParticles();

    const cleanupScanner = initParticleScanner();

    // Ascii refresh
    const asciiInterval = setInterval(() => {
      document.querySelectorAll<HTMLDivElement>(".csd-ascii-content").forEach((el) => {
        if (Math.random() < 0.15) {
          const { width, height } = calcCodeDimensions(CARD_WIDTH, 312);
          el.textContent = generateCode(width, height);
        }
      });
    }, 200);



    // Resize
    const onResize = () => {
      s.containerWidth = container.offsetWidth;
      s.cardLineWidth = (CARD_WIDTH + CARD_GAP) * CARDS_COUNT;
    };
    window.addEventListener("resize", onResize);

    // Drag events
    const handleMouseDown = (e: MouseEvent) => startDrag(e.clientX);
    const handleMouseMove = (e: MouseEvent) => onDrag(e.clientX);
    const handleMouseUp = () => endDrag();
    const handleTouchStart = (e: TouchEvent) => { e.preventDefault(); startDrag(e.touches[0].clientX); };
    const handleTouchMove = (e: TouchEvent) => { e.preventDefault(); onDrag(e.touches[0].clientX); };
    const handleTouchEnd = () => endDrag();
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 20 : -20;
      s.position += delta;
      updateCardPosition();
    };
    const preventSelect = (e: Event) => e.preventDefault();

    cardLine.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    cardLine.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    cardLine.addEventListener("wheel", handleWheel, { passive: false });
    cardLine.addEventListener("selectstart", preventSelect);
    cardLine.addEventListener("dragstart", preventSelect);

    return () => {
      cancelAnimationFrame(rafCardRef.current);
      cancelAnimationFrame(rafThreeRef.current);

      clearInterval(asciiInterval);
      cleanupScanner?.();
      window.removeEventListener("resize", onResize);
      cardLine.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      cardLine.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      cardLine.removeEventListener("wheel", handleWheel);
      cardLine.removeEventListener("selectstart", preventSelect);
      cardLine.removeEventListener("dragstart", preventSelect);
    };
  }, [
    populateCards,
    updateCardPosition,
    updateCardClipping,
    animateCards,
    initThreeParticles,
    initParticleScanner,
    startDrag,
    onDrag,
    endDrag,
  ]);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="csd-container" ref={containerRef}>

      {/* Three.js particle canvas */}
      <canvas id="particleCanvas" ref={particleCanvasRef} className="csd-particle-canvas" />

      {/* Card stream */}
      <div id="cardStream" className="csd-card-stream">
        <div id="cardLine" ref={cardLineRef} className="csd-card-line" />
      </div>

      {/* Scanner canvas */}
      <canvas id="scannerCanvas" ref={scannerCanvasRef} className="csd-scanner-canvas" />
    </div>
  );
}
