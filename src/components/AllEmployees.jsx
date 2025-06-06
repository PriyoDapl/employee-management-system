'use client';

import { useState, useEffect } from 'react';
import Button from './Button';
import EmployeeDetailsModal from './EmployeeDetailsModal';

const AllEmployees = ({ user, onBack }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token');
        return;
      }

      const response = await fetch('/api/management/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const userData = await response.json();
      // Filter only employees
      const employeeData = userData.filter(user => user.role === 'employee');
      setEmployees(employeeData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            All Employees
          </h2>
          <Button onClick={onBack} variant="primary">
            Back to Dashboard
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {employees.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No employees found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <div
                key={employee._id}
                onClick={() => handleEmployeeClick(employee)}
                className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {employee.employeeData?.employeeId || 'No Employee ID'}
                  </h3>
                  <p className="text-gray-700 font-medium mb-1">
                    {employee.firstName && employee.lastName 
                      ? `${employee.firstName} ${employee.lastName}`
                      : 'Name not provided'
                    }
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    {employee.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    Click to view details
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedEmployee && (
          <EmployeeDetailsModal
            employee={selectedEmployee}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default AllEmployees;
