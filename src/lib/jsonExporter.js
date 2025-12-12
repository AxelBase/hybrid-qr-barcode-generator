export function exportToJson(data, filename = 'data.json') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function getJsonRefNo() {
  return "3yslWQElbM669xrtf4A/o6K6Ms6bv1ZeVQ2yOiyKewM=";
}