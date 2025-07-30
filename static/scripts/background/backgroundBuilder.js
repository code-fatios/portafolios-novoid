// EN|🏗️ BACKGROUND BUILDER — Scene container and layer creation
// ES|🏗️ CONSTRUCTOR DE ESCENA — Crea el canvas, cielo y capas visuales

import { getLogicalSceneSize } from "./backgroundSystem/canvasInitializer.js";
export { getFinalFilename };


//────────── 📦 Reusable canvas creation ──────────//
/**
 * 💬 Creates a new canvas element and appends it to the scene container.
 * Removes any existing canvas with the same ID to prevent duplicates.
 *
 * @param {HTMLElement} sceneContainer - The container where the canvas will be inserted.
 * @param {string} sceneName - Optional scene name to add a specific class.
 * @returns {HTMLElement} - The created canvas element.
 */
export function createReusableCanvas(sceneContainer, sceneName = "") {
  const existingCanvas = document.getElementById("scene-canvas");
  if (existingCanvas) existingCanvas.remove();

  const { width: SCENE_WIDTH, height: SCENE_HEIGHT } = getLogicalSceneSize();

  const sceneCanvas = document.createElement("div");
  sceneCanvas.id = "scene-canvas";
  sceneCanvas.classList.add("scene-canvas-centered", "canvas-hidden");

  if (sceneName) sceneCanvas.classList.add(`scene-${sceneName}`);

  sceneCanvas.style.width = `${SCENE_WIDTH}px`;
  sceneCanvas.style.height = `${SCENE_HEIGHT}px`;

  sceneContainer.appendChild(sceneCanvas);
  return sceneCanvas;
}

//────────── 🌌 Sky layer construction ──────────//
/**
 * 💬 Appends a full-screen sky layer to the scene canvas if it doesn't already exist.
 *
 * @param {HTMLElement} sceneCanvas - The canvas container where the sky layer is added.
 * @returns {void}
 */
export function createSkyLayer(sceneCanvas) {
  let sky = sceneCanvas.querySelector(".sky-layer");
  if (!sky) {
    sky = document.createElement("div");
    sky.classList.add("sky-layer");
    sky.style.position = "absolute";
    sky.style.top = 0;
    sky.style.left = 0;
    sky.style.width = "100%";
    sky.style.height = "100%";
    sky.style.zIndex = 0;
    sceneCanvas.appendChild(sky);
  }
}

//────────── 📦 Logic region & element layer ──────────//
/**
 * 💬 Creates the logic region and element layer containers within the scene canvas.
 * These layers serve as structural regions for dynamic and interactive elements.
 *
 * @param {HTMLElement} sceneCanvas - The canvas container where the regions are added.
 * @returns {void}
 */
export function createLogicRegion(sceneCanvas) {
  if (sceneCanvas.querySelector("#logic-region")) return;

  const logicContainer = document.createElement("div");
  logicContainer.id = "logic-region";
  logicContainer.classList.add("grass-region");
  sceneCanvas.appendChild(logicContainer);

  const elementLayer = document.createElement("div");
  elementLayer.id = "element-layer";
  elementLayer.classList.add("grass-layer");
  logicContainer.appendChild(elementLayer);
}


//────────── 🖼️ Static background layer injection ──────────//
/**
 * 💬 Injects static background image layers into the scene canvas.
 * Only elements with type "static" are processed and appended.
 *
 * @param {HTMLElement} sceneCanvas - The canvas container where static layers are added.
 * @param {Array} layers - List of visual layer definitions (type, filename, className, zIndex, opacity).
 * @returns {void}
 */

const STATIC_BASE_PATH = "static/";

export function loadStaticLayers(sceneCanvas, layers = []) {
  layers.forEach(layer => {
    if (layer.type === "static") {
      const wrapper = document.createElement("div");
      wrapper.style.position = "absolute";
      wrapper.style.zIndex = layer.zIndex ?? "auto";
      wrapper.style.opacity = layer.opacity ?? "1";
      if (layer.id) wrapper.id = layer.id;

      const img = document.createElement("img");
      img.src = `${STATIC_BASE_PATH}resources/backgrounds/${getFinalFilename(layer.filename)}`;
      img.className = layer.className;
      img.style.display = "block";
      img.style.width = "100%";
      img.style.height = "100%";
      img.decoding = "async"; 

      wrapper.appendChild(img);
      sceneCanvas.appendChild(wrapper);
    }
  });
}


