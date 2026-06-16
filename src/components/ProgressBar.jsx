import React from 'react';

const ProgressBar = ({ progress, className = '' }) => (
  <div className={`h-2 w-full overflow-hidden rounded-full bg-gray-800 ${className}`}>
    <div className="h-full rounded-full bg-yellow-500 transition-all duration-300" style={{ width: `${progress}%` }} />
  </div>
);

export default ProgressBar;
