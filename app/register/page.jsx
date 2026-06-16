'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', username: '', password: '' });
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setError('');
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || 'สมัครสมาชิกไม่สำเร็จ');
      return;
    }
    const nextProgress = JSON.parse(localStorage.getItem('bm_progress') || '{}');
    const nextResults = JSON.parse(localStorage.getItem('bm_quiz_results') || '{}');
    nextProgress[data.user.id] = data.user.progress || {};
    nextResults[data.user.id] = data.user.quizResults || {};
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
          <h2>สมัครสมาชิก</h2>
          <p className="muted">สร้างบัญชีเพื่อเริ่มเรียนและบันทึกผลคะแนน</p>
          {error ? <p className="form-error">{error}</p> : null}
          <input className="input" placeholder="ชื่อที่แสดง" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="input" placeholder="ชื่อผู้ใช้" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          <input className="input" type="password" placeholder="รหัสผ่าน" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="btn" type="submit">สมัครสมาชิก</button>
          <Link className="btn secondary" href="/login">มีบัญชีแล้ว</Link>
        </form>
      </section>
    </main>
  );
}
