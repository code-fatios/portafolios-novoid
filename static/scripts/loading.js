// EN|🚀 LOADING SYSTEM — Scene resolution selector and entry animation
// ES|🚀 SISTEMA DE CARGA — Selector de resolución y animación de entrada

import { activateBackgroundAnimations } from "./background/backgroundLogic/backgroundController.js";
import { determineFinalResolution, scaleSceneCanvas } from "./background/backgroundSystem/canvasInitializer.js";
import { applyVisualEffectsForMode } from "./visualModeEngine.js";
import { initializeScene } from "./main.js";
import { detectTimeMode } from "./themeModeManager.js";
import { initializeLanternGlow } from "./lightAuraSystem.js";

document.addEventListener("DOMContentLoaded", () => {
  
  //━━━━━━━━━━ 🏗️ INITIALIZE LOADING CONTAINER ━━━━━━━━━━//
  /**
   * 💬 Creates the initial loading UI container.
   * Includes logo, resolution selector, language toggle, description, progress bar, and start button.
   */
  const loading = document.createElement("div");
  loading.id = "initial-loading";
  loading.innerHTML = `
    <div class="loading-container">
      <div id="loading-logo">
        <img src="static/resources/img/logo.webp" alt="Novoid Logo">
      </div>
      <div class="loading-options">
        <label for="resolution-select">Resolution</label>
        <select id="resolution-select">
          <option value="auto">Automatic</option>
          <option value="720">HD (1280x720)</option>
          <option value="1080">Full HD (1920x1080)</option>
          <option value="4k">4K (3840x2160)</option>
        </select>
      </div>

      <!-- 🌐 Language Toggle -->
      <div id="lang-switcher">
        <button id="lang-toggle">ES</button>
      </div>

      <p id="loading-description"></p>

      <div id="loading-label">
        <span class="loading-word">Loading</span>
        <span id="loading-percent">0%</span>
      </div>

      <div class="loading-bar" id="loading-bar">
        <div class="loading-progress" id="loading-progress"></div>
      </div>

      <button id="start-button">Start</button>
    </div>
  `;

  document.body.appendChild(loading);

  //━━━━━━━━━━ 🌐 LANGUAGE TOGGLE WITH JSON ━━━━━━━━━━//
  let translations = {};
  let currentLang = "es"; // Default language

  fetch("static/resources/translations.json")
    .then(response => response.json())
    .then(data => {
      translations = data;
      updateDescription(currentLang); // show Spanish at start
    })
    .catch(error => console.error("Error loading translations:", error));

  const langToggle = document.getElementById("lang-toggle");
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "es" ? "en" : "es";
    langToggle.textContent = currentLang.toUpperCase();
    updateDescription(currentLang);
  });

  function updateDescription(lang) {
    if (!translations[lang]) return;

    const descriptionEl = document.getElementById("loading-description");
    descriptionEl.textContent = ""; 

    const words = translations[lang].loadingDescription.split(" ");
    words.forEach(word => {
      const span = document.createElement("span");
      span.textContent = word + "\u00A0";
      descriptionEl.appendChild(span);
    });

    let index = 0;
    const spans = descriptionEl.querySelectorAll("span");
    const revealInterval = setInterval(() => {
      if (index < spans.length) {
        spans[index].classList.add("visible");
        index++;
      } else {
        clearInterval(revealInterval);
      }
    }, 120);
  }

  //━━━━━━━━━━ 🖋️ SIGNATURE ━━━━━━━━━━//
  const signature = document.createElement("div");
  signature.id = "global-signature";
  signature.textContent = "Fatios-Code";
  document.body.appendChild(signature);

  //━━━━━━━━━━ 🔑 ELEMENT REFERENCES ━━━━━━━━━━//
  const percentText = document.getElementById("loading-percent");
  const progressBar = document.getElementById("loading-progress");
  const startBtn = document.getElementById("start-button");
  const resolutionSelect = document.getElementById("resolution-select");

  //━━━━━━━━━━ ⚙️ LOADING CONFIG ━━━━━━━━━━//
  const SIMULATION_DURATION_MS = 500;
  const SIM_MAX_PERCENT = 90;
  const SIM_STEP_INTERVAL = 33;

  //━━━━━━━━━━ 🧩 PROGRESS TRACKER ━━━━━━━━━━//
  const steps = ["initializeScene", "loadSceneLayout", "applyVisuals", "activateAnimations"];
  let currentStep = 0;

  function advanceProgress(stepName) {
    currentStep++;
    const percent = Math.round((currentStep / steps.length) * 100);
    percentText.textContent = `${percent}%`;
    progressBar.style.width = `${percent}%`;
  }

  function startSceneLoading(selectedValue) {
    currentStep = 0;
    percentText.textContent = "1%";
    progressBar.style.width = "1%";
    progressBar.style.transition = "none";
    void progressBar.offsetWidth; 
    progressBar.style.transition = "width 0.1s linear";

    startBtn.style.display = "none";
    startBtn.classList.remove("fade-in-button");

    document.getElementById("loading-bar").style.display = "block";
    document.getElementById("loading-label").style.display = "flex";

    const resolution = determineFinalResolution(selectedValue);
    window.sceneSettings = { finalResolution: resolution };

    const oldCanvas = document.getElementById("scene-canvas");
    if (oldCanvas) oldCanvas.remove();

    initializeScene();
    advanceProgress("initializeScene");

    let simulatedPercent = 1;
    let realCompleted = false;
    const increment = (SIM_MAX_PERCENT - 1) / (SIMULATION_DURATION_MS / SIM_STEP_INTERVAL);

    const simInterval = setInterval(() => {
      if (simulatedPercent < SIM_MAX_PERCENT) {
        simulatedPercent += increment;
        if (simulatedPercent > SIM_MAX_PERCENT) simulatedPercent = SIM_MAX_PERCENT;
        percentText.textContent = `${Math.floor(simulatedPercent)}%`;
        progressBar.style.width = `${simulatedPercent}%`;
      } else {
        clearInterval(simInterval);
        if (realCompleted) finishLoading();
      }
    }, SIM_STEP_INTERVAL);

    setTimeout(() => {
      const canvas = document.getElementById("scene-canvas");
      if (canvas) {
        canvas.classList.remove("canvas-hidden");

        const mode = detectTimeMode();
        applyVisualEffectsForMode(mode);
        initializeLanternGlow(mode);

        if (mode === "night") {
          import("./nightParticles.js").then(module => {
            module.stopNightParticles();
            module.startNightParticles();
          });
        }

        advanceProgress("applyVisuals");
        activateBackgroundAnimations("index");
        advanceProgress("activateAnimations");
        advanceProgress("loadSceneLayout");
        scaleSceneCanvas(canvas);

        realCompleted = true;
        if (simulatedPercent >= SIM_MAX_PERCENT) finishLoading();
      }
    }, 500);

    function finishLoading() {
      percentText.textContent = "100%";
      progressBar.style.width = "100%";
      setTimeout(() => {
        document.getElementById("loading-bar").style.display = "none";
        document.getElementById("loading-label").style.display = "none";

        startBtn.style.display = "block";
        void startBtn.offsetWidth;
        startBtn.classList.add("fade-in-button");
      }, 300);
    }
  }

  //━━━━━━━━━━ 🎛️ EVENT BINDINGS ━━━━━━━━━━//
  resolutionSelect.addEventListener("change", () => {
    const selected = resolutionSelect.value;
    startSceneLoading(selected);
  });

  startBtn.addEventListener("click", () => {
    loading.classList.add("fade-out");
    setTimeout(() => loading.remove(), 800);
  });

  //━━━━━━━━━━ 🚀 AUTO START ━━━━━━━━━━//
  startSceneLoading("auto");

  //━━━━━━━━━━ 🌟 FADE-IN LOADING LOGO ━━━━━━━━━━//
  setTimeout(() => {
    const logoWrapper = document.getElementById("loading-logo");
    if (logoWrapper) {
      logoWrapper.style.opacity = "1";
      const img = logoWrapper.querySelector("img");
      if (img) img.style.transform = "scale(1)";
    }
  }, 800);

});
