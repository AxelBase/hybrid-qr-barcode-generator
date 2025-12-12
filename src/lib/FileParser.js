// src/lib/FileParser.js – FINAL VERSION (TXT + JSON Now Perfect + Warnings)

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

export async function parseFile(file, options = {}) {
  const warnings = [];
  const validSecrets = [];

  if (file.size > MAX_FILE_SIZE) {
    warnings.push(`File is large (${(file.size / 1024 / 1024).toFixed(1)} MB) – may be slow`);
  }

  try {
    const content = await readFileAsText(file);
    const ext = file.name.split('.').pop().toLowerCase();

    if (ext === 'csv') {
      console.log('[FileParser.js] Parsing CSV...');

      const result = Papa.parse(content.trim(), {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        forgive: true,
        transform: (value) => value?.trim() || ''
      });

      const rows = result.data;
      const headers = result.meta.fields || [];

      if (rows.length === 0) {
        warnings.push('No data rows found in CSV');
        return { secrets: [], warnings, headers: [], validCount: 0 };
      }

      let columnIndex = -1;
      let userSelectedColumn = null;

      if (options.column !== undefined && options.column !== null) {
        if (typeof options.column === 'string' && options.column.trim() !== '') {
          const lower = options.column.toLowerCase().trim();
          columnIndex = headers.findIndex(h => h.toLowerCase() === lower);
          if (columnIndex !== -1) userSelectedColumn = headers[columnIndex];
        } else if (typeof options.column === 'number') {
          columnIndex = Math.max(0, Math.min(options.column - 1, headers.length - 1));
          userSelectedColumn = headers[columnIndex];
        }
      }

      if (columnIndex === -1) {
        const priority = ['secret', 'password', 'token', 'key', 'data', 'value', 'text', 'message', 'content', 'payload', 'detail', 'description'];
        for (const kw of priority) {
          columnIndex = headers.findIndex(h => h.toLowerCase().includes(kw));
          if (columnIndex !== -1) break;
        }

        if (columnIndex === -1) {
          let bestIndex = 0;
          let maxLen = 0;
          headers.forEach((h, i) => {
            const avg = rows.reduce((sum, r) => sum + (r[h]?.length || 0), 0) / rows.length;
            if (avg > maxLen) {
              maxLen = avg;
              bestIndex = i;
            }
          });
          columnIndex = bestIndex;
        }
      }

      const selectedColumnName = headers[columnIndex];

      const idKeywords = ['id', '_id', 'row', 'index', 'number', 'no', 'num', 'uid'];
      const isLikelyIdColumn = idKeywords.some(k => selectedColumnName.toLowerCase().includes(k));

      if (isLikelyIdColumn && userSelectedColumn) {
        warnings.push(
          `Warning: You have selected "${selectedColumnName}" — this appears to be an ID/number column (e.g., 1, 2, 3).`
        );
        warnings.push(
          `Such columns usually contain row numbers (Primary Keys). Please verify this is the correct column.`
        );
        warnings.push(
          `Values in "${selectedColumnName}" are too short. QR Codes and Barcodes have specific requirements, as such the system will skip entries if it is under 4 characters.`
        );
      }

      let skipped = 0;
      let emptyDetailCount = 0;

      rows.forEach((row, i) => {
        const raw = row[selectedColumnName];
        const value = (raw ?? '').toString().trim();

        if (value === '' || value === '""') {
          emptyDetailCount++;
        } else if (value.length < 4) {
          skipped++;
        } else {
          validSecrets.push(value);
        }
      });

      // Only show skip warning for non-ID columns
      if (skipped > 0 && !isLikelyIdColumn) {
        warnings.push(`Skipped ${skipped} row(s) with short values (<4 characters)`);
      }

      if (emptyDetailCount > 0) {
        warnings.push(`Skipped ${emptyDetailCount} empty row(s)`);
      }

      if (validSecrets.length === 0) {
        if (isLikelyIdColumn && userSelectedColumn) {
          warnings.push(`No valid entries found. all values in "${selectedColumnName}" are too short. Try selecting a different column.`);
        } else {
          warnings.push(`No valid entries found in column "${selectedColumnName}"`);
        }
      }

      console.log(`[FileParser.js] Extracted ${validSecrets.length} valid entries from "${selectedColumnName}"`);
      console.log(`[FileParser.js] Skipped: ${skipped} short + ${emptyDetailCount} empty = ${skipped + emptyDetailCount} total`);

      return {
        secrets: validSecrets,
        warnings,
        headers,
        validCount: validSecrets.length,
        selectedColumn: selectedColumnName
      };

    } else if (ext === 'txt') {
      console.log('[FileParser.js] Parsing TXT file...');

      const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      let skipped = 0;

      lines.forEach((line, i) => {
        if (line.length >= 4) {
          validSecrets.push(line);
        } else if (line.length > 0) {
          skipped++;
        }
      });

      if (skipped > 0) {
        warnings.push(`Skipped ${skipped} short line(s) (<4 characters)`);
      }

      if (validSecrets.length === 0) {
        warnings.push('No valid entries found in TXT file – all lines too short');
      }

      console.log(`[FileParser.js] TXT: Extracted ${validSecrets.length} valid entries`);
      return {
        secrets: validSecrets,
        warnings,
        headers: [],
        validCount: validSecrets.length,
        selectedColumn: 'TXT Lines'
      };

    } else if (ext === 'json') {
      console.log('[FileParser.js] Parsing JSON file...');

      let json;
      try {
        json = JSON.parse(content);
      } catch (err) {
        warnings.push('Invalid JSON format: ' + err.message);
        return { secrets: [], warnings, headers: [], validCount: 0 };
      }

      let values = [];
      if (Array.isArray(json)) {
        values = json;
      } else if (typeof json === 'object' && json !== null) {
        values = Object.values(json);
      } else {
        warnings.push('JSON must be an array or object');
        return { secrets: [], warnings, headers: [], validCount: 0 };
      }

      let skipped = 0;
      values.forEach((v, i) => {
        if (typeof v === 'string') {
          const value = v.trim();
          if (value.length >= 4) {
            validSecrets.push(value);
          } else if (value.length > 0) {
            skipped++;
          }
        } else {
          skipped++;
        }
      });

      if (skipped > 0) {
        warnings.push(`Skipped ${skipped} invalid or short entries (non-string or <4 chars)`);
      }

      if (validSecrets.length === 0) {
        warnings.push('No valid entries found in JSON – all values too short or not strings');
      }

      console.log(`[FileParser.js] JSON: Extracted ${validSecrets.length} valid entries`);
      return {
        secrets: validSecrets,
        warnings,
        headers: [],
        validCount: validSecrets.length,
        selectedColumn: 'JSON Values'
      };

    }

    warnings.push('Unsupported file type');
    return { secrets: [], warnings, headers: [], validCount: 0 };

  } catch (err) {
    console.error('[FileParser.js] FATAL ERROR:', err);
    warnings.push('Failed to read file: ' + err.message);
    return { secrets: [], warnings, headers: [], validCount: 0 };
  }
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsText(file);
  });
}