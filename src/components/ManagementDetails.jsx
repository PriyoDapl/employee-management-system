'use client';

import Button from './Button';

const ManagementDetails = ({ user, onBack }) => {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Management Details
            </h2>
            <Button onClick={onBack} variant="primary">
              Back to Dashboard
            </Button>
          </div>

          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600 mb-4">
              This may get implemented some day
            </h3>
            <p className="text-gray-500">
              Management profile functionality will be added in future updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementDetails;
