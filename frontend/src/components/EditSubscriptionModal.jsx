import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { subscriptionsApi } from '../api/subscriptions';

export default function EditSubscriptionModal({ subscription, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    service_name: '',
    cost: '',
    billing_cycle: 'monthly',
    next_renewal_date: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (subscription) {
      setFormData({
        service_name: subscription.service_name || '',
        cost: subscription.cost?.toString() || '',
        billing_cycle: subscription.billing_cycle || 'monthly',
        next_renewal_date: subscription.next_renewal_date || '',
        description: subscription.description || '',
      });
    }
  }, [subscription]);

  const validate = () => {
    const newErrors = {};

    if (!formData.service_name || formData.service_name.trim().length < 2) {
      newErrors.service_name = 'Service name must be at least 2 characters';
    }

    const cost = parseFloat(formData.cost);
    if (!formData.cost || isNaN(cost) || cost <= 0) {
      newErrors.cost = 'Cost must be greater than 0';
    }

    if (!formData.next_renewal_date) {
      newErrors.next_renewal_date = 'Renewal date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const updated = await subscriptionsApi.update(subscription.id, {
        service_name: formData.service_name.trim(),
        cost: parseFloat(formData.cost),
        billing_cycle: formData.billing_cycle,
        next_renewal_date: formData.next_renewal_date,
        description: formData.description.trim() || null,
      });
      toast.success(`${formData.service_name} updated!`);
      onSave(updated);
    } catch (error) {
      console.error('Error updating:', error);
      toast.error('Failed to update subscription');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal */}
      <div className="relative bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Edit Subscription
          </h3>
          <button
            onClick={onCancel}
            className="p-1 text-[var(--text)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
              Service Name
            </label>
            <input
              type="text"
              value={formData.service_name}
              onChange={(e) => handleChange('service_name', e.target.value)}
              className={`input ${errors.service_name ? 'border-[var(--danger)]' : ''}`}
            />
            {errors.service_name && (
              <p className="text-sm text-[var(--danger)] mt-1">{errors.service_name}</p>
            )}
          </div>

          {/* Cost */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
              Cost
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-sm font-medium text-[var(--text)]">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.cost}
                onChange={(e) => handleChange('cost', e.target.value)}
                className={`input !pl-8 ${errors.cost ? 'border-[var(--danger)]' : ''}`}
              />
            </div>
            {errors.cost && (
              <p className="text-sm text-[var(--danger)] mt-1">{errors.cost}</p>
            )}
          </div>

          {/* Billing Cycle */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
              Billing Cycle
            </label>
            <select
              value={formData.billing_cycle}
              onChange={(e) => handleChange('billing_cycle', e.target.value)}
              className="input"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* Next Renewal Date */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
              Next Renewal Date
            </label>
            <input
              type="date"
              value={formData.next_renewal_date}
              onChange={(e) => handleChange('next_renewal_date', e.target.value)}
              className={`input ${errors.next_renewal_date ? 'border-[var(--danger)]' : ''}`}
            />
            {errors.next_renewal_date && (
              <p className="text-sm text-[var(--danger)] mt-1">{errors.next_renewal_date}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
              Description (Optional)
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Family plan, Premium, etc."
              className="input"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button type="button" onClick={onCancel} className="flex-1 btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 btn-primary disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
