# Backend Mastery - บทที่ 6: Docker, Deploy และ CI/CD

ใช้ไฟล์นี้กับ NotebookLM แยกต่างหาก เพื่อสร้างเสียง 1 คลิป และวิดีโอ 1 คลิป สำหรับบทที่ 6 โดยเฉพาะ

---

## ส่วนที่ 1: คำพูดสอนสำหรับเสียง

บทสุดท้ายเราจะพา Back-End จากเครื่องของเราไปสู่การใช้งานจริง

เวลาพัฒนาในเครื่อง เราอาจรัน Server ได้ปกติ แต่เมื่อย้ายไปเครื่องอื่นอาจเจอปัญหา Node คนละเวอร์ชัน package ไม่ตรง หรือ environment ต่างกัน Docker เข้ามาช่วยแก้ปัญหานี้

Docker คือเครื่องมือที่แพ็กแอปของเรา พร้อม dependency และ environment ที่จำเป็นไว้ใน Container ทำให้รันที่ไหนก็ได้ใกล้เคียงกันมากขึ้น เราจะเขียน Dockerfile เพื่อบอกว่าแอปต้องเริ่มจาก image อะไร ติดตั้งอะไร และรันคำสั่งไหน

ถ้าแอปมีหลายบริการ เช่น API กับ Database เราสามารถใช้ Docker Compose เพื่อรันหลาย Container พร้อมกันได้

หลังจากนั้นคือการ Deploy ขึ้น Server หรือ Cloud เช่น AWS EC2, Render, Railway หรือบริการอื่น ๆ แนวคิดสำคัญคือ Server จริงควรใช้ environment variable สำหรับค่าลับ เช่น database URL และ JWT secret

สุดท้ายคือ CI/CD หรือ Continuous Integration และ Continuous Deployment เป็นการตั้ง pipeline ให้ระบบทดสอบและ Deploy อัตโนมัติเมื่อเรา push code ขึ้น Git ช่วยลดงานซ้ำ ลดความผิดพลาด และทำให้ทีมพัฒนาเร็วขึ้น

---

## ส่วนที่ 2: ข้อความขึ้นจอสำหรับวิดีโอ

- Docker ทำให้แอปรันสภาพแวดล้อมเดียวกัน
- Dockerfile ใช้สร้าง Image
- Container คือแอปที่ถูกแพ็กไว้พร้อมรัน
- Docker Compose ใช้รันหลายบริการ
- CI/CD ช่วย Test และ Deploy อัตโนมัติ

---

## ส่วนที่ 3: โค้ดตัวอย่างและคำอธิบาย

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
