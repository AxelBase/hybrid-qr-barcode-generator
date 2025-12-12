// src/lib/HybridGenerator.js – ULTIMATE VERSION (All Features + Maximum Security)

import { getComplexityOptions } from './Complexity.js';
import { getJsonRefNo } from './jsonExporter.js';
import { getTxtRefNo } from './txtExporter.js';

const MARKER = "HYBRIDv1"; // Kept for backward compatibility / fallback mode

export async function generateHybrid(secret, complexity = 'medium') {
  try {
    console.log('[HybridGenerator.js] generateHybrid started – secret length:', secret?.length, 'complexity:', complexity);

    if (!secret || secret.trim().length < 4) {
      throw new Error("Secret too short (<4 chars)");
    }

    if (typeof QRCode === 'undefined') throw new Error('QRCode library not loaded');
    if (typeof JsBarcode === 'undefined') throw new Error('JsBarcode library not loaded');

    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = 'position:absolute;left:-9999px;';
    document.body.appendChild(tempDiv);

    const opts = getComplexityOptions(complexity);

    let part1, part2;

    // === DYNAMIC ENCRYPTED MODE (Primary – Maximum Security) ===
    if (typeof CryptoJS !== 'undefined') {
      try {
        console.log('[HybridGenerator.js] Using encrypted dynamic key mode');

        const JsonRefNo = getJsonRefNo();
        const TxtRefNo = getTxtRefNo();
        const dynamicRef = JsonRefNo + TxtRefNo + Date.now().toString(36);

        const iv = CryptoJS.lib.WordArray.random(16);
        const encrypted = CryptoJS.AES.encrypt(secret.trim(), dynamicRef, { iv: iv });
        const ciphertext = encrypted.toString();

        const mid = Math.ceil(ciphertext.length / 2);
        part1 = iv.toString() + '|' + ciphertext.slice(0, mid);
        part2 = ciphertext.slice(mid);

        console.log('[HybridGenerator.js] Encrypted + split (dynamic key)');
      } catch (cryptoErr) {
        console.warn('[HybridGenerator.js] CryptoJS failed – falling back to simple split', cryptoErr);
        // === FALLBACK: Original simple split (keeps original logic) ===
        const mid = Math.ceil(secret.length / 2);
        part1 = secret.slice(0, mid) + "|" + MARKER;
        part2 = secret.slice(mid) + "|" + MARKER;
      }
    } else {
      // === NO CRYPTOJS: Use original simple split ===
      console.log('[HybridGenerator.js] CryptoJS not available – using simple split mode');
      const mid = Math.ceil(secret.length / 2);
      part1 = secret.slice(0, mid) + "|" + MARKER;
      part2 = secret.slice(mid) + "|" + MARKER;
    }

    console.log('[HybridGenerator.js] Final split → QR:', part1.length, '| Barcode:', part2.length);

    new QRCode(tempDiv, {
      text: part1,
      width: 220, height: 220,
      colorDark: "#000", colorLight: "#fff",
      correctLevel: QRCode.CorrectLevel[opts.qrLevel]
    });

    const qrCanvas = tempDiv.querySelector('canvas');
    if (!qrCanvas) throw new Error("QR canvas failed to generate");

    const barcodeCanvas = document.createElement('canvas');
    JsBarcode(barcodeCanvas, part2, {
      format: "CODE128",
      width: opts.barcodeWidth,
      height: opts.barcodeHeight,
      displayValue: false,
      margin: 10
    });

    const merged = document.createElement('canvas');
    const ctx = merged.getContext('2d');
    const w = Math.max(qrCanvas.width, barcodeCanvas.width) + 40;
    const h = qrCanvas.height + barcodeCanvas.height + 30;

    merged.width = w; merged.height = h;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(qrCanvas, (w - qrCanvas.width) / 2, 15);
    ctx.drawImage(barcodeCanvas, (w - barcodeCanvas.width) / 2, qrCanvas.height + 25);

    document.body.removeChild(tempDiv);
    console.log('[HybridGenerator.js] Hybrid image generated successfully');
    return merged.toDataURL('image/png');

  } catch (err) {
    console.error('[HybridGenerator.js] FATAL ERROR:', err);
    throw err;
  }
}

export async function generateBatch(secrets, complexity) {
  try {
    console.log(`[HybridGenerator.js] generateBatch started – ${secrets.length} items`);
    const results = await Promise.all(
      secrets.map((secret, i) => {
        console.log(`[Batch] Generating #${i + 1}`);
        return generateHybrid(secret.trim(), complexity);
      })
    );
    console.log('[HybridGenerator.js] Batch complete');
    return results;
  } catch (err) {
    console.error('[HybridGenerator.js] Batch failed:', err);
    throw err;
  }
}