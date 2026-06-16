import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const UserProfile = ({ user, onNavigate }) => {
  const [username, setUsername] = useState(user?.name || 'Max');
  const [email, setEmail] = useState('max@example.com');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const save = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(''), 1800);
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <Sidebar user={user} onNavigate={onNavigate} currentPage="user-profile" />
      <div className="min-w-0 flex-1">
        <Header title="โปรไฟล์ผู้ใช้" onNavigate={onNavigate} user={user} />
        <main className="p-4 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div className="space-y-5">
              <Card className="text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold">
                  {user?.avatar || 'MA'}
                </div>
                <h2 className="text-xl font-bold text-white">{username}</h2>
                <p className="text-gray-400">{user?.role || 'User'}</p>
              </Card>
              <div className="grid grid-cols-3 gap-3">
                <Card className="text-center"><b className="text-2xl text-white">4</b><p className="text-sm text-gray-400">บทเรียน</p></Card>
                <Card className="text-center"><b className="text-2xl text-yellow-400">190</b><p className="text-sm text-gray-400">XP</p></Card>
                <Card className="text-center"><b className="text-2xl text-white">82%</b><p className="text-sm text-gray-400">เฉลี่ย</p></Card>
              </div>
            </div>

            <div className="space-y-5">
              {message && <Card className="border-emerald-600 bg-emerald-950/30 text-emerald-100">{message}</Card>}
              <Card>
                <h2 className="mb-4 text-lg font-bold text-white">ข้อมูลส่วนตัว</h2>
                <div className="space-y-4">
                  <Input label="ชื่อผู้ใช้" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <Input label="อีเมล" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Button onClick={() => save('บันทึกข้อมูลส่วนตัวแล้ว')}>บันทึกข้อมูล</Button>
                </div>
              </Card>
              <Card>
                <h2 className="mb-4 text-lg font-bold text-white">เปลี่ยนรหัสผ่าน</h2>
                <div className="space-y-4">
                  <Input label="รหัสผ่านใหม่" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <Button variant="secondary" onClick={() => save('อัปเดตรหัสผ่านแล้ว')}>เปลี่ยนรหัสผ่าน</Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
