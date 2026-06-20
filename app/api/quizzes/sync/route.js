import { json, readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request) {
  const payload = await request.json();
  const quizzes = Array.isArray(payload.quizzes) ? payload.quizzes : null;

  if (!quizzes) {
    return json({ error: 'ต้องส่ง quizzes เป็นรายการข้อมูล' }, { status: 400 });
  }

  const db = await readDb();
  db.quizzes = quizzes;
  await writeDb(db);

  return json({ ok: true, quizzes });
}
