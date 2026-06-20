'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';

export default function LearnPage() {
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
      <section className="section">
        <h2>บทเรียน</h2>
        <div className="grid">
          {courses.map((course) => (
            <Link className="card" href={`/learn/${course.id}`} key={course.id}>
              <h3>{course.icon} {course.unit}</h3>
              <h2>{course.title}</h2>
              <p className="muted">{course.desc}</p>
              <p className="muted">{course.lessons?.length || 0} บทเรียนย่อย</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
