import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SubscriptionProvider } from './context/SubscriptionContext';
import LandingPage from './pages/LandingPage';
import OnboardingForm from './pages/OnboardingForm';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <SubscriptionProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/add" element={<OnboardingForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--card-border)',
            },
            success: {
              iconTheme: {
                primary: 'var(--positive)',
                secondary: 'white',
              },
            },
            error: {
              iconTheme: {
                primary: 'var(--danger)',
                secondary: 'white',
              },
            },
          }}
        />
      </SubscriptionProvider>
    </BrowserRouter>
  );
}

export default App;
