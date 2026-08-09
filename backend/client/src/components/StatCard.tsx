interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}

function isNegative(value: string | number): boolean {
  const num = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]/g, ''));
  return !isNaN(num) && num < 0;
}

export default function StatCard({ label, value, sub, color }: StatCardProps) {
  const negative = isNegative(value);
  const borderColor = negative ? '#ef4444' : color;

  return (
    <div className="stat-card" style={borderColor ? { borderTopColor: borderColor } : undefined}>
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={negative ? { color: '#ef4444' } : undefined}>
        {negative && (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#fef2f2',
            borderRadius: 6,
            padding: '1px 6px',
            fontSize: 11,
            fontWeight: 700,
            marginInlineEnd: 6,
            color: '#ef4444',
            verticalAlign: 'middle',
          }}>
            ▼
          </span>
        )}
        {value}
      </div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}
