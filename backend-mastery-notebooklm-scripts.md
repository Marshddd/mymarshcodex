# Backend Mastery - สคริปต์เสียงและวิดีโอสำหรับ NotebookLM

ไฟล์นี้ออกแบบไว้สำหรับนำไปให้ NotebookLM ทำเป็นเสียงหรือวิดีโอสอน แล้วนำกลับมาใส่ในบทเรียนของเว็บ Backend Mastery

---

## บทที่ 1: พื้นฐาน Back-End

### คำพูดสอน
สวัสดีครับ ในบทนี้เราจะเริ่มจากภาพใหญ่ก่อนว่า Back-End คืออะไร และทำไมมันถึงเป็นหัวใจสำคัญของเว็บแอปพลิเคชัน

เวลาผู้ใช้เปิดเว็บไซต์ เขามักจะเห็นแค่หน้าตา ปุ่ม ฟอร์ม รูปภาพ หรือข้อความต่าง ๆ ซึ่งส่วนนั้นเราเรียกว่า Front-End แต่เบื้องหลังของทุกการกดปุ่ม มักจะมีระบบอีกส่วนหนึ่งคอยรับคำสั่ง ประมวลผล ตรวจสอบข้อมูล และส่งคำตอบกลับมา นั่นคือ Back-End

Back-End ทำงานอยู่ฝั่ง Server หน้าที่หลักคือรับ Request จากผู้ใช้ เช่น ขอข้อมูลสินค้า สมัครสมาชิก เข้าสู่ระบบ หรือบันทึกคะแนนแบบทดสอบ จากนั้น Server จะประมวลผล อาจดึงข้อมูลจาก Database แล้วส่ง Response กลับไปให้ Front-End แสดงผล

ให้จำภาพง่าย ๆ ว่า Front-End คือสิ่งที่ผู้ใช้เห็น ส่วน Back-End คือสมองและระบบจัดการข้อมูลที่อยู่ด้านหลัง ถ้าไม่มี Back-End เว็บอาจดูสวยได้ แต่จะไม่มีระบบสมาชิก ไม่มีฐานข้อมูล ไม่มี API และทำงานจริงได้จำกัดมาก

ในคอร์สนี้เราจะเรียนตั้งแต่พื้นฐาน HTTP, REST API, Node.js, Express, MongoDB, ระบบ Login, JWT, Docker และการ Deploy ขึ้น Cloud เพื่อให้เข้าใจเส้นทางของ Back-End Developer แบบครบวงจร

### ข้อความขึ้นจอ
- Back-End คือระบบเบื้องหลังของเว็บหรือแอป
- ทำงานบน Server
- รับ Request จาก Front-End
- ประมวลผลข้อมูล
- ติดต่อ Database
- ส่ง Response กลับไปให้ผู้ใช้

### โค้ดตัวอย่าง
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Back-End'
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### อธิบายโค้ด
โค้ดนี้คือ Server ตัวแรกของเรา เราใช้ Express สร้างเว็บเซิร์ฟเวอร์ เมื่อผู้ใช้เข้ามาที่ path `/` ระบบจะตอบกลับเป็น JSON ข้อความว่า `Hello from Back-End` และ Server จะรันอยู่ที่ port 3000

---

## บทที่ 2: HTTP และ REST API

### คำพูดสอน
ในบทนี้เราจะเข้าใจภาษาที่ Client และ Server ใช้คุยกัน นั่นคือ HTTP

HTTP ย่อมาจาก HyperText Transfer Protocol เป็นกติกาการสื่อสารบนเว็บ เวลาผู้ใช้กดปุ่ม เปิดหน้าเว็บ หรือส่งฟอร์ม Browser จะสร้าง HTTP Request ส่งไปหา Server จากนั้น Server จะส่ง HTTP Response กลับมา

Request จะมีส่วนสำคัญ เช่น Method, URL, Headers และ Body ส่วน Response จะมี Status Code, Headers และ Body เช่นกัน

