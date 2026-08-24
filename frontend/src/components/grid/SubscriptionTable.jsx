import SubscriptionRow from './SubscriptionRow';

export default function SubscriptionTable({ subscriptions, onToggleStatus, onDelete }) {
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
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
