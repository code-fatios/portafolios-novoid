// EN|🧭 CANVAS INITIALIZER — Visual environment scaler and viewport logic
// ES|🧭 INICIALIZADOR DE CANVAS — Lógica de entorno visual y escalado

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// </> CANVAS SCALING & VIEWPORT LOGIC         
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

//────────── 🧠 Logical resolution decision ──────────//
/**
 * 💬 Determines which resolution variant should be used based on screen width or user selection.
 *
 * @param {string} selectedValue - Can be "auto", "720", "1080", "4k", or direct pixel width.
 * @returns {string} - Returns normalized resolution: "720", "1920", or "3840"
 */
export function determineFinalResolution(selectedValue = "auto") {
  if (selectedValue !== "auto") {
    if (selectedValue === "1080") return "1920";  // alias
    if (selectedValue === "4k") return "3840";    // alias
    return selectedValue;                         // ex: "720"
  }

  const width = window.innerWidth;
  if (width < 1280) return "720";
  if (width < 2560) return "1920";
  return "3840";
}

//────────── 📐 Logical scene size ──────────//
/**
 * 💬 Returns the logical scene size for the selected resolution.
 * @returns {{ width: number, height: number }}
 */
export function getLogicalSceneSize() {
  const resolution = window.sceneSettings?.finalResolution || "1920";
  switch (resolution) {
    case "720": return { width: 1280, height: 720 };
    case "1920": return { width: 1920, height: 1080 };
    case "3840": return { width: 3840, height: 2160 };
    default: return { width: 1920, height: 1080 };
  }
}

//────────── 📐 Viewport scale calculation ──────────//
/**
 * 💬 Returns the scene scale ratio based on current viewport.
 *
 * @returns {{ scaleX: number, scaleY: number }}
 */
export function getSceneScale() {
  const scaleX = window.innerWidth / SCENE_WIDTH;
  const scaleY = window.innerHeight / SCENE_HEIGHT;
  return { scaleX, scaleY };
}

//────────── 📐 Apply scale to canvas ──────────//
/**
 * 💬 Scales the canvas using a fallback for mobile aspect ratios.
 * Sets CSS variables (--scale-x / --scale-y) for optional use in backgroundStructure.css.
 *
 * @param {HTMLElement} canvas - The canvas element (id="scene-canvas").
 * @returns {void}
 */
export function scaleSceneCanvas(canvas) {
  const { width: SCENE_WIDTH, height: SCENE_HEIGHT } = getLogicalSceneSize();
  const scaleX = window.innerWidth / SCENE_WIDTH;
  const scaleY = window.innerHeight / SCENE_HEIGHT;

  // 💬 Store scaling ratios as CSS variables
  document.documentElement.style.setProperty("--scale-x", scaleX);
  document.documentElement.style.setProperty("--scale-y", scaleY);

  // 💬 Calculate scaled width to check fallback
  const scaledWidthByHeight = SCENE_WIDTH * scaleY;

  // 💬 Apply fallback transform for narrow screens
  if (window.innerWidth < scaledWidthByHeight) {
    canvas.style.transform = `scale(${scaleY})`;
  } else {
    canvas.style.transform = `scale(${scaleX}, ${scaleY})`;
  }
}

//────────── 🌐 Mobile viewport height fix ──────────//
/**
 * 💬 Updates the --vh CSS variable for correct mobile viewport height.
 *
 * @returns {void}
 */
export function updateViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
