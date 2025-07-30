// EN|🌌 NIGHT PARTICLES SYSTEM — Renders celestial particles on canvas at night
// ES|🌌 SISTEMA DE PARTÍCULAS NOCTURNAS — Renderiza partículas celestes en canvas durante la noche

//━━━━━━━━━━ 🧩 STATE VARIABLES ━━━━━━━━━━//
let canvas, ctx, w, h;
let particles = [];
let mouse = { x: null, y: null };
let isRunning = false;
const PARTICLE_COUNT = 20; // 💬 Number of particles to render

//━━━━━━━━━━ 🖱️ MOUSE TRACKING ━━━━━━━━━━//
function trackMouse(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

//━━━━━━━━━━ 📐 CANVAS RESIZE HANDLER ━━━━━━━━━━//
function resizeCanvas() {
  if (!canvas) return;
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

//━━━━━━━━━━ 🚀 PARTICLE BOOTSTRAP ━━━━━━━━━━//

/**
 * 💬 Initializes and renders the night particle system onto a full-screen canvas.
 * Retries automatically if #scene-canvas is not yet mounted.
 *
 * @param {number} retries - Number of retries if #scene-canvas is not found.
 * @returns {void}
 */
export function startNightParticles(retries = 10) {
  if (isRunning) return;

  const sceneCanvas = document.getElementById("scene-canvas");

  // 💬 Wait and retry if main canvas is not yet available
  if (!sceneCanvas) {
    if (retries > 0) {
      console.log(`🕒 Waiting for scene-canvas... (${retries})`);
      setTimeout(() => startNightParticles(retries - 1), 200);
    } else {
      console.warn("❌ Failed to find #scene-canvas after multiple attempts");
    }
    return;
  }

  isRunning = true;

  canvas = document.createElement("canvas");
  canvas.id = "night-particles";
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "1000";
  canvas.style.opacity = "0";
  canvas.style.transition = "opacity 3s ease-in-out";

  sceneCanvas.appendChild(canvas);

  requestAnimationFrame(() => {
    canvas.style.opacity = "1";
  });

  ctx = canvas.getContext("2d");

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", trackMouse);

  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const baseDx = -0.5 + Math.random();
    const baseDy = -0.3 + Math.random() * 0.6;

    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 2 + Math.random() * 4, // 💬 Random radius between 2px and 6px
      dx: baseDx,
      dy: baseDy,
      baseDx: baseDx,
      baseDy: baseDy,
      opacity: 0.4 + Math.random() * 0.5,
    });
  }

  drawParticles();
}

//━━━━━━━━━━ 🛑 STOP PARTICLES ━━━━━━━━━━//

/**
 * 💬 Stops and removes the night particle canvas and event listeners.
 * Cleans up to prevent performance leaks.
 *
 * @returns {void}
 */
export function stopNightParticles() {
  const canvas = document.getElementById("night-particles");
  if (canvas && canvas.parentElement) canvas.parentElement.removeChild(canvas);

  window.removeEventListener("resize", resizeCanvas);
  window.removeEventListener("mousemove", trackMouse);
  isRunning = false;
}

//━━━━━━━━━━ 🌠 PARTICLE DRAW LOOP ━━━━━━━━━━//
function drawParticles() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, w, h);

  const marginX = w * 0.05;
  const marginY = h * 0.05;
  const centerX = w / 2;
  const centerY = h / 2;

  for (let p of particles) {
    // 💬 Repel particles when mouse is near
    if (mouse.x !== null && mouse.y !== null) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const distSq = dx * dx + dy * dy;
      const minDist = 80;
      const minDistSq = minDist * minDist;

      if (distSq < minDistSq) {
        const dist = Math.sqrt(distSq);
        const angle = Math.atan2(dy, dx);
        const force = (minDist - dist) / minDist;
        const repelStrength = 0.2;
        p.dx += Math.cos(angle) * force * repelStrength;
        p.dy += Math.sin(angle) * force * repelStrength;
      }
    }

    // 💬 Gradually return particle velocity to base
    p.dx += (p.baseDx - p.dx) * 0.01;
    p.dy += (p.baseDy - p.dy) * 0.01;

    // 💬 Update particle position
    p.x += p.dx;
    p.y += p.dy;

    // 💬 Keep particles within margins; redirect if they go out
    if (p.x < marginX || p.x > w - marginX || p.y < marginY || p.y > h - marginY) {
      const angle = Math.atan2(centerY - p.y, centerX - p.x);
      const returnStrength = 0.25;
      p.baseDx = Math.cos(angle) * returnStrength + (Math.random() - 0.5) * 0.1;
      p.baseDy = Math.sin(angle) * returnStrength + (Math.random() - 0.5) * 0.1;
      p.dx = p.baseDx;
      p.dy = p.baseDy;
    }

    // 💬 Draw particle with glow
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180, 255, 255, ${p.opacity})`;
    ctx.shadowColor = "rgba(180, 255, 255, 0.5)";
    ctx.shadowBlur = 10;
    ctx.fill();
  }

  requestAnimationFrame(drawParticles);
}
