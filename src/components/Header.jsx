import React from 'react';

const Header = ({ title, onNavigate, showBackButton = false, backTo = 'lesson-list', user }) => (
  <header className="flex items-center justify-between border-b border-gray-800 bg-gray-950 px-4 py-4 sm:px-6">
    <div className="flex min-w-0 items-center gap-3">
      {showBackButton && (
        <button
          onClick={() => onNavigate(backTo)}
          className="rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800"
        >
          กลับ
        </button>
      )}
      <h1 className="truncate text-lg font-bold text-white sm:text-xl">{title}</h1>
    </div>
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
      {user?.avatar || 'MA'}
    </div>
  </header>
);

export default Header;
