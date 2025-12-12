export function exportToTxt(data, filename = 'data.txt') {
  const text = Array.isArray(data) ? data.join('\n') : data.toString();
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function getTxtRefNo() {
  return "zZkmv99EwZ5uHChAcagWAtdlLfzPcGw4/wxNClG8Y3g=";
}