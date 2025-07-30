// EN|🔨  SCENE LOADER — Builds any visual scene modularly
// ES|🔨  CARGADOR DE ESCENA — Construye cualquier escena de forma modular

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🏗️ SCENE LOADER — Visual scene initializer
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

import {
  indexStaticLayers, indexElements, indexCoordinates,
  panelStaticLayers, panelElements, panelCoordinates
} from "../backgroundConfig/backgroundConfig.js";

import {
  createReusableCanvas,
  createSkyLayer,
  createLogicRegion,
  loadStaticLayers,
  loadScrollLayers,
  loadFrameLayers
} from "../backgroundBuilder.js";

import { positionSceneElements } from "./backgroundPositioner.js";

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🧩 Index scene layout      //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
/**
 * 💬 Builds and mounts the complete "index" scene with canvas, layers, elements and logic.
 *     Includes reusable canvas, background sky, static/scroll visuals, and positioned elements.
 *
 * @returns {void}
 */
export function loadSceneLayout_Index() {
  const container = document.getElementById("scene-container");
  const canvas = createReusableCanvas(container, "index");

  createSkyLayer(canvas);
  loadStaticLayers(canvas, indexStaticLayers);
  loadScrollLayers(canvas, indexElements, indexCoordinates);
  loadFrameLayers(canvas, indexElements, indexCoordinates);
  createLogicRegion(canvas);
  positionSceneElements(canvas, indexElements, indexCoordinates);

  if (typeof advanceProgress === "function") {
  advanceProgress("loadSceneLayout");
}
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🧩 Panel scene layout      //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
/**
 * 💬 Builds and mounts the complete "panel" scene with canvas, layers, elements and logic.
 *     Uses same modular builders as index, with different config sets.
 *
 * @returns {void}
 */
export function loadSceneLayout_Panel() {
  const container = document.getElementById("scene-container");
  const canvas = createReusableCanvas(container, "panel");

  createSkyLayer(canvas);
  loadStaticLayers(canvas, panelStaticLayers);
  loadScrollLayers(canvas, panelElements);
  createLogicRegion(canvas);
  positionSceneElements(canvas, panelElements, panelCoordinates);
}
