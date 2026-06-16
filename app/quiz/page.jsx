import Nav from '@/components/Nav';
import { readDb } from '@/lib/db';

export default async function QuizPage() {
  const db = await readDb();

  return (
    <main className="shell">
      <Nav />
      <section className="section">
        <h2>แบบทดสอบ</h2>
        <div className="grid">
          {db.quizzes.map((quiz) => (
            <article className="card" key={quiz.id}>
              <p className="btn secondary">{quiz.type === 'pre' ? 'ก่อนเรียน' : 'หลังเรียน'}</p>
              <h2>{quiz.title}</h2>
              <p className="muted">{quiz.desc}</p>
              <p className="muted">{quiz.questions.length} ข้อ</p>
              {quiz.questions.map((question) => (
                <div className="card" key={question.id} style={{ marginTop: 12 }}>
                  <strong>{question.question}</strong>
                  <ol>
                    {question.options.map((option, index) => (
                      <li key={option} className={index === question.correct ? 'gradient' : ''}>{option}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
