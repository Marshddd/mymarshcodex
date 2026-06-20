'use client';

import Link from 'next/link';
import { use, useEffect, useMemo, useState } from 'react';
import Nav from '@/components/Nav';
import { fallbackQuizzes, withFallbackCourse, withFallbackQuizzes } from '@/lib/fallback-content';

export default function CoursePage({ params }) {
  const { id } = use(params);
  const [course, setCourse] = useState(null);
  const [quizzes, setQuizzes] = useState(fallbackQuizzes);
  const [activeLessonId, setActiveLessonId] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('bm_current_user') || 'null'));
    setProgress(JSON.parse(localStorage.getItem('bm_progress') || '{}'));

    fetch(`/api/courses/${id}`)
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        const nextCourse = withFallbackCourse(data, id);
        setCourse(nextCourse);
        setActiveLessonId(nextCourse?.lessons?.[0]?.id || '');
        setLoaded(true);
      })
      .catch(() => {
        const nextCourse = withFallbackCourse(null, id);
        setCourse(nextCourse);
        setActiveLessonId(nextCourse?.lessons?.[0]?.id || '');
        setLoaded(true);
      });

    fetch('/api/quizzes')
      .then((response) => response.json())
      .then((data) => setQuizzes(withFallbackQuizzes(data)))
      .catch(() => setQuizzes(fallbackQuizzes));
  }, [id]);

  const lessons = course?.lessons || [];
  const activeIndex = Math.max(0, lessons.findIndex((lesson) => lesson.id === activeLessonId));
  const activeLesson = lessons[activeIndex] || lessons[0];
  const courseQuizzes = useMemo(
    () => quizzes.filter((quiz) => String(quiz.courseId) === String(id)),
    [quizzes, id]
  );
  const preQuiz = courseQuizzes.find((quiz) => quiz.type === 'pre');
  const postQuiz = courseQuizzes.find((quiz) => quiz.type === 'post');
  const userProgress = user ? (progress[user.id] || {}) : {};
  const completedCount = lessons.filter((lesson) => userProgress[lesson.id]).length;
  const isCourseDone = lessons.length > 0 && completedCount === lessons.length;

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
      {!course ? (
        <section className="section">
          <p className="muted">กำลังโหลดบทเรียน...</p>
        </section>
      ) : (
        <section className="lesson-layout">
          <aside className="lesson-sidebar">
            <Link className="lesson-back" href="/learn">← กลับไปบทเรียน</Link>
            <p className="lesson-unit-label">{course.unit}</p>
            <h3>{course.title}</h3>
            <div className="lesson-progress">
              <span>{completedCount}/{lessons.length} บทเรียน</span>
              <div><i style={{ width: `${lessons.length ? (completedCount / lessons.length) * 100 : 0}%` }} /></div>
            </div>
            <nav className="lesson-list">
              {lessons.map((lesson, index) => (
                <button
                  className={`lesson-nav-item ${lesson.id === activeLesson?.id ? 'active' : ''}`}
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  type="button"
                >
                  <span>{userProgress[lesson.id] ? '✓' : index + 1}</span>
                  {lesson.title}
                </button>
              ))}
            </nav>
            <div className="lesson-side-actions">
              {preQuiz ? <Link className="btn secondary" href={`/quiz/${preQuiz.id}`}>แบบทดสอบก่อนเรียน</Link> : null}
              {postQuiz ? <Link className="btn secondary" href={`/quiz/${postQuiz.id}`}>แบบทดสอบหลังเรียน</Link> : null}
              {isCourseDone ? <Link className="btn" href={`/certificate/${course.id}`}>รับใบรับรอง</Link> : null}
            </div>
          </aside>

          <article className="lesson-content">
            <div className="lesson-header">
              <p className="lesson-unit-label">{course.unit}</p>
              <h1>{activeLesson?.title || course.title}</h1>
              <p className="muted">{course.desc}</p>
            </div>

            <div className="lesson-watch">
              <div className="lesson-video-frame">
                {activeLesson?.videoUrl || course.videoUrl ? (
                  <iframe
                    src={activeLesson?.videoUrl || course.videoUrl}
                    title={activeLesson?.title || course.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="lesson-video-placeholder">
                    <span>▶</span>
                    <div>
                      <strong>พร้อมใส่วิดีโอสอน</strong>
                      <p>เพิ่มลิงก์คลิปได้จากหน้า Admin แล้วคลิปจะแสดงตรงนี้</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="lesson-summary-card">
                <h3>วิธีเรียนบทนี้</h3>
                <ol>
                  <li>ดูคลิปหรืออ่านเนื้อหาให้จบ</li>
                  <li>กดบันทึกว่าเรียนแล้ว</li>
                  <li>ทำแบบทดสอบหลังเรียนเพื่อวัดผล</li>
                </ol>
              </div>
            </div>

            <div
              className="lesson-body"
              dangerouslySetInnerHTML={{ __html: activeLesson?.content || '<p>ยังไม่มีเนื้อหาบทเรียน</p>' }}
            />

            <div className="lesson-actions">
              <button
                className="btn secondary"
                disabled={activeIndex <= 0}
                onClick={() => setActiveLessonId(lessons[activeIndex - 1]?.id)}
                type="button"
              >
                ก่อนหน้า
              </button>
              <button className="btn" onClick={() => markLesson(activeLesson.id)} type="button">
                {userProgress[activeLesson?.id] ? 'เรียนแล้ว' : 'บันทึกว่าเรียนแล้ว'}
              </button>
              <button
                className="btn secondary"
                disabled={activeIndex >= lessons.length - 1}
                onClick={() => setActiveLessonId(lessons[activeIndex + 1]?.id)}
                type="button"
              >
                ถัดไป
              </button>
            </div>
          </article>
        </section>
      )}
    </main>
  );
}
