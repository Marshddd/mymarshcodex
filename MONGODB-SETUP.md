# ตั้งค่า MongoDB ให้ Admin เก็บข้อมูลถาวร

ถ้าต้องการให้หน้า Admin ใช้งานออนไลน์ได้ และแก้ข้อมูลแล้วไม่หาย ให้ใช้ MongoDB เป็นฐานข้อมูลจริง

## ใช้ MongoDB Compass ได้ไหม

ได้ครับ แต่ Compass เป็นโปรแกรมสำหรับเปิดดู/แก้ฐานข้อมูล ไม่ใช่ตัว host เว็บ

ภาพรวมคือ:

- เว็บ Next.js รันบน Vercel / Render / Railway / VPS
- API ของเว็บเชื่อมไป MongoDB ผ่าน `MONGODB_URI`
- MongoDB Compass ใช้เปิดดู database เดียวกัน
- เวลาแก้ข้อมูลผ่าน Admin ข้อมูลจะเข้า MongoDB
- ปิดเว็บ/เปิดใหม่ ข้อมูลยังอยู่

## วิธีแนะนำสำหรับออนไลน์

ใช้ MongoDB Atlas

1. สร้างบัญชี MongoDB Atlas
2. Create Cluster
3. สร้าง Database User
4. ไปที่ Network Access แล้วอนุญาต IP ของ host หรือใช้ `0.0.0.0/0` ตอนทดสอบ
5. Copy connection string
6. ตั้ง Environment Variables ตอน deploy:

```text
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=backend_mastery
```

## ใช้กับเครื่องตัวเอง

สร้างไฟล์ `.env.local`

```text
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=backend_mastery
```

แล้วรัน:

```bash
npm install
npm run dev
```

เปิดเว็บ:

```text
http://localhost:3000
```

## ใช้กับ Docker

สร้างไฟล์ `.env`

```text
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=backend_mastery
```

แล้วรัน:

```bash
docker compose up --build
```

## สำคัญ

GitHub Pages ยังใช้ Admin Fullstack ไม่ได้เหมือนเดิม เพราะไม่มี server สำหรับ API

ให้ deploy ไปที่:

- Vercel
- Render
- Railway
- VPS ที่รัน Docker ได้

