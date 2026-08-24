import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { subscriptionsApi } from '../api/subscriptions';
import BillingCycleSelect from '../components/form/BillingCycleSelect';
import RenewalDatePicker from '../components/form/RenewalDatePicker';
import LoadingScreen from '../components/LoadingScreen';

export default function OnboardingForm() {
  const navigate = useNavigate();
  const serviceNameRef = useRef(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    service_name: '',
    cost: '',
    billing_cycle: 'monthly',
    next_renewal_date: '',
  });
  const [errors, setErrors] = useState({});

  // Brief loading for premium feel
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
      // Auto-focus on service name field
      if (serviceNameRef.current) {
        serviceNameRef.current.focus();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return <LoadingScreen message="Loading form..." />;
  }

  // Calculate monthly equivalent for yearly plans
  const monthlyEquivalent = formData.billing_cycle === 'yearly' && formData.cost
    ? (parseFloat(formData.cost) / 12).toFixed(2)
    : null;

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

    setSubmitting(true);
    try {
      await subscriptionsApi.create({
        service_name: formData.service_name.trim(),
        cost: parseFloat(formData.cost),
        billing_cycle: formData.billing_cycle,
        next_renewal_date: formData.next_renewal_date,
      });

      toast.success(`${formData.service_name} added successfully!`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast.error(error.response?.data?.error || 'Failed to add subscription');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Handle keyboard shortcut (Enter to submit)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="px-6 py-5 border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo - Clickable to go home */}
          <button
            onClick={() => navigate('/')}
            className="text-xl font-semibold text-[var(--text-primary)] tracking-tight hover:text-[var(--primary)] transition-colors"
          >
            Burnwatch
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-[var(--text)] hover:text-[var(--text-primary)] transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
      </header>

      {/* Form */}
      <div className="flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Form Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            Add Your Subscription
          </h1>
          <p className="text-[var(--text)] mt-2">
            Enter the details below to start tracking
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-5">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
              Service Name
            </label>
            <input
              ref={serviceNameRef}
              type="text"
              value={formData.service_name}
              onChange={(e) => handleChange('service_name', e.target.value)}
              placeholder="Netflix, Spotify, Figma..."
              className={`input ${errors.service_name ? 'border-[var(--danger)]' : ''}`}
              autoComplete="off"
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
            {/* Monthly Preview for Yearly */}
            {monthlyEquivalent && (
              <p className="text-sm text-[var(--positive)] mt-1">
                = ${monthlyEquivalent}/month
              </p>
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
            disabled={submitting}
            className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Adding...' : 'Add Subscription'}
          </button>

          {/* Keyboard hint */}
          <p className="text-xs text-center text-[var(--text)]">
            Press <kbd className="px-1.5 py-0.5 bg-[var(--background-secondary)] rounded border border-[var(--border)]">Enter</kbd> to submit
          </p>
        </form>
        </div>
      </div>
    </div>
  );
}
