// EN|🧩 BACKGROUND VISUAL ELEMENTS
// ES|🧩 ELEMENTOS VISUALES DEL FONDO



//────────── 🧩 INDEX ELEMENTS — ACTUALIZADO POR ORDEN DE FATIOS-SAMA ──────────//

  //────────── 🧱 INDEX LAYERS ──────────//

export const indexStaticLayers = [
  {
    id: "index-field",
    filename: "index/Field.webp",
    type: "static",
    className: "field",
    zIndex: 8,
    opacity: 1,
  },
  {
    id: "index-mountain",
    filename: "index/Mountain.webp",
    type: "static",
    className: "mountain",
    zIndex: 7,
    opacity: 1,
  }
];

export const indexElements = [

  //────────── 🧱 INDEX LAYERS ──────────//

  {
    id: "index-runa-engraved",
    type: "svg",
    generator: "getRunaEngraved2SVG",
    className: "engraved",
    zIndex: 14,
    opacity: 1,
    adjustX: -40,  
    adjustY: 20,   
    scale: 1.8,
    adjust: {
      "1920": { x: -0.01, y: -0.025 }, // corrección en ambos ejes para 1920p
      "720":  { x: -0.025, y: -0.045 }  // corrección mayor en ambos ejes para 720p
    }
  },


  //─── ☁️ Nubes ───
  {
    id: "index-cloud-a",
    filename: "shared/Other/Cloud-A.webp",
    type: "scroll",
    className: "cloud-scroll",
    zIndex: 2,
    opacity: 0.8,
    speed: 0.080,
    direction: "horizontal"
  },

  //─── 🌊 Agua ───
  {
    id: "index-water-lake",
    filename: "shared/Water/Water-Lake.webp",
    type: "water",
    className: "lake-scroll",
    zIndex: 3,
    opacity: 1,
    speed: 0.020,
    direction: "vertical"
  },
  {
    id: "index-water-river",
    filename: "shared/Water/Water-River.webp",
    type: "water",
    className: "river-scroll",
    zIndex: 4,
    opacity: 1,
    speed: 0.3,
    direction: "horizontal"
  },
  {
    id: "index-water-edge",
    filename: "shared/Water/Water-Edge.webp",
    type: "water",
    className: "water-edge",
    zIndex: 5,
    opacity: 0.8,
    speed: 0
  },
{
  id: "index-water-fall",
  filename: "shared/Water/Water-Fall.webp",
  type: "frame",
  className: "waterfall-frame",
  zIndex: 9,
  opacity: 1
},

{
  id: "index-water-fallfoam",
  filename: "shared/Water/Water-FallFoam.webp",
  type: "foam",
  className: "waterfall-foam-frame",
  zIndex: 10,
  opacity: 1,
  speed: 0
},



  //─── 🌳 Árboles ───
  {
    id: "index-treea-backleaved",
    filename: "shared/Tree/TreeA-Backleaved.webp",
    type: "treeA",
    className: "treea-backleaved",
    zIndex: 9,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-treeb-backleaved",
    filename: "shared/Tree/TreeB-Backleaved.webp",
    type: "treeB",
    className: "treeb-backleaved",
    zIndex: 9,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-treea-trunk",
    filename: "shared/Tree/TreeA-Trunk.webp",
    type: "treeA",
    className: "treea-trunk",
    zIndex: 10,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-treeb-trunk",
    filename: "shared/Tree/TreeB-Trunk.webp",
    type: "treeB",
    className: "treeb-trunk",
    zIndex: 10,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-treea-frontleaved",
    filename: "shared/Tree/TreeA-Frontleaved.webp",
    type: "treeA",
    className: "treea-frontleaved",
    zIndex: 11,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-treeb-frontleaved",
    filename: "shared/Tree/TreeB-Frontleaved.webp",
    type: "treeB",
    className: "treeb-frontleaved",
    zIndex: 11,
    opacity: 1,
    speed: 0,
  },

  //─── 🌾 Pasto y Arbustos ───
  {
    id: "index-bush4-v2",
    filename: "shared/Grass/Bush4-v2.webp",
    type: "grass",
    className: "bush4-v2",
    zIndex: 9,
    opacity: 1,
    speed: 0,
  },
  {
    id: "index-bush3-v2",
    filename: "shared/Grass/Bush3-v2.webp",
    type: "grass",
    className: "bush3-v2",
    zIndex: 9,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-bush2-v1",
    filename: "shared/Grass/Bush2-v1.webp",
    type: "grass",
    className: "bush2-v1",
    zIndex: 11,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-bush2-v2",
    filename: "shared/Grass/Bush2-v2.webp",
    type: "grass",
    className: "bush2-v2",
    zIndex: 11,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-bush1-v2",
    filename: "shared/Grass/Bush1-v2.webp",
    type: "grass",
    className: "bush1-v2",
    zIndex: 14,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-grass1-v1",
    filename: "shared/Grass/Grass1-v1.webp",
    type: "grass",
    className: "grass1-v1",
    zIndex: 9,
    opacity: 1,
    speed: 0,
    scale: 2
  },
  {
    id: "index-grass1-v2",
    filename: "shared/Grass/Grass1-v2.webp",
    type: "grass",
    className: "grass1-v2",
    zIndex: 13,
    opacity: 1,
    speed: 0
  },
  {
  id: "index-grass1-v2-2",
  filename: "shared/Grass/Grass1-v2.webp",
  type: "grass",
  className: "grass1-v2",
  zIndex: 14,
  opacity: 1,
  speed: 0,
},

  {
    id: "index-grass2-v1",
    filename: "shared/Grass/Grass2-v1.webp",
    type: "grass",
    className: "grass2-v1",
    zIndex: 13,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-grass3-v1",
    filename: "shared/Grass/Grass3-v1.webp",
    type: "grass",
    className: "grass3-v1",
    zIndex: 12,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-grass3-v2",
    filename: "shared/Grass/Grass3-v2.webp",
    type: "grass",
    className: "grass3-v2",
    zIndex: 12,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-grass4-v1",
    filename: "shared/Grass/Grass4-v1.webp",
    type: "grass",
    className: "grass4-v1",
    zIndex: 18,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-grass4-v2",
    filename: "shared/Grass/Grass4-v2.webp",
    type: "grass",
    className: "grass4-v2",
    zIndex: 17,
    opacity: 1,
    speed: 0
  },
  {
  id: "index-grass5-v1-1",
  filename: "shared/Grass/Grass5-v1.webp",
  type: "grass",
  className: "grass5-v1",
  zIndex: 13,
  opacity: 1,
  speed: 0
},
{
  id: "index-grass5-v1-2",
  filename: "shared/Grass/Grass5-v1.webp",
  type: "grass",
  className: "grass5-v1",
  zIndex: 15,
  opacity: 1,
  speed: 0
},
{
  id: "index-grass5-v1-3",
  filename: "shared/Grass/Grass5-v1.webp",
  type: "grass",
  className: "grass5-v1",
  zIndex: 18,
  opacity: 1,
  speed: 0
},
  {
    id: "index-grass5-v2",
    filename: "shared/Grass/Grass5-v2.webp",
    type: "grass",
    className: "grass5-v2",
    zIndex: 11,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-grassa-v1",
    filename: "shared/Grass/GrassA-v1.webp",
    type: "grass",
    className: "grassa-v1",
    zIndex: 18,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-grass-s",
    filename: "shared/Grass/Grass-s.webp",
    type: "grass",
    className: "grass-s",
    zIndex: 19,
    opacity: 1,
    speed: 0,
  },

  //─── 🪨 Roca y puente ───
  {
    id: "index-rock-a",
    filename: "shared/Other/Rock-A.webp",
    type: "rock",
    className: "rock-a",
    zIndex: 14,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-bridge-a",
    filename: "shared/Other/Bridge-A.webp",
    type: "bridge",
    className: "bridge-a",
    zIndex: 12,
    opacity: 1,
    speed: 0
  },

  //─── 🐺 Wolf ───
  {
    id: "index-wolf-body",
    filename: "shared/Wolf/Wolf-Body.webp",
    type: "wolf",
    className: "wolf-body",
    zIndex: 17,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-wolf-chest",
    filename: "shared/Wolf/Wolf-Chest.webp",
    type: "wolf",
    className: "wolf-chest",
    zIndex: 16,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-wolf-tail",
    filename: "shared/Wolf/Wolf-Tail.webp",
    type: "wolf",
    className: "wolf-tail",
    zIndex: 18,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-wolf-earleft",
    filename: "shared/Wolf/Wolf-Earleft.webp",
    type: "wolf",
    className: "wolf-earleft",
    zIndex: 18,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-wolf-earright",
    filename: "shared/Wolf/Wolf-Earright.webp",
    type: "wolf",
    className: "wolf-earright",
    zIndex: 15,
    opacity: 1,
    speed: 0
  },
  {
    id: "index-wolf-paw",
    filename: "shared/Wolf/Wolf-Paw.webp",
    type: "wolf",
    className: "wolf-paw",
    zIndex: 15,
    opacity: 1,
    speed: 0
  },

  //─── 🕯️ Faroles ───
  {
    id: "index-lantern-stand",
    filename: "shared/Lantern/Lantern-Stand.webp",
    type: "light",
    className: "lantern-stand",
    zIndex: 16,
    opacity: 1,
    speed: 0,
    
    
  },
  {
    id: "index-lantern",
    filename: "shared/Lantern/Lantern.webp",
    type: "light",
    className: "lantern",
    zIndex: 17,
    opacity: 1,
    speed: 0,
    adjust: {
      "720": { y: -0.02 },   // mover un poco hacia arriba en 720
      "1920": { y: -0.01 }   // corrección ligera en 1920
     }
   }


];


