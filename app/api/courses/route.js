import { json, readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = await readDb();
  return json(db.courses);
}

export async function POST(request) {
  const payload = await request.json();
  const db = await readDb();
  const id = Date.now();
  const course = {
    id,
    unit: payload.unit || `หน่วยที่ ${db.courses.length + 1}`,
    title: payload.title || 'บทเรียนใหม่',
    desc: payload.desc || '',
    icon: payload.icon || '📚',
    videoUrl: payload.videoUrl || '',
    lessons: payload.lessons || []
  };

  db.courses.push(course);
  await writeDb(db);
  return json(course, { status: 201 });
}
