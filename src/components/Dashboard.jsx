import Button from './Button';
import { useState } from 'react';
import ManagementDetails from './ManagementDetails';
import AllEmployees from './AllEmployees';
import ProjectsManagement from './ProjectsManagement';

const Dashboard = ({ user, title, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');

  const handleAddDetails = () => {
    setCurrentView('details');
  };

  const handleViewEmployees = () => {
    setCurrentView('employees');
  };

  const handleViewProjects = () => {
    setCurrentView('projects');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'details') {
    return <ManagementDetails user={user} onBack={handleBackToDashboard} />;
  }

  if (currentView === 'employees') {
    return <AllEmployees user={user} onBack={handleBackToDashboard} />;
  }

  if (currentView === 'projects') {
    return <ProjectsManagement user={user} onBack={handleBackToDashboard} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Hello {user?.email}
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome to your Management Dashboard
          </p>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={handleAddDetails}
            variant="primary"
            className="w-full"
          >
            Add/Update Details
          </Button>

          <Button
            onClick={handleViewEmployees}
            variant="primary"
            className="w-full"
          >
            View All Employees
          </Button>

          <Button
            onClick={handleViewProjects}
            variant="primary"
            className="w-full"
          >
            Create/View Projects
          </Button>

          <Button
            onClick={onLogout}
            variant="danger"
            className="w-full"
          >
            Logout
          </Button>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