//────────── 🧩 PANEL ELEMENTS ──────────//

export const panelStaticLayers = [
  {
    id: "panel-field",
    filename: "panel/field.webp",
    type: "static",
    className: "panel-field",
    zIndex: 3,
    opacity: 1,
  },
  {
    id: "panel-mountain",
    filename: "panel/mountain.webp",
    type: "static",
    className: "panel-mountain",
    zIndex: 4,
    opacity: 1,
  },
  {
    id: "panel-castle-entrance",
    filename: "panel/castle-entrance.webp",
    type: "static",
    className: "castle-entrance",
    zIndex: 6,
    opacity: 1,
  }
];


export const panelElements = [
 

  //────── 🌿 Grass Panel ──────

  {
    id: "panel-grass-a",
    type: "grass",
    filename: "shared/grass-a.webp",
    className: "grass",
    zIndex: 7,
    opacity: 1,
    speed: 0,
  },
  {
    id: "panel-grass-b",
    type: "grass",
    filename: "shared/grass-b.webp",
    className: "grass",
    zIndex: 7,
    opacity: 1,
    speed: 0,
  },
  {
    id: "panel-grass-c",
    type: "grass",
    filename: "shared/grass-c.webp",
    className: "grass",
    zIndex: 7,
    opacity: 1,
    speed: 0,
  },
  {
    id: "panel-grass-d",
    type: "grass",
    filename: "shared/grass-d.webp",
    className: "grass",
    zIndex: 7,
    opacity: 1,
    speed: 0,
  },

  //─── ☁️ Clouds Panel ───

  {
    id: "panel-cloud-a",
    filename: "shared/cloud-a.webp",
    type: "scroll",
    className: "cloud-scroll",
    zIndex: 2,
    opacity: 1,
    speed: 0,
  },

  {
    id: "panel-cloud-c",
    filename: "shared/cloud-c.webp",
    type: "scroll",
    className: "cloud-scroll",
    zIndex: 5,
    opacity: 1,
    speed: 0,
    imageWidth: 6667
  },
  {
    id: "panel-cloud-d",
    filename: "shared/cloud-d.webp",
    type: "scroll",
    className: "cloud-scroll",
    zIndex: 5,
    opacity: 1,
    speed: 0,
    imageWidth: 6667
  },
];

