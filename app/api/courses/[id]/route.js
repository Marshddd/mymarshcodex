import { json, readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(_request, { params }) {
  const { id } = await params;
  const db = await readDb();
  const course = db.courses.find((item) => String(item.id) === String(id));
  if (!course) return json({ error: 'ไม่พบบทเรียน' }, { status: 404 });
  return json(course);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const payload = await request.json();
  const db = await readDb();
  const index = db.courses.findIndex((item) => String(item.id) === String(id));
  if (index === -1) return json({ error: 'ไม่พบบทเรียน' }, { status: 404 });

  db.courses[index] = { ...db.courses[index], ...payload, id: db.courses[index].id };
  await writeDb(db);
  return json(db.courses[index]);
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const db = await readDb();
  const before = db.courses.length;
  db.courses = db.courses.filter((item) => String(item.id) !== String(id));
  if (db.courses.length === before) return json({ error: 'ไม่พบบทเรียน' }, { status: 404 });

  await writeDb(db);
  return json({ ok: true });
}