//────────── 🌀 Dynamic Scroll Layer Injection ──────────//
/**
 * 💬 Injects scrollable background elements (horizontal or vertical) into the scene.
 * Handles coordinate-based positioning, dual image looping, and optional masking.
 *
 * @param {HTMLElement} sceneCanvas - The canvas container where elements are inserted.
 * @param {Array} elements - Array of visual objects with scroll properties (filename, className, direction, speed, etc).
 * @param {Array} coordinates - Positional data for each scrollable element (x/y or anchor/offset).
 * @returns {void}
 */
export function loadScrollLayers(sceneCanvas, elements = [], coordinates = []) {
  elements.filter(e =>
    (e.className?.includes("scroll")) &&
    (e.direction === "horizontal" || e.direction === "vertical")
  ).forEach(el => {
    const { width: SCENE_WIDTH, height: SCENE_HEIGHT } = getLogicalSceneSize();
    const direction = el.direction || "horizontal";
    const scaleX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-x')) || 1;
    const scaleY = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-y')) || 1;

    const wrapper = document.createElement("div");
    const scrollCoord = coordinates?.find(c => c.id === el.id);
    if (scrollCoord && typeof scrollCoord.x === "number" && typeof scrollCoord.y === "number") {
      const posX = scrollCoord.x * SCENE_WIDTH;
      const posY = scrollCoord.y * SCENE_HEIGHT;
      wrapper.style.left = `${posX}px`;
      wrapper.style.top = `${posY}px`;
    }

    wrapper.className = `scroll-wrapper ${el.className}`;
    wrapper.style.position = "absolute";
    wrapper.style.zIndex = el.zIndex ?? "auto";
    wrapper.dataset.speed = el.speed;

    if (direction === "horizontal") {
      const imageWidth = Math.round(SCENE_WIDTH * 1.5); //
      wrapper.style.width = `${imageWidth}px`;
      wrapper.style.height = "100%";
      wrapper.dataset.imageWidth = imageWidth;

      const imgA = document.createElement("img");
      const imgB = document.createElement("img");

      [imgA, imgB].forEach((img, i) => {
        img.src = `${STATIC_BASE_PATH}resources/backgrounds/${getFinalFilename(el.filename)}`;
        img.className = `scroll-instance scroll-instance-${i === 0 ? "a" : "b"}`;
        img.style.opacity = el.opacity ?? "1";
        img.style.width = "100%";
        img.style.height = "100%";
        img.decoding = "async";
        wrapper.appendChild(img);
      });

      sceneCanvas.appendChild(wrapper);
    }

else if (direction === "vertical") {
  const imageHeight = Math.round(SCENE_HEIGHT * scaleY * 1.5);

  const maskWrapper = document.createElement("div");
  maskWrapper.id = el.id + "-mask"; 
  maskWrapper.style.position = "absolute";
  maskWrapper.style.overflow = "hidden";
maskWrapper.style.width = `${SCENE_WIDTH * 0.4948}px`;
maskWrapper.style.height = `${SCENE_HEIGHT * 0.4356}px`;
  maskWrapper.style.zIndex = el.zIndex ?? "auto";

  const maskCoord = coordinates?.find(c => c.id === el.id + "-mask");
  if (maskCoord && typeof maskCoord.x === "number" && typeof maskCoord.y === "number") {
    const posX = maskCoord.x * SCENE_WIDTH;
    const posY = maskCoord.y * SCENE_HEIGHT;
    maskWrapper.style.left = `${posX}px`;
    maskWrapper.style.top = `${posY}px`;
  } else {
    maskWrapper.style.left = "0";
    maskWrapper.style.top = "0";
  }

  const scrollContainer = document.createElement("div");
  scrollContainer.className = `scroll-wrapper ${el.className}`;
  scrollContainer.style.position = "absolute";
  scrollContainer.dataset.speed = el.speed;
  scrollContainer.dataset.imageHeight = imageHeight;
  scrollContainer.style.width = `${SCENE_WIDTH}px`;
  scrollContainer.style.height = `${imageHeight}px`;
  scrollContainer.style.top = "0";
  scrollContainer.style.left = "0";
  scrollContainer.style.transform = `translate(${-(SCENE_WIDTH * 0.299)}px, ${-(SCENE_HEIGHT * 0.5)}px)`;

  const imgA = document.createElement("img");
  const imgB = document.createElement("img");

  [imgA, imgB].forEach((img, i) => {
    img.src = `${STATIC_BASE_PATH}resources/backgrounds/${getFinalFilename(el.filename)}`;
    img.className = `scroll-instance-vertical`;
    img.style.opacity = el.opacity ?? "1";
    img.style.width = `${SCENE_WIDTH}px`;
    img.style.height = "100%";
    img.style.position = "absolute";
    img.style.left = "0";
    img.style.top = i === 0 ? "0" : `-${imageHeight}px`;
    scrollContainer.appendChild(img);
  });

  maskWrapper.appendChild(scrollContainer);
  sceneCanvas.appendChild(maskWrapper);
}
  });
}

