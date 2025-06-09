'use client';

import { useAuthRouting } from '../../hooks/useAuthRouting';
import LoadingScreen from '../../components/LoadingScreen';
import ManagementDashboardWithSidebar from '../../components/ManagementDashboardWithSidebar';

export default function ManagementDashboard() {
  const { user, loading, handleLogout } = useAuthRouting();

  if (loading || !user) {
    return <LoadingScreen />;
  }

  return (
    <ManagementDashboardWithSidebar 
      user={user}
      onLogout={handleLogout}
    />
  );
}