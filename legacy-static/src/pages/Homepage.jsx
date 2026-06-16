import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';

const Homepage = ({ onNavigate }) => (
  <div className="min-h-screen bg-[#0f0f0f]">
    <header className="flex items-center justify-between border-b border-gray-800 bg-gray-950 px-4 py-4 sm:px-6">
      <button onClick={() => onNavigate('home')} className="text-xl font-bold text-white">Backend Mastery</button>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={() => onNavigate('login')}>เข้าสู่ระบบ</Button>
        <Button onClick={() => onNavigate('register')}>สมัครเรียน</Button>
      </div>
    </header>

    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <section className="space-y-7">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Back-End Learning Platform</p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">เรียน Back-End จากศูนย์จนสร้าง API ได้จริง</h1>
          <p className="max-w-2xl text-lg leading-8 text-gray-300">
            ฝึกตั้งแต่ภาพรวมของ server, database, routing, middleware ไปจนถึงการออกแบบ RESTful API พร้อมบทเรียน ตัวอย่างโค้ด และแบบทดสอบวัดผล
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => onNavigate('register')}>เริ่มเรียนฟรี</Button>
            <Button variant="outline" onClick={() => onNavigate('lesson-list')}>ดูหลักสูตร</Button>
          </div>
        </section>

        <Card className="bg-gray-950">
          <div className="mb-4 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="ml-2 text-sm text-gray-500">server.js</span>
          </div>
          <pre className="overflow-x-auto text-sm leading-6 text-gray-300">
            <code>{`const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000);`}</code>
          </pre>
        </Card>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {['บทเรียนเป็นลำดับ', 'มีตัวอย่างโค้ด', 'มีแบบทดสอบ'].map((title, index) => (
          <Card key={title}>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold">{index + 1}</div>
            <h2 className="mb-2 text-lg font-bold text-white">{title}</h2>
            <p className="text-gray-400">เนื้อหาสั้น กระชับ และต่อยอดได้จริงสำหรับผู้เริ่มต้น</p>
          </Card>
        ))}
      </div>
    </main>
  </div>
);

export default Homepage;
