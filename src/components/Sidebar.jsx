import React from 'react';

const Sidebar = ({ user, onNavigate, currentPage, admin = false }) => {
  const menuItems = admin
    ? [
        { id: 'admin-account', label: 'บัญชีผู้ดูแล' },
        { id: 'edit-admin-info', label: 'แก้ไขข้อมูล' },
      ]
    : [
        { id: 'user-profile', label: 'โปรไฟล์' },
        { id: 'lesson-list', label: 'บทเรียน' },
        { id: 'pre-test', label: 'แบบทดสอบ' },
      ];

  return (
    <aside className="hidden w-64 shrink-0 border-r border-gray-800 bg-gray-950 p-5 md:flex md:flex-col">
      <button onClick={() => onNavigate('home')} className="mb-8 text-left text-xl font-bold text-white">
        Backend Mastery
      </button>
      <div className="mb-8 text-center">
        <div className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full ${admin ? 'bg-emerald-600' : 'bg-blue-600'} text-xl font-bold`}>
          {user?.avatar || 'MA'}
        </div>
        <p className="font-semibold text-white">{user?.name || 'Max'}</p>
        <p className={`text-sm ${admin ? 'text-emerald-300' : 'text-blue-300'}`}>{admin ? 'Admin' : user?.role || 'User'}</p>
      </div>
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full rounded-lg px-4 py-3 text-left transition-colors ${
              currentPage === item.id
                ? admin ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button onClick={() => onNavigate('home')} className="rounded-lg px-4 py-3 text-left text-gray-300 hover:bg-gray-800">
        ออกจากระบบ
      </button>
    </aside>
  );
};

export default Sidebar;
