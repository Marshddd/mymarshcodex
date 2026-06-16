# Backend Mastery Fullstack Next.js + Docker

โปรเจกต์นี้เป็นเวอร์ชัน Fullstack ของ Backend Mastery โดยใช้ Next.js App Router พร้อม API Routes และ Docker

## รันแบบ Development

```bash
npm install
npm run dev
```

เปิดเว็บที่:

```text
http://localhost:3000
```

## รันด้วย Docker

```bash
docker compose up --build
```

เปิดเว็บที่:

```text
http://localhost:3000
```

## API ที่มี

- `GET /api/health`
- `GET /api/courses`
- `POST /api/courses`
- `GET /api/courses/:id`
- `PUT /api/courses/:id`
- `DELETE /api/courses/:id`
- `GET /api/quizzes`
- `POST /api/quizzes`
- `GET /api/quizzes/:id`
- `PUT /api/quizzes/:id`
- `DELETE /api/quizzes/:id`
- `POST /api/auth/login`

## ข้อมูล

ข้อมูลถูกเก็บในไฟล์:

```text
data/db.json
```

เมื่อใช้ Docker Compose จะ mount โฟลเดอร์ `./data` เข้า container เพื่อให้ข้อมูลไม่หายหลัง restart

