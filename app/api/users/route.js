import { json, readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

function safeUser(user) {
  const { password: _password, ...rest } = user;
  return rest;
}

export async function GET() {
  const db = await readDb();
  return json((db.users || []).map(safeUser));
}

export async function POST(request) {
  const payload = await request.json();
  const username = String(payload.username || '').trim();
  const password = String(payload.password || '').trim();
  const name = String(payload.name || '').trim();

  if (!username || !password || !name) {
    return json({ error: 'กรุณากรอกข้อมูลผู้ใช้ให้ครบ' }, { status: 400 });
  }

  const db = await readDb();
  if (db.users.some((user) => user.username === username)) {
    return json({ error: 'ชื่อผู้ใช้นี้ถูกใช้แล้ว' }, { status: 409 });
  }

  const user = {
    id: `u-${Date.now()}`,
    username,
    password,
    name,
    role: payload.role === 'admin' ? 'admin' : 'user',
    progress: {},
    quizResults: {}
  };
  db.users.push(user);
  await writeDb(db);
  return json(safeUser(user), { status: 201 });
}
