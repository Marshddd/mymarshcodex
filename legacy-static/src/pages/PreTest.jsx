import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';

const questions = [
  {
    id: 1,
    type: 'radio',
    question: 'Back-End Development คืออะไร?',
    answer: 'การพัฒนาระบบฝั่งเซิร์ฟเวอร์และฐานข้อมูล',
    options: ['การออกแบบหน้าจอ', 'การพัฒนาระบบฝั่งเซิร์ฟเวอร์และฐานข้อมูล', 'การทำภาพกราฟิก', 'การเลือกสีเว็บไซต์'],
  },
  {
    id: 2,
    type: 'radio',
    question: 'Node.js คืออะไร?',
    answer: 'Runtime สำหรับรัน JavaScript นอกเบราว์เซอร์',
    options: ['Database', 'Runtime สำหรับรัน JavaScript นอกเบราว์เซอร์', 'ภาษาโปรแกรมใหม่', 'เครื่องมือออกแบบ UI'],
  },
  {
    id: 3,
    type: 'checkbox',
    question: 'สิ่งใดเป็นส่วนหนึ่งของ Back-End?',
    answer: ['Server', 'Database', 'API'],
    options: ['Server', 'Database', 'API', 'สีปุ่ม'],
  },
  {
    id: 4,
    type: 'checkbox',
    question: 'Express.js ช่วยเรื่องใดบ้าง?',
    answer: ['สร้าง Web Server', 'จัดการ Routing', 'จัดการ Middleware'],
    options: ['สร้าง Web Server', 'จัดการ Routing', 'ออกแบบโลโก้', 'จัดการ Middleware'],
  },
];

const PreTest = ({ user, onNavigate }) => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const toggleCheckbox = (questionId, option, checked) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: checked ? [...(prev[questionId] || []), option] : (prev[questionId] || []).filter((item) => item !== option),
    }));
  };

  const handleSubmit = () => {
    const total = questions.reduce((sum, question) => {
      const answer = answers[question.id];
      if (question.type === 'radio') return sum + (answer === question.answer ? 1 : 0);
      return sum + ([...(answer || [])].sort().join('|') === [...question.answer].sort().join('|') ? 1 : 0);
    }, 0);
    setScore(total);
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <Sidebar user={user} onNavigate={onNavigate} currentPage="pre-test" />
      <div className="min-w-0 flex-1">
        <Header title="แบบทดสอบก่อนเรียน" onNavigate={onNavigate} showBackButton user={user} />
        <main className="p-4 sm:p-6">
          <div className="mx-auto max-w-3xl space-y-5">
            {questions.map((question) => (
              <Card key={question.id}>
                <h2 className="mb-1 text-lg font-bold text-white">ข้อที่ {question.id}: {question.question}</h2>
                <p className="mb-4 text-sm text-gray-400">{question.type === 'radio' ? 'เลือกคำตอบเดียว' : 'เลือกได้หลายคำตอบ'}</p>
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <label key={option} className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-800 p-4 hover:bg-gray-700">
                      <input
                        type={question.type}
                        name={`q-${question.id}`}
                        checked={question.type === 'radio' ? answers[question.id] === option : (answers[question.id] || []).includes(option)}
                        onChange={(e) => question.type === 'radio'
                          ? setAnswers((prev) => ({ ...prev, [question.id]: option }))
                          : toggleCheckbox(question.id, option, e.target.checked)}
                        className="h-5 w-5 accent-blue-600"
                      />
                      <span className="text-white">{option}</span>
                    </label>
                  ))}
                </div>
              </Card>
            ))}
            {score !== null && (
              <Card className="border-emerald-600 bg-emerald-950/30 text-center">
                <p className="text-lg font-bold text-white">คะแนนของคุณ: {score}/{questions.length}</p>
                <p className="mt-1 text-gray-300">{score === questions.length ? 'ยอดเยี่ยม พร้อมเรียนบทต่อไป' : 'ลองทบทวนคำตอบแล้วทำใหม่ได้'}</p>
              </Card>
            )}
            <div className="flex justify-center">
              <Button onClick={handleSubmit} className="px-10">ส่งคำตอบ</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PreTest;
