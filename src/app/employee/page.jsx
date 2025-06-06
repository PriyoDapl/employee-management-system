'use client';

import { useAuthRouting } from '../../hooks/useAuthRouting';
import LoadingScreen from '../../components/LoadingScreen';
import Dashboard from '../../components/Dashboard';

export default function EmployeeDashboard() {
  const { user, loading, handleLogout } = useAuthRouting();

  if (loading || !user) {
    return <LoadingScreen />;
  }

  return (
    <Dashboard 
      user={user}
      title="Employee Dashboard"
      onLogout={handleLogout}
    />
  );
}