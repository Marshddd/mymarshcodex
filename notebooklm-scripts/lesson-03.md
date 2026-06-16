# Backend Mastery - บทที่ 3: Node.js และ Express

ใช้ไฟล์นี้กับ NotebookLM แยกต่างหาก เพื่อสร้างเสียง 1 คลิป และวิดีโอ 1 คลิป สำหรับบทที่ 3 โดยเฉพาะ

---

## ส่วนที่ 1: คำพูดสอนสำหรับเสียง

บทนี้เราจะเริ่มสร้าง Back-End จริงด้วย Node.js และ Express

Node.js คือ Runtime ที่ทำให้ JavaScript รันนอก Browser ได้ ปกติ JavaScript มักใช้เขียน Front-End แต่เมื่อมี Node.js เราสามารถใช้ JavaScript เขียน Server, API, เครื่องมือจัดการไฟล์ หรือระบบหลังบ้านได้

Express คือ Framework ยอดนิยมบน Node.js ที่ช่วยให้เราสร้าง Web Server และ REST API ได้ง่ายขึ้น แทนที่เราจะต้องจัดการ HTTP เองทั้งหมด Express เตรียมระบบ Routing, Middleware และ Response ไว้ให้

ขั้นตอนเริ่มต้นคือสร้างโปรเจกต์ ติดตั้ง Express แล้วสร้างไฟล์ `server.js` หลังจากนั้นเราจะกำหนด Route ว่าเมื่อผู้ใช้เรียก URL ไหน Server ควรตอบอะไร

Middleware คือฟังก์ชันที่ทำงานตรงกลางระหว่าง Request และ Route Handler เช่น ตรวจสอบ Login, อ่าน JSON Body, เขียน Log, หรือจัดการ Error ถ้าเข้าใจ Middleware จะทำให้เราออกแบบระบบ Back-End ได้เป็นระเบียบมากขึ้น

---

## ส่วนที่ 2: ข้อความขึ้นจอสำหรับวิดีโอ

- Node.js ทำให้ JavaScript รันบน Server ได้
- Express ช่วยสร้าง API ได้เร็วขึ้น
- Route คือเส้นทางของ API
- Middleware คือด่านกลางก่อนถึง Controller

---

## ส่วนที่ 3: โค้ดตัวอย่างและคำอธิบาย

```js
const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('API server running on port 3000');
});
```

### อธิบายโค้ด
บรรทัด `app.use(express.json())` ทำให้ Server อ่านข้อมูล JSON จาก Request Body ได้ ส่วน Middleware ถัดมาจะพิมพ์ Method และ Path ทุกครั้งที่มี Request เข้ามา จากนั้น `GET /api/health` ใช้ตรวจว่า API ยังทำงานอยู่หรือไม่