//────────── 🎞️ Frame Layer Animation Injection (like waterfall) ──────────//
/**
 * 💬 Injects animated frame layers (e.g. waterfalls) into the scene canvas.
 * These layers are absolutely positioned and rendered using background images.
 * Size is scaled proportionally to the base resolution for dynamic viewport support.
 *
 * @param {HTMLElement} sceneCanvas - The canvas container where frames are added.
 * @param {Array} elements - Visual objects with type "frame" (includes filename, className, zIndex).
 * @param {Array} coordinates - Position data (x/y) matched by element ID.
 * @returns {void}
 */
export function loadFrameLayers(sceneCanvas, elements = [], coordinates = []) {
  elements.filter(el => el.type === "frame").forEach(el => {
    const { width: SCENE_WIDTH, height: SCENE_HEIGHT } = getLogicalSceneSize();
    const coord = coordinates.find(c => c.id === el.id);
    if (!coord) return;

    const x = coord.x * SCENE_WIDTH;
    const y = coord.y * SCENE_HEIGHT;

    const width = 433 * (SCENE_WIDTH / 3840);
    const height = 500 * (SCENE_HEIGHT / 2160);

    const wrapper = document.createElement("div");
    wrapper.id = el.id;
    wrapper.className = el.className || "";
    wrapper.style.position = "absolute";
    wrapper.style.left = `${x}px`;
    wrapper.style.top = `${y}px`;
    wrapper.style.width = `${width}px`;
    wrapper.style.height = `${height}px`;
    wrapper.style.zIndex = el.zIndex ?? "auto";
    wrapper.style.backgroundImage = `url(${STATIC_BASE_PATH}resources/backgrounds/${getFinalFilename(el.filename)})`;
    wrapper.style.backgroundSize = "100% auto";
    wrapper.style.backgroundRepeat = "no-repeat";
    wrapper.style.backgroundPosition = "0 0";
    wrapper.style.pointerEvents = "none";

    sceneCanvas.appendChild(wrapper);
  });
}

//────────── 📐 Dynamic Filename Resolution ──────────//
/**
 * Returns the final filename with resolution suffix (@1920, @720, etc.)
 * Strict version: fails if the resource is not found (no fallback).
 * @param {string} originalFilename
 * @returns {string}
 */
function getFinalFilename(originalFilename) {
  const resolution = window.sceneSettings?.finalResolution || "1920";
  const dotIndex = originalFilename.lastIndexOf(".");
  if (dotIndex === -1) return originalFilename;

  const name = originalFilename.substring(0, dotIndex);
  const ext = originalFilename.substring(dotIndex);
  return `${name}@${resolution}${ext}`;
}





