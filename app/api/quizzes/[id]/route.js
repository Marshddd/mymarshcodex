import { json, readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(_request, { params }) {
  const { id } = await params;
  const db = await readDb();
  const quiz = db.quizzes.find((item) => item.id === id);
  if (!quiz) return json({ error: 'ไม่พบแบบทดสอบ' }, { status: 404 });
  return json(quiz);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const payload = await request.json();
  const db = await readDb();
  const index = db.quizzes.findIndex((item) => item.id === id);
  if (index === -1) return json({ error: 'ไม่พบแบบทดสอบ' }, { status: 404 });

  db.quizzes[index] = { ...db.quizzes[index], ...payload, id: db.quizzes[index].id };
  await writeDb(db);
  return json(db.quizzes[index]);
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const db = await readDb();
  const before = db.quizzes.length;
  db.quizzes = db.quizzes.filter((item) => item.id !== id);
  if (db.quizzes.length === before) return json({ error: 'ไม่พบแบบทดสอบ' }, { status: 404 });

  await writeDb(db);
  return json({ ok: true });
}
