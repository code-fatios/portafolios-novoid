// EN|🕯️ LIGHT AURA SYSTEM — Lantern + Rune Glow
// ES|🕯️ SISTEMA DE AURA LUMINOSA — Luz de farola + runa

import { detectTimeMode } from "./themeModeManager.js";
import { getLogicalSceneSize } from "./background/backgroundSystem/canvasInitializer.js";


/**
 * 💬 Initializes lantern and rune glow depending on the mode.
 *      Includes a MutationObserver for the rune since it mounts later.
 *
 * @param {string} mode - "day" | "sunset" | "night". Defaults to detectTimeMode().
 * @param {number} retries - Retries for lantern wrapper.
 */
export function initializeLanternGlow(mode = detectTimeMode(), retries = 10) {

//━━━━━━━━━━ 🔮 RUNA OBSERVER ━━━━━━━━━━//
/**
 * 💬 Ensures the rune glow is applied if the element exists.
 *
 * @returns {boolean} - True if the rune glow was applied, false otherwise.
 */
function ensureRunaGlow() {
  const runa = document.getElementById("index-runa-engraved");
  if (runa) {
    runa.style.transition = "filter 2s ease-in-out";
    runa.style.filter = (mode === "night")
      ? "drop-shadow(0 0 6px rgba(0, 209, 209, 0.6))"
      : "none";
    return true;
  }
  return false;
}

  if (!ensureRunaGlow()) {
    const observer = new MutationObserver(() => {
      if (ensureRunaGlow()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

//━━━━━━━━━━ 🔦 LANTERN WRAPPER ━━━━━━━━━━//

/**
 * 💬 Handles lantern glow creation and transitions depending on visual mode.
 * - If mode is "night": creates or fades in the glow.
 * - Otherwise: fades out the glow if it exists.
 *
 * Uses retries to wait for the lantern wrapper if not yet mounted.
 *
 * @param {string} mode - The active visual mode ("day", "sunset", or "night").
 * @param {number} retries - Remaining retries if the lantern wrapper is not found.
 * @returns {void}
 */
const wrapper = document.querySelector(".lantern-wrapper");
if (!wrapper) {
  if (retries > 0) {
    setTimeout(() => initializeLanternGlow(mode, retries - 1), 200);
  }
  return;
}

const existingGlow = wrapper.querySelector(".lantern-glow");

if (mode === "night") {
  if (existingGlow) {
    existingGlow.style.transition = "opacity 3s ease-in-out";
    existingGlow.style.opacity = "1";
  } else {
    const glow = document.createElement("div");
    glow.className = "lantern-glow";
    glow.style.position = "absolute";
    glow.style.left = "50%";
    glow.style.top = "50%";

    const { width: SCENE_WIDTH, height: SCENE_HEIGHT } = getLogicalSceneSize();
    glow.style.width = `${SCENE_WIDTH * 0.25}px`;  // 25% of canvas width
    glow.style.height = `${SCENE_HEIGHT * 0.35}px`; // 35% of canvas height
    glow.style.borderRadius = "50%";
    glow.style.background =
      "radial-gradient(circle, rgba(255,230,160,0.4) 0%, rgba(255,190,120,0.15) 40%, transparent 100%)";
    glow.style.transform = "translate(-50%, -50%)";
    glow.style.pointerEvents = "none";
    glow.style.transition = "opacity 3s ease-in-out";
    glow.style.opacity = "0";

    wrapper.appendChild(glow);
    requestAnimationFrame(() => {
      glow.style.opacity = "1";
    });
  }
} else {
  if (existingGlow) {
    existingGlow.style.transition = "opacity 3s ease-in-out";
    existingGlow.style.opacity = "0";
  }
}

}
