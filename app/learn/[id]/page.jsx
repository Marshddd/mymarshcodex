import Link from 'next/link';
import Nav from '@/components/Nav';
import { readDb } from '@/lib/db';

export default async function CoursePage({ params }) {
  const { id } = await params;
  const db = await readDb();
  const course = db.courses.find((item) => String(item.id) === String(id));

  if (!course) {
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
      </section>
    </main>
  );
}

