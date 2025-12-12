// src/lib/Complexity.js
// ← This file must be imported correctly now

export function getComplexityOptions(level = 'medium') {
  try {
    console.log('[Complexity.js] getComplexityOptions called with:', level);
    const l = level.toLowerCase();
    const options = {
      low:    { qrLevel: 'L', barcodeHeight: 40, barcodeWidth: 1 },
      medium: { qrLevel: 'M', barcodeHeight: 50, barcodeWidth: 2 },
      high:   { qrLevel: 'H', barcodeHeight: 60, barcodeWidth: 3 }
    };
    if (!options[l]) throw new Error(`Invalid complexity level: ${level}`);
    console.log('[Complexity.js] Returning options:', options[l]);
    return options[l];
  } catch (err) {
    console.error('[Complexity.js] ERROR in getComplexityOptions:', err);
    // Fallback to medium
    return { qrLevel: 'M', barcodeHeight: 50, barcodeWidth: 2 };
  }
}