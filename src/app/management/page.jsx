'use client';

import { useAuthRouting } from '../../hooks/useAuthRouting';
import LoadingScreen from '../../components/LoadingScreen';
import Dashboard from '../../components/Dashboard';

export default function ManagementDashboard() {
  const { user, loading, handleLogout } = useAuthRouting();

  if (loading || !user) {
    return <LoadingScreen />;
  }

  return (
    <Dashboard 
      user={user}
      title="Management Dashboard"
      onLogout={handleLogout}
    />
  );
}