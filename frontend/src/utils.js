export function money(v) {
  const n = Number(v) || 0;
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ج.م';
}

export function num(v) {
  const n = Number(v) || 0;
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
}
