export default function CTASection({ onStartClick }) {
  return (
    <section id="how-it-works" className="px-6 py-24 max-w-6xl mx-auto text-center">
      {/* How it works steps */}
      <div className="mb-16">
        <h3 className="text-sm font-medium tracking-widest text-[var(--text)] uppercase mb-8">
          How it works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="flex flex-col items-start">
            <span className="text-5xl font-bold text-[var(--card-border)] mb-4">01</span>
            <h4 className="text-lg font-medium text-[var(--text-primary)] mb-2">
              Add a subscription
            </h4>
            <p className="text-sm text-[var(--text)]">
              Enter the service, cost, and billing cycle in seconds.
            </p>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-5xl font-bold text-[var(--card-border)] mb-4">02</span>
            <h4 className="text-lg font-medium text-[var(--text-primary)] mb-2">
              We normalize the math
            </h4>
            <p className="text-sm text-[var(--text)]">
              Yearly plans are converted to a true monthly cost automatically.
            </p>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-5xl font-bold text-[var(--card-border)] mb-4">03</span>
            <h4 className="text-lg font-medium text-[var(--text-primary)] mb-2">
              Track burn & renewals
            </h4>
            <p className="text-sm text-[var(--text)]">
              See total monthly spend and get flagged the moment a renewal is within 7 days.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-6">
        Know exactly what you're burning every month.
      </h2>
      <button onClick={onStartClick} className="btn-primary text-base px-8 py-3">
        Get Started — It's Free
      </button>
    </section>
  );
}
