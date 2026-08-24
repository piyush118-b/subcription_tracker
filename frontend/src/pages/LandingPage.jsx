import { useNavigate } from 'react-router-dom';
import Hero from '../components/landing/Hero';
import FeatureGrid from '../components/landing/FeatureGrid';
import CTASection from '../components/landing/CTASection';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navbar */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-xl font-semibold text-[var(--text-primary)] tracking-tight">
          Burnwatch
        </div>
        <button
          onClick={() => navigate('/add')}
          className="btn-primary text-sm"
        >
          Track My Subscriptions
        </button>
      </nav>

      {/* Main Content */}
      <main>
        <Hero onCTAClick={() => navigate('/add')} />
        <FeatureGrid />
        <CTASection onStartClick={() => navigate('/add')} />
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-[var(--border)] mt-16">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-[var(--text)]">
          <span className="font-medium text-[var(--text-primary)]">Burnwatch</span>
          <span>Built for people who hate surprise charges.</span>
        </div>
      </footer>
    </div>
  );
}
