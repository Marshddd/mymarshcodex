import { json, readDb, writeDb } from '@/lib/db';
import { sendResetEmail } from '@/lib/mailer';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) return json({ error: 'กรุณากรอกอีเมล' }, { status: 400 });

    const db = await readDb();
    const user = db.users.find(u => u.email === email);

    // คืน success เสมอ ป้องกันการเดาอีเมล
    if (!user) {
      return json({ message: 'ถ้ามีบัญชีอยู่ จะได้รับอีเมลเร็วๆ นี้' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 60 * 60 * 1000; // 1 ชั่วโมง

    if (!db.resetTokens) db.resetTokens = [];
    db.resetTokens = db.resetTokens.filter(t => t.userId !== user.id);
    db.resetTokens.push({ token, userId: user.id, expires });

    await writeDb(db);
    await sendResetEmail(email, token);

    return json({ message: 'ส่งอีเมลแล้ว กรุณาตรวจสอบกล่องจดหมาย' });
  } catch (err) {
    console.error('forgot-password error:', err);
    return json({ error: 'เกิดข้อผิดพลาด กรุณาลองใหม่' }, { status: 500 });
  }
}
