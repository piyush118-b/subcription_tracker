import { useEffect, useState, useMemo } from 'react';
import { useSubscriptionContext } from '../context/SubscriptionContext';
import { useMetrics } from '../hooks/useMetrics';
import BurnRateCard from '../components/metrics/BurnRateCard';
import UpcomingRenewalsCard from '../components/metrics/UpcomingRenewalsCard';
import SubscriptionTable from '../components/grid/SubscriptionTable';
import SearchSortBar from '../components/grid/SearchSortBar';
import EmptyState from '../components/EmptyState';
import { SkeletonDashboard } from '../components/Skeleton';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import EditSubscriptionModal from '../components/EditSubscriptionModal';

export default function Dashboard() {
  const { subscriptions, loading, error, fetchSubscriptions, updateSubscription, deleteSubscription } =
    useSubscriptionContext();
  const metrics = useMetrics(subscriptions);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [deleteModal, setDeleteModal] = useState({ open: false, subscription: null });
  const [editModal, setEditModal] = useState({ open: false, subscription: null });

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  // Filter and sort subscriptions
  const filteredSubscriptions = useMemo(() => {
    let result = [...subscriptions];

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (sub) =>
          sub.service_name.toLowerCase().includes(query) ||
          sub.billing_cycle.toLowerCase().includes(query) ||
          (sub.description && sub.description.toLowerCase().includes(query))
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'name-asc':
          return a.service_name.localeCompare(b.service_name);
        case 'name-desc':
          return b.service_name.localeCompare(a.service_name);
        case 'cost-high':
          return b.cost - a.cost;
        case 'cost-low':
          return a.cost - b.cost;
        case 'renewal-soon':
          return (a.days_until_renewal ?? Infinity) - (b.days_until_renewal ?? Infinity);
        default:
          return 0;
      }
    });

    return result;
  }, [subscriptions, searchQuery, sortBy]);

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

  const handleEditClick = (subscription) => {
    setEditModal({ open: true, subscription });
  };

  const handleEditSave = (updated) => {
    // Update in context
    updateSubscription(updated.id, updated).catch(console.error);
    setEditModal({ open: false, subscription: null });
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
          {/* Logo - Clickable to go home */}
          <button
            onClick={() => window.location.href = '/'}
            className="text-xl font-semibold text-[var(--text-primary)] tracking-tight hover:text-[var(--primary)] transition-colors"
          >
            Burnwatch
          </button>
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

        {/* Subscription Section */}
        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-4">
            Your Subscriptions
          </h2>

          {subscriptions.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Search and Sort */}
              <SearchSortBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />

              {/* Results count */}
              {searchQuery && (
                <p className="text-sm text-[var(--text)] mb-4">
                  Found {filteredSubscriptions.length} subscription{filteredSubscriptions.length !== 1 ? 's' : ''}
                </p>
              )}

              {/* Table */}
              <SubscriptionTable
                subscriptions={filteredSubscriptions}
                onToggleStatus={updateSubscription}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}
              />

              {filteredSubscriptions.length === 0 && searchQuery && (
                <div className="card p-8 text-center">
                  <p className="text-[var(--text)]">No subscriptions match "{searchQuery}"</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-sm text-[var(--primary)] mt-2 hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </>
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

      {/* Edit Modal */}
      {editModal.open && (
        <EditSubscriptionModal
          subscription={editModal.subscription}
          onSave={handleEditSave}
          onCancel={() => setEditModal({ open: false, subscription: null })}
        />
      )}
    </div>
  );
}
