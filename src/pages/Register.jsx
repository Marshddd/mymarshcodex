import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

const Register = ({ onNavigate }) => {
  const [form, setForm] = useState({ username: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }
    setError('');
    onNavigate('login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] p-4">
      <Card className="w-full max-w-md">
        <div className="mb-7 text-center">
          <h1 className="mb-2 text-2xl font-bold text-white">สร้างบัญชีผู้เรียน</h1>
          <p className="text-gray-400">สมัครเพื่อเริ่มเรียน Back-End</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="ชื่อผู้ใช้" value={form.username} onChange={(e) => setField('username', e.target.value)} />
          <Input label="อีเมล" type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} />
          <Input label="เบอร์โทรศัพท์" type="tel" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
          <Input label="รหัสผ่าน" type="password" value={form.password} onChange={(e) => setField('password', e.target.value)} error={error} />
          <Input label="ยืนยันรหัสผ่าน" type="password" value={form.confirm} onChange={(e) => setField('confirm', e.target.value)} />
          <Button type="submit" className="w-full">สร้างบัญชี</Button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          มีบัญชีอยู่แล้ว?{' '}
          <button onClick={() => onNavigate('login')} className="font-medium text-blue-300 hover:text-blue-200">เข้าสู่ระบบ</button>
        </p>
      </Card>
    </div>
  );
};

export default Register;
