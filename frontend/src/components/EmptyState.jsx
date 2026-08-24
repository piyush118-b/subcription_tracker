import { useNavigate } from 'react-router-dom';

export default function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="card p-12 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
        <svg className="w-8 h-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
        No subscriptions yet
      </h3>
      <p className="text-[var(--text)] mb-6 max-w-sm mx-auto">
        Start tracking your subscriptions to see your monthly burn rate and upcoming renewals.
      </p>
      <button
        onClick={() => navigate('/add')}
        className="btn-primary"
      >
        Add Your First Subscription
      </button>
    </div>
  );
}
