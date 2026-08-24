export function SkeletonCard() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="h-4 bg-[var(--card-border)] rounded w-1/3 mb-3"></div>
      <div className="h-8 bg-[var(--card-border)] rounded w-1/2"></div>
      <div className="h-3 bg-[var(--card-border)] rounded w-1/4 mt-2"></div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[var(--background-secondary)] border-b border-[var(--border)]">
        <div className="col-span-3 h-3 bg-[var(--card-border)] rounded"></div>
        <div className="col-span-2 h-3 bg-[var(--card-border)] rounded"></div>
        <div className="col-span-2 h-3 bg-[var(--card-border)] rounded"></div>
        <div className="col-span-2 h-3 bg-[var(--card-border)] rounded"></div>
        <div className="col-span-2 h-3 bg-[var(--card-border)] rounded"></div>
        <div className="col-span-1 h-3 bg-[var(--card-border)] rounded"></div>
      </div>
      {/* Rows */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[var(--border)] last:border-0">
          <div className="col-span-3 h-4 bg-[var(--card-border)] rounded"></div>
          <div className="col-span-2 h-4 bg-[var(--card-border)] rounded"></div>
          <div className="col-span-2 h-4 bg-[var(--card-border)] rounded"></div>
          <div className="col-span-2 h-4 bg-[var(--card-border)] rounded"></div>
          <div className="col-span-2 h-4 bg-[var(--card-border)] rounded"></div>
          <div className="col-span-1 h-4 bg-[var(--card-border)] rounded"></div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="space-y-8">
      {/* Metrics Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonCard />
        <SkeletonCard />
      </div>
      {/* Table Skeleton */}
      <SkeletonTable />
    </div>
  );
}
