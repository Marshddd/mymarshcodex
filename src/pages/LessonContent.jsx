import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { lessons } from './LessonList';

const LessonContent = ({ user, lessonId, onNavigate }) => {
  const lesson = lessons.find((item) => item.id === lessonId) || lessons[0];

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <Sidebar user={user} onNavigate={onNavigate} currentPage="lesson-list" />
      <div className="min-w-0 flex-1">
        <Header title={`บทที่ ${lesson.id}: ${lesson.title}`} onNavigate={onNavigate} showBackButton user={user} />
        <main className="p-4 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-5">
              <Card className="p-0">
                <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-950 text-center">
                  <div>
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl">▶</div>
                    <p className="text-gray-300">ตัวอย่างพื้นที่วิดีโอบทเรียน</p>
                  </div>
                </div>
              </Card>
              <Card>
                <h2 className="mb-3 text-xl font-bold text-white">{lesson.title}</h2>
                <p className="leading-7 text-gray-300">{lesson.summary}</p>
              </Card>
              <Card>
                <h3 className="mb-4 text-lg font-bold text-white">ตัวอย่างโค้ด</h3>
                <pre className="overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm leading-6 text-gray-300">
                  <code>{`app.get("/api/lessons/${lesson.id}", (req, res) => {
  res.json({
    id: ${lesson.id},
    title: "${lesson.title}"
  });
});`}</code>
                </pre>
              </Card>
              <div className="flex justify-between gap-3">
                <Button variant="secondary" onClick={() => onNavigate('lesson-list')}>กลับรายการบทเรียน</Button>
                <Button onClick={() => onNavigate('pre-test')}>ทำแบบทดสอบ</Button>
              </div>
            </div>
            <Card>
              <h3 className="mb-4 text-lg font-bold text-white">เนื้อหาในบทนี้</h3>
              <div className="space-y-2">
                {lesson.sections.map((section, index) => (
                  <div key={section} className={`rounded-lg p-3 ${index === 0 ? 'border border-blue-500 bg-blue-500/10' : 'bg-gray-800'}`}>
                    <p className="font-medium text-white">{index + 1}. {section}</p>
                    <p className="text-sm text-gray-400">{index === 0 ? 'กำลังเรียน' : 'พร้อมเรียนต่อ'}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LessonContent;
