import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/landing/Hero';
import FeatureGrid from '../components/landing/FeatureGrid';
import CTASection from '../components/landing/CTASection';
import LoadingScreen from '../components/LoadingScreen';

export default function LandingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Brief loading for premium feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen message="Loading Burnwatch..." />;
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navbar */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo - Clickable to go home */}
        <button
          onClick={() => navigate('/')}
          className="text-xl font-semibold text-[var(--text-primary)] tracking-tight hover:text-[var(--primary)] transition-colors"
        >
          Burnwatch
        </button>

        {/* Nav Links */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-[var(--text)] hover:text-[var(--text-primary)] transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/add')}
            className="btn-primary text-sm"
          >
            Add Subscription
          </button>
        </div>
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
