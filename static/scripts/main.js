// EN|🧠 MAIN ENTRY — Global Application Logic and Initialization
// ES|🧠 PUNTO PRINCIPAL — Lógica global e inicialización de la aplicación

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// </> GLOBAL  — CODE                    
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

import {
  loadSceneLayout_Index,
  loadSceneLayout_Panel
} from "./background/backgroundLogic/backgroundLoader.js";

import { injectUIContent } from "./uiContent.js";
import { updateViewportHeight, scaleSceneCanvas } from "./background/backgroundSystem/canvasInitializer.js";

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🏞️ BACKGROUND — Scene Rendering Logic //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

let sceneKey = "index";

//────────── 🧭 Scene initialization ──────────//
/**
 * 💬 Loads the appropriate background layout based on the current path.
 * Defaults to the "index" layout if no match is found.
 */
function initializeScene() {
  const routes = [
    { key: "panel", match: /panel/, load: loadSceneLayout_Panel },
    { key: "index", match: /index/, load: loadSceneLayout_Index },
  ];

  const route = routes.find(r => r.match.test(location.pathname));
  sceneKey = route?.key || "index";
  (route?.load || loadSceneLayout_Index)();

  updateViewportHeight();
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🚀 Final Execution                  
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

initializeScene();
if (typeof advanceProgress === "function") {
  advanceProgress("initializeScene");
}

injectUIContent();

window.addEventListener("resize", () => {
  updateViewportHeight();
  const canvas = document.getElementById("scene-canvas");
  if (canvas) scaleSceneCanvas(canvas);
});

// 💬 Exported for use in other modules
export { initializeScene };
