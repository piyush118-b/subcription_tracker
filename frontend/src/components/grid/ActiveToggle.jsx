import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ActiveToggle({ isActive, onToggle }) {
  const [toggling, setToggling] = useState(false);

  const handleToggle = async () => {
    if (toggling) return;

    setToggling(true);
    // Optimistic UI update
    const previousState = isActive;

    try {
      await onToggle();
      toast.success(isActive ? 'Subscription paused' : 'Subscription activated');
    } catch (error) {
      // Revert on failure
      toast.error('Failed to update status');
    } finally {
      setToggling(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={toggling}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)] ${
        isActive ? 'bg-[var(--positive)]' : 'bg-[var(--card-border)]'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isActive ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
