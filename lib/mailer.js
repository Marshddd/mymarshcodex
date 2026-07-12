import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function sendResetEmail(to, token) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://mymarshcodex.onrender.com';
  const resetUrl = `${base}/#reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Backend Mastery" <${process.env.GMAIL_USER}>`,
    to,
    subject: '🔑 รีเซ็ตรหัสผ่าน — Backend Mastery',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#0d1117;color:#e6edf3;padding:32px;border-radius:12px;">
        <h2 style="color:#7ee787;">🔑 รีเซ็ตรหัสผ่าน</h2>
        <p>คุณได้ขอรีเซ็ตรหัสผ่านสำหรับบัญชี <strong>Backend Mastery</strong></p>
        <p>กดปุ่มด้านล่างเพื่อตั้งรหัสผ่านใหม่:</p>
        <a href="${resetUrl}"
           style="display:inline-block;margin:16px 0;padding:12px 28px;background:#238636;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;">
          รีเซ็ตรหัสผ่าน
        </a>
        <p style="color:#8b949e;font-size:13px;">ลิงก์นี้จะหมดอายุใน <strong>1 ชั่วโมง</strong><br>ถ้าคุณไม่ได้ขอรีเซ็ต ไม่ต้องทำอะไร</p>
      </div>
    `,
  });
}
