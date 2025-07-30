// EN|🎬 BACKGROUND CONTROLLER — Applies animations after scene is mounted
// ES|🎬 CONTROLADOR DE FONDO — Aplica animaciones una vez montada la escena

import {
  scrollLoopGeneric,
  animateLanternOscillation,
  animateGrass,
  animateTreeBack,
  animateTreeFront,
  animateWolfTail,
  scheduleWolfEarShake,
} from "../backgroundAnimation/backgroundAnimations.js";

import { animateWaterfallFrames } from "../backgroundAnimation/backgroundAnimations.js";


import { initializeLanternGlow } from "../../lightAuraSystem.js";

//━━━━━━━━━━ 🎬 BACKGROUND DISPATCH ━━━━━━━━━━//

//───── 📦 Scene Dispatcher Logic
/**
 * 💬 Dispatches animation logic for the given background scene.
 *      Delegates to scene-specific animation functions when sceneName matches.
 *
 * @param {string} sceneName - The key name of the scene (e.g. "index", "panel").
 * @returns {void}
 */
export function activateBackgroundAnimations(sceneName = "") {
  if (sceneName === "index") {
    activateIndexAnimations();
  }

  if (sceneName === "panel") {
    activatePanelAnimations();
  }
}

//━━━━━━━━━━ 🌿 GRASS WIND OFFSET ━━━━━━━━━━//

//───── 🗺️ MAP DELAY GRASS 
const grassDelayMap = new WeakMap();

//───── ⏳ Grass Delay Logic
/**
 * 💬 Retrieves or assigns a persistent random wind delay for grass elements.
 *
 * @param {HTMLElement} el - The DOM element representing a single grass blade.
 * @returns {number} A delay value between 0.0 and 0.25 (percentage of wind cycle)
 */
