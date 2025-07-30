// EN|🌙 VISUAL MODE ENGINE — Handles sky transitions and visual filters by ID or type
// ES|🌙 MOTOR DE MODO VISUAL — Gestiona transiciones del cielo y filtros visuales por ID o tipo

import { detectTimeMode } from "./themeModeManager.js";
import { ImageFilters } from "./imageModeFilters.config.js";
import { initializeLanternGlow } from "./lightAuraSystem.js";
import { startNightParticles, stopNightParticles } from "./nightParticles.js";
import { ContentElements } from "./uiContentConfig.js";

//━━━━━━━━━━ 💠 MODE ACTIVATION ━━━━━━━━━━//

/**
 * 💬 Applies all visual effects based on the selected mode.
 * Includes filters, sky transitions, lantern glow, and night particles.
 *
 * @param {"day" | "sunset" | "night" | "auto"} mode - Visual mode to apply.
 * @returns {void}
 */
export function applyVisualEffectsForMode(mode) {
  if (mode === "auto") {
    console.log("🌀 Auto mode activated");
    const detected = detectTimeMode();
    console.log(`🌙 Detected actual mode: ${detected}`);
    mode = detected;
  }

  clearFilters();

  if (mode === "night") {
    applyFiltersForMode(mode);
    updateSocialIconColors(mode);
    transitionSkyForMode(mode);
    initializeLanternGlow(mode);

    // 💬 Delay night particles slightly for smoother transition
    setTimeout(() => startNightParticles(), 200);
  } else {
    applyFiltersForMode(mode);
    updateSocialIconColors(mode);
    transitionSkyForMode(mode);
    initializeLanternGlow(mode);
    stopNightParticles();
  }

  if (typeof advanceProgress === "function") {
    advanceProgress("applyVisuals");
  }
}

//━━━━━━━━━━ 🎨 SOCIAL ICON COLORS ━━━━━━━━━━//
function updateSocialIconColors(mode) {
  document.querySelectorAll(".svg-wrapper").forEach(wrapper => {
    const elConfig = ContentElements.find(c => c.id === wrapper.id);
    if (!elConfig) return;
    const svg = wrapper.querySelector("svg");
    if (!svg) return;

    if (elConfig.colors && elConfig.colors[mode]) {
      svg.style.color = elConfig.colors[mode];
    } else if (elConfig.colorBase) {
      svg.style.color = elConfig.colorBase;
    }
  });
}

//━━━━━━━━━━ 🧼 CLEAR FILTERS ━━━━━━━━━━//
function clearFilters() {
  ImageFilters.forEach(entry => {
    if (entry.id) {
      const el = document.getElementById(entry.id);
      if (el) el.style.filter = "none";
    } else if (entry.type) {
      const elements = document.querySelectorAll(`[data-scene-type="${entry.type}"]`);
      elements.forEach(el => el.style.filter = "none");
    }
  });
}

//━━━━━━━━━━ 🎯 APPLY FILTERS ━━━━━━━━━━//
function applyFiltersForMode(mode) {
  ImageFilters.forEach(entry => {
    if (entry.id) {
      const el = document.getElementById(entry.id);
      const filter = entry.filters[mode];
      if (el && filter && el.style.filter !== filter) {
        el.style.transition = "filter 3000ms ease-in-out";
        el.style.filter = filter;
      }
    } else if (entry.type) {
      const elements = document.querySelectorAll(`[data-scene-type="${entry.type}"]`);
      const filter = entry.filters[mode];
      if (filter) {
        elements.forEach(el => {
          if (el.style.filter !== filter) {
            el.style.transition = "filter 3000ms ease-in-out";
            el.style.filter = filter;
          }
        });
      }
    }
  });
}

//━━━━━━━━━━ 🌌 SKY MODE TRANSITION ━━━━━━━━━━//
function transitionSkyForMode(mode) {
  if (mode === "day") {
    transitionSkyTo(
      "linear-gradient(to bottom, #00aaff 0%, #33ccff 20%, #66e0ff 32%, #b8f3ff 40%)",
      3000
    );
  }

  if (mode === "sunset") {
    transitionSkyTo(
      "linear-gradient(to top, #ee7b3a 60%, #f28b44 68%, #f9a15d 75%, #fcd39a 85%, #5a6c9c 100%)",
      3000
    );
  }

  if (mode === "night") {
    transitionSkyTo(
      "linear-gradient(to bottom, #021018 0%, #053048 8%, rgba(13,117,115,1) 16%, #0d5c75 24%, rgba(5,56,72,1) 32%, #053048 40%)",
      3000
    );
  }
}

//━━━━━━━━━━ 🎨 SKY GRADIENT ENGINE ━━━━━━━━━━//

/**
 * 💬 Transitions the sky background to a new gradient with fade effect.
 *
 * @param {string} color - CSS gradient string.
 * @param {number} duration - Transition duration in ms.
 */
function transitionSkyTo(color, duration = 3000) {
  const canvas = document.getElementById("scene-canvas");
  if (!canvas) return;

  const currentSky = canvas.querySelector(".sky-layer");
  if (!currentSky) return;

  const nextSky = document.createElement("div");
  nextSky.classList.add("sky-layer-next");
  nextSky.style.position = "absolute";
  nextSky.style.top = "0";
  nextSky.style.left = "0";
  nextSky.style.width = "100%";
  nextSky.style.height = "100%";
  nextSky.style.zIndex = 0;
  nextSky.style.opacity = "0";
  nextSky.style.transition = `opacity ${duration}ms ease-in-out`;
  nextSky.style.background = color;
  nextSky.style.pointerEvents = "none";

  canvas.appendChild(nextSky);

  requestAnimationFrame(() => {
    nextSky.style.opacity = "1";

    setTimeout(() => {
      if (currentSky && currentSky.parentElement) {
        currentSky.remove();
      }
      nextSky.classList.remove("sky-layer-next");
      nextSky.classList.add("sky-layer");
    }, duration + 100);
  });
}
