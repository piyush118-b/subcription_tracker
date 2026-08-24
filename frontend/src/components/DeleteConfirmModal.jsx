import toast from 'react-hot-toast';

export default function DeleteConfirmModal({ subscription, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Delete Subscription?
        </h3>
        <p className="text-[var(--text)] mb-6">
          Are you sure you want to delete <span className="font-medium text-[var(--text-primary)]">{subscription?.service_name}</span>?
          This action cannot be undone.
        </p>

        <div className="flex items-center gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-[var(--text)] hover:text-[var(--text-primary)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-danger text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
