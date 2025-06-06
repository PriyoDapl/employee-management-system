'use client';

import Button from './Button';

const EmployeeDetailsModal = ({ employee, onClose }) => {
  const employeeData = employee.employeeData || employee;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Employee Details
            </h3>
            <Button onClick={onClose} variant="primary" size="small">
              Close
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee ID
                </label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded">
                  {employeeData.employeeId || 'Not assigned'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded">
                  {employee.email || employeeData.user?.email || 'Not provided'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded">
                  {employee.firstName || employeeData.user?.firstName || 'Not provided'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded">
                  {employee.lastName || employeeData.user?.lastName || 'Not provided'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded">
                  {employeeData.department || 'Not assigned'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded">
                  {employeeData.position || 'Not assigned'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary (in INR)
                </label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded">
                  {employeeData.salary ? `${employeeData.salary}` : 'Not disclosed'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hire Date
                </label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded">
                  {employeeData.hireDate 
                    ? new Date(employeeData.hireDate).toLocaleDateString()
                    : 'Not provided'
                  }
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded">
                  {employeeData.personalInfo?.phone || 'Not provided'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Contact
                </label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded">
                  {employeeData.personalInfo?.emergencyContact?.phone || 'Not provided'}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <p className="text-gray-900 bg-gray-50 p-2 rounded">
                {employeeData.personalInfo?.address?.street || 'Not provided'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </label>
              <div className="bg-gray-50 p-2 rounded">
                {employeeData.skills && employeeData.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {employeeData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-900">No skills listed</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Status
              </label>
              <p className="text-gray-900 bg-gray-50 p-2 rounded">
                {(employee.isActive !== undefined ? employee.isActive : employeeData.isActive) ? 'Active' : 'Inactive'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Created
              </label>
              <p className="text-gray-900 bg-gray-50 p-2 rounded">
                {new Date(employee.createdAt || employeeData.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsModal;
