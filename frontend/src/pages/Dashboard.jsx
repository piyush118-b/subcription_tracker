import { useEffect } from 'react';
import { useSubscriptionContext } from '../context/SubscriptionContext';
import { useMetrics } from '../hooks/useMetrics';
import MetricCard from '../components/metrics/MetricCard';
import BurnRateCard from '../components/metrics/BurnRateCard';
import UpcomingRenewalsCard from '../components/metrics/UpcomingRenewalsCard';
import SubscriptionTable from '../components/grid/SubscriptionTable';

export default function Dashboard() {
  const { subscriptions, loading, error, fetchSubscriptions, updateSubscription } =
    useSubscriptionContext();
  const metrics = useMetrics(subscriptions);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  if (loading && subscriptions.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-[var(--text)]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-[var(--danger)]">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="px-6 py-5 border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xl font-semibold text-[var(--text-primary)] tracking-tight">
            Burnwatch
          </div>
          <div className="text-sm text-[var(--text)]">
            {metrics.activeCount} active subscription{metrics.activeCount !== 1 ? 's' : ''}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Metrics Row */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <BurnRateCard amount={metrics.totalMonthlyBurnRate} />
          <UpcomingRenewalsCard count={metrics.upcomingRenewalsCount} />
        </section>

        {/* Subscription Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-[var(--text-primary)]">
              Your Subscriptions
            </h2>
          </div>
          <SubscriptionTable
            subscriptions={subscriptions}
            onToggleStatus={updateSubscription}
          />
        </section>
      </main>
    </div>
  );
}
