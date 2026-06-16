import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';

export const lessons = [
  {
    id: 1,
    title: 'ข้อมูลและภาพรวม Back-End',
    duration: '35 นาที',
    progress: 65,
    level: 'เริ่มต้น',
    summary: 'เข้าใจว่า Back-End ทำหน้าที่อะไร และทำงานร่วมกับ Front-End, Server, Database และ API อย่างไร',
    sections: ['ภาพรวมระบบเว็บ', 'หน้าที่ของ Server', 'Database และ API', 'ตัวอย่างเส้นทาง Request/Response'],
  },
  {
    id: 2,
    title: 'สร้าง Server ด้วย Node.js',
    duration: '45 นาที',
    progress: 25,
    level: 'เริ่มต้น',
    summary: 'ติดตั้ง Node.js สร้างโปรเจกต์ และเปิด server แรกด้วย Express',
    sections: ['ติดตั้ง Node.js', 'สร้าง package.json', 'ติดตั้ง Express', 'เปิด server แรก'],
  },
  {
    id: 3,
    title: 'จัดการ Database',
    duration: '50 นาที',
    progress: 0,
    level: 'พื้นฐาน',
    summary: 'ออกแบบข้อมูลเบื้องต้นและทำ CRUD ผ่านฐานข้อมูล',
    sections: ['Table/Collection', 'Create', 'Read', 'Update/Delete'],
  },
  {
    id: 4,
    title: 'RESTful API',
    duration: '55 นาที',
    progress: 0,
    level: 'พื้นฐาน',
    summary: 'ออกแบบ endpoint, method, status code และ response ที่อ่านง่าย',
    sections: ['GET/POST/PUT/DELETE', 'Status code', 'Validation', 'Error response'],
  },
];

const LessonList = ({ user, onNavigate }) => (
  <div className="flex min-h-screen bg-[#0f0f0f]">
    <Sidebar user={user} onNavigate={onNavigate} currentPage="lesson-list" />
    <div className="min-w-0 flex-1">
      <Header title="รายการบทเรียน" onNavigate={onNavigate} user={user} />
      <main className="p-4 sm:p-6">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id} onClick={() => onNavigate('lesson-content', { lessonId: lesson.id })} className="flex flex-col">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold">{lesson.id}</div>
                <span className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">{lesson.level}</span>
              </div>
              <h2 className="mb-2 text-lg font-bold text-white">{lesson.title}</h2>
              <p className="mb-5 flex-1 text-sm leading-6 text-gray-400">{lesson.summary}</p>
              <div className="mb-2 flex justify-between text-sm text-gray-400">
                <span>{lesson.duration}</span>
                <span>{lesson.progress}%</span>
              </div>
              <ProgressBar progress={lesson.progress} />
              <Button className="mt-5 w-full">เข้าสู่บทเรียน</Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  </div>
);

export default LessonList;
