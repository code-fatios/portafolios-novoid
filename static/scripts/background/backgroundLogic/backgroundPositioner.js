// EN|📍 BACKGROUND POSITIONER — Element alignment and scene placement
// ES|📍 POSICIONADOR — Alineación y ubicación de elementos visuales

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 📍 ELEMENT POSITIONING   
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

import { runIntegrityCheck } from "../backgroundSystem/integrityCheck.js";
import { getFinalFilename } from "../backgroundBuilder.js";
import { svgFunctionMap } from "../../svg.js";
import { getLogicalSceneSize } from "../backgroundSystem/canvasInitializer.js";

const STATIC_BASE_PATH = "static/";

//───── Apply visual configuration
/**
 * 💬 Applies visual styling configuration to a DOM element.
 * Includes zIndex, opacity, dimensions, and optional scroll speed.
 *
 * @param {Object} config - Visual settings (zIndex, opacity, width, height, speed).
 * @param {HTMLElement} element - Target HTML element to apply styles to.
 */
function applyVisualConfig(config, element) {
  element.style.zIndex = config.zIndex ?? "auto";
  element.style.opacity = config.opacity ?? "1";

  if (config.speed)  element.dataset.speed = config.speed;
  if (config.width)  element.style.width  = config.width;
  if (config.height) element.style.height = config.height;
}

//───── Visual element positioning
/**
 * 💬 Positions visual elements on the scene using coordinates or anchor+offset logic.
 * @param {HTMLElement} sceneCanvas - The container canvas where elements will be added.
 * @param {Array} elements - Visual definitions (type, image, class, zIndex, etc).
 * @param {Array} coordinates - Position definitions with either x/y or anchor+offset.
 * @returns {void}
 */
