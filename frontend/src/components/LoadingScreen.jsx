export default function LoadingScreen({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="text-2xl font-semibold text-[var(--text-primary)] mb-8">
          Burnwatch
        </div>

        {/* Spinner */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Message */}
        <p className="text-sm text-[var(--text)]">{message}</p>
      </div>
    </div>
  );
}