Method ที่ใช้บ่อยที่สุดมี 4 ตัว คือ GET สำหรับดึงข้อมูล POST สำหรับสร้างข้อมูล PUT หรือ PATCH สำหรับแก้ไขข้อมูล และ DELETE สำหรับลบข้อมูล ถ้าเราออกแบบ API ให้ใช้ Method เหล่านี้อย่างเป็นระบบ จะเรียกว่า REST API

ตัวอย่างเช่น ถ้าต้องการดูรายชื่อผู้ใช้ทั้งหมด เราอาจใช้ `GET /users` ถ้าต้องการสร้างผู้ใช้ใหม่ ใช้ `POST /users` ถ้าต้องการแก้ไขผู้ใช้ ใช้ `PUT /users/:id` และถ้าต้องการลบผู้ใช้ ใช้ `DELETE /users/:id`

สิ่งสำคัญอีกอย่างคือ Status Code เช่น 200 แปลว่าสำเร็จ 201 แปลว่าสร้างข้อมูลสำเร็จ 400 แปลว่าข้อมูลผิด 401 แปลว่ายังไม่ได้รับอนุญาต 404 แปลว่าไม่พบข้อมูล และ 500 แปลว่า Server มีปัญหา

### ข้อความขึ้นจอ
- HTTP คือกติกาการสื่อสารระหว่าง Client และ Server
- Request คือคำขอจาก Client
- Response คือคำตอบจาก Server
- REST API คือการออกแบบ URL และ Method ให้เป็นระบบ

### โค้ดตัวอย่าง
```js
app.get('/users', (req, res) => {
  res.json({ users: [] });
});

app.post('/users', (req, res) => {
  const user = req.body;
  res.status(201).json({
    message: 'User created',
    user
  });
});

app.delete('/users/:id', (req, res) => {
  res.json({
    message: `Deleted user ${req.params.id}`
  });
});
```

### อธิบายโค้ด
ตัวอย่างนี้แสดง REST API พื้นฐาน `GET /users` ใช้ดึงข้อมูลผู้ใช้ `POST /users` ใช้สร้างผู้ใช้ใหม่ และ `DELETE /users/:id` ใช้ลบผู้ใช้ตาม id ที่ส่งมาใน URL

---

## บทที่ 3: Node.js และ Express

### คำพูดสอน
บทนี้เราจะเริ่มสร้าง Back-End จริงด้วย Node.js และ Express

Node.js คือ Runtime ที่ทำให้ JavaScript รันนอก Browser ได้ ปกติ JavaScript มักใช้เขียน Front-End แต่เมื่อมี Node.js เราสามารถใช้ JavaScript เขียน Server, API, เครื่องมือจัดการไฟล์ หรือระบบหลังบ้านได้

Express คือ Framework ยอดนิยมบน Node.js ที่ช่วยให้เราสร้าง Web Server และ REST API ได้ง่ายขึ้น แทนที่เราจะต้องจัดการ HTTP เองทั้งหมด Express เตรียมระบบ Routing, Middleware และ Response ไว้ให้

ขั้นตอนเริ่มต้นคือสร้างโปรเจกต์ ติดตั้ง Express แล้วสร้างไฟล์ `server.js` หลังจากนั้นเราจะกำหนด Route ว่าเมื่อผู้ใช้เรียก URL ไหน Server ควรตอบอะไร

Middleware คือฟังก์ชันที่ทำงานตรงกลางระหว่าง Request และ Route Handler เช่น ตรวจสอบ Login, อ่าน JSON Body, เขียน Log, หรือจัดการ Error ถ้าเข้าใจ Middleware จะทำให้เราออกแบบระบบ Back-End ได้เป็นระเบียบมากขึ้น

### ข้อความขึ้นจอ
- Node.js ทำให้ JavaScript รันบน Server ได้
- Express ช่วยสร้าง API ได้เร็วขึ้น
- Route คือเส้นทางของ API
- Middleware คือด่านกลางก่อนถึง Controller

### โค้ดตัวอย่าง
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

---

## บทที่ 4: MongoDB และการจัดการฐานข้อมูล

### คำพูดสอน
เมื่อ Back-End เริ่มรับข้อมูลได้แล้ว สิ่งต่อไปที่ขาดไม่ได้คือ Database

