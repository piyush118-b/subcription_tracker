import { format, parseISO } from 'date-fns';
import RenewingSoonBadge from './RenewingSoonBadge';
import ActiveToggle from './ActiveToggle';

export default function SubscriptionRow({ subscription, onToggleStatus, onDelete, onEdit }) {
  const isRenewingSoon =
    subscription.days_until_renewal !== null &&
    subscription.days_until_renewal >= 0 &&
    subscription.days_until_renewal <= 7 &&
    subscription.status === 'active';

  const isPaused = subscription.status === 'paused';

  const formatDate = (dateStr) => {
    try {
      return format(parseISO(dateStr), 'MMM d, yyyy');
    } catch {
      return dateStr;
    }
  };

  const formatCost = (cost) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cost);
  };

  return (
    <div
      className={`group grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all hover:bg-[var(--background-secondary)]/50 cursor-pointer ${
        isPaused ? 'opacity-50' : ''
      } ${isRenewingSoon ? 'border-l-4 border-[var(--warning)]' : ''}`}
      onClick={() => onEdit(subscription)}
    >
      {/* Service Name */}
      <div className="col-span-3 flex items-center gap-2">
        <span className="font-medium text-[var(--text-primary)]">
          {subscription.service_name}
        </span>
        {isRenewingSoon && (
          <RenewingSoonBadge daysLeft={subscription.days_until_renewal} />
        )}
      </div>

      {/* Cost */}
      <div className="col-span-2">
        <span className="text-[var(--text-primary)]">
          {formatCost(subscription.cost)}
        </span>
        <span className="text-xs text-[var(--text)] ml-1">
          /{subscription.billing_cycle === 'monthly' ? 'mo' : 'yr'}
        </span>
      </div>

      {/* Billing Cycle */}
      <div className="col-span-2">
        <span className="text-sm text-[var(--text)] capitalize">
          {subscription.billing_cycle}
        </span>
      </div>

      {/* Next Renewal */}
      <div className="col-span-2">
        {subscription.next_renewal_date && (
          <span className="text-sm text-[var(--text)]">
            {formatDate(subscription.next_renewal_date)}
          </span>
        )}
      </div>

      {/* Status Toggle (stop propagation) */}
      <div className="col-span-2" onClick={(e) => e.stopPropagation()}>
        <ActiveToggle
          isActive={subscription.status === 'active'}
          onToggle={() => onToggleStatus(subscription.id, { status: subscription.status === 'active' ? 'paused' : 'active' })}
        />
      </div>

      {/* Actions (stop propagation) */}
      <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => onEdit(subscription)}
          className="p-2 text-[var(--text)] hover:text-[var(--primary)] transition-colors rounded-lg hover:bg-[var(--primary)]/10"
          title="Edit subscription"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(subscription)}
          className="p-2 text-[var(--text)] hover:text-[var(--danger)] transition-colors rounded-lg hover:bg-[var(--danger)]/10"
          title="Delete subscription"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
