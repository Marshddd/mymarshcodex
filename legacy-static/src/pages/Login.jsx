import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

const Login = ({ onNavigate, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAdmin = username.trim().toLowerCase() === 'admin';
    onLogin({
      name: username.trim() || 'Max',
      role: isAdmin ? 'Admin' : 'User',
      avatar: (username.trim() || 'MA').slice(0, 2).toUpperCase(),
    });
    onNavigate(isAdmin ? 'admin-account' : 'lesson-list');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] p-4">
      <Card className="w-full max-w-md">
        <div className="mb-7 text-center">
          <h1 className="mb-2 text-2xl font-bold text-white">ยินดีต้อนรับกลับ</h1>
          <p className="text-gray-400">เข้าสู่ระบบเพื่อเรียนต่อ</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="ชื่อผู้ใช้" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="เช่น max หรือ admin" />
          <Input label="รหัสผ่าน" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="กรอกรหัสผ่าน" />
          <Button type="submit" className="w-full">เข้าสู่ระบบ</Button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          ยังไม่มีบัญชี?{' '}
          <button onClick={() => onNavigate('register')} className="font-medium text-blue-300 hover:text-blue-200">สมัครเรียน</button>
        </p>
      </Card>
    </div>
  );
};

export default Login;
