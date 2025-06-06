'use client';

import { useState, useEffect } from 'react';
import { API_ROUTES } from '../lib/routes';

const UsersList = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token');
          return;
        }

        const response = await fetch(API_ROUTES.MANAGEMENT.USERS, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const userData = await response.json();
        setUsers(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if user is management
    if (user?.role === 'management') {
      fetchUsers();
    } else {
      setLoading(false);
      setError('Access denied');
    }
  }, [user]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Users Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b text-left">Email</th>
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Role</th>
              <th className="px-4 py-2 border-b text-left">Status</th>
              <th className="px-4 py-2 border-b text-left">Employee ID</th>
              <th className="px-4 py-2 border-b text-left">Department</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userData) => (
              <tr key={userData._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{userData.email}</td>
                <td className="px-4 py-2 border-b">
                  {userData.firstName || userData.lastName 
                    ? `${userData.firstName} ${userData.lastName}`.trim()
                    : 'N/A'
                  }
                </td>
                <td className="px-4 py-2 border-b">
                  <span className={`px-2 py-1 rounded text-sm ${
                    userData.role === 'management' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {userData.role}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <span className={`px-2 py-1 rounded text-sm ${
                    userData.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {userData.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  {userData.employeeData?.employeeId || 'N/A'}
                </td>
                <td className="px-4 py-2 border-b">
                  {userData.employeeData?.department || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersList;