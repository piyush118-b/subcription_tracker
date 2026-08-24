export default function UpcomingRenewalsCard({ count }) {
  return (
    <div className="card p-6">
      <p className="text-sm text-[var(--text)] mb-2">Upcoming Renewals</p>
      <p className={`text-3xl font-semibold ${count > 0 ? 'text-[var(--warning)]' : 'text-[var(--text-primary)]'}`}>
        {count}
      </p>
      <p className="text-sm text-[var(--text)] mt-1">
        {count === 0
          ? 'No renewals in the next 7 days'
          : count === 1
          ? 'subscription renewing soon'
          : 'subscriptions renewing soon'}
      </p>
    </div>
  );
}
