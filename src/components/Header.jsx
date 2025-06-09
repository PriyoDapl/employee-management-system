'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  FaUser, 
  FaChevronDown, 
  FaEdit, 
  FaCog, 
  FaSignOutAlt, 
  FaBars 
} from 'react-icons/fa';

const Header = ({ user, onLogout, onEditProfile, onToggleSidebar, showMobileToggle = false }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEditProfile = () => {
    setDropdownOpen(false);
    if (onEditProfile) {
      onEditProfile();
    }
  };

  const handleAccountSettings = () => {
    setDropdownOpen(false);
    // For now, this is just a placeholder
    alert('Account Settings - Coming Soon!');
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    onLogout();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile toggle (if needed) */}
        <div className="flex items-center">
          {showMobileToggle && (
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 md:hidden"
            >
              <FaBars className="text-gray-600" />
            </button>
          )}
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-gray-900">
              {user?.role === 'management' ? 'Management' : 'Employee'} Dashboard
            </h1>
          </div>
        </div>

        {/* Right side - Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-sm" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName || user?.email}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role || 'User'}
              </p>
            </div>
            <FaChevronDown 
              className={`text-gray-400 text-sm transition-transform ${
                dropdownOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <FaUser className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName || user?.email}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user?.role || 'User'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Role */}
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Role</p>
                  <p className="text-sm text-gray-900 capitalize">{user?.role || 'User'}</p>
                </div>

                {/* Email */}
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                  <p className="text-sm text-gray-900">{user?.email}</p>
                </div>

                {/* Actions */}
                <div className="py-1">
                  {/* Edit Profile - Only show for employees */}
                  {user?.role === 'employee' && (
                    <button
                      onClick={handleEditProfile}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
                    >
                      <FaEdit className="text-gray-400" />
                      <span>Edit Profile</span>
                    </button>
                  )}

                  {/* Account Settings - Disabled for management */}
                  <button
                    onClick={handleAccountSettings}
                    disabled={user?.role === 'management'}
                    className={`flex items-center space-x-3 px-4 py-2 text-sm w-full text-left transition-colors ${
                      user?.role === 'management'
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FaCog className="text-gray-400" />
                    <span>Account Settings</span>
                    {user?.role === 'management' && (
                      <span className="text-xs text-gray-400 ml-auto">Disabled</span>
                    )}
                  </button>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left transition-colors"
                  >
                    <FaSignOutAlt className="text-red-500" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
