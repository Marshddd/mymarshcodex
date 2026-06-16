'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import Nav from '@/components/Nav';

export default function CoursePage({ params }) {
  const { id } = use(params);
  const [course, setCourse] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        setCourse(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [id]);

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
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
