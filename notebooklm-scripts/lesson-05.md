# Backend Mastery - บทที่ 5: Authentication, JWT และ Security

ใช้ไฟล์นี้กับ NotebookLM แยกต่างหาก เพื่อสร้างเสียง 1 คลิป และวิดีโอ 1 คลิป สำหรับบทที่ 5 โดยเฉพาะ

---

## ส่วนที่ 1: คำพูดสอนสำหรับเสียง

บทนี้เป็นหนึ่งในส่วนสำคัญที่สุดของ Back-End นั่นคือระบบยืนยันตัวตน หรือ Authentication

Authentication คือการตรวจสอบว่าผู้ใช้เป็นใคร ตัวอย่างที่คุ้นเคยคือระบบสมัครสมาชิกและเข้าสู่ระบบ ผู้ใช้กรอก email กับ password แล้ว Server ตรวจสอบว่าถูกต้องหรือไม่

สิ่งที่ห้ามทำเด็ดขาดคือเก็บ password แบบตัวอักษรจริงลง Database เพราะถ้าฐานข้อมูลรั่ว Password ของผู้ใช้จะรั่วทันที วิธีที่ถูกต้องคือ Hash password ด้วยเครื่องมืออย่าง bcrypt ก่อนบันทึก

หลังจาก Login สำเร็จ Server มักสร้าง Token ส่งกลับไปให้ผู้ใช้ ในคอร์สนี้เราจะใช้ JWT หรือ JSON Web Token ซึ่งเป็น Token ที่บรรจุข้อมูลบางอย่าง เช่น userId และ role แล้วมีลายเซ็นเพื่อป้องกันการปลอมแปลง

เมื่อผู้ใช้เรียก API ที่ต้อง Login เขาจะส่ง Token มากับ Header จากนั้น Server จะตรวจสอบ Token ถ้าถูกต้องจึงอนุญาตให้เข้าถึงข้อมูล

Security ไม่ใช่แค่ Login แต่รวมถึงการตรวจข้อมูลก่อนบันทึก จำกัดสิทธิ์ผู้ใช้ ป้องกันข้อมูลรั่ว และไม่เปิดเผย Error ที่ละเอียดเกินไปให้ผู้โจมตีเห็น

---

## ส่วนที่ 2: ข้อความขึ้นจอสำหรับวิดีโอ

- Authentication คือการยืนยันตัวตน
- ห้ามเก็บ Password เป็น Plain Text
- bcrypt ใช้ Hash Password
- JWT ใช้ยืนยันผู้ใช้หลัง Login
- Middleware ใช้ป้องกัน Route สำคัญ

---

## ส่วนที่ 3: โค้ดตัวอย่างและคำอธิบาย

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
