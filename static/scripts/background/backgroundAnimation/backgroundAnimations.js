// EN|🎥  BACKGROUND ANIMATIONS — Declarative reusable effects
// ES|🎥  ANIMACIONES DE FONDO — Efectos reutilizables declarativos

import { lerp } from "../backgroundAnimation/interpolationUtils.js";

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🔁 INFINITE SCROLL          //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
/**
 * 💬 This function animates two elements in an infinite scroll loop,
 *      either horizontally or vertically. Now includes external stop control
 *      to prevent memory leaks or performance degradation.
 *
 * @param {HTMLElement} elementA - First scrollable element (start)
 * @param {HTMLElement} elementB - Second scrollable element (continuation)
 * @param {number} speed - Scroll speed in pixels/ms (positive only)
 * @param {number} size - Dimension (width or height) in pixels
 * @param {"horizontal" | "vertical"} axis - Scroll direction
 * @returns {() => void} Function to stop the scroll loop when desired
 */
export function scrollLoopGeneric(
  elementA,
  elementB,
  speed = 0.05,
  size = 2000,
  axis = "horizontal"
) {
  if (!elementA || !elementB) return () => {};

  let offset1 = 0;
  let offset2 = size;
  let lastTimestamp = performance.now();
  let isActive = true;
  let animationId = null;

  function animate(currentTime) {
    if (!isActive) return;
    const delta = currentTime - lastTimestamp;
    lastTimestamp = currentTime;

    if (axis === "horizontal") {
      offset1 -= speed * delta;
      offset2 -= speed * delta;

      if (offset1 <= -size) offset1 = offset2 + size;
      if (offset2 <= -size) offset2 = offset1 + size;

      elementA.style.left = `${Math.round(offset1)}px`;
      elementB.style.left = `${Math.round(offset2)}px`;
    } else {
      offset1 += speed * delta;
      offset2 += speed * delta;

      if (offset1 >= size) offset1 = offset2 - size;
      if (offset2 >= size) offset2 = offset1 - size;

      elementA.style.top = `${Math.round(offset1)}px`;
      elementB.style.top = `${Math.round(offset2)}px`;
    }

    animationId = requestAnimationFrame(animate);
  }

  animationId = requestAnimationFrame(animate);

  return function stopScrollLoop() {
    isActive = false;
    if (animationId) cancelAnimationFrame(animationId);
  };
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🕯️LANTERN                  //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

//───── 🗺️ MAP LANTERN

const lanternStateMap = new WeakMap();

//────────── Animate Lantern ──────────
/**
 * 💬 Applies a smoothed oscillation effect to a lantern wrapper
 *      based on sinusoidal wind force simulation.
 * 
 * ℹ️ Wind behavior timing is managed externally (see backgroundController.js).
 *
 * @param {HTMLElement} wrapper - The DOM element containing the lantern
 * @param {number} t - Time-based interpolation factor (range: 0.0 to 1.0)
 * @param {"pause" | "soft" | "strong"} type - Wind intensity mode
 * @returns {void}
 */

//───── 🪶 SOFT LANTERN CURVE
export function animateLanternOscillation(wrapper, t, type = "soft") {
  let frequency = 3;
  let amplitude = 4.5;

//───── ⏸️ PAUSE LANTERN CURVE
  if (type === "pause") {
    frequency = 10.5;
    amplitude = 1.2;

//───── 💨 STRONG LANTERN CURVE
  } else if (type === "strong") {
    frequency = 6;
    amplitude = 10;
  }

  const targetAngle = Math.sin(t * frequency * Math.PI) * amplitude * (1 - t);
  const prevAngle = lanternStateMap.get(wrapper) || 0;
  const smoothAngle = prevAngle + (targetAngle - prevAngle) * 0.2;

  wrapper.style.transform = `rotateZ(${smoothAngle}deg)`;
  lanternStateMap.set(wrapper, smoothAngle);
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🌿 GRASS                   //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

//───── 🗺️ MAP GRASS 
const grassStateMap = new WeakMap();

//────────── Animate Grass ──────────

/**
 * 💬 Animates grass during wind cycles ("soft", "strong")
 *      Includes asymmetric skew, scaling and rotation for realism.
 *
 * @param {HTMLElement} element - Grass DOM element
 * @param {number} t - Interpolation factor (0 to 1)
 * @param {string} type - Wind type ("soft" | "strong" | "pause")
 */
export function animateGrass(element, t, type = "soft") {
  const prev = grassStateMap.get(element) || { skew: 0, scale: 1, rotate: 0 };
  const target = getGrassCurve(t, type);
  const smoothFactor = 0.15;

  const next = {
    skew: lerp(prev.skew, target.skew, smoothFactor),
    scale: lerp(prev.scale, target.scale, smoothFactor),
    rotate: lerp(prev.rotate, target.rotate, smoothFactor),
  };

  element.style.transformOrigin = "50% 100%";
  element.style.transform = `
    skewX(${next.skew}deg)
    scale(${next.scale})
    rotateZ(${next.rotate}deg)
  `;

  grassStateMap.set(element, next);
}

//────────── Curve Grass ──────────

function getGrassCurve(t, type) {
  const bounce = Math.sin((t + 0.5) * Math.PI * 2);

//───── ⏸️ PAUSE GRASS CURVE
  if (type === "pause") {
    const skew = bounce < 0
      ? bounce * -10      
      : bounce * -10;     

    const scale = 1;

    const rotate = bounce < 0
      ? bounce * 0.3      
      : bounce * 0.3;    

    return { skew, scale, rotate };
  }

//───── 🪶 SOFT GRASS CURVE
  if (type === "soft") {
    const holdStart = 0.00;
    const holdEnd = 0.0075;

    let adjusted;
    if (t >= holdStart && t <= holdEnd) {
      const localT = (t - holdStart) / (holdEnd - holdStart);
      const pulse = Math.sin(localT * Math.PI * 4); 
      adjusted = -0.90 - (pulse * 0.10);
    } else {
      adjusted = bounce;
    }

    return {
      skew: adjusted * -10,
      scale: 1,
      rotate: adjusted * 0.3
    };
  }

//───── 💨 STRONG GRASS CURVE
  if (type === "strong") {
    const holdStart = 0.00;
    const holdEnd = 0.40;

    let adjusted;
    if (t >= holdStart && t <= holdEnd) {
      const localT = (t - holdStart) / (holdEnd - holdStart);
      const pulse = Math.sin(localT * Math.PI * 4);
      adjusted = -0.90 - (pulse * 0.10);
    } else {
      adjusted = bounce;
    }

    return {
      skew: adjusted * -10,
      scale: 1,
      rotate: adjusted * 0.3
    };
  }

  return { skew: 0, scale: 1, rotate: 0 };
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🌳 TREE                       //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

//━━━━━━━━━━ 🌳 Frontleaved ━━━━━━━━━━

//───── MAP
const treeFrontStateMap = new WeakMap();

//────────── 🌳 Animate Frontleaved ──────────
/**
 * 💬 Animate front-leaved tree with different behaviors by wind type.
 * @param {HTMLElement} element - DOM element of the front-leaved tree.
 * @param {number} t - Normalized time factor between 0.0 and 1.0 for wind cycle progression
 * @param {string} type - Wind type ("soft", "strong", "pause")
 */
export function animateTreeFront(element, t, type = "soft") {
  const prev = treeFrontStateMap.get(element) || { skew: 0, scale: 1, rotate: 0 };
  const target = getTreeFrontCurve(t, type);

  const smoothFactor = 0.15;
  const next = {
    skew: lerp(prev.skew, target.skew, smoothFactor),
    scale: lerp(prev.scale, target.scale, smoothFactor),
    rotate: lerp(prev.rotate, target.rotate, smoothFactor),
  };

  element.style.transformOrigin = "50%";
  element.style.transform = `skewX(${next.skew}deg) scale(${next.scale}) rotateZ(${next.rotate}deg)`;

  treeFrontStateMap.set(element, next);
}

//────────── Curve Frontleaved ──────────

function getTreeFrontCurve(t, type) {
  const wave = Math.sin((t + 0.5) * Math.PI * 2);

//───── ⏸️ PAUSE FRONTLEAVED CURVE
  if (type === "pause") {
    const skew = wave < 0
      ? wave * -0.4     
      : wave * -0.4;    

    const scale = 1 + (wave < 0
      ? wave * -0.005     
      : wave * -0.005);  

    const rotate = wave < 0
      ? wave * 0.4    
      : wave * 0.4;     

    return { skew, scale, rotate };
  }

//───── 🪶 SOFT FRONTLEAVED CURVE
  if (type === "soft") {
    const skew = wave < 0
      ? wave * -1.8      
      : wave * -0.15;    

    const scale = 1 + (wave < 0
      ? wave * -0.010   
      : wave * -0.0010); 

    const rotate = wave < 0
      ? wave * 1.7       
      : wave * 1;      

    return { skew, scale, rotate };
  }

//───── 💨 STRONG FRONTLEAVED CURVE
  if (type === "strong") {
    const skew = wave < 0
      ? wave * -3.7    
      : wave * -1.5;     

    const scale = 1 + (wave < 0
      ? wave * -0.03     
      : wave * -0.02);   

    const rotate = wave < 0
      ? wave * 3         
      : wave * 1;       

    return { skew, scale, rotate };
  }

  return { skew: 0, scale: 1, rotate: 0 };
}

//━━━━━━━━━━ 🌳 Backleaved ━━━━━━━━━━//

//───── 🗺️ MAP BACKLEAVED
const treeBackStateMap = new WeakMap();

//────────── 🌳 Animate Backleaved ──────────
/**
 * 💬 Animates a back-leaved tree with natural wind response.
 *
 * @param {HTMLElement} element - Tree element to animate (back foliage layer)
 * @param {number} t - Normalized interpolation factor (range: 0.0 to 1.0)
 * @param {"soft" | "strong" | "pause"} type - Wind intensity preset
 * @returns {void}
 */
export function animateTreeBack(element, t, type = "soft") {
  const prev = treeBackStateMap.get(element) || { skew: 0, scale: 1, rotate: 0 };
  const target = getTreeBackCurve(t, type);

  const smoothFactor = 0.15;
  const next = {
    skew: lerp(prev.skew, target.skew, smoothFactor),
    scale: lerp(prev.scale, target.scale, smoothFactor),
    rotate: lerp(prev.rotate, target.rotate, smoothFactor),
  };

  element.style.transformOrigin = "70%";
  element.style.transform = `skewX(${next.skew}deg) scale(${next.scale}) rotateZ(${next.rotate}deg)`;

  treeBackStateMap.set(element, next);
}

//────────── Curve Backleaved ──────────

function getTreeBackCurve(t, type) {
  const wave = Math.sin((t + 0.5) * Math.PI * 2); 

//───── ⏸️ PAUSE BACKLEAVED CURVE
  if (type === "pause") {
    const skew = wave < 0
      ? wave * 0.7
      : wave * 0.7;

    const scale = 1 + (wave < 0
      ? wave * -0.012
      : wave * -0.012);

    const rotate = wave < 0
      ? wave * -0.5
      : wave * -0.5;

    return { skew, scale, rotate };
  }

//───── 🪶 SOFT BACKLEAVED CURVE
  if (type === "soft") {
    const skew = wave < 0
      ? wave * 4.4
      : wave * 1.15;

    const scale = 1 + (wave < 0
      ? wave * -0.0001
      : wave * -0.00001);

    const rotate = wave < 0
      ? wave * -0.9
      : wave * -0.5;

    return { skew, scale, rotate };
  }

//───── 💨 STRONG BACKLEAVED CURVE
  if (type === "strong") {
    const skew = wave < 0
      ? wave * 7.7
      : wave * 2.16;

    const scale = 1 + (wave < 0
      ? wave * -0.05
      : wave * -0.002);

    const rotate = wave < 0
      ? wave * -2
      : wave * -1.5;

    return { skew, scale, rotate };
  }

  return { skew: 0, scale: 1, rotate: 0 };
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🐺 WOLF                       //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

//────────── Animate Wolf Tail ──────────

let tailAnimationStart = null;

/**
 * 💬 Animates the wolf's tail with a soft and continuous oscillation.
 * No deformation, only horizontal angular movement.
 *
 * @param {HTMLElement} element - Tail DOM element to animate
 * @returns {void}
 */
export function animateWolfTail(element) {
  if (!element) return;

  element.style.transformOrigin = "left center";

  function animate(currentTime) {
    if (!tailAnimationStart) tailAnimationStart = currentTime;

    const elapsed = (currentTime - tailAnimationStart) / 1000;

    const speedFactor = 0.3;     
    const wave = Math.sin(elapsed * Math.PI * speedFactor);
    const angle = wave * 8;     

    element.style.transform = `rotateZ(${angle}deg)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

//────────── Animate Wolf Ear ──────────

const wolfEarTimers = new Map();

/**
 * 💬 Schedules randomized wolf ear twitching.
 * Creates natural idle ear movement over time.
 *
 * @param {HTMLElement} element - Ear DOM element to animate
 * @returns {void}
 */
export function scheduleWolfEarShake(element) {
  if (wolfEarTimers.has(element)) return;

  const rotateOnce = () => {
    const intensity = 1 + Math.random() * 1.5;   
    const duration = 60 + Math.random() * 90;    

    element.style.transform = `rotateZ(${intensity}deg)`;
    setTimeout(() => {
      element.style.transform = `rotateZ(${-intensity * 0.6}deg)`;
      setTimeout(() => {
        element.style.transform = "rotateZ(0deg)";
      }, duration);
    }, duration);
  };

  const loop = () => {
    const delay = 4000 + Math.random() * 6000;   // tiempo entre sacudidas: 4s a 10s
    rotateOnce();
    const timer = setTimeout(loop, delay);
    wolfEarTimers.set(element, timer);
  };

  loop();
}

//━━━━━━━━━━ 💧 ANIMATE WATERFALL FRAMES ━━━━━━━━━━//

import { getLogicalSceneSize } from "../backgroundSystem/canvasInitializer.js";

/**
 * 💬 Animates a waterfall using background-position jumps based on resolution-scaled steps.
 * @param {HTMLElement} element - DOM element with background animation (frame-based).
 * @param {number} frameCount - Total number of frames (e.g. 5).
 * @param {number} frameOriginalHeight - Height per frame in base resolution (e.g. 500px in 2160p).
 */
export function animateWaterfallFrames(element, frameCount = 5, frameOriginalHeight = 500) {
  const { height: SCENE_HEIGHT } = getLogicalSceneSize();
  const frameHeight = frameOriginalHeight * (SCENE_HEIGHT / 2160);

  let currentFrame = 0;

  setInterval(() => {
    element.style.backgroundPositionY = `-${Math.floor(currentFrame * frameHeight)}px`;
    currentFrame = (currentFrame + 1) % frameCount;
  }, 100); 
}


