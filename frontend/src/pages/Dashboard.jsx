import { useEffect, useState } from 'react';
import { useSubscriptionContext } from '../context/SubscriptionContext';
import { useMetrics } from '../hooks/useMetrics';
import BurnRateCard from '../components/metrics/BurnRateCard';
import UpcomingRenewalsCard from '../components/metrics/UpcomingRenewalsCard';
import SubscriptionTable from '../components/grid/SubscriptionTable';
import EmptyState from '../components/EmptyState';
import { SkeletonDashboard } from '../components/Skeleton';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

export default function Dashboard() {
  const { subscriptions, loading, error, fetchSubscriptions, updateSubscription, deleteSubscription } =
    useSubscriptionContext();
  const metrics = useMetrics(subscriptions);
  const [deleteModal, setDeleteModal] = useState({ open: false, subscription: null });

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const handleDeleteClick = (subscription) => {
    setDeleteModal({ open: true, subscription });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteSubscription(deleteModal.subscription.id);
      setDeleteModal({ open: false, subscription: null });
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  if (loading && subscriptions.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <header className="px-6 py-5 border-b border-[var(--border)]">
          <div className="max-w-6xl mx-auto">
            <div className="h-7 w-32 bg-[var(--card-border)] rounded animate-pulse"></div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-6 py-8">
          <SkeletonDashboard />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--danger)] mb-4">Error: {error}</p>
          <button onClick={fetchSubscriptions} className="btn-primary">
            Retry
          </button>
        </div>
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

          {subscriptions.length === 0 ? (
            <EmptyState />
          ) : (
            <SubscriptionTable
              subscriptions={subscriptions}
              onToggleStatus={updateSubscription}
              onDelete={handleDeleteClick}
            />
          )}
        </section>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <DeleteConfirmModal
          subscription={deleteModal.subscription}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteModal({ open: false, subscription: null })}
        />
      )}
    </div>
  );
}
