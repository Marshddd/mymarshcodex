import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const AdminAccount = ({ user, onNavigate }) => {
  const [name, setName] = useState(user?.name || 'Admin');
  const [email, setEmail] = useState('admin@backendmastery.com');
  const admin = { ...user, name, role: 'Admin', avatar: user?.avatar || 'AD' };

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <Sidebar user={admin} onNavigate={onNavigate} currentPage="admin-account" admin />
      <div className="min-w-0 flex-1">
        <Header title="บัญชีผู้ดูแลระบบ" onNavigate={onNavigate} user={admin} />
        <main className="p-4 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <Card className="text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-600 text-3xl font-bold">
                {admin.avatar}
              </div>
              <h2 className="text-xl font-bold text-white">{name}</h2>
              <p className="text-emerald-300">Admin</p>
              <Button variant="success" onClick={() => onNavigate('edit-admin-info')} className="mt-5">แก้ไขข้อมูล</Button>
            </Card>

            <div className="space-y-5">
              <Card>
                <h2 className="mb-4 text-lg font-bold text-white">ข้อมูลผู้ดูแล</h2>
                <div className="space-y-4">
                  <Input label="ชื่อ" value={name} onChange={(e) => setName(e.target.value)} />
                  <Input label="อีเมล" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Button variant="success">บันทึก</Button>
                </div>
              </Card>
              <Card>
                <h2 className="mb-4 text-lg font-bold text-white">ภาพรวมระบบ</h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg bg-gray-800 p-4"><b className="text-2xl text-white">128</b><p className="text-gray-400">ผู้เรียน</p></div>
                  <div className="rounded-lg bg-gray-800 p-4"><b className="text-2xl text-white">4</b><p className="text-gray-400">บทเรียน</p></div>
                  <div className="rounded-lg bg-gray-800 p-4"><b className="text-2xl text-white">76%</b><p className="text-gray-400">เรียนจบเฉลี่ย</p></div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAccount;
