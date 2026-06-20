import { json, readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request) {
  const payload = await request.json();
  const courses = Array.isArray(payload.courses) ? payload.courses : null;

  if (!courses) {
    return json({ error: 'ต้องส่ง courses เป็นรายการข้อมูล' }, { status: 400 });
  }

  const db = await readDb();
  db.courses = courses;
  await writeDb(db);

  return json({ ok: true, courses });
}