Database คือที่เก็บข้อมูลของระบบ เช่น ข้อมูลผู้ใช้ คอร์สเรียน คะแนนแบบทดสอบ รายการสินค้า หรือประวัติการสั่งซื้อ ในบทนี้เราจะใช้ MongoDB ซึ่งเป็นฐานข้อมูลแบบ NoSQL

MongoDB เก็บข้อมูลเป็น Document ลักษณะคล้าย JSON ข้อดีคือโครงสร้างยืดหยุ่น เข้าใจง่าย และเหมาะกับการทำเว็บแอปยุคใหม่ ใน MongoDB เราจะเจอคำว่า Collection และ Document ถ้าเทียบกับ SQL Collection คล้าย Table ส่วน Document คล้าย Row

ในการใช้งานร่วมกับ Node.js เรามักใช้ Mongoose เป็นตัวช่วยเชื่อมต่อ MongoDB สร้าง Schema และจัดการข้อมูลด้วย Model

Schema คือการกำหนดรูปแบบข้อมูล เช่น User ต้องมี name, email, password และ role เมื่อมี Schema แล้วเราสามารถสร้าง อ่าน แก้ไข และลบข้อมูลได้อย่างเป็นระบบ ซึ่งเรียกสั้น ๆ ว่า CRUD

### ข้อความขึ้นจอ
- MongoDB คือ NoSQL Database
- Collection คล้าย Table
- Document คล้าย Row
- Mongoose ช่วยเชื่อม Node.js กับ MongoDB
- CRUD คือ Create, Read, Update, Delete

### โค้ดตัวอย่าง
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

---

## บทที่ 5: Authentication, JWT และ Security

### คำพูดสอน
บทนี้เป็นหนึ่งในส่วนสำคัญที่สุดของ Back-End นั่นคือระบบยืนยันตัวตน หรือ Authentication

Authentication คือการตรวจสอบว่าผู้ใช้เป็นใคร ตัวอย่างที่คุ้นเคยคือระบบสมัครสมาชิกและเข้าสู่ระบบ ผู้ใช้กรอก email กับ password แล้ว Server ตรวจสอบว่าถูกต้องหรือไม่

สิ่งที่ห้ามทำเด็ดขาดคือเก็บ password แบบตัวอักษรจริงลง Database เพราะถ้าฐานข้อมูลรั่ว Password ของผู้ใช้จะรั่วทันที วิธีที่ถูกต้องคือ Hash password ด้วยเครื่องมืออย่าง bcrypt ก่อนบันทึก

หลังจาก Login สำเร็จ Server มักสร้าง Token ส่งกลับไปให้ผู้ใช้ ในคอร์สนี้เราจะใช้ JWT หรือ JSON Web Token ซึ่งเป็น Token ที่บรรจุข้อมูลบางอย่าง เช่น userId และ role แล้วมีลายเซ็นเพื่อป้องกันการปลอมแปลง

เมื่อผู้ใช้เรียก API ที่ต้อง Login เขาจะส่ง Token มากับ Header จากนั้น Server จะตรวจสอบ Token ถ้าถูกต้องจึงอนุญาตให้เข้าถึงข้อมูล

Security ไม่ใช่แค่ Login แต่รวมถึงการตรวจข้อมูลก่อนบันทึก จำกัดสิทธิ์ผู้ใช้ ป้องกันข้อมูลรั่ว และไม่เปิดเผย Error ที่ละเอียดเกินไปให้ผู้โจมตีเห็น

### ข้อความขึ้นจอ
- Authentication คือการยืนยันตัวตน
- ห้ามเก็บ Password เป็น Plain Text
- bcrypt ใช้ Hash Password
- JWT ใช้ยืนยันผู้ใช้หลัง Login
- Middleware ใช้ป้องกัน Route สำคัญ

### โค้ดตัวอย่าง
```js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(password) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

async function login(password, hashedPassword, user) {
  const isValid = await bcrypt.compare(password, hashedPassword);

  if (!isValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return token;
}
```

### อธิบายโค้ด
ฟังก์ชัน `register` ใช้ bcrypt แปลง password เป็น hash ก่อนบันทึก ส่วน `login` ใช้ `bcrypt.compare()` ตรวจสอบ password ถ้าถูกต้องจะสร้าง JWT ที่มี userId และ role แล้วส่งกลับไปให้ผู้ใช้

