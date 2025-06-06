'use client';

import { useAuthRouting } from '../hooks/useAuthRouting';
import LoadingScreen from '../components/LoadingScreen';
import LandingPage from '../components/LandingPage';

export default function Home() {
  const { user, loading, handleAuthSuccess } = useAuthRouting();

  if (loading) {
    return <LoadingScreen />;
  }

  // If user is authenticated, useAuthRouting will handle redirect. But here in this page the component only renders for unauthenticated users
  if (user) {
    return <LoadingScreen />; // Brief loading while redirect happens
  }

  return <LandingPage onAuthSuccess={handleAuthSuccess} />;
}
