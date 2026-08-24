export default function BurnRateCard({ amount }) {
  return (
    <div className="card p-6">
      <p className="text-sm text-[var(--text)] mb-2">Total Monthly Burn Rate</p>
      <p className="text-3xl font-semibold text-[var(--text-primary)]">
        ${amount.toFixed(2)}
      </p>
      <p className="text-sm text-[var(--text)] mt-1">per month</p>
    </div>
  );
}
