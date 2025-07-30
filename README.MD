# Portafolios Novoid

Este proyecto es un motor de escenas modulable en Canvas, creado sin librerías externas, que combina animaciones por interpolación, un sistema de viento sincronizado y un loading real+simulado para presentar entornos dinámicos y personalizables.

---

## Demo en vivo  
[Demo en vivo](https://portafolios-novoid.onrender.com)  

## Live Demo  
[Live Demo](https://portafolios-novoid.onrender.com)

---

## Descripción

Novoid es un motor de visualización diseñado para mostrar escenas interactivas y animadas directamente en el navegador, sin recurrir a frameworks ni librerías externas. Su propósito es demostrar dominio de **JavaScript**, **CSS** y **HTML** puro, ofreciendo:

- **Modularidad**: cada animación, sistema y configuración vive en su propio archivo o carpeta, lo que facilita reemplazar o extender cualquier parte de la escena.  
- **Reutilización**: los bloques de código para rotación, deformación e interpolación (LERP, easing) pueden aplicarse a cualquier elemento gráfico.  
- **Personalización**: mediante archivos de configuración (`backgroundConfig`, filtros de imagen, posiciones, velocidad, opacidad), es posible ajustar sin tocar la lógica principal.

## Overview

Novoid is a visualization engine designed to display interactive, animated scenes directly in the browser—no frameworks or external libraries required. Its goal is to showcase mastery of **JavaScript**, **CSS**, and **HTML** by providing:

- **Modularity**: each animation, system, and configuration lives in its own file or folder, making it easy to replace or extend any part of the scene.  
- **Reusability**: code blocks for rotation, deformation, and interpolation (LERP, easing) can be applied to any graphical element.  
- **Customizability**: configuration files (`backgroundConfig`, image filters, positions, speed, opacity) allow you to tweak behavior without touching core logic.

---

## ¿Cómo funciona?

1. **Selección de resolución**  
   Al inicio se detecta (o permite elegir) la resolución óptima (`720`, `1920` o `3840`), cargando las imágenes WebP correspondientes.  
2. **Loading real + simulado**  
   - La barra avanza hasta el `90 %` de forma simulada para asegurar fluidez.  
   - El `10 %` restante sólo se completa cuando el canvas y todos los elementos están montados.  
3. **Motor de viento**  
   Dispara animaciones en todos los elementos sensibles (hojas, farolas, partículas), sincronizados según dirección y velocidad definidas.  
4. **Render en Canvas**  
   Capas dibujadas en bucle con `requestAnimationFrame`, aplicando interpolaciones para movimientos suaves.  
5. **Inyección de UI**  
   Fuera del canvas, `uiContent` añade reloj, íconos sociales y widgets, animados por CSS/JS según el modo visual (día, tarde, noche).

## How It Works

1. **Resolution Selection**  
   At startup, the engine detects (or lets you choose) the optimal resolution (`720`, `1920`, or `3840`) and loads the matching WebP images.  
2. **Real + Simulated Loading**  
   - The progress bar advances to `90 %` in a simulated fashion to ensure smoothness.  
   - The remaining `10 %` only completes once the canvas and all scene elements are fully initialized.  
3. **Wind System**  
   Triggers animations on all wind-sensitive elements (leaves, lanterns, particles), synchronized by configured direction and speed.  
4. **Canvas Rendering**  
   Layers are drawn in a loop with `requestAnimationFrame`, applying interpolations for smooth movements.  
5. **UI Injection**  
   Outside the canvas, `uiContent` injects a clock, social icons, and other widgets, all animated via CSS/JavaScript according to the visual mode (day, dusk, night).

---

## Características principales

- 🔧 **Arquitectura modular**:  
  `scripts/background` dividido en `animation`, `logic`, `system` y `config`.  
- 🌀 **Interpolación avanzada**:  
  Funciones LERP y easing para rotaciones y deformaciones suaves.  
- 🌬️ **Sistema de viento**:  
  Animaciones sincronizadas de elementos que reaccionan al viento.  
- 📐 **Posicionamiento dinámico**:  
  Coordenadas normalizadas (ID + x/y) para cada recurso.  
- 🚀 **Loading real + simulado**:  
  `90 %` predefinido + `10 %` final tras montaje de escena.  
- 🎨 **Assets 100 % propios**:  
  Imágenes WebP, SVG y logo diseñados por Fatios-code.  
- 🌍 **Soporte i18n**:  
  Español/Inglés controlados por `translations.json`.  
- 🔄 **Switch de modo visual**:  
  Auto-detección día/tarde/noche con filtros temáticos.  
- 🖥️ **Vista de panel**:  
  `panel.html` para pruebas y demostraciones secundarias.

## Key Features

- 🔧 **Modular Architecture**:  
  `scripts/background` is divided into `animation`, `logic`, `system`, and `config`.  
- 🌀 **Advanced Interpolation**:  
  LERP and easing functions for smooth rotation and deformation.  
- 🌬️ **Wind System**:  
  Synchronized animations for elements that react to wind.  
- 📐 **Dynamic Positioning**:  
  Normalized coordinates (ID + x/y) for each asset.  
- 🚀 **Real + Simulated Loading**:  
  `90 %` preset + `10 %` final after scene assembly.  
- 🎨 **100 % Custom Assets**:  
  WebP images, SVGs, and logo designed by Fatios-code.  
- 🌍 **i18n Support**:  
  Spanish/English text controlled via `translations.json`.  
- 🔄 **Visual Mode Switch**:  
  Auto-detection of day/dusk/night with themed filters.  
- 🖥️ **Panel View**:  
  `panel.html` for secondary scene testing and demos.

---

## Estructura del proyecto

## Estructura del proyecto

📁 **portafolios-novoid/**  
├── 📄 **index.html**  
├── 📄 **panel.html**  
└── 📁 **static/**  
    ├── 📁 **resources/**  
    │   ├── 📁 **backgrounds/**  
    │   │   ├── **index/**   ← WebP para escena “index”  // WebP for the “index” scene  
    │   │   ├── **panel/**   ← WebP para escena “panel”  // WebP for the “panel” scene  
    │   │   └── **shared/**  ← Grass, Lantern, Tree, Water, Wolf, Other  // Shared resources: Grass, Lantern, Tree, Water, Wolf, Other  
    │   └── 📄 **translations.json** ← Textos i18n (ES/EN)  // i18n texts (ES/EN)  
    ├── 📁 **scripts/**  
    │   ├── 📁 **background/**  
    │   │   ├── 📁 **backgroundAnimation/**  
    │   │   │   ├── **backgroundAnimations.js** ← Animaciones JS (scrollLoop, viento…)  // JS animations (scrollLoop, wind…)  
    │   │   │   └── **interpolationUtils.js**   ← Funciones LERP y easing  // LERP and easing functions  
    │   │   ├── 📁 **backgroundLogic/**  
    │   │   │   ├── **backgroundController.js** ← Orquesta animaciones por escena  // Orchestrates scene animations  
    │   │   │   ├── **backgroundLoader.js**     ← Montaje modular de la escena  // Modular scene assembly  
    │   │   │   └── **backgroundPositioner.js** ← Posicionamiento dinámico  // Dynamic positioning  
    │   │   ├── 📁 **backgroundSystem/**  
    │   │   │   ├── **canvasInitializer.js**    ← Escalado y viewport responsivo  // Responsive scaling & viewport  
    │   │   │   └── **integrityCheck.js**       ← Validación de configuraciones  // Configuration validation  
    │   │   ├── 📁 **backgroundConfig/**  
    │   │   │   ├── **backgroundConfig.js**             ← Exporta módulos de config  // Exports config modules  
    │   │   │   ├── **backgroundSceneConfig.index.js**  ← Capas, z-index, opacidad, speed  // Layers, z-index, opacity, speed  
    │   │   │   └── **backgroundConfig.positions.js**   ← Coordenadas relativas por ID  // Relative coordinates by ID  
    │   │   └── **backgroundBuilder.js**      ← Construcción de canvas y lógica visual  // Canvas & visual logic builder  
    │   ├── **imageModeFilters.config.js**   ← Configuración de filtros por modo visual  // Visual mode filter settings  
    │   ├── **lightAuraSystem.js**           ← Efectos de aura de luz  // Light aura effects  
    │   ├── **loading.js**                   ← Lógica de loading simulado + real  // Real + simulated loading logic  
    │   ├── **main.js**                      ← Punto de entrada global y detección de escena  // Global entry point & scene detection  
    │   ├── **nightParticles.js**            ← Partículas nocturnas  // Nighttime particle effects  
    │   ├── **svg.js**                       ← Biblioteca de SVGs reutilizables  // Reusable SVG library  
    │   ├── **themeModeManager.js**          ← Gestión automática día/tarde/noche  // Auto day/dusk/night mode manager  
    │   ├── **uiContent.js**                 ← Inyección de UI externa (reloj, íconos)  // External UI injection (clock, icons)  
    │   ├── **uiContentConfig.js**           ← Declaración de elementos UI y posiciones  // UI element declarations & positions  
    │   └── **visualModeEngine.js**          ← Motor de cambio de modo visual  // Visual mode switching engine  
    └── 📁 **styles/**  
        ├── **backgroundStructure.css**    ← Layout de canvas y capas  // Canvas & layer layout  
        ├── **backgroundAnimations.css**   ← Animaciones CSS (viento, “respiración”)  // CSS animations (wind, “breathing”)  
        ├── **loading.css**                ← Estilos de pantalla de carga  // Loading screen styles  
        ├── **style.css**                  ← Estilos generales de UI  // General UI styles  
        └── **uiContentAnimation.css**     ← Transiciones y animaciones de UI  // UI transition & animation styles  

---

## Soporte y feedback / Support & Feedback

Para reportar errores, sugerir mejoras o resolver dudas, abre un _issue_ en GitHub o contacta a:
- 📧 code.fatios@gmail.com  
- 🔗 https://github.com/fatios-code/issues

---

## Licencia / License

© 2025 Fatios-code. Todos los derechos reservados.

**Uso permitido / Permitted use**  
- Uso personal, demos, prototipos y actividades educativas o de investigación.  
- Queda libre el código y los recursos para exploración y presentación pública sin ánimo de lucro.

**Uso prohibido / Prohibited use**  
- Cualquier explotación **comercial** (venta, incorporación en productos de pago, servicios de hosting de pago, etc.)  
- Reproducción, distribución o modificación con fines comerciales sin autorización escrita.

Para licencias comerciales o consultas adicionales:  
- 📧 code.fatios@gmail.com  
- 🔗 https://github.com/fatios-code  

