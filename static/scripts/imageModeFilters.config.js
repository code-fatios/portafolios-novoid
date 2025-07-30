// EN|🎨 IMAGE MODE FILTERS CONFIG — Declarative CSS filters per visual mode
// ES|🎨 CONFIGURACIÓN DE FILTROS VISUALES — Filtros CSS declarativos por modo visual

/**
 * 💬 Supported CSS filters:
 * brightness(), contrast(), saturate(),
 * hue-rotate(), invert(), blur(), grayscale()
 *
 * ➕ Combine as needed:
 *   Example: "brightness(0.8) contrast(1.3)"
 */

export const ImageFilters = [
  
//───── 🖼️ STATIC ELEMENTS
    {
    id: "index-field",
    filters: {
      day: "none",
      sunset: "brightness(0.85) contrast(1.2) saturate(1.2) ",
      night: "brightness(0.30)  contrast(1.2) saturate(1.5) ",
    }
  },
    {
    id: "index-mountain",
    filters: {
      day: "none",
      sunset: "brightness(0.85) contrast(1.5) hue-rotate(20deg) ",
      night: "brightness(0.50) contrast(1.5) hue-rotate(80deg) ",
    }
  },

//───── 🌲 TREES FOR TYPE
  {
    type: "treeA",
    filters: {
      day: "none",
      sunset: "brightness(0.85) contrast(1.3) saturate(1.3) ",
      night: "none"
    }
    
  },
    {
    type: "treeB",
    filters: {
      day: "none",
      sunset: "brightness(0.85) contrast(1.3) saturate(1.3) ",
      night: "none"
    }
  },

//───── 🌲 TREE A
{
  id: "index-treea-backleaved",
  filters: {
    day: "none",
    sunset: "none",
    night: "brightness(0.30) ",
  }
},
{
  id: "index-treea-trunk",
  filters: {
    day: "none",
    sunset: "none",
    night: "brightness(0.45) contrast(1.3) saturate(1.3) ",
  }
},
{
  id: "index-treea-frontleaved",
  filters: {
    day: "none",
    sunset: "none",
    night: "brightness(0.60) contrast(1.3) saturate(1.3) ",
  }
},

//───── 🌲 TREES B
{
  id: "index-treeb-backleaved",
  filters: {
    day: "none",
    sunset: "none",
    night: "brightness(0.30) ",
  }
},
{
  id: "index-treeb-trunk",
  filters: {
    day: "none",
    sunset: "none",
    night: "brightness(0.45) contrast(1.3) saturate(1.3) ",
  }
},
{
  id: "index-treeb-frontleaved",
  filters: {
    day: "none",
    sunset: "none",
    night: "brightness(0.60) contrast(1.3) saturate(1.3) ",
  }
},

//───── 🌾 GRASS & BUSHES
  {
    type: "grass",
    filters: {
      day: "none",
      sunset: "brightness(0.85) contrast(1.2) saturate(1.2) ",
      night: "brightness(0.30)  contrast(1.2) saturate(1.5) ",
    }
    
  },

//───── 🐺 WOLF
    {
    type: "wolf",
    filters: {
      day: "none",
      sunset: "brightness(1) contrast(1.2) saturate(1.2) ",
      night: "brightness(0.50) contrast(1.2) saturate(1.2) ",
    }
  },

//───── 💠 OTHER
    {
    id: "index-rock-a",
    filters: {
      day: "none",
      sunset: "brightness(0.85) contrast(1.2) saturate(1.2) ",
      night: "brightness(0.6) contrast(1.5) saturate(1.5) ",
    }
  },
    {
    id: "index-bridge-a",
    filters: {
      day: "none",
      sunset: "brightness(0.85) contrast(1.2) saturate(1.2) ",
      night: "brightness(0.5) contrast(1) saturate(1) ",
    }
  },

    {
    id: "index-lantern-stand",
    filters: {
      day: "none",
      sunset: "brightness(0.95) contrast(1.2) saturate(1.2) ",
      night: "brightness(0.8) contrast(1.5) saturate(1.5) ",
    }
  },
    {
    id: "index-lantern",
    filters: {
      day: "none",
      sunset: "brightness(0.85) contrast(1.2) saturate(1.2) ",
      night: "brightness(0.8) contrast(1.5) saturate(1.5) ",
    }
  },




// 💬 No filters applied intentionally; water visuals handled via shaders/animations
    {
    id: "index-cloud-a",
    filters: {
      day: "none",
      sunset: "none",
      night: "none"
    }
  },

//───── 💧 Water 
    {
    id: "index-water-lake",
    filters: {
      day: "none",
      sunset: "none",
      night: "none",
    }
  },
    {
    id: "index-water-river",
    filters: {
      day: "none",
      sunset: "none",
      night: "none"
    }
  },
    {
    id: "index-water-edge",
    filters: {
      day: "none",
      sunset: "none",
      night: "none"
    }
  },
    {
    id: "index-water-fall",
    filters: {
      day: "none",
      sunset: "none",
      night: "none"
    }
  },
    {
    id: "index-water-fallfoam",
    filters: {
      day: "none",
      sunset: "none",
      night: "none"
    }
  },

];
