import PortalSection from './PortalSection';

const WelcomeScreen = ({ onEmployeeLogin, onEmployeeSignup, onManagementLogin, onManagementSignup }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Employee Management System
            </h1>
            <p className="text-gray-600">
              Please choose your login type
            </p>
          </div>
          
          {/* Login Options */}
          <div className="space-y-8">
            <PortalSection
              title="Employee Portal"
              onLogin={onEmployeeLogin}
              onSignup={onEmployeeSignup}
              loginVariant="primary"
              signupVariant="secondary"
            />

            <PortalSection
              title="Management Portal"
              onLogin={onManagementLogin}
              onSignup={onManagementSignup}
              loginVariant="success"
              signupVariant="successSecondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;