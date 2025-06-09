'use client';

import { useAuthRouting } from '../../hooks/useAuthRouting';
import LoadingScreen from '../../components/LoadingScreen';
import EmployeeDashboardWithSidebar from '../../components/EmployeeDashboardWithSidebar';

export default function EmployeePage() {
  const { user, loading, handleLogout } = useAuthRouting();

  if (loading || !user) {
    return <LoadingScreen />;
  }

  return (
    <EmployeeDashboardWithSidebar 
      user={user}
      onLogout={handleLogout}
    />
  );
}