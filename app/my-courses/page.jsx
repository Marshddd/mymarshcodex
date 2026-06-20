'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import { fallbackCourses, withFallbackCourses } from '@/lib/fallback-content';

export default function MyCoursesPage() {
  const [courses, setCourses] = useState(fallbackCourses);
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('bm_current_user') || 'null'));
    setProgress(JSON.parse(localStorage.getItem('bm_progress') || '{}'));
    fetch('/api/courses')
      .then((response) => response.json())
      .then((data) => setCourses(withFallbackCourses(data)))
      .catch(() => setCourses(fallbackCourses));
  }, []);

  if (!user) {
    return (
      <main className="shell">
        <Nav />
        <section className="section">
          <div className="card">
            <h2>เข้าสู่ระบบก่อนดูบทเรียนของฉัน</h2>
            <p className="muted">หน้านี้ใช้ดูความคืบหน้า บทเรียนที่เรียนแล้ว และใบรับรอง</p>
            <Link className="btn" href="/login">เข้าสู่ระบบ</Link>
          </div>
        </section>
      </main>
    );
  }

  const userProgress = progress[user.id] || {};

  return (
    <main className="shell">
      <Nav />
      <section className="section">
        <h2>บทเรียนของฉัน</h2>
        <div className="grid">
          {courses.map((course) => {
            const lessons = course.lessons || [];
            const done = lessons.filter((lesson) => userProgress[lesson.id]).length;
            const percent = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
            return (
              <article className="card" key={course.id}>
                <h3>{course.icon} {course.unit}</h3>
                <h2>{course.title}</h2>
                <p className="muted">เรียนแล้ว {done}/{lessons.length} บทเรียน</p>
                <div className="lesson-progress">
                  <span>{percent}%</span>
                  <div><i style={{ width: `${percent}%` }} /></div>
                </div>
                <div className="actions">
                  <Link className="btn" href={`/learn/${course.id}`}>เรียนต่อ</Link>
                  {percent === 100 ? <Link className="btn secondary" href={`/certificate/${course.id}`}>ใบรับรอง</Link> : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
