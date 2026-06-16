import { json, readDb, writeDb } from '@/lib/db';

export async function GET() {
  const db = await readDb();
  return json(db.quizzes);
}

export async function POST(request) {
  const payload = await request.json();
  const db = await readDb();
  const quiz = {
    id: payload.id || `q-${Date.now()}`,
    courseId: Number(payload.courseId),
    type: payload.type || 'pre',
    title: payload.title || 'แบบทดสอบใหม่',
    desc: payload.desc || '',
    questions: payload.questions || []
  };

  db.quizzes.push(quiz);
  await writeDb(db);
  return json(quiz, { status: 201 });
}

