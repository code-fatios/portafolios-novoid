// EN|🌀 INTERPOLATION UTILITIES — Smooth transitions and easing
// ES|🌀 UTILIDADES DE INTERPOLACIÓN — Transiciones suaves y curvas de animación

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
// 🌀 INTERPOLATION UTILITIES           //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

//────────── 📈 Linear interpolation (lerp) ──────────//
/**
 * 💬 Linear interpolation between two values. 
 * @param {number} start - Initial value
 * @param {number} end - Final value
 * @param {number} t - Interpolation factor (0.0 to 1.0)
 * @returns {number}
 */

export function lerp(start, end, t) {
  return start + (end - start) * t;
}

//────────── 📉 Cubic easing (easeInOut) ──────────//
/**
 * 💬 Cubic ease-in-out function that adjusts time progression for smooth interpolation.
 * @param {number} t - Time factor (0.0 to 1.0)
 * @returns {number}
 */
export function easeInOut(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

//────────── ⏱️ Animate value over time ──────────//
/**
 * 💬 Smoothly animates a value from start to end using easing and requestAnimationFrame.
 * @param {number} start - Initial value.
 * @param {number} end - Final value.
 * @param {number} duration - Animation duration in milliseconds.
 * @param {function} callback - Called each frame with the interpolated value.
 * @returns {void}
 */

export function animateValue(start, end, duration, callback) {
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const t = Math.min(elapsed / duration, 1);
    const easedT = easeInOut(t);
    const value = lerp(start, end, easedT);
    callback(value);

    if (t < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
