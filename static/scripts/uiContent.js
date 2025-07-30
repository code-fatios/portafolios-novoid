// EN|🧩 UI CONTENT INJECTOR — Renders dynamic UI elements to overlay
// ES|🧩 INYECTOR DE CONTENIDO UI — Renderiza elementos dinámicos en la superposición principal

import { svgFunctionMap } from "./svg.js";
import { ContentElements } from "./uiContentConfig.js";
import { detectTimeMode } from "./themeModeManager.js"; 
import { applyVisualEffectsForMode } from "./visualModeEngine.js";

//━━━━━━━━━━ 🧩 INJECT UI CONTENT ━━━━━━━━━━//

/**
 * 💬 Injects all dynamic UI elements defined in ContentElements into the overlay layer.
 * Creates the overlay container if it doesn't exist, then appends elements by type.
 *
 * @returns {void}
 */
export function injectUIContent() {
  if (document.getElementById("ui-overlay")) return; // 💬 Prevent duplicate overlay

  const overlay = document.createElement("div");
  overlay.id = "ui-overlay";
  overlay.style.position = "absolute";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.zIndex = 9999;
  document.body.appendChild(overlay);

  //━━━━━━━━━━ 🔄 ELEMENT DISPATCHER ━━━━━━━━━━//
  ContentElements.forEach(el => {

    //───── 🔗 SOCIAL ICONS
    if (el.type === "social-icon" && el.generator) {
      const wrapper = document.createElement("div");
      wrapper.id = el.id;
      wrapper.style.position = "absolute";
      wrapper.style.zIndex = el.zIndex ?? 9999;

      const pos = el.position || {};
      if (pos.top) wrapper.style.top = pos.top;
      if (pos.left) wrapper.style.left = pos.left;
      if (pos.right) wrapper.style.right = pos.right;
      if (pos.bottom) wrapper.style.bottom = pos.bottom;

      const fn = svgFunctionMap[el.generator];
      if (!fn) return;

      const parser = new DOMParser();
      const svgNode = parser.parseFromString(fn(), "image/svg+xml").documentElement;
      svgNode.classList.add("svg-icon");
      svgNode.style.width = "32px";
      svgNode.style.height = "32px";

      const mode = detectTimeMode();
      if (el.colors && el.colors[mode]) {
        svgNode.style.color = el.colors[mode];
      } else {
        svgNode.style.color = el.colorBase || "#ffffff";
      }

      wrapper.style.setProperty("--color-base", el.colorBase || "#ffffff");
      wrapper.style.setProperty("--color-hover", el.colorHover || "#ffffff");
      wrapper.style.setProperty("--glow", el.glow || "none");
      wrapper.style.setProperty("--scale-hover", el.scaleHover || 1.1);
      wrapper.classList.add("svg-wrapper");

      const link = document.createElement("a");
      link.href = el.link || "#";
      link.target = "_blank";
      link.appendChild(svgNode);

      wrapper.appendChild(link);
      overlay.appendChild(wrapper);
    }

    //───── 🖼️ STATIC SVG ELEMENTS
    if (el.type === "svg" && el.generator) {
      const wrapper = document.createElement("div");
      wrapper.id = el.id;
      wrapper.style.position = "absolute";
      wrapper.style.zIndex = el.zIndex ?? 9999;

      const pos = el.position || {};
      if (pos.top) wrapper.style.top = pos.top;
      if (pos.left) wrapper.style.left = pos.left;
      if (pos.right) wrapper.style.right = pos.right;
      if (pos.bottom) wrapper.style.bottom = pos.bottom;

      const fn = svgFunctionMap[el.generator];
      if (!fn) return;

      const parser = new DOMParser();
      const svgNode = parser.parseFromString(fn(), "image/svg+xml").documentElement;
      svgNode.classList.add("svg-icon");
      svgNode.style.width = "32px";
      svgNode.style.height = "32px";
      svgNode.style.color = el.colorBase || "#ffffff";

      wrapper.style.setProperty("--color-base", el.colorBase || "#ffffff");
      wrapper.style.setProperty("--color-hover", el.colorHover || "#ffffff");
      wrapper.style.setProperty("--glow", el.glow || "none");
      wrapper.style.setProperty("--scale-hover", el.scaleHover || 1.1);
      wrapper.classList.add("svg-wrapper");

      wrapper.appendChild(svgNode);
      overlay.appendChild(wrapper);
    }

    //───── 🎛️ MODE SWITCHER
    if (el.type === "mode-switcher") {
      const modes = ["auto", "day", "sunset", "night"];
      const modeColors = {
        auto: "#d1d1d1",
        day: "#33ccff",
        sunset: "#f79e3d",
        night: "#b9aaff"
      };

      const svgMap = {
        day: svgFunctionMap.getSunModeSVG(),
        sunset: svgFunctionMap.getSunsetModeSVG(),
        night: svgFunctionMap.getNightModeSVG()
      };

      let currentModeIndex = modes.indexOf(el.modeDefault || "auto");

      const modeSwitcherWrapper = document.createElement("div");
      modeSwitcherWrapper.id = el.id;
      modeSwitcherWrapper.classList.add("mode-switcher-wrapper");
      modeSwitcherWrapper.style.position = "absolute";
      modeSwitcherWrapper.style.top = el.position.top || "0";
      modeSwitcherWrapper.style.right = el.position.right || "0";
      modeSwitcherWrapper.style.zIndex = el.zIndex || 9999;

      const button = document.createElement("div");
      button.classList.add("mode-switcher-button");
      button.style.backgroundColor = modeColors[modes[currentModeIndex]];
      button.title = "Change visual mode";

      const modeIconContainer = document.createElement("div");
      modeIconContainer.id = "mode-icon-container";
      button.appendChild(modeIconContainer);

      updateModeIcon(modes[currentModeIndex]);

      if (modes[currentModeIndex] === "auto") {
        const detected = detectTimeMode();
        applyVisualEffectsForMode(detected);
      }

      const dropdown = document.createElement("div");
      dropdown.classList.add("mode-switcher-dropdown");
      dropdown.style.display = "none";

      const parser = new DOMParser();

      modes.forEach((mode, index) => {
        const point = document.createElement("div");
        point.classList.add("mode-option");
        point.style.backgroundColor = modeColors[mode];

        if (mode === "auto") {
          const span = document.createElement("span");
          span.textContent = "Auto";
          span.style.fontSize = "10px";
          span.style.fontFamily = "Cinzel, serif";
          span.style.color = "#ffffff";
          point.appendChild(span);
        } else {
          const svgNode = parser.parseFromString(svgMap[mode], "image/svg+xml").documentElement;
          svgNode.classList.add("svg-icon");
          svgNode.style.width = "24px";
          svgNode.style.height = "24px";
          svgNode.style.color = "#ffffff";
          svgNode.style.fill = "currentColor";
          svgNode.style.stroke = "currentColor";
          point.appendChild(svgNode);
        }

        point.addEventListener("click", () => {
          currentModeIndex = index;
          button.style.backgroundColor = modeColors[mode];
          closeDropdown();
          applyVisualEffectsForMode(mode);
          updateModeIcon(mode);
        });

        dropdown.appendChild(point);
      });

      modeSwitcherWrapper.appendChild(button);
      modeSwitcherWrapper.appendChild(dropdown);
      overlay.appendChild(modeSwitcherWrapper);

      let closeTimeout;

      //───── 📂 DROPDOWN FUNCTIONS
      function openDropdown() {
        clearTimeout(closeTimeout);
        dropdown.style.display = "flex";
        dropdown.classList.add("open");
      }

      function closeDropdown() {
        dropdown.classList.remove("open");
        closeTimeout = setTimeout(() => {
          dropdown.style.display = "none";
        }, 300);
      }

      /**
       * 💬 Updates the icon displayed inside the mode switcher button.
       * @param {string} mode - Current visual mode ("auto", "day", "sunset", "night").
       */
      function updateModeIcon(mode) {
        modeIconContainer.innerHTML = "";

        if (mode === "auto") {
          const span = document.createElement("span");
          span.textContent = "Auto";
          span.style.fontSize = "10px";
          span.style.fontFamily = "Cinzel, serif";
          span.style.color = "#ffffff";
          modeIconContainer.appendChild(span);
        } else {
          const svg = parser.parseFromString(svgMap[mode], "image/svg+xml").documentElement;
          svg.classList.add("svg-icon");
          svg.style.width = "24px";
          svg.style.height = "24px";
          svg.style.color = "#ffffff";
          svg.style.fill = "currentColor";
          svg.style.stroke = "currentColor";
          modeIconContainer.appendChild(svg);
        }
      }

      //───── 🧠 EVENT BINDINGS
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        openDropdown();
      });

      button.addEventListener("mouseenter", openDropdown);
      dropdown.addEventListener("mouseenter", openDropdown);
      dropdown.addEventListener("mouseleave", () => {
        closeTimeout = setTimeout(closeDropdown, 5000);
      });

      document.addEventListener("click", (e) => {
        if (!modeSwitcherWrapper.contains(e.target)) {
          closeDropdown();
        }
      });
    }

    //───── 🕒 CLOCK DISPLAY
    if (el.type === "clock") {
      const clock = document.createElement("div");
      clock.id = el.id;
      clock.textContent = "--:--:--";
      clock.style.position = "absolute";
      clock.style.zIndex = el.zIndex ?? 9999;
      if (el.className) clock.classList.add(el.className);

      const pos = el.position || {};
      if (pos.top) clock.style.top = pos.top;
      if (pos.left) clock.style.left = pos.left;
      if (pos.right) clock.style.right = pos.right;
      if (pos.bottom) clock.style.bottom = pos.bottom;

      clock.style.color = el.colorBase || "#ffffff";
      clock.style.filter = `drop-shadow(${el.glow || "none"})`;

      overlay.appendChild(clock);

      /**
       * 💬 Updates the digital clock with the current time every second.
       */
      function updateClock() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, "0");
        const m = String(now.getMinutes()).padStart(2, "0");
        const s = String(now.getSeconds()).padStart(2, "0");
        clock.textContent = `${h}:${m}:${s}`;
      }

      setInterval(updateClock, 1000);
      updateClock();
    }

  }); 
} 
