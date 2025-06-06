import Button from './Button';

const PortalSection = ({ 
  title, 
  onLogin, 
  onSignup, 
  loginVariant = 'primary',
  signupVariant = 'primary'
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={onLogin}
          variant={loginVariant}
          className="w-full"
        >
          Login
        </Button>
        <Button 
          onClick={onSignup}
          variant={signupVariant}
          className="w-full"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default PortalSection;