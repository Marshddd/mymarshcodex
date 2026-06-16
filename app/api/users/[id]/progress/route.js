import { json, readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  const { id } = await params;
  const payload = await request.json();
  const lessonId = String(payload.lessonId || '').trim();

  if (!lessonId) {
    return json({ error: 'ต้องมีรหัสบทเรียน' }, { status: 400 });
  }

  const db = await readDb();
  const user = db.users.find((item) => String(item.id) === String(id));

  if (!user) {
    return json({ error: 'ไม่พบผู้ใช้' }, { status: 404 });
  }

  user.progress = {
    ...(user.progress || {}),
    [lessonId]: payload.completed !== false
  };

  await writeDb(db);
  return json({ progress: user.progress });
}
