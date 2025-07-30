// EN|🛡️ INTEGRITY CHECK — Visual Configuration Validator
// ES|🛡️ VERIFICADOR DE INTEGRIDAD — Valida la configuración visual

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🛡️ INTEGRITY CHECK — Visual configuration validator             //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

//────────── 🛡️ Visual config validation (debug-only) ──────────//
/**
 * 💬 Validates visual elements and their coordinates when in debug mode.
 * Logs missing coordinates or sources (filename/generator) to console.
 *
 * @param {Array} elements - List of visual elements (with id, type, etc).
 * @param {Array} coordinates - List of positions { id, x/y or anchor/offset }.
 * @returns {void}
 */
export function runIntegrityCheck(elements = [], coordinates = []) {
  if (!window.__DEBUG__) return;

  const missingCoords = [];
  const missingSources = [];

  elements.forEach(el => {
    const hasCoords = coordinates.some(coord =>
      coord.id === el.id && (
        (typeof coord.x === "number" && typeof coord.y === "number") ||
        (coord.anchor && coord.offset)
      )
    );
    if (!hasCoords) missingCoords.push(el.id);

    const hasSource = el.filename || el.generator;
    if (!hasSource) missingSources.push(el.id);
  });

  if (missingCoords.length > 0) {
    console.warn("🧨 Missing coordinates:", missingCoords);
  }

  if (missingSources.length > 0) {
    console.warn("🧨 Missing visual sources:", missingSources);
  }
}