function getGrassDelay(el) {
  if (!grassDelayMap.has(el)) {
    const delay = Math.random() * 0.25;
    grassDelayMap.set(el, delay);
  }
  return grassDelayMap.get(el);
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🌄 INDEX — Scene            //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

//━━━━━━━━━━ 🌐 INDEX SCENE ACTIVATION ━━━━━━━━━━//

//───── 📦 Scene Animation Activation
/**
 * 💬 Binds background animation classes and effects specific to the "index" scene.
 *      Triggers breathing, water, and wolf features.
 *
 * @returns {void}
 */
function activateIndexAnimations() {

//────────── 💧 Water Elements ──────────

//───── Water Fall
const waterfall = document.querySelector("#index-water-fall");
if (waterfall) {
  waterfall.classList.add("waterfall-frame");
  animateWaterfallFrames(waterfall); // 💧 activa animación real
}

//───── Water Foam
  const foam = document.querySelector("#index-water-fallfoam");
  if (foam) foam.classList.add("waterfall-foam-frame");

//───── Water Edge
  const waterEdge = document.querySelector("#index-water-edge");
  if (waterEdge) waterEdge.classList.add("water-edge-pulse");

//────────── 🐺 Wolf Elements ──────────

//───── Wolf Tail
  const tail = document.getElementById("index-wolf-tail");
  if (tail) animateWolfTail(tail);

//───── Wolf Ear
  const earLeft = document.getElementById("index-wolf-earleft");
  if (earLeft) scheduleWolfEarShake(earLeft);

  const earRight = document.getElementById("index-wolf-earright");
  if (earRight) setTimeout(() => scheduleWolfEarShake(earRight), 800);
  
//───── Wolf Chest
  const chest = document.querySelector(".wolf-chest");
  if (chest) chest.classList.add("breathing");

//───── Lantern Glow Activation
  initializeLanternGlow();


//───── Scroll Initializer
  setupHorizontalScroll();
  setupVerticalScroll();

  if (typeof advanceProgress === "function") {
  advanceProgress("activateAnimations");
}
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🌬️ GLOBAL WIND ENGINE       //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

//───── Wind Engine State Variables

let globalWindStart = performance.now();      // Timestamp marking wind system start
const windStartMap = new WeakMap();           // Stores individual start times per element
let currentStepDuration = 2500;               // Current cycle duration (ms)
let currentWindType = "soft";                 // Active wind type label
let currentWindIndex = 0;                     // Current index in windCycle

//───── Wind Cycle Sequence
const windCycle = [
  { type: "pause", duration: 5000 },
  { type: "strong", duration: 5000 },
  { type: "soft", duration: 5000 },
  { type: "pause", duration: 10000 },
  { type: "strong", duration: 5000 },
  { type: "pause", duration: 4000 },
  { type: "soft", duration: 3000 },
  { type: "strong", duration: 2000 },
];

//───── Global Wind Frame Animator

function animateGlobalWindFrame() {
  const now = performance.now();
  const elapsed = now - globalWindStart;
  const t = (elapsed % currentStepDuration) / currentStepDuration;

  const elements = document.querySelectorAll("[data-wind-reactive]");
  elements.forEach(el => {
    const type = el.dataset.windType || "";
    const id = el.id || "";

    if (!windStartMap.has(el)) {
      windStartMap.set(el, { startTime: globalWindStart, windType: currentWindType });
    }

    const data = windStartMap.get(el);

    if (data.windType !== currentWindType) {
      data.startTime = now;
      data.windType = currentWindType;
      windStartMap.set(el, data);
    }

    const localElapsed = now - data.startTime;
    const localT = (localElapsed % currentStepDuration) / currentStepDuration;

    if (type === "grass") {
      const delay = getGrassDelay(el);
      const delayedT = (localT + 1 - delay) % 1;
      animateGrass(el, delayedT, currentWindType);
    }

    if (["tree", "treeA", "treeB"].includes(type)) {
      if (id.includes("backleaved")) animateTreeBack(el, localT, currentWindType);
      else if (id.includes("frontleaved")) animateTreeFront(el, localT, currentWindType);
    }

    if (id === "index-wolf-tail") {
      animateWolfTail(el, localT);
    }

    if (el.classList.contains("lantern-wrapper")) {
      animateLanternOscillation(el, localT, currentWindType);
    }
  });

  requestAnimationFrame(animateGlobalWindFrame);
}

//───── Wind Type Cycle Handler
function cycleWindSteps() {
  const step = windCycle[currentWindIndex];
  currentWindType = step.type;
  globalWindStart = performance.now();

  currentWindIndex = (currentWindIndex + 1) % windCycle.length;
  setTimeout(cycleWindSteps, step.duration);
}

//───── Wind Engine Bootstrap
setTimeout(cycleWindSteps, 100);
requestAnimationFrame(animateGlobalWindFrame);

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🌬️ SCROLL CONTROLLER       //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

//───── 🔁 Horizontal scroll ─────//
/**
 * 🔁 Initializes continuous horizontal scroll for clouds and rivers.
 *      Targets .cloud-scroll and .river-scroll containers with two .scroll-instance children.
 *
 * @returns {void}
 */
function setupHorizontalScroll() {
  document.querySelectorAll(".scroll-wrapper")
    .forEach(wrapper => {
      const [imgA, imgB] = wrapper.querySelectorAll(".scroll-instance");
      if (!imgA || !imgB) return;

      const speed = parseFloat(wrapper.dataset.speed);
      const imageWidth = parseInt(wrapper.dataset.imageWidth);

      scrollLoopGeneric(imgA, imgB, speed, imageWidth, "horizontal");
    });
}


//───── 🔁 Vertical scroll  ─────//
/**
 * 🔁 Initializes continuous vertical scroll for lake layers.
 *      Targets .lake-scroll containers with two .scroll-instance-vertical children.
 *
 * @returns {void}
 */
function setupVerticalScroll() {
  document.querySelectorAll(".lake-scroll, .river-scroll")
    .forEach(wrapper => {
      const [imgA, imgB] = wrapper.querySelectorAll(".scroll-instance-vertical");
      if (!imgA || !imgB) return;

      const speed = parseFloat(wrapper.dataset.speed);
      const imageHeight = parseInt(wrapper.dataset.imageHeight);

      scrollLoopGeneric(imgA, imgB, speed, imageHeight, "vertical");
    });
}



//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🌌 PANEL — Scene Animations (reserved for future use)                      //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

/**
 * 💬 Placeholder for future animations specific to the "panel" scene.
 *     No visual effects are currently assigned to this context.
 */
function activatePanelAnimations() {
  // Reserved for future animations
}
