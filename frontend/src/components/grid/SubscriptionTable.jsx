import SubscriptionRow from './SubscriptionRow';

export default function SubscriptionTable({ subscriptions, onToggleStatus }) {
  if (subscriptions.length === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="text-[var(--text)]">No subscriptions yet.</p>
        <p className="text-sm text-[var(--text)] mt-1">
          Add your first subscription to start tracking.
        </p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[var(--background-secondary)] border-b border-[var(--border)] text-xs font-medium text-[var(--text)] uppercase tracking-wider">
        <div className="col-span-3">Service</div>
        <div className="col-span-2">Cost</div>
        <div className="col-span-2">Billing</div>
        <div className="col-span-2">Next Renewal</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1"></div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-[var(--border)]">
        {subscriptions.map((subscription) => (
          <SubscriptionRow
            key={subscription.id}
            subscription={subscription}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </div>
    </div>
  );
}
