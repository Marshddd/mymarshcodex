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
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
}
