'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('bm_current_user') || 'null'));
    setProgress(JSON.parse(localStorage.getItem('bm_progress') || '{}'));
    setResults(JSON.parse(localStorage.getItem('bm_quiz_results') || '{}'));
  }, []);

  function logout() {
    localStorage.removeItem('bm_current_user');
    setUser(null);
  }

  if (!user) {
    return (
      <main className="shell">
        <Nav />
        <section className="section">
          <div className="card">
            <h2>ยังไม่ได้เข้าสู่ระบบ</h2>
            <p className="muted">เข้าสู่ระบบเพื่อดูโปรไฟล์ ความก้าวหน้า และคะแนนแบบทดสอบ</p>
            <div className="actions">
              <Link className="btn" href="/login">เข้าสู่ระบบ</Link>
              <Link className="btn secondary" href="/register">สมัครสมาชิก</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const lessonCount = Object.keys(progress[user.id] || {}).length;
  const userResults = results[user.id] || {};

  return (
    <main className="shell">
      <Nav />
      <section className="section">
        <div className="grid">
          <div className="card">
            <h2>{user.name}</h2>
            <p className="muted">@{user.username}</p>
            <p className="btn secondary">{user.role === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้เรียน'}</p>
            <button className="btn danger" onClick={logout}>ออกจากระบบ</button>
          </div>
          <div className="card">
            <h2>ความก้าวหน้า</h2>
            <p className="muted">เรียนแล้ว {lessonCount} บทเรียนย่อย</p>
            <p className="muted">ทำแบบทดสอบแล้ว {Object.keys(userResults).length} ชุด</p>
          </div>
        </div>

        <div className="card" style={{ marginTop: 24 }}>
          <h2>ผลแบบทดสอบ</h2>
          {Object.keys(userResults).length === 0 ? (
            <p className="muted">ยังไม่มีผลแบบทดสอบ</p>
          ) : (
            <table className="table">
              <tbody>
                {Object.entries(userResults).map(([quizId, result]) => (
                  <tr key={quizId}>
                    <td>{quizId}</td>
                    <td>{result.score}/{result.total}</td>
                    <td>{Math.round((result.score / result.total) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}
