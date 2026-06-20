'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import { fallbackQuizzes, withFallbackQuizzes } from '@/lib/fallback-content';

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState(fallbackQuizzes);

  useEffect(() => {
    fetch('/api/quizzes')
      .then((response) => response.json())
      .then((data) => setQuizzes(withFallbackQuizzes(data)))
      .catch(() => setQuizzes(fallbackQuizzes));
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
              <p className="muted">{quiz.questions?.length || 0} ข้อ</p>
              <Link className="btn" href={`/quiz/${quiz.id}`}>เริ่มทำแบบทดสอบ</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
