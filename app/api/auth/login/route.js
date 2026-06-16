import { json, readDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const { username, password } = await request.json();
  const db = await readDb();
  const user = db.users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 });
  }

  return json({
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      progress: user.progress || {},
      quizResults: user.quizResults || {}
    }
  });
}
