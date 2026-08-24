import { useRef } from 'react';
import { addDays, addMonths, addYears, format } from 'date-fns';

export default function RenewalDatePicker({ value, onChange, error, billingCycle }) {
  const inputRef = useRef(null);
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  const handleOpenPicker = () => {
    if (inputRef.current) {
      if (typeof inputRef.current.showPicker === 'function') {
        inputRef.current.showPicker();
      } else {
        inputRef.current.focus();
      }
    }
  };

  const setPresetDate = (days = 0, months = 0, years = 0) => {
    let date = new Date();
    if (days) date = addDays(date, days);
    if (months) date = addMonths(date, months);
    if (years) date = addYears(date, years);
    onChange(format(date, 'yyyy-MM-dd'));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          Next Renewal Date
        </label>
        {value && (
          <span className="text-xs text-[var(--primary)] font-medium">
            Selected: {value}
          </span>
        )}
      </div>

      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="date"
          min={todayStr}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`input cursor-pointer ${error ? 'border-[var(--danger)]' : ''}`}
          onClick={handleOpenPicker}
        />
        <button
          type="button"
          onClick={handleOpenPicker}
          className="absolute right-3 text-[var(--text)] hover:text-[var(--text-primary)] transition-colors p-1"
          title="Open calendar"
          aria-label="Open calendar picker"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>

      {/* Quick Select Shortcuts */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs text-[var(--text)]">Quick set:</span>
        <button
          type="button"
          onClick={() => setPresetDate(7)}
          className="text-xs px-2 py-1 rounded bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--card-border)] transition-colors"
        >
          +7 Days
        </button>
        <button
          type="button"
          onClick={() => setPresetDate(0, 1)}
          className="text-xs px-2 py-1 rounded bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--card-border)] transition-colors"
        >
          +1 Month
        </button>
        <button
          type="button"
          onClick={() => setPresetDate(0, 0, 1)}
          className="text-xs px-2 py-1 rounded bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--card-border)] transition-colors"
        >
          +1 Year
        </button>
      </div>

      {error && <p className="text-sm text-[var(--danger)] mt-1.5">{error}</p>}
    </div>
  );
}
