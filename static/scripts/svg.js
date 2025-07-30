//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🧿 SVG LIBRARY — Visual Elements (Signed by Fatios)                          //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

//────────── 🧩 TikTok icon (UI element) ──────────//

export function getTiktokSVG() {
  return `
    <!-- TikTok Icon - created by code.fatios -->
    <svg class="svg-tiktok" fill="currentColor"
         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.75 2h2.813c.104 1.08.58 2.04 1.31 2.77
               .73.73 1.69 1.21 2.77 1.31v2.813c-1.65-.15-3.15-.78-4.35-1.77v6.677
               c0 2.84-2.31 5.15-5.15 5.15S5 16.64 5 13.8c0-2.63 1.93-4.81 4.48-5.11v2.84
               c-.9.28-1.55 1.12-1.55 2.12 0 1.23 1 2.24 2.24 2.24s2.24-1 2.24-2.24V2z"></path>
    </svg>
  `;
}

//────────── 🧩 Instagram icon (UI element) ──────────//

export function getInstagramSVG() {
  return `
    <!-- Instagram Icon - created by code.fatios -->
    <svg class="svg-instagram" fill="none" stroke="currentColor"
         stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect height="18" rx="5" ry="5" width="18" x="3" y="3"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" x2="17.5" y1="6.5" y2="6.5"></line>
    </svg>
  `;
}

//────────── 🧩 GitHub icon (UI element) ──────────//

export function getGithubSVG() {
  return `
    <!-- GitHub Icon - created by code.fatios -->
    <svg class="svg-github" fill="currentColor"
         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0.5C5.373 0.5 0 5.873 0 12.5c0 5.29 3.438 9.776 8.205 11.387.6.111.82-.261.82-.577
               0-.285-.011-1.04-.017-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756
               -1.09-.745.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997
               .108-.775.419-1.305.762-1.605-2.665-.304-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.236-3.221
               -.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 0 1 3.003-.404
               11.49 11.49 0 0 1 3.003.404c2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176
               .77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.37.814 1.102.814 2.222
               0 1.604-.015 2.898-.015 3.292 0 .319.216.694.825.576
               C20.565 22.273 24 17.788 24 12.5 24 5.873 18.627 0.5 12 0.5z"></path>
    </svg>
  `;
}

//----------------------//

export function getSunModeSVG() {
  return `
    <!-- Modo Día — Sol Radiante -->
    <svg class="svg-mode-day" width="32" height="32" viewBox="0 0 64 64"
         fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="12" fill="currentColor" />
      <g stroke="currentColor" stroke-width="3" stroke-linecap="round">
        <line x1="32" y1="4" x2="32" y2="14"/>
        <line x1="32" y1="50" x2="32" y2="60"/>
        <line x1="4" y1="32" x2="14" y2="32"/>
        <line x1="50" y1="32" x2="60" y2="32"/>
        <line x1="12.2" y1="12.2" x2="19.8" y2="19.8"/>
        <line x1="44.2" y1="44.2" x2="51.8" y2="51.8"/>
        <line x1="12.2" y1="51.8" x2="19.8" y2="44.2"/>
        <line x1="44.2" y1="19.8" x2="51.8" y2="12.2"/>
      </g>
    </svg>
  `;
}


export function getSunsetModeSVG() {
  return `
    <!-- Modo Atardecer — Sol descendente -->
    <svg class="svg-mode-sunset" width="32" height="32" viewBox="0 0 64 64"
         fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="40" x2="52" y2="40"
            stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <path d="M20,40 A12,12 0 0 1 44,40" fill="currentColor" />
      <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="32" y1="25" x2="32" y2="18"/>
        <line x1="24" y1="28" x2="20" y2="22"/>
        <line x1="40" y1="28" x2="44" y2="22"/>
      </g>
    </svg>
  `;
}


export function getNightModeSVG() {
  return `
    <!-- Modo Noche — Luna creciente pura -->
    <svg class="svg-mode-night" width="32" height="32" viewBox="0 0 64 64"
         fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40,32a16,16 0 1,1 -16,-16
               a12,12 0 1,0 16,16z"
            fill="currentColor" />
    </svg>
  `;
}



//────────── 🪨 Runa Engraved 2 (background glyph) ──────────//

export function getRunaEngraved2SVG() {
  return `
    <!-- Engraved 2 - created by code.fatios -->
    <svg class="svg-runa-novoid"
         width="100" height="100"
         viewBox="-30 -30 60 60"
         fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0.00,0.00 L -7.07,5.66 L -14.14,0.00 L -0.00,-11.31 L 14.14,-0.00 L -7.07,16.97 L -28.28,0.00 L -7.07,-16.97"
            stroke="#00d1d1" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M 14.14,11.00 L -7.07,27.97 L -28.28,11.00"
            stroke="#00d1d1" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M 14.14,-11.00 L -7.07,-27.97 L -28.28,-11.00"
            stroke="#00d1d1" stroke-width="4" stroke-linecap="round" fill="none"/>
    </svg>
  `;
}

//────────── 🪨 Runa Engraved 1 (background glyph) ──────────//

export function getRunEngravedSVG() {
  return `
    <!-- Engraved 1 - created by code.fatios -->
    <svg class="svg-runa-novoid" viewBox="-80 -80 160 160"
         fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0.00,0.00 L -7.07,7.07 L -14.14,0.00 L -0.00,-14.14 L 14.14,-0.00 L -7.07,21.21 L -28.28,0.00 L -7.07,-21.21"
            stroke="#00d1d1" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M 14.14,13.75 L -7.07,34.96 L -28.28,13.75"
            stroke="#00d1d1" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M 14.14,-13.75 L -7.07,-34.96 L -28.28,-13.75"
            stroke="#00d1d1" stroke-width="4" stroke-linecap="round" fill="none"/>
    </svg>
  `;
}


const svgFunctionMap = {
  getTiktokSVG,
  getInstagramSVG,
  getGithubSVG,
  getRunaEngraved2SVG,
  getRunEngravedSVG,
  getSunModeSVG,
  getSunsetModeSVG,
  getNightModeSVG,
};

export { svgFunctionMap };
