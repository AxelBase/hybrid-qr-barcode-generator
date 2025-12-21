import { getComplexityOptions } from './Complexity.js';
import { getJsonRefNo } from './jsonExporter.js';
import { getTxtRefNo } from './txtExporter.js';

const jsonRefNo = getJsonRefNo();
const txtRefNo = getTxtRefNo();
const finalRefNo = jsonRefNo + txtRefNo;

export async function generateHybrid(secret, complexity = 'medium') {
  try {
    if (!secret || secret.trim().length < 4) throw new Error("Secret too short");

    if (typeof CryptoJS === 'undefined') throw new Error('CryptoJS not loaded');

    const salt = CryptoJS.lib.WordArray.random(16);

    const derivedKey = CryptoJS.PBKDF2(finalRefNo, salt, { keySize: 4, iterations: 1000 });

    const encrypted = CryptoJS.AES.encrypt(secret.trim(), derivedKey, { iv: salt });
    const ciphertext = encrypted.toString();

    const mid = Math.ceil(ciphertext.length / 2);
    const part1 = salt.toString() + '|' + ciphertext.slice(0, mid);
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