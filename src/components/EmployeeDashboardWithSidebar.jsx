'use client';

import { useState } from 'react';
import { FaUser, FaTasks } from 'react-icons/fa';
import SidebarLayout from './SidebarLayout';
import EmployeeDetails from './EmployeeDetails';
import AssignedProjects from './AssignedProjects';

const EmployeeDashboardWithSidebar = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');

  const menuItems = [
    {
      key: 'details',
      label: 'Personal Details',
      icon: <FaUser />
    },
    {
      key: 'projects',
      label: 'Assigned Projects',
      icon: <FaTasks />
    }
  ];

  const handleItemClick = (key) => {
    setCurrentView(key);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleEditProfile = () => {
    setCurrentView('details');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'details':
        return <EmployeeDetails user={user} onBack={handleBackToDashboard} />;
      case 'projects':
        return <AssignedProjects user={user} onBack={handleBackToDashboard} />;
      default:
        return (
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Welcome, {user?.firstName || user?.email}!
                  </h1>
                  <p className="text-lg text-gray-600">
                    Employee Dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarLayout
      user={user}
      onLogout={onLogout}
      menuItems={menuItems}
      activeItem={currentView}
      onItemClick={handleItemClick}
      onEditProfile={handleEditProfile}
    >
      {renderContent()}
    </SidebarLayout>
  );
};

export default EmployeeDashboardWithSidebar;
