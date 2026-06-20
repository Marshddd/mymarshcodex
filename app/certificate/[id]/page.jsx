'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import { findFallbackCourse } from '@/lib/fallback-content';

export default function CertificatePage({ params }) {
  const { id } = use(params);
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('bm_current_user') || 'null'));
    fetch(`/api/courses/${id}`)
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setCourse(data || findFallbackCourse(id)))
      .catch(() => setCourse(findFallbackCourse(id)));
  }, [id]);

  return (
    <main className="shell">
      <Nav />
      <section className="section certificate-page">
        <div className="certificate-card">
          <p className="certificate-kicker">Certificate of Completion</p>
          <h1>{course?.title || 'Backend Mastery'}</h1>
          <p className="muted">มอบให้</p>
          <h2>{user?.name || 'ผู้เรียน Backend Mastery'}</h2>
          <p className="muted">สำหรับการเรียนจบบทเรียนในหน่วยนี้</p>
          <p className="certificate-date">{new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div className="certificate-seal">Verified by Backend Mastery</div>
        </div>
        <div className="actions center">
          <Link className="btn secondary" href="/my-courses">บทเรียนของฉัน</Link>
          <Link className="btn" href="/learn">เรียนหน่วยอื่นต่อ</Link>
        </div>
      </section>
    </main>
  );
}
