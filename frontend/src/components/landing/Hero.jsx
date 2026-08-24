export default function Hero({ onCTAClick }) {
  return (
    <section className="px-6 pt-16 pb-24 max-w-6xl mx-auto text-center">
      {/* Eyebrow */}
      <span className="inline-block text-xs font-medium tracking-widest text-[var(--primary)] mb-6 uppercase">
        Personal Finance / SaaS Spend
      </span>

      {/* H1 */}
      <h1 className="text-4xl md:text-5xl font-semibold text-[var(--text-primary)] leading-tight tracking-tight mb-6">
        Stop losing track of what you're paying for.
      </h1>

      {/* Subhead */}
      <p className="text-lg text-[var(--text)] max-w-2xl mx-auto mb-10 leading-relaxed">
        Burnwatch aggregates every SaaS tool and streaming subscription you pay for into one
        dashboard — so you always know your monthly burn rate and never get blindsided by a
        renewal.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button onClick={onCTAClick} className="btn-primary text-base px-6 py-3">
          Add Your First Subscription →
        </button>
        <a
          href="#how-it-works"
          className="text-sm text-[var(--text)] hover:text-[var(--text-primary)] inline-flex items-center gap-1"
        >
          See how it works ↓
        </a>
      </div>
    </section>
  );
}
