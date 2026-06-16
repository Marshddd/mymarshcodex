import React from 'react';

const Card = ({ children, className = '', onClick }) => (
  <section
    onClick={onClick}
    className={`rounded-lg border border-gray-800 bg-gray-900/70 p-5 ${onClick ? 'cursor-pointer hover:border-blue-500/70' : ''} ${className}`}
  >
    {children}
  </section>
);

export default Card;
