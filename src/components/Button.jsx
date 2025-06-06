const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  type = 'button',
  className = ''
}) => {
  const baseClasses = "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 transition-all hover:shadow-xl",
    secondary: "bg-white text-gray-800 hover:bg-blue-100 transition-all focus-none hover:shadow-md",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    successSecondary: "border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  };
  
  const sizes = {
    small: "py-2 px-3 text-sm",
    medium: "py-3 px-4",
    large: "py-4 px-6 text-lg"
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}

export default Button;