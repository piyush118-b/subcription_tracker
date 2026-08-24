import { createContext, useContext, useState, useCallback } from 'react';
import { subscriptionsApi } from '../api/subscriptions';

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await subscriptionsApi.getAll();
      setSubscriptions(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch subscriptions');
      console.error('Error fetching subscriptions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addSubscription = async (subscription) => {
    const newSub = await subscriptionsApi.create(subscription);
    setSubscriptions((prev) => [newSub, ...prev]);
    return newSub;
  };

  const updateSubscription = async (id, updates) => {
    const updated = await subscriptionsApi.update(id, updates);
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? updated : sub))
    );
    return updated;
  };

  const deleteSubscription = async (id) => {
    await subscriptionsApi.delete(id);
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
  };

  const value = {
    subscriptions,
    loading,
    error,
    fetchSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptionContext() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptionContext must be used within SubscriptionProvider');
  }
  return context;
}
