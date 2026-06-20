import Nav from '@/components/Nav';

export default function AboutPage() {
  return (
    <main className="shell">
      <Nav />
      <section className="section">
        <h2>เกี่ยวกับ Backend Mastery</h2>
        <p className="lead">
          แพลตฟอร์มเรียน Back-End ภาษาไทย ครอบคลุมพื้นฐาน HTTP/REST, Node.js, MongoDB,
          Authentication, Docker และการ Deploy พร้อมระบบแบบทดสอบและติดตามความก้าวหน้า
        </p>
        <div className="grid">
          <article className="card">
            <h2>เป้าหมาย</h2>
            <p className="muted">ช่วยให้ผู้เรียนเข้าใจงาน Back-End ตั้งแต่พื้นฐานจนพร้อมต่อยอดทำโปรเจกต์จริง</p>
          </article>
          <article className="card">
            <h2>การวัดผล</h2>
            <p className="muted">มีแบบทดสอบก่อนเรียนและหลังเรียนในแต่ละหน่วย พร้อมบันทึกคะแนนไว้ในโปรไฟล์</p>
          </article>
          <article className="card">
            <h2>ระบบผู้เรียน</h2>
            <p className="muted">สมัครสมาชิก เข้าสู่ระบบ บันทึกบทเรียนที่เรียนแล้ว ดูบทเรียนของฉัน และรับใบรับรอง</p>
          </article>
        </div>
      </section>
    </main>
  );
}