export function positionSceneElements(sceneCanvas, elements = [], coordinates = []) {
  const { width: SCENE_WIDTH, height: SCENE_HEIGHT } = getLogicalSceneSize();
  const renderLog = [];
  const elementLayer = document.getElementById("element-layer");
  if (!elementLayer) return;

  runIntegrityCheck(elements, coordinates);
  elementLayer.innerHTML = "";

  // 💬 Sort elements by zIndex for correct stacking order
  coordinates.sort((a, b) => {
    const configA = elements.find(e => e.id === a.id);
    const configB = elements.find(e => e.id === b.id);
    return (configA?.zIndex ?? 0) - (configB?.zIndex ?? 0);
  });

  coordinates
    .filter(coord => {
      const config = elements.find(e => e.id === coord.id);
      return config && config.type !== "frame"; // 💬 Skip frame-layer elements
    })
    .forEach(coord => {
      const config = elements.find(e => e.id === coord.id);
      if (!config) return;

      const elementWrapper = document.createElement("div");
      elementWrapper.style.position = "absolute";

      elementWrapper.dataset.sceneId = coord.id;
      elementWrapper.id = coord.id;

      let x, y;

      //───── Positioning via raw x/y
      if (typeof coord.x === "number" && typeof coord.y === "number") {
        x = coord.x * SCENE_WIDTH;
        y = coord.y * SCENE_HEIGHT;

      //───── Positioning via anchor + offset
      } else if (coord.anchor && coord.offset) {
        const offsetX = coord.offset.x ?? 0;
        const offsetY = coord.offset.y ?? 0;

        const anchorMap = {
          "top-left": [0, 0],
          "top-center": [SCENE_WIDTH / 2, 0],
          "top-right": [SCENE_WIDTH, 0],
          "center-left": [0, SCENE_HEIGHT / 2],
          "center": [SCENE_WIDTH / 2, SCENE_HEIGHT / 2],
          "center-right": [SCENE_WIDTH, SCENE_HEIGHT / 2],
          "bottom-left": [0, SCENE_HEIGHT],
          "bottom-center": [SCENE_WIDTH / 2, SCENE_HEIGHT],
          "bottom-right": [SCENE_WIDTH, SCENE_HEIGHT]
        };

        const [anchorX, anchorY] = anchorMap[coord.anchor] || [SCENE_WIDTH / 2, SCENE_HEIGHT / 2];
        x = anchorX + offsetX;
        y = anchorY + offsetY;

      //───── Fallback to center
      } else {
        x = SCENE_WIDTH / 2;
        y = SCENE_HEIGHT / 2;
      }

      //───── Metadata for debug or style
      if (coord.purpose) elementWrapper.dataset.purpose = coord.purpose;
      if (coord.label) elementWrapper.title = coord.label;

      const resolution = window.sceneSettings?.finalResolution;

      //───── Apply resolution-based adjustments if defined
      if (config.adjust && config.adjust[resolution]) {
        const adj = config.adjust[resolution];
        if (typeof adj.x === "number") {
          x += adj.x * SCENE_WIDTH;
        }
        if (typeof adj.y === "number") {
          y += adj.y * SCENE_HEIGHT;
        }
      }

      elementWrapper.style.left = `${x}px`;
      elementWrapper.style.top = `${y}px`;

      applyVisualConfig(config, elementWrapper);

      if (typeof config.scale === "number" && config.scale !== 1) {
        elementWrapper.style.transform = `scale(${config.scale})`;
        elementWrapper.style.transformOrigin = "center center";
      }

      elementWrapper.dataset.windReactive = "true";
      elementWrapper.dataset.windType = config.type;

      if (config.type === "light" && config.className === "lantern") {
        elementWrapper.classList.add("lantern-wrapper");
        elementWrapper.style.transformOrigin = "top center";
      }

      elementWrapper.dataset.sceneType = config.type || 'unknown';
      elementWrapper.dataset.sceneClass = config.className || '';

      //───── 🖼️ Generated SVG injection    
      if (config.type === "svg" && config.generator) {
        const fn = svgFunctionMap[config.generator];
        if (fn) {
          const parser = new DOMParser();
          const svgNode = parser.parseFromString(fn(), "image/svg+xml").documentElement;
          svgNode.style.display = "block";
          elementWrapper.appendChild(svgNode);
          adjustSVGAlignment(elementWrapper, config);

          // 🎯 Adaptive scale respecting base config
          if ((config.generator === "getRunaEngraved2SVG" || config.className === "engraved") && resolution) {
            let baseScale = config.scale || 1;
            let scaleFactor = 1;
            if (resolution === "1920") scaleFactor = 0.5;
            else if (resolution === "720") scaleFactor = 0.333;

            const finalScale = baseScale * scaleFactor;
            elementWrapper.style.transform = `scale(${finalScale})`;
            elementWrapper.style.transformOrigin = "center center";
          }
        }

      //───── 🖼️ Static image injection 
      } else {
        const img = document.createElement("img");
        img.src = `${STATIC_BASE_PATH}resources/backgrounds/${getFinalFilename(config.filename)}`;
        img.className = config.className || "";
        if (config.type) img.classList.add(config.type);
        img.style.display = "block";
        img.dataset.elementType = config.type;
        img.loading = "lazy";
        img.decoding = "async";
        elementWrapper.appendChild(img);
      }

      elementLayer.appendChild(elementWrapper);
    });
}

//───── 🎯 SVG centering adjustment 
/**
 * 💬 Adjusts alignment of SVG elements using their bounding box and optional offsets.
 *
 * @param {HTMLElement} wrapper - The parent element wrapping the SVG.
 * @param {Object} config - SVG config containing optional adjustX and adjustY.
 */
function adjustSVGAlignment(wrapper, config = {}) {
  const svg = wrapper.querySelector("svg");
  if (!svg) return;

  requestAnimationFrame(() => {
    const bbox = svg.getBBox();
    const offsetX = bbox.x + bbox.width / 2;
    const offsetY = bbox.y + bbox.height / 2;

    const manualAdjustX = config.adjustX ?? 0;
    const manualAdjustY = config.adjustY ?? 0;

    svg.style.position = "relative";
    svg.style.left = "50%";
    svg.style.top = "50%";
    svg.style.transform = `translate(${-(offsetX - manualAdjustX)}px, ${-(offsetY - manualAdjustY)}px)`;
  });
}
