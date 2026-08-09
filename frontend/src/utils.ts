export function money(v: number | string | null | undefined): string {
  const n = Number(v) || 0;
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ج.م';
}

export function num(v: number | string | null | undefined): string {
  const n = Number(v) || 0;
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
}
