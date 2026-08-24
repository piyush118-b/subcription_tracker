import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { subscriptionsApi } from '../api/subscriptions';
import BillingCycleSelect from '../components/form/BillingCycleSelect';
import RenewalDatePicker from '../components/form/RenewalDatePicker';

export default function OnboardingForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    service_name: '',
    cost: '',
    billing_cycle: 'monthly',
    next_renewal_date: '',
  });
  const [errors, setErrors] = useState({});

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
    } else {
      const selectedDate = new Date(formData.next_renewal_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.next_renewal_date = 'Renewal date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await subscriptionsApi.create({
        service_name: formData.service_name.trim(),
        cost: parseFloat(formData.cost),
        billing_cycle: formData.billing_cycle,
        next_renewal_date: formData.next_renewal_date,
      });

      toast.success('Subscription added successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast.error(error.response?.data?.error || 'Failed to add subscription');
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
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-[var(--text)] hover:text-[var(--text-primary)] mb-4 inline-flex items-center gap-1"
          >
            ← Back to home
          </button>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            Add Your Subscription
          </h1>
          <p className="text-[var(--text)] mt-2">
            Enter the details below to start tracking
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
              Service Name
            </label>
            <input
              type="text"
              value={formData.service_name}
              onChange={(e) => handleChange('service_name', e.target.value)}
              placeholder="Netflix, Spotify, Figma..."
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
              <span className="absolute left-3 text-sm font-medium text-[var(--text)] pointer-events-none select-none">
                $
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.cost}
                onChange={(e) => handleChange('cost', e.target.value)}
                placeholder="9.99"
                className={`input !pl-8 ${errors.cost ? 'border-[var(--danger)]' : ''}`}
              />
            </div>
            {errors.cost && (
              <p className="text-sm text-[var(--danger)] mt-1">{errors.cost}</p>
            )}
          </div>

          {/* Billing Cycle */}
          <BillingCycleSelect
            value={formData.billing_cycle}
            onChange={(value) => handleChange('billing_cycle', value)}
          />

          {/* Renewal Date */}
          <RenewalDatePicker
            value={formData.next_renewal_date}
            onChange={(value) => handleChange('next_renewal_date', value)}
            error={errors.next_renewal_date}
            billingCycle={formData.billing_cycle}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add Subscription'}
          </button>
        </form>
      </div>
    </div>
  );
}
