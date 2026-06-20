import { json, readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const payload = await request.json();
  const username = String(payload.username || '').trim();
  const password = String(payload.password || '');
  const firstname = String(payload.firstname || '').trim();
  const lastname = String(payload.lastname || '').trim();
  const email = String(payload.email || '').trim();
  const name = String(payload.name || `${firstname} ${lastname}`.trim()).trim();

  if (!username || !password || !name) {
    return json({ error: 'กรุณากรอกข้อมูลให้ครบ' }, { status: 400 });
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
    firstname,
    lastname,
    email,
    role: 'user',
    progress: {},
    quizResults: {}
  };

  db.users.push(user);
  await writeDb(db);

  return json({
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      progress: user.progress,
      quizResults: user.quizResults
    }
  }, { status: 201 });
}
