'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch('/api/quizzes')
      .then((response) => response.json())
      .then(setQuizzes)
      .catch(() => setQuizzes([]));
  }, []);

  return (
    <main className="shell">
      <Nav />
      <section className="section">
        <h2>แบบทดสอบ</h2>
        <div className="grid">
          {quizzes.map((quiz) => (
            <article className="card" key={quiz.id}>
              <p className="btn secondary">{quiz.type === 'pre' ? 'ก่อนเรียน' : 'หลังเรียน'}</p>
              <h2>{quiz.title}</h2>
              <p className="muted">{quiz.desc}</p>
              <p className="muted">{quiz.questions.length} ข้อ</p>
              <Link className="btn" href={`/quiz/${quiz.id}`}>เริ่มทำแบบทดสอบ</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
