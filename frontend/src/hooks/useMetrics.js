import { useMemo } from 'react';

export function useMetrics(subscriptions) {
  const metrics = useMemo(() => {
    const activeSubscriptions = subscriptions.filter((sub) => sub.status === 'active');

    const totalMonthlyBurnRate = activeSubscriptions.reduce(
      (sum, sub) => sum + (sub.monthly_normalized_cost || 0),
      0
    );

    const upcomingRenewalsCount = activeSubscriptions.filter(
      (sub) =>
        sub.days_until_renewal !== null &&
        sub.days_until_renewal >= 0 &&
        sub.days_until_renewal <= 7
    ).length;

    return {
      totalMonthlyBurnRate,
      upcomingRenewalsCount,
      activeCount: activeSubscriptions.length,
      totalCount: subscriptions.length,
    };
  }, [subscriptions]);

  return metrics;
}
