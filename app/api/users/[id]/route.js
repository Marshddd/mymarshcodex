import { json, readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

function safeUser(user) {
  const { password: _password, ...rest } = user;
  return rest;
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const payload = await request.json();
  const db = await readDb();
  const index = db.users.findIndex((user) => String(user.id) === String(id));

  if (index === -1) {
    return json({ error: 'ไม่พบผู้ใช้' }, { status: 404 });
  }

  db.users[index] = {
    ...db.users[index],
    name: payload.name ?? db.users[index].name,
    username: payload.username ?? db.users[index].username,
    role: payload.role === 'admin' ? 'admin' : 'user'
  };

  if (payload.password) {
    db.users[index].password = payload.password;
  }

  await writeDb(db);
  return json(safeUser(db.users[index]));
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const db = await readDb();
  const before = db.users.length;
  db.users = db.users.filter((user) => String(user.id) !== String(id));

  if (db.users.length === before) {
    return json({ error: 'ไม่พบผู้ใช้' }, { status: 404 });
  }

  await writeDb(db);
  return json({ ok: true });
}
