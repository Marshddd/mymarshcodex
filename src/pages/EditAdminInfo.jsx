import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const EditAdminInfo = ({ user, onNavigate }) => {
  const [name, setName] = useState(user?.name || 'Admin');
  const [email, setEmail] = useState('admin@backendmastery.com');
  const [password, setPassword] = useState('');
  const [note, setNote] = useState('');
  const [fileName, setFileName] = useState('');
  const admin = { ...user, name, role: 'Admin', avatar: user?.avatar || 'AD' };

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <Sidebar user={admin} onNavigate={onNavigate} currentPage="edit-admin-info" admin />
      <div className="min-w-0 flex-1">
        <Header title="แก้ไขข้อมูลผู้ดูแลระบบ" onNavigate={onNavigate} showBackButton backTo="admin-account" user={admin} />
        <main className="p-4 sm:p-6">
          <div className="mx-auto max-w-2xl space-y-5">
            <Card>
              <h2 className="mb-4 text-lg font-bold text-white">ข้อมูลส่วนตัว</h2>
              <div className="space-y-4">
                <Input label="ชื่อ" value={name} onChange={(e) => setName(e.target.value)} />
                <Input label="อีเมล" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input label="รหัสผ่านใหม่" type="password" placeholder="กรอกเมื่อต้องการเปลี่ยนรหัสผ่าน" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </Card>

            <Card>
              <h2 className="mb-4 text-lg font-bold text-white">รูปโปรไฟล์</h2>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 text-2xl font-bold">{admin.avatar}</div>
                <label className="rounded-lg bg-gray-700 px-4 py-3 text-white hover:bg-gray-600">
                  เลือกไฟล์
                  <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
                </label>
                {fileName && <span className="text-gray-300">{fileName}</span>}
              </div>
            </Card>

            <Card>
              <h2 className="mb-4 text-lg font-bold text-white">ข้อมูลเพิ่มเติม</h2>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="กรอกข้อมูลเพิ่มเติม..."
                className="min-h-[120px] w-full resize-y rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition-colors focus:border-blue-500"
              />
            </Card>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => onNavigate('admin-account')} className="flex-1">ยกเลิก</Button>
              <Button variant="success" onClick={() => onNavigate('admin-account')} className="flex-1">บันทึก</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditAdminInfo;
