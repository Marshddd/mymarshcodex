'use client';

import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';

const emptyCourse = { unit: '', title: '', desc: '', icon: '📚', videoUrl: '', lessons: [] };
const emptyQuiz = { id: '', courseId: '', type: 'pre', title: '', desc: '', questions: [] };

async function api(path, options) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!response.ok) throw new Error('API error');
  return response.json();
}

export default function AdminPage() {
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [courseForm, setCourseForm] = useState(emptyCourse);
  const [quizForm, setQuizForm] = useState(emptyQuiz);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [message, setMessage] = useState('');
  const [loadError, setLoadError] = useState('');

  async function load() {
    try {
      setLoadError('');
      const [courseData, quizData] = await Promise.all([
        api('/api/courses'),
        api('/api/quizzes')
      ]);
      setCourses(courseData);
      setQuizzes(quizData);
    } catch {
      setLoadError('ไม่สามารถโหลดข้อมูล Admin ได้ เพราะ API backend ไม่ทำงาน ถ้าเปิดผ่าน GitHub Pages จะใช้ Admin แบบ Fullstack ไม่ได้ ต้อง deploy ไปยัง Vercel, Render, Railway หรือรันด้วย Docker');
    }
  }

  useEffect(() => {
    load();
  }, []);

  function updateCourseField(field, value) {
    setCourseForm((current) => ({ ...current, [field]: value }));
  }

  function updateLesson(index, field, value) {
    setCourseForm((current) => ({
      ...current,
      lessons: current.lessons.map((lesson, i) => i === index ? { ...lesson, [field]: value } : lesson)
    }));
  }

  function addLesson() {
    setCourseForm((current) => ({
      ...current,
      lessons: [...current.lessons, { id: `l-${Date.now()}`, title: '', content: '' }]
    }));
  }

  function removeLesson(index) {
    setCourseForm((current) => ({
      ...current,
      lessons: current.lessons.filter((_, i) => i !== index)
    }));
  }

  async function saveCourse(event) {
    event.preventDefault();
    if (editingCourseId) {
      await api(`/api/courses/${editingCourseId}`, { method: 'PUT', body: JSON.stringify(courseForm) });
      setMessage('บันทึกบทเรียนแล้ว');
    } else {
      await api('/api/courses', { method: 'POST', body: JSON.stringify(courseForm) });
      setMessage('เพิ่มบทเรียนแล้ว');
    }
    setCourseForm(emptyCourse);
    setEditingCourseId(null);
    await load();
  }

  function editCourse(course) {
    setEditingCourseId(course.id);
    setCourseForm(course);
  }

  async function deleteCourse(id) {
    await api(`/api/courses/${id}`, { method: 'DELETE' });
    setMessage('ลบบทเรียนแล้ว');
    await load();
  }

  function updateQuizField(field, value) {
    setQuizForm((current) => ({ ...current, [field]: value }));
  }

  function addQuestion() {
    setQuizForm((current) => ({
      ...current,
      questions: [
        ...current.questions,
        { id: Date.now(), question: '', options: ['', '', '', ''], correct: 0 }
      ]
    }));
  }

  function updateQuestion(index, field, value) {
    setQuizForm((current) => ({
      ...current,
      questions: current.questions.map((question, i) => i === index ? { ...question, [field]: value } : question)
    }));
  }

  function updateOption(questionIndex, optionIndex, value) {
    setQuizForm((current) => ({
      ...current,
      questions: current.questions.map((question, i) => {
        if (i !== questionIndex) return question;
        const options = [...question.options];
        options[optionIndex] = value;
        return { ...question, options };
      })
    }));
  }

  function removeQuestion(index) {
    setQuizForm((current) => ({
      ...current,
      questions: current.questions.filter((_, i) => i !== index)
    }));
  }

  async function saveQuiz(event) {
    event.preventDefault();
    const payload = { ...quizForm, courseId: Number(quizForm.courseId) };
    if (editingQuizId) {
      await api(`/api/quizzes/${editingQuizId}`, { method: 'PUT', body: JSON.stringify(payload) });
      setMessage('บันทึกแบบทดสอบแล้ว');
    } else {
      await api('/api/quizzes', { method: 'POST', body: JSON.stringify(payload) });
      setMessage('เพิ่มแบบทดสอบแล้ว');
    }
    setQuizForm(emptyQuiz);
    setEditingQuizId(null);
    await load();
  }

  function editQuiz(quiz) {
    setEditingQuizId(quiz.id);
    setQuizForm(quiz);
  }

  async function deleteQuiz(id) {
    await api(`/api/quizzes/${id}`, { method: 'DELETE' });
    setMessage('ลบแบบทดสอบแล้ว');
    await load();
  }

  return (
    <main className="shell">
      <Nav />
      <section className="section">
        <h2>Admin Fullstack</h2>
        <p className="muted">จัดการข้อมูลผ่าน Next.js API Routes และบันทึกลงไฟล์ JSON</p>
        {loadError ? <p className="card" style={{ color: '#dc2626' }}>{loadError}</p> : null}
        {message ? <p className="btn secondary">{message}</p> : null}

        <div className="grid" style={{ alignItems: 'start' }}>
          <form className="card form" onSubmit={saveCourse}>
            <h2>{editingCourseId ? 'แก้ไขบทเรียน' : 'เพิ่มบทเรียน'}</h2>
            <input className="input" placeholder="หน่วย" value={courseForm.unit} onChange={(e) => updateCourseField('unit', e.target.value)} />
            <input className="input" placeholder="ชื่อบทเรียน" value={courseForm.title} onChange={(e) => updateCourseField('title', e.target.value)} required />
            <textarea className="textarea" placeholder="คำอธิบาย" value={courseForm.desc} onChange={(e) => updateCourseField('desc', e.target.value)} />
            <input className="input" placeholder="ไอคอน" value={courseForm.icon} onChange={(e) => updateCourseField('icon', e.target.value)} />
            <input className="input" placeholder="ลิงก์วิดีโอ" value={courseForm.videoUrl || ''} onChange={(e) => updateCourseField('videoUrl', e.target.value)} />

            <h3>บทเรียนย่อย</h3>
            {courseForm.lessons.map((lesson, index) => (
              <div className="card form" key={lesson.id || index}>
                <input className="input" placeholder="ชื่อบทเรียนย่อย" value={lesson.title} onChange={(e) => updateLesson(index, 'title', e.target.value)} />
                <textarea className="textarea" placeholder="เนื้อหา" value={lesson.content} onChange={(e) => updateLesson(index, 'content', e.target.value)} />
                <button className="btn danger" type="button" onClick={() => removeLesson(index)}>ลบบทเรียนย่อย</button>
              </div>
            ))}
            <button className="btn secondary" type="button" onClick={addLesson}>+ เพิ่มบทเรียนย่อย</button>
            <button className="btn" type="submit">{editingCourseId ? 'บันทึกบทเรียน' : 'เพิ่มบทเรียน'}</button>
          </form>

          <form className="card form" onSubmit={saveQuiz}>
            <h2>{editingQuizId ? 'แก้ไขแบบทดสอบ' : 'เพิ่มแบบทดสอบ'}</h2>
            <input className="input" placeholder="รหัส เช่น q1-pre" value={quizForm.id} onChange={(e) => updateQuizField('id', e.target.value)} disabled={Boolean(editingQuizId)} required />
            <select className="select" value={quizForm.courseId} onChange={(e) => updateQuizField('courseId', e.target.value)} required>
              <option value="">เลือกหน่วย</option>
              {courses.map((course) => <option key={course.id} value={course.id}>{course.unit}: {course.title}</option>)}
            </select>
            <select className="select" value={quizForm.type} onChange={(e) => updateQuizField('type', e.target.value)}>
              <option value="pre">ก่อนเรียน</option>
              <option value="post">หลังเรียน</option>
            </select>
            <input className="input" placeholder="ชื่อแบบทดสอบ" value={quizForm.title} onChange={(e) => updateQuizField('title', e.target.value)} required />
            <textarea className="textarea" placeholder="คำอธิบาย" value={quizForm.desc} onChange={(e) => updateQuizField('desc', e.target.value)} />

            <h3>คำถาม</h3>
            {quizForm.questions.map((question, questionIndex) => (
              <div className="card form" key={question.id || questionIndex}>
                <textarea className="textarea" placeholder="คำถาม" value={question.question} onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)} />
                {question.options.map((option, optionIndex) => (
                  <input key={optionIndex} className="input" placeholder={`ตัวเลือก ${optionIndex + 1}`} value={option} onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)} />
                ))}
                <select className="select" value={question.correct} onChange={(e) => updateQuestion(questionIndex, 'correct', Number(e.target.value))}>
                  <option value={0}>เฉลย A</option>
                  <option value={1}>เฉลย B</option>
                  <option value={2}>เฉลย C</option>
                  <option value={3}>เฉลย D</option>
                </select>
                <button className="btn danger" type="button" onClick={() => removeQuestion(questionIndex)}>ลบคำถาม</button>
              </div>
            ))}
            <button className="btn secondary" type="button" onClick={addQuestion}>+ เพิ่มคำถาม</button>
            <button className="btn" type="submit">{editingQuizId ? 'บันทึกแบบทดสอบ' : 'เพิ่มแบบทดสอบ'}</button>
          </form>
        </div>

        <div className="grid" style={{ marginTop: 24 }}>
          <div className="card">
            <h2>รายการบทเรียน</h2>
            <table className="table">
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.icon} {course.title}</td>
                    <td className="row-actions">
                      <button className="btn secondary" onClick={() => editCourse(course)}>แก้</button>
                      <button className="btn danger" onClick={() => deleteCourse(course.id)}>ลบ</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <h2>รายการแบบทดสอบ</h2>
            <table className="table">
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz.id}>
                    <td>{quiz.title}</td>
                    <td className="row-actions">
                      <button className="btn secondary" onClick={() => editQuiz(quiz)}>แก้</button>
                      <button className="btn danger" onClick={() => deleteQuiz(quiz.id)}>ลบ</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
