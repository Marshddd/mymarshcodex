'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setError('');
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || 'เข้าสู่ระบบไม่สำเร็จ');
      return;
    }
    const nextProgress = JSON.parse(localStorage.getItem('bm_progress') || '{}');
    const nextResults = JSON.parse(localStorage.getItem('bm_quiz_results') || '{}');
    nextProgress[data.user.id] = data.user.progress || nextProgress[data.user.id] || {};
    nextResults[data.user.id] = data.user.quizResults || nextResults[data.user.id] || {};
    localStorage.setItem('bm_current_user', JSON.stringify(data.user));
    localStorage.setItem('bm_progress', JSON.stringify(nextProgress));
    localStorage.setItem('bm_quiz_results', JSON.stringify(nextResults));
    router.push('/profile');
  }

  return (
    <main className="shell">
      <Nav />
      <section className="section auth-page">
        <form className="card form auth-card" onSubmit={submit}>
          <h2>เข้าสู่ระบบ</h2>
          <p className="muted">เข้าสู่ระบบเพื่อบันทึกความก้าวหน้าและทำแบบทดสอบ</p>
          {error ? <p className="form-error">{error}</p> : null}
          <input className="input" placeholder="ชื่อผู้ใช้" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          <input className="input" type="password" placeholder="รหัสผ่าน" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="btn" type="submit">เข้าสู่ระบบ</button>
          <Link className="btn secondary" href="/register">สมัครสมาชิก</Link>
        </form>
      </section>
    </main>
  );
}
