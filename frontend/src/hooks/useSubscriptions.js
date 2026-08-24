import { useEffect } from 'react';
import { useSubscriptionContext } from '../context/SubscriptionContext';

export function useSubscriptions() {
  const {
    subscriptions,
    loading,
    error,
    fetchSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
  } = useSubscriptionContext();

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  return {
    subscriptions,
    loading,
    error,
    refetch: fetchSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
  };
}
