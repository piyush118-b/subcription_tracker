import { format, parseISO } from 'date-fns';
import RenewingSoonBadge from './RenewingSoonBadge';
import ActiveToggle from './ActiveToggle';

export default function SubscriptionRow({ subscription, onToggleStatus }) {
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
      className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors ${
        isPaused ? 'opacity-50' : ''
      } ${isRenewingSoon ? 'border-l-4 border-[var(--warning)]' : ''}`}
      style={isRenewingSoon ? { borderLeftWidth: '4px' } : {}}
    >
      {/* Service Name */}
      <div className="col-span-3">
        <span className="font-medium text-[var(--text-primary)]">
          {subscription.service_name}
        </span>
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
        {isRenewingSoon && (
          <RenewingSoonBadge daysLeft={subscription.days_until_renewal} />
        )}
      </div>

      {/* Status */}
      <div className="col-span-2">
        <ActiveToggle
          isActive={subscription.status === 'active'}
          onToggle={() =>
            onToggleStatus(subscription.id, {
              status: subscription.status === 'active' ? 'paused' : 'active',
            })
          }
        />
      </div>

      {/* Delete placeholder */}
      <div className="col-span-1 text-right">
        <span className="text-xs text-[var(--text)]">
          {isRenewingSoon ? '⚠️' : ''}
        </span>
      </div>
    </div>
  );
}
