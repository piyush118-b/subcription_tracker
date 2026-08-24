import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Subscription } from '../lib/supabase';

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    billing_cycle: 'monthly' as const,
    start_date: '',
    category: '',
    description: '',
  });

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('subscriptions').insert([
        {
          name: formData.name,
          amount: parseFloat(formData.amount),
          billing_cycle: formData.billing_cycle,
          start_date: formData.start_date,
          category: formData.category,
          description: formData.description || null,
        },
      ]);

      if (error) throw error;
      setShowForm(false);
      setFormData({
        name: '',
        amount: '',
        billing_cycle: 'monthly',
        start_date: '',
        category: '',
        description: '',
      });
      fetchSubscriptions();
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('subscriptions').delete().eq('id', id);
      if (error) throw error;
      fetchSubscriptions();
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };

  const totalMonthly = subscriptions.reduce((acc, sub) => {
    if (sub.billing_cycle === 'monthly') return acc + sub.amount;
    if (sub.billing_cycle === 'yearly') return acc + sub.amount / 12;
    if (sub.billing_cycle === 'weekly') return acc + sub.amount * 4.33;
    return acc;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--text)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-[var(--text-primary)]">
              Subscription Tracker
            </h1>
            <p className="text-[var(--text)] mt-1">Manage your subscriptions in one place</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : 'Add Subscription'}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card p-6">
            <p className="text-[var(--text)] text-sm">Total Subscriptions</p>
            <p className="text-3xl font-semibold text-[var(--text-primary)] mt-2">
              {subscriptions.length}
            </p>
          </div>
          <div className="card p-6">
            <p className="text-[var(--text)] text-sm">Monthly Cost</p>
            <p className="text-3xl font-semibold text-[var(--primary)] mt-2">
              ${totalMonthly.toFixed(2)}
            </p>
          </div>
          <div className="card p-6">
            <p className="text-[var(--text)] text-sm">Yearly Cost</p>
            <p className="text-3xl font-semibold text-[var(--warning)] mt-2">
              ${(totalMonthly * 12).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              Add New Subscription
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--text)] text-sm mb-1">Name</label>
                  <input
                    type="text"
                    required
                    className="input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Netflix, Spotify, etc."
                  />
                </div>
                <div>
                  <label className="block text-[var(--text)] text-sm mb-1">Amount ($)</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    className="input"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="9.99"
                  />
                </div>
                <div>
                  <label className="block text-[var(--text)] text-sm mb-1">Billing Cycle</label>
                  <select
                    className="input"
                    value={formData.billing_cycle}
                    onChange={(e) =>
                      setFormData({ ...formData, billing_cycle: e.target.value as any })
                    }
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--text)] text-sm mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    className="input"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[var(--text)] text-sm mb-1">Category</label>
                  <input
                    type="text"
                    required
                    className="input"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Entertainment, Productivity, etc."
                  />
                </div>
                <div>
                  <label className="block text-[var(--text)] text-sm mb-1">Description (Optional)</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Additional notes..."
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary">
                  Add Subscription
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text)] hover:bg-[var(--card)] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Subscriptions List */}
        <div className="card">
          <div className="p-6 border-b border-[var(--border)]">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              Your Subscriptions
            </h2>
          </div>
          {subscriptions.length === 0 ? (
            <div className="p-12 text-center text-[var(--text)]">
              No subscriptions yet. Add your first one!
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-6 flex items-center justify-between hover:bg-[var(--background-secondary)] transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-[var(--text-primary)]">{sub.name}</h3>
                    <p className="text-sm text-[var(--text)] mt-1">
                      {sub.category} • {sub.billing_cycle} • Started {sub.start_date}
                    </p>
                    {sub.description && (
                      <p className="text-sm text-[var(--text-secondary)] mt-1">
                        {sub.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xl font-semibold text-[var(--primary)]">
                        ${sub.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-[var(--text)]">/{sub.billing_cycle}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(sub.id)}
                      className="btn-danger text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
