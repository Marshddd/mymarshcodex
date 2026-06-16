import React from 'react';

const Input = ({ label, type = 'text', placeholder, value, onChange, className = '', error = '' }) => (
  <label className={`block ${className}`}>
    {label && <span className="mb-2 block text-sm font-medium text-gray-300">{label}</span>}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border ${error ? 'border-red-500' : 'border-gray-700'} bg-gray-800 px-4 py-3 text-white outline-none transition-colors focus:border-blue-500`}
    />
    {error && <span className="mt-1 block text-sm text-red-400">{error}</span>}
  </label>
);

export default Input;
