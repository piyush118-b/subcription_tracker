export default function MetricCard({ label, value, subvalue, variant = 'default' }) {
  const valueColors = {
    default: 'text-[var(--text-primary)]',
    primary: 'text-[var(--primary)]',
    warning: 'text-[var(--warning)]',
    danger: 'text-[var(--danger)]',
  };

  return (
    <div className="card p-6">
      <p className="text-sm text-[var(--text)] mb-2">{label}</p>
      <p className={`text-3xl font-semibold ${valueColors[variant]}`}>{value}</p>
      {subvalue && (
        <p className="text-sm text-[var(--text)] mt-1">{subvalue}</p>
      )}
    </div>
  );
}
