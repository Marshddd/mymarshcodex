'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import Nav from '@/components/Nav';

export default function CoursePage({ params }) {
  const { id } = use(params);
  const [course, setCourse] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('bm_current_user') || 'null'));
    setProgress(JSON.parse(localStorage.getItem('bm_progress') || '{}'));
    fetch(`/api/courses/${id}`)
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        setCourse(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [id]);

  function markLesson(lessonId) {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    const nextProgress = {
      ...progress,
      [user.id]: {
        ...(progress[user.id] || {}),
        [lessonId]: true
      }
    };
    localStorage.setItem('bm_progress', JSON.stringify(nextProgress));
    setProgress(nextProgress);
    fetch(`/api/users/${user.id}/progress`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId, completed: true })
    }).catch(() => {});
  }

  if (loaded && !course) {
    return (
      <main className="shell">
        <Nav />
        <section className="section">
          <h2>ไม่พบบทเรียน</h2>
          <Link className="btn" href="/learn">กลับไปหน้าบทเรียน</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <Nav />
      <section className="section">
        {!course ? (
          <p className="muted">กำลังโหลดบทเรียน...</p>
        ) : (
          <>
            <p className="btn secondary">{course.unit}</p>
            <h2>{course.icon} {course.title}</h2>
            <p className="lead">{course.desc}</p>

            {course.videoUrl ? (
              <div className="card" style={{ margin: '24px 0' }}>
                <video src={course.videoUrl} controls style={{ width: '100%', borderRadius: 8 }} />
              </div>
            ) : null}

            <div className="grid">
              {course.lessons.map((lesson) => (
                <article className="card" key={lesson.id}>
                  <h3>{lesson.title}</h3>
                  <p className="muted">{lesson.content}</p>
                  <button className="btn secondary" type="button" onClick={() => markLesson(lesson.id)}>
                    {progress[user?.id]?.[lesson.id] ? 'เรียนแล้ว' : 'บันทึกว่าเรียนแล้ว'}
                  </button>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
