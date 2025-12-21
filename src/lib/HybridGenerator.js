// src/lib/HybridGenerator.js – FINAL DECRYPTABLE VERSION

import { getComplexityOptions } from './Complexity.js';
import { getJsonRefNo } from './jsonExporter.js';
import { getTxtRefNo } from './txtExporter.js';

// Master secret parts – split for obfuscation
// Scanner will have the same parts to reconstruct
const jsonRefNo = getJsonRefNo(); // "Axel2025"
const txtRefNo = getTxtRefNo(); // "HybridKey!"
const finalRefNo = jsonRefNo + txtRefNo; // "Axel2025HybridKey!"

export async function generateHybrid(secret, complexity = 'medium') {
  try {
    if (!secret || secret.trim().length < 4) throw new Error("Secret too short");

    if (typeof CryptoJS === 'undefined') throw new Error('CryptoJS not loaded');

    // Generate random salt (per-hybrid uniqueness)
    const salt = CryptoJS.lib.WordArray.random(16);

    // Derive per-hybrid key from master + salt (PBKDF2-like, but simple for JS)
    const derivedKey = CryptoJS.PBKDF2(finalRefNo, salt, { keySize: 4, iterations: 1000 });

    // Encrypt
    const encrypted = CryptoJS.AES.encrypt(secret.trim(), derivedKey, { iv: salt });
    const ciphertext = encrypted.toString();

    // Split: QR gets salt + first half, Barcode gets second half
    const mid = Math.ceil(ciphertext.length / 2);
    const part1 = salt.toString() + '|' + ciphertext.slice(0, mid); // Salt needed for decryption
    const part2 = ciphertext.slice(mid);

    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);

    const opts = getComplexityOptions(complexity);

    new QRCode(tempDiv, {
      text: part1,
      width: 220, height: 220,
      colorDark: "#000", colorLight: "#fff",
      correctLevel: QRCode.CorrectLevel[opts.qrLevel]
    });

    const qrCanvas = tempDiv.querySelector('canvas');
    if (!qrCanvas) throw new Error("QR failed");

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
    return merged.toDataURL('image/png');

  } catch (err) {
    console.error('[HybridGenerator.js] ERROR:', err);
    throw err;
  }
}

export async function generateBatch(secrets, complexity) {
  return Promise.all(secrets.map(s => generateHybrid(s.trim(), complexity)));
}