---

## บทที่ 6: Docker, Deploy และ CI/CD

### คำพูดสอน
บทสุดท้ายเราจะพา Back-End จากเครื่องของเราไปสู่การใช้งานจริง

เวลาพัฒนาในเครื่อง เราอาจรัน Server ได้ปกติ แต่เมื่อย้ายไปเครื่องอื่นอาจเจอปัญหา Node คนละเวอร์ชัน package ไม่ตรง หรือ environment ต่างกัน Docker เข้ามาช่วยแก้ปัญหานี้

Docker คือเครื่องมือที่แพ็กแอปของเรา พร้อม dependency และ environment ที่จำเป็นไว้ใน Container ทำให้รันที่ไหนก็ได้ใกล้เคียงกันมากขึ้น เราจะเขียน Dockerfile เพื่อบอกว่าแอปต้องเริ่มจาก image อะไร ติดตั้งอะไร และรันคำสั่งไหน

ถ้าแอปมีหลายบริการ เช่น API กับ Database เราสามารถใช้ Docker Compose เพื่อรันหลาย Container พร้อมกันได้

หลังจากนั้นคือการ Deploy ขึ้น Server หรือ Cloud เช่น AWS EC2, Render, Railway หรือบริการอื่น ๆ แนวคิดสำคัญคือ Server จริงควรใช้ environment variable สำหรับค่าลับ เช่น database URL และ JWT secret

สุดท้ายคือ CI/CD หรือ Continuous Integration และ Continuous Deployment เป็นการตั้ง pipeline ให้ระบบทดสอบและ Deploy อัตโนมัติเมื่อเรา push code ขึ้น Git ช่วยลดงานซ้ำ ลดความผิดพลาด และทำให้ทีมพัฒนาเร็วขึ้น

### ข้อความขึ้นจอ
- Docker ทำให้แอปรันสภาพแวดล้อมเดียวกัน
- Dockerfile ใช้สร้าง Image
- Container คือแอปที่ถูกแพ็กไว้พร้อมรัน
- Docker Compose ใช้รันหลายบริการ
- CI/CD ช่วย Test และ Deploy อัตโนมัติ

### โค้ดตัวอย่าง
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGO_URL=mongodb://mongo:27017/backend_mastery
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
```

### อธิบายโค้ด
Dockerfile นี้เริ่มจาก Node.js image ตั้งโฟลเดอร์ทำงาน ติดตั้ง package คัดลอกไฟล์ทั้งหมด เปิด port 3000 และสั่งรัน `server.js`

ส่วน Docker Compose จะรัน 2 บริการ คือ `api` สำหรับ Back-End และ `mongo` สำหรับ Database โดย API จะเชื่อมต่อ MongoDB ผ่านชื่อ service ว่า `mongo`

---

## สรุปท้ายคอร์ส

### คำพูดสรุป
ถ้าเรียนครบทั้ง 6 บท คุณจะเห็นภาพรวมของ Back-End ตั้งแต่พื้นฐานจนถึงการนำไปใช้งานจริง เริ่มจากเข้าใจว่า Server ทำงานอย่างไร สื่อสารผ่าน HTTP และ REST API อย่างไร ใช้ Node.js กับ Express สร้าง API อย่างไร เชื่อมต่อ MongoDB เพื่อเก็บข้อมูลอย่างไร ทำระบบ Login ให้ปลอดภัยด้วย bcrypt และ JWT อย่างไร และสุดท้ายแพ็กแอปด้วย Docker เพื่อนำไป Deploy

เส้นทาง Back-End ไม่ได้จบแค่เขียน API ให้รันได้ แต่ต้องคิดเรื่องโครงสร้างข้อมูล ความปลอดภัย การจัดการ Error การ Deploy และการดูแลระบบในระยะยาวด้วย เมื่อเข้าใจพื้นฐานเหล่านี้แล้ว คุณจะต่อยอดไปสู่ระบบที่ใหญ่ขึ้น เช่น E-commerce, LMS, Dashboard, SaaS หรือ Microservices ได้ง่ายขึ้นมาก

