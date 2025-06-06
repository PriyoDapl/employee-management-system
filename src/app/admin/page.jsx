'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import LoadingScreen from '../../components/LoadingScreen';
import Dashboard from '../../components/Dashboard';

export default function AdminDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'management')) {
      router.push('/');
      return;
    }
  }, [user, loading, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoadingScreen />;
  }

  // For demo purposes - in real app you'd check user.role === 'admin'
  if (user.role !== 'management') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <Dashboard 
      user={user}
      title="Admin Dashboard"
      onLogout={handleLogout}
    />
  );
}
