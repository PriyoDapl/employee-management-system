'use client';

import Button from './Button';

const AssignedProjects = ({ user, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Assigned Projects
          </h2>
          <Button onClick={onBack} variant="primary">
            Back to Dashboard
          </Button>
        </div>

        <div className="text-center py-12">
          <h3 className="text-xl text-gray-600 mb-4">
            Hello, here lies your projects...
          </h3>
          <p className="text-gray-500">
            Project management functionality will be implemented here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssignedProjects;
