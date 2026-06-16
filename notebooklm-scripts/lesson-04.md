# Backend Mastery - บทที่ 4: MongoDB และการจัดการฐานข้อมูล

ใช้ไฟล์นี้กับ NotebookLM แยกต่างหาก เพื่อสร้างเสียง 1 คลิป และวิดีโอ 1 คลิป สำหรับบทที่ 4 โดยเฉพาะ

---

## ส่วนที่ 1: คำพูดสอนสำหรับเสียง

เมื่อ Back-End เริ่มรับข้อมูลได้แล้ว สิ่งต่อไปที่ขาดไม่ได้คือ Database

Database คือที่เก็บข้อมูลของระบบ เช่น ข้อมูลผู้ใช้ คอร์สเรียน คะแนนแบบทดสอบ รายการสินค้า หรือประวัติการสั่งซื้อ ในบทนี้เราจะใช้ MongoDB ซึ่งเป็นฐานข้อมูลแบบ NoSQL

MongoDB เก็บข้อมูลเป็น Document ลักษณะคล้าย JSON ข้อดีคือโครงสร้างยืดหยุ่น เข้าใจง่าย และเหมาะกับการทำเว็บแอปยุคใหม่ ใน MongoDB เราจะเจอคำว่า Collection และ Document ถ้าเทียบกับ SQL Collection คล้าย Table ส่วน Document คล้าย Row

ในการใช้งานร่วมกับ Node.js เรามักใช้ Mongoose เป็นตัวช่วยเชื่อมต่อ MongoDB สร้าง Schema และจัดการข้อมูลด้วย Model

Schema คือการกำหนดรูปแบบข้อมูล เช่น User ต้องมี name, email, password และ role เมื่อมี Schema แล้วเราสามารถสร้าง อ่าน แก้ไข และลบข้อมูลได้อย่างเป็นระบบ ซึ่งเรียกสั้น ๆ ว่า CRUD

---

## ส่วนที่ 2: ข้อความขึ้นจอสำหรับวิดีโอ

- MongoDB คือ NoSQL Database
- Collection คล้าย Table
- Document คล้าย Row
- Mongoose ช่วยเชื่อม Node.js กับ MongoDB
- CRUD คือ Create, Read, Update, Delete

---

## ส่วนที่ 3: โค้ดตัวอย่างและคำอธิบาย

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/backend_mastery');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
});

const User = mongoose.model('User', userSchema);

async function createUser() {
  const user = await User.create({
    name: 'Somchai',
    email: 'somchai@example.com',
    password: '123456'
  });

  console.log(user);
}
```

### อธิบายโค้ด
โค้ดนี้เชื่อมต่อ MongoDB แล้วสร้าง Schema สำหรับผู้ใช้ จากนั้นสร้าง Model ชื่อ `User` และใช้ `User.create()` เพื่อบันทึกผู้ใช้ใหม่ลงฐานข้อมูล
