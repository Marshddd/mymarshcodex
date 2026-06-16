import { json, readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  const { id } = await params;
  const payload = await request.json();
  const quizId = String(payload.quizId || '').trim();
  const result = payload.result;

  if (!quizId || !result) {
    return json({ error: 'ต้องมีรหัสแบบทดสอบและผลคะแนน' }, { status: 400 });
  }

  const db = await readDb();
  const user = db.users.find((item) => String(item.id) === String(id));

  if (!user) {
    return json({ error: 'ไม่พบผู้ใช้' }, { status: 404 });
  }

  user.quizResults = {
    ...(user.quizResults || {}),
    [quizId]: result
  };

  await writeDb(db);
  return json({ quizResults: user.quizResults });
}
