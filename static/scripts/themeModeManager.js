// EN|🎨  THEME MODE MANAGER — Time-based visual mode selector
// ES|🎨  GESTOR DE MODO VISUAL — Selector visual según la hora local

/**
 * Returns the appropriate visual mode based on the current hour.
 *
 * @returns {"day" | "sunset" | "night"}
 */
export function detectTimeMode() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 7) return "sunset";
  if (hour >= 7 && hour < 18) return "day";
  if (hour >= 18 && hour < 20) return "sunset";
  return "night";
}
