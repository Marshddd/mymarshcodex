'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';

export default function HomePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/courses')
      .then((response) => response.json())
      .then(setCourses)
      .catch(() => setCourses([]));
  }, []);

  return (
    <main className="shell">
      <Nav />
      <section className="hero">
        <div>
          <p className="btn secondary">🚀 เนื้อหาครบ 6 หน่วย + แบบทดสอบ</p>
          <h1>
            ก้าวสู่ความเป็นเทพ
            <br />
            <span className="gradient">Back-End</span>
          </h1>
          <p className="lead">
            ศึกษาการพัฒนาระบบแบบมืออาชีพตั้งแต่พื้นฐาน Server, Database, API ไปจนถึง Docker, AWS และ CI/CD Pipeline
          </p>
          <div className="actions">
            <Link className="btn" href="/learn">เริ่มต้นเรียนฟรี</Link>
            <Link className="btn secondary" href="/learn">ดูบทเรียนทั้งหมด</Link>
          </div>
        </div>
        <div className="card code-card">
          <pre>{`const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'สวัสดี backend!'
  });
});

app.listen(3000, () => {
  console.log('🚀 Server running!');
}
`}</pre>
        </div>
      </section>

      <section className="section">
        <h2>บทเรียนทั้งหมด</h2>
        <div className="grid">
          {courses.map((course) => (
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
