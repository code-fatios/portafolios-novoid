// EN|🧩 UI CONTENT CONFIG — Defines UI elements like icons and clock with positioning and style
// ES|🧩 CONFIGURACIÓN DE CONTENIDO UI — Define elementos como íconos y reloj con estilo y posición

export const ContentElements = [

//───── Instagram social icon configuration
{
  id: "ui-icon-instagram",
  type: "social-icon",
  generator: "getInstagramSVG",
  position: { top: "20px", left: "30px" },
  zIndex: 9999,
  link: "https://www.instagram.com/code_fatios",
  colors: {
    day: "#76A618",
    sunset: "#76A618",
    night: "#00d1d1"
  },
  colorHover: "#ffffff",
  glow: "0 0 10px rgba(255, 255, 255, 0.6)",
  scaleHover: 1.2,
  visibleIn: ["day", "sunset", "night"],
},

//───── GitHub social icon configuration
{
  id: "ui-icon-github",
  type: "social-icon",
  generator: "getGithubSVG",
  position: { top: "70px", left: "30px" },
  zIndex: 9999,
  link: "https://github.com/code-fatios", 
  colors: {
    day: "#76A618",
    sunset: "#76A618",
    night: "#00d1d1"
  },
  colorHover: "#ffffff",
  glow: "0 0 10px rgba(255, 255, 255, 0.6)",
  scaleHover: 1.2,
  visibleIn: ["day", "sunset", "night"],
},

//───── TikTok social icon configuration
{
  id: "ui-icon-tiktok",
  type: "social-icon",
  generator: "getTiktokSVG",
  position: { top: "120px", left: "30px" },
  zIndex: 9999,
  link: "https://www.tiktok.com/@code_fatios", 
  colors: {
    day: "#76A618",
    sunset: "#76A618",
    night: "#00d1d1"
  },
  colorHover: "#ffffff",
  glow: "0 0 10px rgba(255, 255, 255, 0.6)",
  scaleHover: 1.2,
  visibleIn: ["day", "sunset", "night"],
},



//───── Clock component (top-right corner)
  {
    id: "ui-clock",
    type: "clock",
    position: { top: "20px", right: "30px" },
    zIndex: 9999,
    className: "clock-ui",
    colorBase: "#ffffff",
    glow: "0 0 8px rgba(255, 255, 255, 0.4)",
    visibleIn: ["day", "night"],
  },

//───── Mode selector toggle (visual mode) 
  {
    id: "ui-mode-switcher",
    type: "mode-switcher",
    position: { top: "60px", right: "60px" },
    zIndex: 9999,
    modeDefault: "auto",
  },
];
