# Deploy Fullstack Next.js ให้ Admin ใช้งานได้

โปรเจกต์นี้เป็น **Fullstack Next.js** เพราะหน้า Admin เรียก API เช่น:

- `/api/courses`
- `/api/quizzes`
- `/api/auth/login`

ดังนั้น **GitHub Pages ใช้งานไม่ได้** สำหรับ Admin แบบนี้ เพราะ GitHub Pages รันได้เฉพาะ Static HTML/CSS/JS และไม่มี Node.js server สำหรับ API routes

## ใช้ GitHub ได้แบบไหน

GitHub ใช้เก็บ source code ได้ปกติ แต่ต้องเอา repo ไป deploy ต่อบน platform ที่รัน Next.js server ได้

## ตัวเลือกที่แนะนำ

### 1. Vercel

เหมาะกับ Next.js ที่สุด

ขั้นตอน:

1. Push โค้ดขึ้น GitHub
2. เข้า Vercel
3. Import GitHub repository
4. Deploy

หมายเหตุ: ถ้าต้องการให้ข้อมูล Admin persist จริงใน production ควรต่อ Database เช่น Supabase, Neon, MongoDB Atlas หรือ PostgreSQL แทนการเขียนไฟล์ `data/db.json`

### 2. Render / Railway / VPS ด้วย Docker

เหมาะถ้าต้องการใช้ไฟล์ `data/db.json` ต่อไป

ใช้คำสั่ง:

```bash
docker compose up --build
```

ระบบจะรันที่:

```text
http://localhost:3000
```

บน server จริงให้เปิด port 3000 หรือ reverse proxy ผ่าน Nginx

## สรุป

- GitHub Pages = ใช้ไม่ได้กับ Admin Fullstack
- GitHub repo + Vercel = ใช้ได้ แต่ควรต่อ database จริง
- Docker บน VPS/Render/Railway = ใช้ได้กับโครงนี้มากกว่า เพราะมี server และ volume เก็บ `data/db.json`

