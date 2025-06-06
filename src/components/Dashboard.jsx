import Button from './Button';

const Dashboard = ({ user, title, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Hello {user?.email}
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome to your {title}
          </p>
          <Button
            onClick={onLogout}
            variant="danger"
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
