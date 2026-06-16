'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';

export default function QuizTakePage({ params }) {
  const { id } = use(params);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('bm_current_user') || 'null'));
    fetch(`/api/quizzes/${id}`)
      .then((response) => response.ok ? response.json() : null)
      .then(setQuiz)
      .catch(() => setQuiz(null));
  }, [id]);

  function choose(questionId, optionIndex) {
    setAnswers((current) => ({ ...current, [questionId]: optionIndex }));
  }

  function submit() {
    if (!quiz || !user) return;
    let score = 0;
    quiz.questions.forEach((question) => {
      if (Number(answers[question.id]) === Number(question.correct)) score += 1;
    });
    const nextResult = {
      score,
      total: quiz.questions.length,
      submittedAt: new Date().toISOString()
    };
    const stored = JSON.parse(localStorage.getItem('bm_quiz_results') || '{}');
    stored[user.id] = { ...(stored[user.id] || {}), [quiz.id]: nextResult };
    localStorage.setItem('bm_quiz_results', JSON.stringify(stored));
    fetch(`/api/users/${user.id}/quiz-results`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId: quiz.id, result: nextResult })
    }).catch(() => {});
    setResult(nextResult);
  }

  if (!quiz) {
    return (
      <main className="shell">
        <Nav />
        <section className="section">
          <p className="muted">กำลังโหลดแบบทดสอบ...</p>
        </section>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="shell">
        <Nav />
        <section className="section">
          <div className="card">
            <h2>กรุณาเข้าสู่ระบบก่อนทำแบบทดสอบ</h2>
            <Link className="btn" href="/login">เข้าสู่ระบบ</Link>
          </div>
        </section>
      </main>
    );
  }

  const answered = Object.keys(answers).length;
  const canSubmit = quiz.questions.length > 0 && answered === quiz.questions.length;

  return (
    <main className="shell">
      <Nav />
      <section className="section quiz-wrap">
        <p className="btn secondary">{quiz.type === 'pre' ? 'แบบทดสอบก่อนเรียน' : 'แบบทดสอบหลังเรียน'}</p>
        <h2>{quiz.title}</h2>
        <p className="muted">{quiz.desc}</p>

        {result ? (
          <div className="card result-card">
            <h2>คะแนน {result.score}/{result.total}</h2>
            <p className="muted">คิดเป็น {Math.round((result.score / result.total) * 100)}%</p>
            <Link className="btn" href="/profile">ดูโปรไฟล์</Link>
          </div>
        ) : (
          <>
            <p className="muted">ตอบแล้ว {answered}/{quiz.questions.length}</p>
            {quiz.questions.map((question, index) => (
              <div className="card question-card" key={question.id}>
                <h3>ข้อที่ {index + 1}. {question.question}</h3>
                <div className="option-list">
                  {question.options.map((option, optionIndex) => (
                    <button
                      className={`option ${Number(answers[question.id]) === optionIndex ? 'selected' : ''}`}
                      key={`${question.id}-${optionIndex}`}
                      onClick={() => choose(question.id, optionIndex)}
                      type="button"
                    >
                      <span>{String.fromCharCode(65 + optionIndex)}</span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button className="btn" disabled={!canSubmit} onClick={submit}>
              {canSubmit ? 'ส่งคำตอบ' : `ตอบอีก ${quiz.questions.length - answered} ข้อ`}
            </button>
          </>
        )}
      </section>
    </main>
  );
}
