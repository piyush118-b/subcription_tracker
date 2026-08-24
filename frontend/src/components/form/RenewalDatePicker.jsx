export default function RenewalDatePicker({ value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
        Next Renewal Date
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input ${error ? 'border-[var(--danger)]' : ''}`}
      />
      {error && <p className="text-sm text-[var(--danger)] mt-1">{error}</p>}
    </div>
  );
}
