import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
  const baseStyles = 'px-5 py-3 rounded-lg font-medium transition-colors duration-200';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    danger: 'bg-red-600 hover:bg-red-500 text-white',
    outline: 'border border-blue-500 text-blue-300 hover:bg-blue-500/10',
    ghost: 'text-gray-200 hover:bg-gray-800',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
