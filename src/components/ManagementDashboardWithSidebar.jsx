"use client";

import { useState } from "react";
import { FaUsers, FaProjectDiagram, FaUserCog } from "react-icons/fa";
import SidebarLayout from "./SidebarLayout";
import ManagementDetails from "./ManagementDetails";
import AllEmployees from "./AllEmployees";
import ProjectsManagement from "./ProjectsManagement";

const ManagementDashboardWithSidebar = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState("dashboard");

  const menuItems = [
    {
      key: "details",
      label: "Add/Update Details",
      icon: <FaUserCog />,
    },
    {
      key: "employees",
      label: "View All Employees",
      icon: <FaUsers />,
    },
    {
      key: "projects",
      label: "Create/View Projects",
      icon: <FaProjectDiagram />,
    },
  ];

  const handleItemClick = (key) => {
    setCurrentView(key);
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  const handleEditProfile = () => {
    // For management, this does nothing or shows a message
    // since edit profile is disabled for management
  };

  const renderContent = () => {
    switch (currentView) {
      case "details":
        return <ManagementDetails user={user} onBack={handleBackToDashboard} />;
      case "employees":
        return <AllEmployees user={user} onBack={handleBackToDashboard} />;
      case "projects":
        return (
          <ProjectsManagement user={user} onBack={handleBackToDashboard} />
        );
      default:
        return (
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Welcome, {user?.firstName || user?.email}!
                  </h1>
                  <p className="text-lg text-gray-600">Management Dashboard</p>
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

export default ManagementDashboardWithSidebar;
