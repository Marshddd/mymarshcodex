import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="nav">
      <Link className="brand" href="/">
        ⬡ Backend <span>Mastery</span>
      </Link>
      <div className="nav-links">
        <Link href="/">หน้าหลัก</Link>
        <Link href="/learn">บทเรียน</Link>
        <Link href="/quiz">แบบทดสอบ</Link>
        <Link href="/my-courses">ของฉัน</Link>
        <Link href="/profile">โปรไฟล์</Link>
        <Link href="/about">เกี่ยวกับ</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
}
