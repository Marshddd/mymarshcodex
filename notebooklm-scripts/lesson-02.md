# Backend Mastery - บทที่ 2: HTTP และ REST API

ใช้ไฟล์นี้กับ NotebookLM แยกต่างหาก เพื่อสร้างเสียง 1 คลิป และวิดีโอ 1 คลิป สำหรับบทที่ 2 โดยเฉพาะ

---

## ส่วนที่ 1: คำพูดสอนสำหรับเสียง

ในบทนี้เราจะเข้าใจภาษาที่ Client และ Server ใช้คุยกัน นั่นคือ HTTP

HTTP ย่อมาจาก HyperText Transfer Protocol เป็นกติกาการสื่อสารบนเว็บ เวลาผู้ใช้กดปุ่ม เปิดหน้าเว็บ หรือส่งฟอร์ม Browser จะสร้าง HTTP Request ส่งไปหา Server จากนั้น Server จะส่ง HTTP Response กลับมา

Request จะมีส่วนสำคัญ เช่น Method, URL, Headers และ Body ส่วน Response จะมี Status Code, Headers และ Body เช่นกัน

Method ที่ใช้บ่อยที่สุดมี 4 ตัว คือ GET สำหรับดึงข้อมูล POST สำหรับสร้างข้อมูล PUT หรือ PATCH สำหรับแก้ไขข้อมูล และ DELETE สำหรับลบข้อมูล ถ้าเราออกแบบ API ให้ใช้ Method เหล่านี้อย่างเป็นระบบ จะเรียกว่า REST API

ตัวอย่างเช่น ถ้าต้องการดูรายชื่อผู้ใช้ทั้งหมด เราอาจใช้ `GET /users` ถ้าต้องการสร้างผู้ใช้ใหม่ ใช้ `POST /users` ถ้าต้องการแก้ไขผู้ใช้ ใช้ `PUT /users/:id` และถ้าต้องการลบผู้ใช้ ใช้ `DELETE /users/:id`

สิ่งสำคัญอีกอย่างคือ Status Code เช่น 200 แปลว่าสำเร็จ 201 แปลว่าสร้างข้อมูลสำเร็จ 400 แปลว่าข้อมูลผิด 401 แปลว่ายังไม่ได้รับอนุญาต 404 แปลว่าไม่พบข้อมูล และ 500 แปลว่า Server มีปัญหา

---

## ส่วนที่ 2: ข้อความขึ้นจอสำหรับวิดีโอ

- HTTP คือกติกาการสื่อสารระหว่าง Client และ Server
- Request คือคำขอจาก Client
- Response คือคำตอบจาก Server
- REST API คือการออกแบบ URL และ Method ให้เป็นระบบ

---

## ส่วนที่ 3: โค้ดตัวอย่างและคำอธิบาย

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
