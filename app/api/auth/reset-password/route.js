import { json, readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { token, password } = await request.json();
    if (!token || !password) return json({ error: 'ข้อมูลไม่ครบ' }, { status: 400 });
    if (password.length < 6) return json({ error: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' }, { status: 400 });

    const db = await readDb();
    const resetToken = (db.resetTokens || []).find(
      t => t.token === token && t.expires > Date.now()
    );

    if (!resetToken) {
      return json({ error: 'ลิงก์หมดอายุหรือไม่ถูกต้อง กรุณาขอใหม่' }, { status: 400 });
    }

    const userIdx = db.users.findIndex(u => u.id === resetToken.userId);
    if (userIdx === -1) return json({ error: 'ไม่พบผู้ใช้' }, { status: 404 });

    db.users[userIdx].password = password;
    db.resetTokens = (db.resetTokens || []).filter(t => t.token !== token);

    await writeDb(db);
    return json({ message: 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว' });
  } catch (err) {
    console.error('reset-password error:', err);
    return json({ error: 'เกิดข้อผิดพลาด กรุณาลองใหม่' }, { status: 500 });
  }
}
