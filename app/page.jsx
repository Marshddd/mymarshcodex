import Link from 'next/link';
import Nav from '@/components/Nav';
import { readDb } from '@/lib/db';

export default async function HomePage() {
  const db = await readDb();

  return (
    <main className="shell">
      <Nav />
      <section className="hero">
        <div>
          <p className="btn secondary">🚀 Fullstack Next.js + Docker</p>
          <h1>
            ก้าวสู่ Back-End
            <br />
            <span className="gradient">Developer</span>
          </h1>
          <p className="lead">
            แพลตฟอร์มเรียน Back-End แบบ Fullstack มีหน้าเรียน แบบทดสอบ Admin CRUD และ API backend ใน Next.js
          </p>
          <div className="actions">
            <Link className="btn" href="/learn">เริ่มเรียน</Link>
            <Link className="btn secondary" href="/admin">ไปหน้า Admin</Link>
          </div>
        </div>
        <div className="card code-card">
          <pre>{`// app/api/courses/route.js
export async function GET() {
  const db = await readDb();
  return Response.json(db.courses);
}

// Docker
docker compose up --build`}</pre>
        </div>
      </section>

      <section className="section">
        <h2>บทเรียนทั้งหมด</h2>
        <div className="grid">
          {db.courses.map((course) => (
            <Link className="card" href={`/learn/${course.id}`} key={course.id}>
              <h3>{course.icon} {course.unit}</h3>
              <h2>{course.title}</h2>
              <p className="muted">{course.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

