'use client';

import { useState } from 'react';
import { 
  Sidebar, 
  Menu, 
  MenuItem, 
  SubMenu,
  sidebarClasses 
} from 'react-pro-sidebar';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaProjectDiagram, 
  FaUserCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaTasks,
  FaEdit,
  FaChartBar,
  FaCalendar,
  FaBell,
  FaFileAlt,
  FaCog,
  FaChevronDown
} from 'react-icons/fa';
import Header from './Header';

const SidebarLayout = ({ 
  children, 
  user, 
  onLogout, 
  menuItems = [], 
  activeItem = 'dashboard',
  onItemClick = () => {},
  onEditProfile = () => {}
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleMenuItemClick = (key) => {
    onItemClick(key);
    // Auto-close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      setToggled(false);
    }
  };

  const handleEditProfile = () => {
    // For employees, navigate to edit profile
    if (user?.role === 'employee') {
      onEditProfile();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        breakPoint="md"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: '#1f2937',
            color: '#ffffff',
          },
        }}
        className="border-r border-gray-200"
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-600">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-bold text-white">
                  Employee Management
                </h3>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded hover:bg-gray-600 transition-colors hidden md:block"
            >
              {collapsed ? <FaBars size={14} /> : <FaTimes size={14} />}
            </button>
          </div>
        </div>

        {/* Menu */}
        <Menu
          menuItemStyles={{
            button: ({ level, active }) => ({
              backgroundColor: active ? '#3b82f6' : 'transparent',
              color: active ? '#ffffff' : '#d1d5db',
              '&:hover': {
                backgroundColor: '#374151',
                color: '#ffffff',
              },
              padding: '12px 20px',
            }),
            icon: {
              color: 'inherit',
            },
            subMenuContent: {
              backgroundColor: '#1f2937',
            },
          }}
        >
          {/* Dashboard */}
          <MenuItem
            icon={<FaTachometerAlt />}
            active={activeItem === 'dashboard'}
            onClick={() => handleMenuItemClick('dashboard')}
          >
            Dashboard
          </MenuItem>

          {/* Dynamic Menu Items */}
          {menuItems.map((item) => (
            <MenuItem
              key={item.key}
              icon={item.icon}
              active={activeItem === item.key}
              onClick={() => handleMenuItemClick(item.key)}
            >
              {item.label}
            </MenuItem>
          ))}

          {/* Reports Dropdown */}
          <SubMenu 
            icon={<FaChartBar />} 
            label="Reports"
          >
            <MenuItem icon={<FaFileAlt />}>Monthly Report</MenuItem>
            <MenuItem icon={<FaCalendar />}>Attendance Report</MenuItem>
            <MenuItem icon={<FaChartBar />}>Performance Report</MenuItem>
          </SubMenu>

          {/* Other Dummy Items */}
          <MenuItem
            icon={<FaBell />}
          >
            Notifications
          </MenuItem>

          <MenuItem
            icon={<FaCalendar />}
          >
            Calendar
          </MenuItem>

          <MenuItem
            icon={<FaCog />}
          >
            Settings
          </MenuItem>
        </Menu>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          user={user}
          onLogout={onLogout}
          onEditProfile={handleEditProfile}
          onToggleSidebar={() => setToggled(!toggled)}
          showMobileToggle={true}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
