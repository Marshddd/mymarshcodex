// ============================================================
// BACKEND MASTERY — Full App Logic (Enhanced Edition)
// ============================================================

// ===== DATA STORE =====
const DB = {
  get users() { return JSON.parse(localStorage.getItem('bm_users') || '[]'); },
  set users(v) { localStorage.setItem('bm_users', JSON.stringify(v)); },
  get currentUser() { return JSON.parse(localStorage.getItem('bm_current') || 'null'); },
  set currentUser(v) { localStorage.setItem('bm_current', JSON.stringify(v)); },
  get progress() { return JSON.parse(localStorage.getItem('bm_progress') || '{}'); },
  set progress(v) { localStorage.setItem('bm_progress', JSON.stringify(v)); },
  get quizResults() { return JSON.parse(localStorage.getItem('bm_quiz_results') || '{}'); },
  set quizResults(v) { localStorage.setItem('bm_quiz_results', JSON.stringify(v)); },
  get courses() { return JSON.parse(localStorage.getItem('bm_courses') || 'null'); },
  set courses(v) { localStorage.setItem('bm_courses', JSON.stringify(v)); },
  get quizzes() { return JSON.parse(localStorage.getItem('bm_quizzes') || 'null'); },
  set quizzes(v) { localStorage.setItem('bm_quizzes', JSON.stringify(v)); },
};

// ===== COURSES DATA (6 Units) =====
const COURSES = [
  {
    id: 1,
    unit: 'หน่วยที่ 1',
    title: 'พื้นฐาน Back-End',
    desc: 'ทำความเข้าใจกับ Back-End คืออะไร การทำงานของ Server, Client และการสื่อสารผ่าน HTTP',
    icon: '🖥️',
    color: 'linear-gradient(135deg, #1a2a6c, #b21f1f)',
    lessons: [
      {
        id: 'l1-1',
        title: 'Back-End คืออะไร?',
        content: `
          <h3>🌐 Back-End Development คืออะไร?</h3>
          <p>Back-End คือส่วนของระบบที่ทำงานอยู่เบื้องหลัง ผู้ใช้งานทั่วไปมองไม่เห็น แต่เป็นส่วนสำคัญที่ทำให้แอปพลิเคชันทำงานได้</p>
          <ul>
            <li><strong>Server:</strong> คอมพิวเตอร์หรือโปรแกรมที่รับและตอบสนองต่อ request</li>
            <li><strong>Database:</strong> ที่จัดเก็บข้อมูลทั้งหมดของระบบ</li>
            <li><strong>API:</strong> ช่องทางสื่อสารระหว่าง Front-End และ Back-End</li>
          </ul>
          <h3>⚙️ หน้าที่ของ Back-End Developer</h3>
          <p>Back-End Developer รับผิดชอบในการสร้างและดูแลระบบต่างๆ ดังนี้:</p>
          <ul>
            <li>ออกแบบและพัฒนา API</li>
            <li>จัดการฐานข้อมูล</li>
            <li>ดูแลความปลอดภัยของระบบ</li>
            <li>เพิ่มประสิทธิภาพการทำงานของ Server</li>
          </ul>
          <h3>📊 Stack ที่ใช้ในคอร์สนี้</h3>
          <pre><code>Node.js (Runtime)
Express.js (Web Framework)
MongoDB (Database)
Docker (Container)
AWS (Cloud Platform)</code></pre>
        `
      },
      {
        id: 'l1-2',
        title: 'HTTP และ REST API',
        content: `
          <h3>🔄 HTTP Protocol คืออะไร?</h3>
          <p>HTTP (HyperText Transfer Protocol) คือโปรโตคอลที่ใช้ในการสื่อสารระหว่าง Client และ Server บนอินเทอร์เน็ต</p>
          <h3>📨 HTTP Methods</h3>
          <ul>
            <li><code>GET</code> — ดึงข้อมูล (Read)</li>
            <li><code>POST</code> — สร้างข้อมูลใหม่ (Create)</li>
            <li><code>PUT/PATCH</code> — อัปเดตข้อมูล (Update)</li>
            <li><code>DELETE</code> — ลบข้อมูล (Delete)</li>
          </ul>
          <h3>📡 REST API Design</h3>
          <pre><code>GET    /users          → ดูผู้ใช้ทั้งหมด
GET    /users/:id      → ดูผู้ใช้คนเดียว
POST   /users          → สร้างผู้ใช้ใหม่
PUT    /users/:id      → อัปเดตข้อมูลผู้ใช้
DELETE /users/:id      → ลบผู้ใช้</code></pre>
          <h3>📬 HTTP Status Codes</h3>
          <ul>
            <li><code>200 OK</code> — สำเร็จ</li>
            <li><code>201 Created</code> — สร้างสำเร็จ</li>
            <li><code>400 Bad Request</code> — ข้อมูลไม่ถูกต้อง</li>
            <li><code>401 Unauthorized</code> — ไม่ได้รับอนุญาต</li>
            <li><code>404 Not Found</code> — ไม่พบข้อมูล</li>
            <li><code>500 Internal Server Error</code> — Server มีปัญหา</li>
          </ul>
        `
      },
      {
        id: 'l1-3',
        title: 'Client-Server Architecture',
        content: `
          <h3>🏗️ สถาปัตยกรรม Client-Server</h3>
          <p>ในการพัฒนาเว็บ การสื่อสารจะเกิดขึ้นระหว่าง 2 ฝ่าย:</p>
          <ul>
            <li><strong>Client (Front-End):</strong> เบราว์เซอร์, มือถือ, แอปต่างๆ ที่ผู้ใช้โต้ตอบ</li>
            <li><strong>Server (Back-End):</strong> เครื่องแม่ข่ายที่ประมวลผลและส่งข้อมูลกลับ</li>
          </ul>
          <h3>🔁 ขั้นตอนการทำงาน</h3>
          <pre><code>1. Client ส่ง HTTP Request ไปที่ Server
2. Server รับ request และประมวลผล
3. Server อาจดึงข้อมูลจาก Database
4. Server ส่ง HTTP Response กลับไป
5. Client แสดงผลข้อมูลให้ผู้ใช้</code></pre>
          <h3>🔒 Request vs Response</h3>
          <p><strong>Request</strong> ประกอบด้วย:</p>
          <ul>
            <li>Method (GET, POST, etc.)</li>
            <li>URL / Endpoint</li>
            <li>Headers (metadata)</li>
            <li>Body (ข้อมูลที่ส่งมา)</li>
          </ul>
          <p><strong>Response</strong> ประกอบด้วย:</p>
          <ul>
            <li>Status Code (200, 404, etc.)</li>
            <li>Headers</li>
            <li>Body (ข้อมูลที่ส่งกลับ)</li>
          </ul>
          <h3>📦 ตัวอย่าง JSON Response</h3>
          <pre><code>{
  "status": "success",
  "data": {
    "id": 1,
    "name": "สมชาย",
    "email": "somchai@example.com"
  }
}</code></pre>
        `
      }
    ]
  },
  {
    id: 2,
    unit: 'หน่วยที่ 2',
    title: 'Node.js และ Express',
    desc: 'ติดตั้งและสร้าง Web Server ด้วย Node.js พร้อมใช้งาน Express Framework สร้าง REST API',
    icon: '⚡',
    color: 'linear-gradient(135deg, #0f3443, #34e89e)',
    lessons: [
      {
        id: 'l2-1',
        title: 'ติดตั้ง Node.js และ Express',
        content: `
          <h3>📦 การติดตั้ง Node.js</h3>
          <p>ดาวน์โหลด Node.js จาก <code>nodejs.org</code> และทำการติดตั้ง หลังจากนั้นตรวจสอบด้วยคำสั่ง:</p>
          <pre><code>node --version   # v20.x.x
npm --version    # 10.x.x</code></pre>
          <h3>🚀 สร้างโปรเจค Express</h3>
          <pre><code>mkdir my-server
cd my-server
npm init -y
npm install express</code></pre>
          <h3>💻 Server แรกของเรา</h3>
          <pre><code>// server.js
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'สวัสดี Backend! 🚀' });
});

app.listen(3000, () => {
  console.log('Server กำลังทำงานที่ port 3000');
});</code></pre>
          <h3>▶️ รัน Server</h3>
          <pre><code>node server.js</code></pre>
          <p>เปิด browser ไปที่ <code>http://localhost:3000</code> จะเห็น JSON response ของเรา!</p>
        `
      },
      {
        id: 'l2-2',
        title: 'Routing และ Middleware',
        content: `
          <h3>🗺️ Express Routing</h3>
          <p>Routing คือการกำหนดว่า Server จะตอบสนองอย่างไรเมื่อได้รับ request ที่ URL และ Method ต่างๆ</p>
          <pre><code>// routes/users.js
const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ users: [] });
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ id: 1, name, email });
});

module.exports = router;</code></pre>
          <h3>🔧 Middleware</h3>
          <p>Middleware คือฟังก์ชันที่ทำงานก่อน Request ถึง Route Handler</p>
          <pre><code>// Logging middleware
const logger = (req, res, next) => {
  console.log(\`\${req.method} \${req.path} - \${new Date()}\`);
  next(); // ส่งต่อไปยัง middleware ถัดไป
};

app.use(logger);</code></pre>
          <h3>🛡️ Auth Middleware</h3>
          <pre><code>const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  // ตรวจสอบ token
  next();
};

app.use('/api/protected', authMiddleware);</code></pre>
        `
      },
      {
        id: 'l2-3',
        title: 'Error Handling และ Validation',
        content: `
          <h3>⚠️ Error Handling ใน Express</h3>
          <p>การจัดการ Error ที่ดีจะทำให้ระบบมีความเสถียรและง่ายต่อการ debug</p>
          <pre><code>// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});</code></pre>
          <h3>📝 Custom Error Class</h3>
          <pre><code>class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// ใช้งาน
app.get('/user/:id', (req, res, next) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return next(new AppError('ไม่พบผู้ใช้', 404));
  }
  res.json(user);
});</code></pre>
          <h3>✅ Input Validation</h3>
          <pre><code>// ตรวจสอบข้อมูลก่อนบันทึก
app.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  
  const errors = [];
  if (!name) errors.push('กรุณาระบุชื่อ');
  if (!email) errors.push('กรุณาระบุอีเมล');
  if (!password || password.length < 6)
    errors.push('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  // บันทึกข้อมูล...
});</code></pre>
        `
      }
    ]
  },
  {
    id: 3,
    unit: 'หน่วยที่ 3',
    title: 'ฐานข้อมูลด้วย MongoDB',
    desc: 'เรียนรู้การใช้งาน MongoDB ทั้ง CRUD Operations, Schema Design และการเชื่อมต่อกับ Express',
    icon: '🍃',
    color: 'linear-gradient(135deg, #1a472a, #52c234)',
    lessons: [
      {
        id: 'l3-1',
        title: 'รู้จักกับ MongoDB',
        content: `
          <h3>🍃 MongoDB คืออะไร?</h3>
          <p>MongoDB คือ NoSQL Database ที่เก็บข้อมูลในรูปแบบ Document (JSON-like) แทนที่จะเป็น Table แบบ SQL</p>
          <h3>📊 เปรียบเทียบ SQL vs MongoDB</h3>
          <ul>
            <li>SQL: <code>Table</code> → MongoDB: <code>Collection</code></li>
            <li>SQL: <code>Row</code> → MongoDB: <code>Document</code></li>
            <li>SQL: <code>Column</code> → MongoDB: <code>Field</code></li>
          </ul>
          <h3>🔌 เชื่อมต่อกับ Mongoose</h3>
          <pre><code>npm install mongoose</code></pre>
          <pre><code>const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));</code></pre>
          <h3>📋 Schema และ Model</h3>
          <pre><code>const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);</code></pre>
        `
      },
      {
        id: 'l3-2',
        title: 'CRUD Operations',
        content: `
          <h3>📝 CRUD คืออะไร?</h3>
          <p>CRUD ย่อมาจาก Create, Read, Update, Delete — เป็นการดำเนินการพื้นฐานกับข้อมูล</p>
          <h3>➕ Create — สร้างข้อมูล</h3>
          <pre><code>// สร้างผู้ใช้ใหม่
const newUser = new User({
  name: 'สมชาย',
  email: 'somchai@email.com',
  password: 'hashed_password'
});
await newUser.save();

// หรือใช้ create()
const user = await User.create({
  name: 'สมหญิง',
  email: 'somying@email.com'
});</code></pre>
          <h3>📖 Read — อ่านข้อมูล</h3>
          <pre><code>// ดึงทั้งหมด
const users = await User.find();

// ดึงตามเงื่อนไข
const admins = await User.find({ role: 'admin' });

// ดึงคนเดียว
const user = await User.findById(id);
const user2 = await User.findOne({ email: 'test@email.com' });</code></pre>
          <h3>✏️ Update — อัปเดตข้อมูล</h3>
          <pre><code>await User.findByIdAndUpdate(id, {
  name: 'ชื่อใหม่'
}, { new: true }); // new: true คืนค่าที่อัปเดตแล้ว</code></pre>
          <h3>🗑️ Delete — ลบข้อมูล</h3>
          <pre><code>await User.findByIdAndDelete(id);

// ลบหลายรายการ
await User.deleteMany({ role: 'inactive' });</code></pre>
        `
      },
      {
        id: 'l3-3',
        title: 'Schema Design & Relations',
        content: `
          <h3>🏗️ การออกแบบ Schema ที่ดี</h3>
          <p>การออกแบบ Schema ที่ดีจะส่งผลต่อประสิทธิภาพและความยืดหยุ่นของระบบ</p>
          <h3>📐 Schema Options</h3>
          <pre><code>const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'กรุณาระบุชื่อสินค้า'],
    trim: true,
    maxlength: 100
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'ราคาต้องมากกว่า 0']
  },
  category: {
    type: String,
    enum: ['electronics', 'clothing', 'food'],
    default: 'electronics'
  },
  tags: [String],
  inStock: { type: Boolean, default: true }
}, {
  timestamps: true // สร้าง createdAt, updatedAt อัตโนมัติ
});</code></pre>
          <h3>🔗 Relations — Populate</h3>
          <pre><code>// Order อ้างอิงถึง User
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  totalPrice: Number
});

// ดึงข้อมูลพร้อม populate
const order = await Order.findById(id)
  .populate('user', 'name email')
  .populate('products.product', 'name price');</code></pre>
          <h3>📌 Indexing — เพิ่มความเร็ว</h3>
          <pre><code>// สร้าง index
userSchema.index({ email: 1 });           // single
productSchema.index({ name: 1, price: -1 }); // compound
productSchema.index({ name: 'text' });     // text search</code></pre>
        `
      }
    ]
  },
  {
    id: 4,
    unit: 'หน่วยที่ 4',
    title: 'Authentication & JWT',
    desc: 'ระบบยืนยันตัวตนด้วย JWT Token, bcrypt, Session Management และการรักษาความปลอดภัย',
    icon: '🔐',
    color: 'linear-gradient(135deg, #2c1654, #7b5ef8)',
    lessons: [
      {
        id: 'l4-1',
        title: 'JWT Authentication',
        content: `
          <h3>🔐 JSON Web Token (JWT)</h3>
          <p>JWT คือมาตรฐานสำหรับการส่ง claim ระหว่าง parties อย่างปลอดภัย ประกอบด้วย 3 ส่วน:</p>
          <ul>
            <li><strong>Header:</strong> ระบุ algorithm ที่ใช้</li>
            <li><strong>Payload:</strong> ข้อมูล user</li>
            <li><strong>Signature:</strong> ลายเซ็นยืนยัน</li>
          </ul>
          <pre><code>npm install jsonwebtoken bcryptjs</code></pre>
          <h3>🔑 สร้างและยืนยัน Token</h3>
          <pre><code>const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register
const hashedPassword = await bcrypt.hash(password, 10);

// Login
const isValid = await bcrypt.compare(password, hashedPassword);
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verify
const decoded = jwt.verify(token, process.env.JWT_SECRET);</code></pre>
        `
      },
      {
        id: 'l4-2',
        title: 'Password Hashing & Security',
        content: `
          <h3>🔒 ทำไมต้อง Hash รหัสผ่าน?</h3>
          <p>การเก็บรหัสผ่านแบบ plain text อันตรายมาก ถ้าข้อมูลรั่วไหล ผู้ใช้ทุกคนจะถูกเข้าถึงได้ทันที</p>
          <h3>🧂 bcrypt กับ Salt</h3>
          <pre><code>const bcrypt = require('bcryptjs');

// Hash password พร้อม salt rounds
const salt = await bcrypt.genSalt(12);
const hashedPassword = await bcrypt.hash('mypassword', salt);

// ตรวจสอบ password
const isMatch = await bcrypt.compare('mypassword', hashedPassword);
// isMatch = true</code></pre>
          <h3>🛡️ Security Best Practices</h3>
          <ul>
            <li>ไม่เก็บ password แบบ plain text</li>
            <li>ใช้ <code>salt rounds</code> ≥ 10</li>
            <li>ใช้ HTTPS เสมอ</li>
            <li>กำหนด <code>expiresIn</code> ให้ token</li>
            <li>ใช้ <code>httpOnly</code> cookie สำหรับ token</li>
            <li>เก็บ secret ใน environment variables</li>
          </ul>
          <h3>🔐 Helmet — HTTP Security Headers</h3>
          <pre><code>const helmet = require('helmet');
app.use(helmet());

// ป้องกัน:
// - XSS attacks
// - Clickjacking
// - MIME sniffing
// - และอื่นๆ</code></pre>
          <h3>📝 Rate Limiting</h3>
          <pre><code>const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 นาที
  max: 100 // จำกัด 100 requests ต่อ IP
});

app.use('/api/', limiter);</code></pre>
        `
      },
      {
        id: 'l4-3',
        title: 'Role-Based Access Control',
        content: `
          <h3>👥 RBAC คืออะไร?</h3>
          <p>Role-Based Access Control (RBAC) คือการจำกัดสิทธิ์การเข้าถึงตาม role ของผู้ใช้</p>
          <h3>🏷️ ตัวอย่าง Roles</h3>
          <pre><code>const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
};

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.USER
  }
});</code></pre>
          <h3>🔒 Authorization Middleware</h3>
          <pre><code>const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'ไม่มีสิทธิ์เข้าถึง'
      });
    }
    next();
  };
};

// ใช้งาน
app.delete('/users/:id',
  authMiddleware,
  authorize('admin'),
  deleteUser
);

app.put('/posts/:id',
  authMiddleware,
  authorize('admin', 'moderator'),
  updatePost
);</code></pre>
          <h3>📋 Permissions Matrix</h3>
          <pre><code>const permissions = {
  user:      ['read:own', 'update:own'],
  moderator: ['read:any', 'update:any', 'delete:own'],
  admin:     ['read:any', 'create:any', 'update:any', 'delete:any']
};</code></pre>
        `
      }
    ]
  },
  {
    id: 5,
    unit: 'หน่วยที่ 5',
    title: 'Docker & Containerization',
    desc: 'เรียนรู้การใช้ Docker สร้าง Container, เขียน Dockerfile และจัดการ Services ด้วย Docker Compose',
    icon: '🐳',
    color: 'linear-gradient(135deg, #0d2137, #2196f3)',
    lessons: [
      {
        id: 'l5-1',
        title: 'Docker คืออะไร?',
        content: `
          <h3>🐳 Docker คืออะไร?</h3>
          <p>Docker คือแพลตฟอร์มสำหรับสร้าง, ทดสอบ และ deploy แอปพลิเคชันในรูปแบบ Container ที่แยกเป็นหน่วยอิสระ</p>
          <h3>📦 Container vs Virtual Machine</h3>
          <ul>
            <li><strong>Container:</strong> เบา, เร็ว, แชร์ OS Kernel — เริ่มต้นภายในวินาที</li>
            <li><strong>VM:</strong> หนัก, ช้ากว่า, มี OS แยกของตัวเอง — ใช้เวลานาทีในการเริ่ม</li>
          </ul>
          <h3>🧩 คำศัพท์สำคัญ</h3>
          <ul>
            <li><code>Image</code> — เทมเพลตที่ใช้สร้าง Container (เหมือนแบบบ้าน)</li>
            <li><code>Container</code> — instance ที่รันจาก Image (เหมือนตัวบ้านจริง)</li>
            <li><code>Dockerfile</code> — สคริปต์สำหรับสร้าง Image</li>
            <li><code>Registry</code> — ที่เก็บ Images (เช่น Docker Hub)</li>
          </ul>
          <h3>⚡ คำสั่งพื้นฐาน</h3>
          <pre><code># ดาวน์โหลด image
docker pull node:20-alpine

# ดู images ทั้งหมด
docker images

# รัน container
docker run -d -p 3000:3000 --name myapp node:20

# ดู containers ที่กำลังทำงาน
docker ps

# หยุด container
docker stop myapp

# ลบ container
docker rm myapp</code></pre>
        `
      },
      {
        id: 'l5-2',
        title: 'เขียน Dockerfile',
        content: `
          <h3>📄 Dockerfile คืออะไร?</h3>
          <p>Dockerfile คือไฟล์ที่กำหนดขั้นตอนการสร้าง Docker Image — เหมือน recipe สำหรับการเตรียมสภาพแวดล้อม</p>
          <h3>🛠️ Dockerfile สำหรับ Node.js</h3>
          <pre><code># ใช้ Node.js image เป็นฐาน
FROM node:20-alpine

# กำหนด working directory
WORKDIR /app

# คัดลอก package files ก่อน (สำหรับ caching)
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm ci --only=production

# คัดลอกโค้ดทั้งหมด
COPY . .

# เปิด port
EXPOSE 3000

# คำสั่งรัน
CMD ["node", "server.js"]</code></pre>
          <h3>🚫 .dockerignore</h3>
          <pre><code>node_modules
npm-debug.log
.git
.env
Dockerfile
docker-compose.yml
README.md</code></pre>
          <h3>🏗️ Build และ Run</h3>
          <pre><code># Build image
docker build -t my-api:1.0 .

# รันจาก image ที่สร้าง
docker run -d -p 3000:3000 \\
  --name my-api \\
  -e NODE_ENV=production \\
  my-api:1.0</code></pre>
          <h3>🔍 Multi-stage Build</h3>
          <pre><code># Stage 1: Build
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "dist/server.js"]</code></pre>
        `
      },
      {
        id: 'l5-3',
        title: 'Docker Compose',
        content: `
          <h3>🎼 Docker Compose คืออะไร?</h3>
          <p>Docker Compose ใช้สำหรับจัดการ multi-container application — เช่น app + database + cache ในคำสั่งเดียว</p>
          <h3>📝 docker-compose.yml</h3>
          <pre><code>version: '3.8'

services:
  # Node.js API
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGO_URI=mongodb://mongo:27017/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis
    restart: unless-stopped

  # MongoDB
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    restart: unless-stopped

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    restart: unless-stopped

volumes:
  mongo-data:</code></pre>
          <h3>⚡ คำสั่ง Docker Compose</h3>
          <pre><code># เริ่มทุก services
docker compose up -d

# ดู logs
docker compose logs -f api

# หยุดทั้งหมด
docker compose down

# หยุดและลบ volumes
docker compose down -v

# สร้างใหม่
docker compose up -d --build</code></pre>
        `
      }
    ]
  },
  {
    id: 6,
    unit: 'หน่วยที่ 6',
    title: 'Cloud Deployment (AWS)',
    desc: 'เรียนรู้การ Deploy แอปพลิเคชันขึ้น AWS Cloud ด้วย EC2, S3, RDS และ CI/CD Pipeline',
    icon: '☁️',
    color: 'linear-gradient(135deg, #1a1a2e, #e94560)',
    lessons: [
      {
        id: 'l6-1',
        title: 'รู้จักกับ AWS',
        content: `
          <h3>☁️ Amazon Web Services (AWS)</h3>
          <p>AWS เป็น Cloud Platform ที่ใหญ่ที่สุดในโลก มีบริการมากกว่า 200 รายการ</p>
          <h3>🧱 บริการหลักที่ใช้บ่อย</h3>
          <ul>
            <li><strong>EC2:</strong> Virtual Server — เครื่อง server ในคลาวด์</li>
            <li><strong>S3:</strong> Object Storage — เก็บไฟล์, รูปภาพ, backup</li>
            <li><strong>RDS:</strong> Managed Database — ฐานข้อมูลที่จัดการให้</li>
            <li><strong>Lambda:</strong> Serverless Functions — รันโค้ดโดยไม่ต้องจัดการ server</li>
            <li><strong>ECS/EKS:</strong> Container Services — รัน Docker containers</li>
            <li><strong>CloudFront:</strong> CDN — กระจาย content ทั่วโลก</li>
          </ul>
          <h3>🔑 AWS CLI</h3>
          <pre><code># ติดตั้ง AWS CLI
pip install awscli

# ตั้งค่า credentials
aws configure
# AWS Access Key ID: AKIA...
# AWS Secret Access Key: xxxxx
# Default region: ap-southeast-1
# Default output format: json</code></pre>
          <h3>💰 ค่าใช้จ่าย</h3>
          <p>AWS มี Free Tier สำหรับผู้เริ่มต้น 12 เดือนแรก:</p>
          <ul>
            <li>EC2: t2.micro 750 ชม./เดือน</li>
            <li>S3: 5 GB storage</li>
            <li>RDS: t2.micro 750 ชม./เดือน</li>
            <li>Lambda: 1 ล้าน requests/เดือน</li>
          </ul>
        `
      },
      {
        id: 'l6-2',
        title: 'Deploy ด้วย EC2',
        content: `
          <h3>🖥️ สร้าง EC2 Instance</h3>
          <p>EC2 (Elastic Compute Cloud) คือบริการ Virtual Server ใน AWS</p>
          <h3>📋 ขั้นตอนการ Deploy</h3>
          <pre><code># 1. SSH เข้า EC2
ssh -i "my-key.pem" ec2-user@ec2-xxx.amazonaws.com

# 2. ติดตั้ง Node.js
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# 3. ติดตั้ง PM2 (Process Manager)
sudo npm install -g pm2

# 4. Clone โปรเจค
git clone https://github.com/user/my-api.git
cd my-api

# 5. ติดตั้ง dependencies
npm ci --production

# 6. รัน ด้วย PM2
pm2 start server.js --name "my-api"
pm2 save
pm2 startup</code></pre>
          <h3>🌐 Nginx Reverse Proxy</h3>
          <pre><code># /etc/nginx/conf.d/myapp.conf
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}</code></pre>
          <h3>🔒 SSL Certificate</h3>
          <pre><code># ใช้ Let's Encrypt (ฟรี)
sudo yum install certbot python3-certbot-nginx
sudo certbot --nginx -d api.example.com</code></pre>
        `
      },
      {
        id: 'l6-3',
        title: 'CI/CD Pipeline',
        content: `
          <h3>🔄 CI/CD คืออะไร?</h3>
          <p><strong>CI (Continuous Integration)</strong> — รวมโค้ด, ทดสอบ, build อัตโนมัติ</p>
          <p><strong>CD (Continuous Deployment)</strong> — deploy ขึ้น production อัตโนมัติ</p>
          <h3>📝 GitHub Actions</h3>
          <pre><code># .github/workflows/deploy.yml
name: Deploy to EC2

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.EC2_HOST }}
          username: ec2-user
          key: \${{ secrets.EC2_KEY }}
          script: |
            cd /app/my-api
            git pull origin main
            npm ci --production
            pm2 restart my-api</code></pre>
          <h3>🐳 Docker + CI/CD</h3>
          <pre><code># Build และ Push Docker image ไป ECR
- name: Build Docker Image
  run: docker build -t my-api:latest .

- name: Push to ECR
  run: |
    aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REGISTRY
    docker tag my-api:latest $ECR_REGISTRY/my-api:latest
    docker push $ECR_REGISTRY/my-api:latest</code></pre>
          <h3>✅ สรุป Flow</h3>
          <pre><code>Developer Push Code
      ↓
GitHub Actions Triggered
      ↓
Run Tests (npm test)
      ↓
Build Docker Image
      ↓
Push to Registry (ECR)
      ↓
Deploy to EC2/ECS
      ↓
🎉 Live on Production!</code></pre>
        `
      }
    ]
  }
];

// ===== QUIZZES DATA (ครบทุกหน่วย) =====
const QUIZZES = [
  // === Unit 1 ===
  {
    id: 'q1-pre',
    courseId: 1,
    type: 'pre',
    title: 'แบบทดสอบก่อนเรียน (หน่วยที่ 1)',
    desc: 'ทดสอบความรู้พื้นฐานก่อนเรียน Back-End',
    questions: [
      { id: 1, question: 'Back-End คือส่วนใดของระบบ?', options: ['ส่วนที่ผู้ใช้เห็นและโต้ตอบด้วย', 'ส่วนที่ทำงานเบื้องหลัง ผู้ใช้มองไม่เห็น', 'ส่วนของการออกแบบ UI', 'ส่วนของการทำ animation'], correct: 1 },
      { id: 2, question: 'HTTP Method ใดที่ใช้สำหรับ "ดึงข้อมูล"?', options: ['POST', 'PUT', 'GET', 'DELETE'], correct: 2 },
      { id: 3, question: 'API ย่อมาจากอะไร?', options: ['Application Programming Interface', 'Application Process Integration', 'Automated Program Interface', 'Advanced Programming Interface'], correct: 0 },
      { id: 4, question: 'HTTP Status Code 404 หมายความว่าอะไร?', options: ['สำเร็จ', 'Server Error', 'ไม่พบข้อมูล', 'ไม่ได้รับอนุญาต'], correct: 2 },
      { id: 5, question: 'Database ที่เก็บข้อมูลในรูปแบบ Document เรียกว่า?', options: ['SQL Database', 'Relational Database', 'NoSQL Database', 'Graph Database'], correct: 2 }
    ]
  },
  {
    id: 'q1-post',
    courseId: 1,
    type: 'post',
    title: 'แบบทดสอบหลังเรียน (หน่วยที่ 1)',
    desc: 'ทบทวนความรู้หลังเรียนหน่วยที่ 1',
    questions: [
      { id: 1, question: 'REST API ย่อมาจากอะไร?', options: ['Representational State Transfer', 'Remote Server Transfer', 'Request Server Technology', 'Real State Transfer'], correct: 0 },
      { id: 2, question: 'HTTP Method POST ใช้สำหรับ?', options: ['ดึงข้อมูล', 'ลบข้อมูล', 'สร้างข้อมูลใหม่', 'อัปเดตข้อมูล'], correct: 2 },
      { id: 3, question: 'HTTP Status Code 201 หมายความว่าอะไร?', options: ['ไม่พบข้อมูล', 'สร้างข้อมูลสำเร็จ', 'Server Error', 'Bad Request'], correct: 1 },
      { id: 4, question: 'JSON ย่อมาจากอะไร?', options: ['JavaScript Object Notation', 'Java Server Object Node', 'JavaScript Oriented Notation', 'JSON Script Object'], correct: 0 },
      { id: 5, question: 'Header ใดที่ใช้ส่ง Token ใน Request?', options: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header'], correct: 1 }
    ]
  },
  // === Unit 2 ===
  {
    id: 'q2-pre',
    courseId: 2,
    type: 'pre',
    title: 'แบบทดสอบก่อนเรียน (หน่วยที่ 2)',
    desc: 'ทดสอบความรู้เรื่อง Node.js และ Express',
    questions: [
      { id: 1, question: 'Node.js คืออะไร?', options: ['Web Browser', 'JavaScript Runtime บน Server', 'Database', 'CSS Framework'], correct: 1 },
      { id: 2, question: 'npm ย่อมาจากอะไร?', options: ['Node Package Manager', 'Node Process Module', 'New Program Manager', 'Network Package Module'], correct: 0 },
      { id: 3, question: 'Express.js ใช้สำหรับ?', options: ['ออกแบบ UI', 'สร้าง Web Server และ API', 'จัดการ Database', 'ทดสอบโค้ด'], correct: 1 },
      { id: 4, question: 'Middleware ใน Express คืออะไร?', options: ['ฐานข้อมูล', 'ฟังก์ชันที่ทำงานก่อน Route Handler', 'Template Engine', 'CSS Preprocessor'], correct: 1 },
      { id: 5, question: 'Port เริ่มต้นที่นิยมใช้ใน Development คือ?', options: ['80', '443', '3000', '8080'], correct: 2 }
    ]
  },
  {
    id: 'q2-post',
    courseId: 2,
    type: 'post',
    title: 'แบบทดสอบหลังเรียน (หน่วยที่ 2)',
    desc: 'ทบทวนความรู้เรื่อง Node.js และ Express',
    questions: [
      { id: 1, question: 'คำสั่งใดใช้สร้างโปรเจค Node.js ใหม่?', options: ['node init', 'npm init', 'npm create', 'node new'], correct: 1 },
      { id: 2, question: 'app.use() ใช้ทำอะไร?', options: ['สร้าง route', 'ลงทะเบียน middleware', 'เชื่อมต่อ database', 'เริ่มต้น server'], correct: 1 },
      { id: 3, question: 'next() ใน middleware ทำหน้าที่อะไร?', options: ['หยุด request', 'ส่ง response', 'ส่งต่อไป middleware/route ถัดไป', 'ลบ request'], correct: 2 },
      { id: 4, question: 'req.body ใช้ดึงข้อมูลจาก?', options: ['URL parameter', 'Query string', 'Request body (POST data)', 'Headers'], correct: 2 },
      { id: 5, question: 'Status Code 400 หมายถึง?', options: ['Success', 'Not Found', 'Bad Request', 'Internal Server Error'], correct: 2 }
    ]
  },
  // === Unit 3 ===
  {
    id: 'q3-pre',
    courseId: 3,
    type: 'pre',
    title: 'แบบทดสอบก่อนเรียน (หน่วยที่ 3)',
    desc: 'ทดสอบความรู้เรื่อง MongoDB',
    questions: [
      { id: 1, question: 'MongoDB จัดอยู่ในประเภท?', options: ['SQL Database', 'NoSQL Database', 'Graph Database', 'Time-series Database'], correct: 1 },
      { id: 2, question: 'ใน MongoDB "Collection" เทียบเท่ากับอะไรใน SQL?', options: ['Database', 'Table', 'Column', 'Row'], correct: 1 },
      { id: 3, question: 'CRUD ย่อมาจากอะไร?', options: ['Create Read Update Delete', 'Copy Read Upload Delete', 'Create Run Update Deploy', 'Connect Read Use Delete'], correct: 0 },
      { id: 4, question: 'Mongoose คืออะไร?', options: ['Web Framework', 'Testing Library', 'ODM สำหรับ MongoDB', 'CSS Framework'], correct: 2 },
      { id: 5, question: 'JSON เก็บข้อมูลในรูปแบบ?', options: ['Table', 'Key-Value pairs', 'Rows & Columns', 'Binary'], correct: 1 }
    ]
  },
  {
    id: 'q3-post',
    courseId: 3,
    type: 'post',
    title: 'แบบทดสอบหลังเรียน (หน่วยที่ 3)',
    desc: 'ทบทวนความรู้เรื่อง MongoDB',
    questions: [
      { id: 1, question: 'คำสั่งใดใช้ค้นหา document ทั้งหมด?', options: ['Model.findAll()', 'Model.find()', 'Model.search()', 'Model.getAll()'], correct: 1 },
      { id: 2, question: 'populate() ใช้ทำอะไร?', options: ['สร้างข้อมูลจำลอง', 'ดึงข้อมูลที่อ้างอิง (reference) มาด้วย', 'ลบข้อมูลทั้งหมด', 'สร้าง index'], correct: 1 },
      { id: 3, question: 'Option { new: true } ใน findByIdAndUpdate ทำอะไร?', options: ['สร้าง document ใหม่', 'คืนค่า document ที่อัปเดตแล้ว', 'ลบ document เก่า', 'สร้าง collection ใหม่'], correct: 1 },
      { id: 4, question: 'Index ใน MongoDB ใช้เพื่อ?', options: ['เพิ่มความปลอดภัย', 'เพิ่มความเร็วในการค้นหา', 'ลดขนาดข้อมูล', 'สร้าง backup'], correct: 1 },
      { id: 5, question: 'Schema type ใดใช้อ้างอิงถึง document อื่น?', options: ['String', 'Number', 'ObjectId', 'Array'], correct: 2 }
    ]
  },
  // === Unit 4 ===
  {
    id: 'q4-pre',
    courseId: 4,
    type: 'pre',
    title: 'แบบทดสอบก่อนเรียน (หน่วยที่ 4)',
    desc: 'ทดสอบความรู้เรื่อง Authentication',
    questions: [
      { id: 1, question: 'JWT ย่อมาจากอะไร?', options: ['Java Web Token', 'JSON Web Token', 'JavaScript Web Transfer', 'JSON Web Transfer'], correct: 1 },
      { id: 2, question: 'bcrypt ใช้สำหรับ?', options: ['การเข้ารหัส URL', 'การ hash รหัสผ่าน', 'การสร้าง API key', 'การบีบอัดข้อมูล'], correct: 1 },
      { id: 3, question: 'Token มีกี่ส่วน?', options: ['2 ส่วน', '3 ส่วน', '4 ส่วน', '5 ส่วน'], correct: 1 },
      { id: 4, question: 'HTTPS ต่างจาก HTTP อย่างไร?', options: ['เร็วกว่า', 'มีการเข้ารหัสข้อมูล (SSL/TLS)', 'รองรับ POST เท่านั้น', 'ทำงานบน port 3000'], correct: 1 },
      { id: 5, question: 'Status Code 401 หมายถึง?', options: ['Not Found', 'Unauthorized', 'Bad Request', 'Server Error'], correct: 1 }
    ]
  },
  {
    id: 'q4-post',
    courseId: 4,
    type: 'post',
    title: 'แบบทดสอบหลังเรียน (หน่วยที่ 4)',
    desc: 'ทบทวนความรู้เรื่อง Authentication & Security',
    questions: [
      { id: 1, question: 'Salt ใน bcrypt ทำหน้าที่อะไร?', options: ['เข้ารหัส token', 'เพิ่มความสุ่มให้ hash ไม่ซ้ำกัน', 'บีบอัดข้อมูล', 'ตรวจสอบ email'], correct: 1 },
      { id: 2, question: 'jwt.sign() ใช้ทำอะไร?', options: ['ตรวจสอบ token', 'สร้าง token ใหม่', 'ลบ token', 'ถอดรหัส token'], correct: 1 },
      { id: 3, question: 'RBAC ย่อมาจากอะไร?', options: ['Role-Based Access Control', 'Remote Basic Auth Control', 'Request-Based API Control', 'Real-time Browser Auth Check'], correct: 0 },
      { id: 4, question: 'Helmet ใน Express ใช้เพื่อ?', options: ['จัดการ routing', 'ตั้งค่า HTTP security headers', 'เชื่อมต่อ database', 'จัดการ logging'], correct: 1 },
      { id: 5, question: 'Rate Limiting ป้องกันอะไร?', options: ['SQL Injection', 'DDoS / Brute force attacks', 'XSS', 'CSRF'], correct: 1 }
    ]
  },
  // === Unit 5 ===
  {
    id: 'q5-pre',
    courseId: 5,
    type: 'pre',
    title: 'แบบทดสอบก่อนเรียน (หน่วยที่ 5)',
    desc: 'ทดสอบความรู้เรื่อง Docker',
    questions: [
      { id: 1, question: 'Docker ใช้สำหรับ?', options: ['ออกแบบ UI', 'สร้างและจัดการ Containers', 'เขียน CSS', 'สร้าง Database'], correct: 1 },
      { id: 2, question: 'Container ต่างจาก Virtual Machine อย่างไร?', options: ['Container หนักกว่า', 'Container เบาและเร็วกว่า แชร์ OS Kernel', 'Container ต้องมี OS แยก', 'ไม่มีความแตกต่าง'], correct: 1 },
      { id: 3, question: 'Dockerfile ใช้สำหรับ?', options: ['รัน container', 'กำหนดขั้นตอนการสร้าง Image', 'จัดการ network', 'ดู logs'], correct: 1 },
      { id: 4, question: 'Docker Hub คืออะไร?', options: ['IDE สำหรับ Docker', 'Registry สำหรับเก็บ Docker Images', 'Monitoring tool', 'CI/CD tool'], correct: 1 },
      { id: 5, question: 'คำสั่งใดใช้ build Docker image?', options: ['docker run', 'docker build', 'docker create', 'docker start'], correct: 1 }
    ]
  },
  {
    id: 'q5-post',
    courseId: 5,
    type: 'post',
    title: 'แบบทดสอบหลังเรียน (หน่วยที่ 5)',
    desc: 'ทบทวนความรู้เรื่อง Docker & Containerization',
    questions: [
      { id: 1, question: 'WORKDIR ใน Dockerfile ทำหน้าที่อะไร?', options: ['กำหนด port', 'กำหนด working directory ภายใน container', 'ติดตั้ง package', 'คัดลอกไฟล์'], correct: 1 },
      { id: 2, question: '.dockerignore ใช้ทำอะไร?', options: ['ลบ container', 'ระบุไฟล์ที่ไม่ต้องคัดลอกเข้า image', 'สร้าง network', 'กำหนด environment'], correct: 1 },
      { id: 3, question: 'docker compose up -d ทำอะไร?', options: ['ลบ containers', 'รัน services ในพื้นหลัง (detached)', 'หยุด services', 'แสดง logs'], correct: 1 },
      { id: 4, question: 'Multi-stage build มีประโยชน์อย่างไร?', options: ['เพิ่มความเร็วในการรัน', 'ลดขนาด image สุดท้าย', 'เพิ่ม security', 'ง่ายต่อการ debug'], correct: 1 },
      { id: 5, question: 'volumes ใน Docker Compose ใช้เพื่อ?', options: ['จัดการ network', 'เก็บข้อมูลถาวร (persistent data)', 'กำหนด port', 'ตั้งค่า environment'], correct: 1 }
    ]
  },
  // === Unit 6 ===
  {
    id: 'q6-pre',
    courseId: 6,
    type: 'pre',
    title: 'แบบทดสอบก่อนเรียน (หน่วยที่ 6)',
    desc: 'ทดสอบความรู้เรื่อง Cloud & AWS',
    questions: [
      { id: 1, question: 'AWS ย่อมาจากอะไร?', options: ['Advanced Web Services', 'Amazon Web Services', 'Automated Web Systems', 'Amazon Web Solutions'], correct: 1 },
      { id: 2, question: 'EC2 ใน AWS คืออะไร?', options: ['Database Service', 'Storage Service', 'Virtual Server', 'DNS Service'], correct: 2 },
      { id: 3, question: 'S3 ใช้สำหรับ?', options: ['รัน Server', 'เก็บไฟล์ (Object Storage)', 'จัดการ Domain', 'ส่ง Email'], correct: 1 },
      { id: 4, question: 'CI/CD ย่อมาจากอะไร?', options: ['Code Integration / Code Delivery', 'Continuous Integration / Continuous Deployment', 'Cloud Infrastructure / Cloud Delivery', 'Container Integration / Container Deploy'], correct: 1 },
      { id: 5, question: 'Serverless หมายถึง?', options: ['ไม่มี server จริงๆ', 'ไม่ต้องจัดการ server เอง', 'ใช้ได้เฉพาะ frontend', 'ไม่มี database'], correct: 1 }
    ]
  },
  {
    id: 'q6-post',
    courseId: 6,
    type: 'post',
    title: 'แบบทดสอบหลังเรียน (หน่วยที่ 6)',
    desc: 'ทบทวนความรู้เรื่อง Cloud Deployment',
    questions: [
      { id: 1, question: 'PM2 ใช้สำหรับ?', options: ['สร้าง Docker image', 'จัดการ Node.js process ให้ทำงานต่อเนื่อง', 'ตั้งค่า firewall', 'สร้าง database'], correct: 1 },
      { id: 2, question: 'Nginx ในบริบทนี้ทำหน้าที่เป็น?', options: ['Database', 'Reverse Proxy', 'DNS Server', 'File Server'], correct: 1 },
      { id: 3, question: 'Let\'s Encrypt ให้บริการอะไร?', options: ['Hosting ฟรี', 'SSL/TLS Certificate ฟรี', 'Domain ฟรี', 'Database ฟรี'], correct: 1 },
      { id: 4, question: 'GitHub Actions คืออะไร?', options: ['Issue Tracker', 'CI/CD Platform', 'Code Editor', 'Project Management'], correct: 1 },
      { id: 5, question: 'ECR ใน AWS ใช้สำหรับ?', options: ['เก็บ Docker Images (Container Registry)', 'Compute Service', 'Email Service', 'DNS Service'], correct: 0 }
    ]
  }
];

// ===== STATE =====
let currentPage = 'home';
let currentCourse = null;
let currentLesson = null;
let currentQuiz = null;
let quizAnswers = {};
let quizSubmitted = false;

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function normalizeVideoUrl(url = '') {
  const value = String(url || '').trim();
  if (!value) return '';

  try {
    const parsed = new URL(value);
    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v');
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    if (parsed.hostname.includes('youtu.be')) {
      const videoId = parsed.pathname.replace('/', '');
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch {}

  return value;
}

function loadCourseOverrides() {
  if (!DB.courses) return;
  COURSES.splice(0, COURSES.length, ...DB.courses);
}

async function loadServerContent() {
  try {
    const [coursesResponse, quizzesResponse] = await Promise.all([
      fetch(`/api/courses?t=${Date.now()}`, { cache: 'no-store' }),
      fetch(`/api/quizzes?t=${Date.now()}`, { cache: 'no-store' })
    ]);

    if (coursesResponse.ok) {
      const courses = await coursesResponse.json();
      if (Array.isArray(courses) && courses.length) {
        COURSES.splice(0, COURSES.length, ...courses);
        DB.courses = COURSES;
      }
    }

    if (quizzesResponse.ok) {
      const quizzes = await quizzesResponse.json();
      if (Array.isArray(quizzes) && quizzes.length) {
        QUIZZES.splice(0, QUIZZES.length, ...quizzes);
        DB.quizzes = QUIZZES;
      }
    }
  } catch (error) {
    console.warn('ใช้ข้อมูลในเครื่อง เพราะโหลดข้อมูลออนไลน์ไม่สำเร็จ', error);
  }
}

async function syncCoursesToServer() {
  try {
    const response = await fetch('/api/courses/sync', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courses: COURSES })
    });
    if (!response.ok) throw new Error('sync courses failed');
    const result = await response.json().catch(() => null);
    if (Array.isArray(result?.courses)) {
      COURSES.splice(0, COURSES.length, ...result.courses);
      DB.courses = COURSES;
    }
    showToast('บันทึกบทเรียนออนไลน์แล้ว ผู้ใช้คนอื่นรีเฟรชแล้วจะเห็นข้อมูลใหม่', 'success');
    return true;
  } catch (error) {
    console.error(error);
    showToast('บันทึกบทเรียนลงออนไลน์ไม่สำเร็จ ลองใหม่อีกครั้ง', 'error');
    return false;
  }
}

function saveCourses() {
  DB.courses = COURSES;
  renderHomeCoursesPreview();
  renderFooterStats();
  return syncCoursesToServer();
}

function loadQuizOverrides() {
  if (!DB.quizzes) return;
  QUIZZES.splice(0, QUIZZES.length, ...DB.quizzes);
}

function saveQuizzes() {
  DB.quizzes = QUIZZES;
  renderFooterStats();
  syncQuizzesToServer();
}

async function syncQuizzesToServer() {
  try {
    const response = await fetch('/api/quizzes/sync', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizzes: QUIZZES })
    });
    if (!response.ok) throw new Error('sync quizzes failed');
    showToast('บันทึกแบบทดสอบออนไลน์แล้ว ผู้ใช้คนอื่นรีเฟรชแล้วจะเห็นข้อมูลใหม่', 'success');
  } catch (error) {
    console.error(error);
    showToast('บันทึกแบบทดสอบลงออนไลน์ไม่สำเร็จ ลองใหม่อีกครั้ง', 'error');
  }
}

function closeMobileMenu() {
  const links = document.getElementById('nav-links');
  const btn = document.getElementById('mobile-menu-btn');
  if (links) links.classList.remove('mobile-open');
  if (btn) btn.classList.remove('active');
}

// ===== INIT =====
async function init() {
  loadCourseOverrides();
  loadQuizOverrides();
  await loadServerContent();
  initDefaultData();
  initParticles();
  initTypingAnimation();
  updateNav();
  renderHomeCoursesPreview();
  renderFooterStats();
  const initialRoute = getInitialRouteFromHash();
  navigate(initialRoute.page, initialRoute.data);
  initScrollObserver();
}

function buildRouteHash(page, data = {}) {
  const params = new URLSearchParams();
  Object.entries(data || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') params.set(key, value);
  });
  const query = params.toString();
  return query ? `#${page}?${query}` : `#${page}`;
}

function saveLastRoute(page, data = {}) {
  try {
    localStorage.setItem('bm_last_route', JSON.stringify({ page, data }));
  } catch {}
}

function getLastRoute() {
  try {
    const route = JSON.parse(localStorage.getItem('bm_last_route') || 'null');
    if (!route || !route.page) return null;
    return route;
  } catch {
    return null;
  }
}

function getInitialRouteFromHash() {
  const raw = window.location.hash.replace('#', '').trim();
  const [page = 'home', query = ''] = raw.split('?');
  const allowedPages = ['home', 'courses', 'quiz-list', 'about', 'login', 'register', 'profile', 'my-courses', 'admin', 'lesson', 'quiz', 'certificate'];
  if (!raw) return getLastRoute() || { page: 'home', data: {} };

  const nextPage = allowedPages.includes(page) ? page : 'home';
  const params = new URLSearchParams(query);

  return {
    page: nextPage,
    data: {
      courseId: params.get('courseId') || undefined,
      lessonId: params.get('lessonId') || undefined,
      quizId: params.get('quizId') || undefined
    }
  };
}

function replaceRouteHash(page, data, options = {}) {
  const nextHash = buildRouteHash(page, data);
  if (window.location.hash !== nextHash) {
    history.replaceState(null, '', nextHash);
  }
  if (!options.skipSave) saveLastRoute(page, data);
}

function initDefaultData() {
  const users = DB.users;
  if (!users.find(u => u.username === 'admin')) {
    DB.users = [...users, {
      id: 'admin-001',
      username: 'admin',
      password: 'admin1234',
      firstname: 'ผู้ดูแล',
      lastname: 'ระบบ',
      email: 'admin@backendmastery.com',
      role: 'admin',
      createdAt: new Date().toISOString()
    }];
  }
}

function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  container.innerHTML = '';
  if (prefersReducedMotion()) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${Math.random() > 0.5 ? 'rgba(79,110,247,0.5)' : 'rgba(181,123,255,0.4)'};
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * -20}s;
    `;
    container.appendChild(p);
  }
}

// ===== START LEARNING (auth check) =====
function startLearning() {
  if (DB.currentUser) {
    navigate('courses');
  } else {
    showToast('กรุณาสมัครสมาชิกหรือเข้าสู่ระบบก่อนเริ่มเรียน', 'info');
    navigate('register');
  }
}

// ===== NAVIGATION =====
function navigate(page, data) {
  const dd = document.getElementById('user-dropdown');
  if (dd) dd.classList.remove('open');
  closeMobileMenu();

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const target = document.getElementById('page-' + page);
  if (!target) return;
  target.classList.add('active');
  currentPage = page;
  replaceRouteHash(page, data);

  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const navMap = { home: 'home', courses: 'courses', 'quiz-list': 'quiz', about: 'about' };
  const navLink = document.getElementById('nav-' + (navMap[page] || ''));
  if (navLink) navLink.classList.add('active');

  window.scrollTo(0, 0);

  if (page === 'courses') renderCourses();
  if (page === 'profile') renderProfile();
  if (page === 'my-courses') renderMyCourses();
  if (page === 'admin') {
    if (!DB.currentUser || DB.currentUser.role !== 'admin') {
      showToast('ไม่มีสิทธิ์เข้าถึง', 'error');
      navigate('home');
      return;
    }
    renderAdmin();
  }
  if (page === 'quiz-list') renderQuizList();
  if (page === 'lesson') {
    const firstCourse = COURSES[0];
    openLesson(data?.courseId || firstCourse?.id, data?.lessonId || firstCourse?.lessons?.[0]?.id);
  }
  if (page === 'quiz') {
    if (data?.quizId) openQuiz(data.quizId);
    else navigate('quiz-list');
  }
  if (page === 'certificate') {
    if (data?.courseId) showCertificate(data.courseId);
    else navigate('my-courses');
  }
}

// ===== UPDATE NAV =====
function updateNav() {
  const user = DB.currentUser;
  const navAuth = document.getElementById('nav-auth');
  const navUser = document.getElementById('nav-user');
  const navAvatar = document.getElementById('nav-avatar');
  const dropdownName = document.getElementById('dropdown-name');
  const adminLink = document.getElementById('admin-link');

  if (user) {
    navAuth.classList.add('hidden');
    navUser.classList.remove('hidden');
    navAvatar.textContent = (user.firstname[0] + user.lastname[0]).toUpperCase();
    dropdownName.textContent = `${user.firstname} ${user.lastname}`;
    if (user.role === 'admin') adminLink.classList.remove('hidden');
    else adminLink.classList.add('hidden');
  } else {
    navAuth.classList.remove('hidden');
    navUser.classList.add('hidden');
  }
}

function toggleUserMenu() {
  const dd = document.getElementById('user-dropdown');
  dd.classList.toggle('open');
}
document.addEventListener('click', (e) => {
  const navUser = document.getElementById('nav-user');
  if (navUser && !navUser.contains(e.target)) {
    const dd = document.getElementById('user-dropdown');
    if (dd) dd.classList.remove('open');
  }
});

// ===== AUTH =====
function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('reg-username').value.trim();
  const firstname = document.getElementById('reg-firstname').value.trim();
  const lastname = document.getElementById('reg-lastname').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const confirm = document.getElementById('reg-confirm').value;
  const errEl = document.getElementById('reg-error');

  errEl.classList.add('hidden');

  if (password !== confirm) {
    errEl.textContent = '❌ รหัสผ่านไม่ตรงกัน';
    errEl.classList.remove('hidden');
    return;
  }
  if (password.length < 6) {
    errEl.textContent = '❌ รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    errEl.classList.remove('hidden');
    return;
  }

  const users = DB.users;
  if (users.find(u => u.username === username)) {
    errEl.textContent = '❌ ชื่อผู้ใช้นี้มีอยู่แล้ว';
    errEl.classList.remove('hidden');
    return;
  }
  if (users.find(u => u.email === email)) {
    errEl.textContent = '❌ อีเมลนี้มีอยู่แล้ว';
    errEl.classList.remove('hidden');
    return;
  }

  const newUser = {
    id: 'u-' + Date.now(),
    username, firstname, lastname, email, password,
    role: 'user',
    createdAt: new Date().toISOString()
  };
  DB.users = [...users, newUser];
  DB.currentUser = newUser;
  updateNav();
  showToast('✅ สมัครสมาชิกสำเร็จ! ยินดีต้อนรับ', 'success');
  navigate('home');
  document.getElementById('register-form').reset();
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  errEl.classList.add('hidden');

  const users = DB.users;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    errEl.textContent = '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
    errEl.classList.remove('hidden');
    return;
  }

  DB.currentUser = user;
  updateNav();
  showToast(`✅ ยินดีต้อนรับกลับมา, ${user.firstname}!`, 'success');
  navigate('home');
  document.getElementById('login-form').reset();
}

function logout() {
  DB.currentUser = null;
  updateNav();
  showToast('👋 ออกจากระบบแล้ว', 'info');
  navigate('home');
}

function showForgot() {
  showModal(`
    <h3>🔑 ลืมรหัสผ่าน</h3>
    <p style="color:var(--text-muted);margin-bottom:20px;">กรุณาติดต่อผู้ดูแลระบบ: <strong>admin@backendmastery.com</strong></p>
    <button class="btn-primary btn-full" onclick="closeModal()">ปิด</button>
  `);
}

// ===== HOME =====
function renderHomeCoursesPreview() {
  const grid = document.getElementById('home-courses-grid');
  if (!grid) return;
  grid.innerHTML = COURSES.slice(0, 3).map(c => renderCourseCard(c)).join('');
}

// ===== COURSES =====
function renderCourses() {
  const grid = document.getElementById('courses-grid');
  if (!grid) return;
  const searchInput = document.getElementById('course-search');
  if (searchInput) searchInput.value = '';
  grid.innerHTML = COURSES.map(c => renderCourseCard(c)).join('');
}

function filterCourses() {
  const query = document.getElementById('course-search').value.trim().toLowerCase();
  const grid = document.getElementById('courses-grid');
  if (!grid) return;
  
  const filtered = COURSES.filter(c => 
    c.title.toLowerCase().includes(query) ||
    c.desc.toLowerCase().includes(query) ||
    c.unit.toLowerCase().includes(query) ||
    c.lessons.some(l => l.title.toLowerCase().includes(query))
  );

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <p>ไม่พบบทเรียนที่ตรงกับ "${query}"</p>
      </div>
    `;
  } else {
    grid.innerHTML = filtered.map(c => renderCourseCard(c)).join('');
  }
}

function renderCourseCard(course) {
  const user = DB.currentUser;
  const prog = user ? (DB.progress[user.id] || {}) : {};
  const lessons = course.lessons || [];
  const done = lessons.filter(l => prog[l.id]).length;
  const pct = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0;

  return `
    <div class="course-card" onclick="openCourseDetail(${course.id})">
      <div class="course-banner" style="background:${course.color}">
        <span>${course.icon}</span>
      </div>
      <div class="course-body">
        <div class="course-unit">${course.unit}</div>
        <div class="course-title">${course.title}</div>
        <div class="course-desc">${course.desc}</div>
        <div class="course-meta">
          <span>📚 ${lessons.length} บทเรียน</span>
          <span>⏱️ ~${lessons.length} ชั่วโมง</span>
        </div>
        ${user ? `
          <div class="course-progress" style="margin-top:12px;">
            <div class="course-progress-bar" style="width:${pct}%"></div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;">
            <span style="font-size:12px;color:var(--text-dim);">${pct}% เสร็จสิ้น</span>
            ${pct === 100 ? '<span style="font-size:12px;color:var(--green);font-weight:600;">✅ เรียนจบแล้ว!</span>' : ''}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function openCourseDetail(courseId) {
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return;

  const preQuiz = QUIZZES.find(q => q.courseId === courseId && q.type === 'pre');
  const postQuiz = QUIZZES.find(q => q.courseId === courseId && q.type === 'post');
  const user = DB.currentUser;

  let quizDone = false;
  if (user && preQuiz) {
    const results = DB.quizResults;
    quizDone = !!(results[user.id] && results[user.id][preQuiz.id]);
  }

  showModal(`
    <h3>${course.icon} ${course.title}</h3>
    <p style="color:var(--text-muted);margin-bottom:20px;line-height:1.7;">${course.desc}</p>
    
    <div style="margin-bottom:20px;">
      <div style="font-size:13px;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">บทเรียนในหน่วยนี้</div>
      ${course.lessons.map((l, i) => `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--bg-700);border-radius:8px;margin-bottom:6px;cursor:pointer;"
          onclick="closeModal();navigate('lesson',{courseId:${course.id},lessonId:'${l.id}'})">
          <span style="width:24px;height:24px;border-radius:50%;background:var(--accent-glow);border:1px solid var(--accent);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--accent-light);">${i+1}</span>
          <span style="flex:1;font-size:14px;color:var(--text);">${l.title}</span>
          <span style="font-size:12px;color:var(--text-dim);">→</span>
        </div>
      `).join('')}
    </div>

    ${preQuiz ? `
      <div style="background:var(--bg-700);border-radius:10px;padding:16px;margin-bottom:12px;">
        <div style="font-size:13px;color:var(--text-dim);margin-bottom:8px;">📝 แบบทดสอบก่อนเรียน</div>
        <button class="btn-outline btn-sm" onclick="closeModal();navigate('quiz',{quizId:'${preQuiz.id}'})">
          ${quizDone ? '🔄 ทำใหม่' : '▶️ เริ่มทำแบบทดสอบ'}
        </button>
      </div>
    ` : ''}
    ${postQuiz ? `
      <div style="background:var(--bg-700);border-radius:10px;padding:16px;margin-bottom:12px;">
        <div style="font-size:13px;color:var(--text-dim);margin-bottom:8px;">✅ แบบทดสอบหลังเรียน</div>
        <button class="btn-outline btn-sm" onclick="closeModal();navigate('quiz',{quizId:'${postQuiz.id}'})">▶️ ทำแบบทดสอบ</button>
      </div>
    ` : ''}

    <button class="btn-primary btn-full" onclick="closeModal();navigate('lesson',{courseId:${course.id},lessonId:'${course.lessons[0].id}'})">
      🚀 เริ่มเรียนเลย
    </button>
  `);
}

// ===== LESSON =====
function openLesson(courseId, lessonId) {
  const course = COURSES.find(c => String(c.id) === String(courseId));
  if (!course) return;
  currentCourse = course;
  currentLesson = course.lessons.find(l => l.id === lessonId) || course.lessons[0];
  replaceRouteHash('lesson', { courseId: course.id, lessonId: currentLesson?.id });

  renderLessonSidebar();
  renderLessonContent();

  const user = DB.currentUser;
  if (user && currentLesson) {
    const prog = DB.progress;
    if (!prog[user.id]) prog[user.id] = {};
    prog[user.id][currentLesson.id] = true;
    DB.progress = prog;
  }
}

function renderLessonSidebar() {
  const sidebar = document.getElementById('lesson-sidebar');
  if (!sidebar || !currentCourse) return;

  const user = DB.currentUser;
  const prog = user ? (DB.progress[user.id] || {}) : {};

  sidebar.innerHTML = `
    <div style="margin-bottom:16px;">
      <button class="btn-ghost btn-sm" onclick="navigate('courses')" style="padding:8px 14px;font-size:13px;">← กลับไปบทเรียน</button>
    </div>
    <h3>${currentCourse.unit}</h3>
    <div style="font-weight:700;color:#fff;font-size:15px;margin-bottom:16px;">${currentCourse.title}</div>
    ${currentCourse.lessons.map(l => `
      <div class="lesson-nav-item ${l.id === currentLesson?.id ? 'active' : ''}"
        onclick="openLesson(${currentCourse.id},'${l.id}')">
        ${prog[l.id] ? '<span class="check">✓</span>' : '<span style="width:16px"></span>'}
        <span>${l.title}</span>
      </div>
    `).join('')}
    <div style="margin-top:24px;border-top:1px solid var(--border-light);padding-top:16px;">
      ${QUIZZES.filter(q => q.courseId === currentCourse.id).map(q => `
        <div class="lesson-nav-item" onclick="navigate('quiz',{quizId:'${q.id}'})">
          <span>📝</span>
          <span style="font-size:13px;">${q.type === 'pre' ? 'แบบทดสอบก่อนเรียน' : 'แบบทดสอบหลังเรียน'}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function getLessonVideoEmbed(url) {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v') || parsed.pathname.split('/').filter(Boolean).pop();
      return id ? `https://www.youtube.com/embed/${id}` : '';
    }
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.split('/').filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : '';
    }
    return url;
  } catch {
    return '';
  }
}

function getLessonGuide(course, lesson, index) {
  const topic = lesson?.title || course?.title || 'บทเรียน';
  const commandSets = [
    ['mkdir backend-api', 'cd backend-api', 'npm init -y', 'npm install express'],
    ['node --version', 'npm --version', 'node server.js'],
    ['npm install mongoose', 'mongosh', 'db.users.find()'],
    ['npm install jsonwebtoken bcryptjs', 'node auth-demo.js'],
    ['docker build -t backend-api .', 'docker compose up -d'],
    ['pm2 start server.js', 'git push origin main', 'npm run deploy']
  ];
  const commands = commandSets[(course.id - 1) % commandSets.length];
  return {
    eyebrow: `Lesson ${index + 1}`,
    title: `วิดีโอสอน: ${topic}`,
    desc: 'ดูภาพรวมก่อน แล้วค่อยอ่านรายละเอียดด้านล่างเพื่อทำตามทีละขั้น',
    commands,
    steps: [
      'ทำความเข้าใจเป้าหมายของบทเรียน',
      'ดูตัวอย่างโค้ดหรือคำสั่งที่ใช้จริง',
      'ลองทำตาม แล้วกลับมาอ่านสรุปเพื่อทบทวน'
    ]
  };
}

function renderLessonVideoPanel(course, lesson, index) {
  const embed = getLessonVideoEmbed(lesson.videoUrl);
  const isVideoFile = /\.(mp4|webm|ogg)(\?.*)?$/i.test(embed);
  const guide = getLessonGuide(course, lesson, index);
  const commandLines = guide.commands.map(line => `<span>${line}</span>`).join('');
  const stepItems = guide.steps.map((step, i) => `
    <li>
      <span>${i + 1}</span>
      <p>${step}</p>
    </li>
  `).join('');

  return `
    <section class="lesson-watch">
      <div class="lesson-watch-main">
        <div class="lesson-watch-label">${guide.eyebrow}</div>
        <h2>${guide.title}</h2>
        <p>${guide.desc}</p>
        <div class="lesson-video-frame">
          ${embed && isVideoFile ? `
            <video src="${embed}" controls></video>
          ` : embed ? `
            <iframe src="${embed}" title="${guide.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          ` : `
            <div class="lesson-video-placeholder">
              <div class="lesson-play-button">▶</div>
              <div>
                <strong>พื้นที่วิดีโอสอน</strong>
                <span>เพิ่ม videoUrl ในข้อมูลบทเรียนเพื่อฝังวิดีโอจริง</span>
              </div>
            </div>
          `}
        </div>
      </div>
      <aside class="lesson-watch-side">
        <div class="lesson-terminal">
          <div class="lesson-terminal-bar">
            <span></span><span></span><span></span>
            <strong>demo.sh</strong>
          </div>
          <code>${commandLines}</code>
        </div>
        <ol class="lesson-steps">${stepItems}</ol>
      </aside>
    </section>
  `;
}

function renderLessonContent() {
  const content = document.getElementById('lesson-content');
  if (!content || !currentLesson || !currentCourse) return;

  const lessons = currentCourse.lessons;
  const idx = lessons.findIndex(l => l.id === currentLesson.id);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

  content.innerHTML = `
    <div class="lesson-header">
      <div class="lesson-unit-label">${currentCourse.unit} — ${currentCourse.title}</div>
      <div class="lesson-title">${currentLesson.title}</div>
    </div>
    ${renderLessonVideoPanel(currentCourse, currentLesson, idx)}
    <div class="lesson-body">${currentLesson.content}</div>
    <div class="lesson-actions">
      ${prev ? `<button class="btn-outline" onclick="openLesson(${currentCourse.id},'${prev.id}')">← ${prev.title}</button>` : '<span></span>'}
      ${next ? `<button class="btn-primary" onclick="openLesson(${currentCourse.id},'${next.id}')">ถัดไป: ${next.title} →</button>` : `
        <button class="btn-primary" onclick="checkCourseCompletion(${currentCourse.id})">🏁 จบหน่วยนี้แล้ว</button>
      `}
    </div>
  `;
}

// ===== QUIZ =====
function renderQuizList() {
  const grid = document.getElementById('quiz-list-grid');
  if (!grid) return;
  
  const user = DB.currentUser;
  const results = user ? (DB.quizResults[user.id] || {}) : {};

  grid.innerHTML = QUIZZES.map(q => {
    const result = results[q.id];
    const course = COURSES.find(c => c.id === q.courseId);
    return `
      <div class="quiz-card-item" onclick="navigate('quiz',{quizId:'${q.id}'})">
        <div style="font-size:12px;color:var(--accent-light);font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
          ${q.type === 'pre' ? '📋 ก่อนเรียน' : '✅ หลังเรียน'} ${course ? '• ' + course.unit : ''}
        </div>
        <h3>${q.title}</h3>
        <p>${q.desc}</p>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:13px;color:var(--text-dim);">📝 ${q.questions.length} ข้อ</span>
          ${result ? `<span style="font-size:13px;font-weight:700;color:${Math.round((result.score/result.total)*100) >= 80 ? 'var(--green)' : Math.round((result.score/result.total)*100) >= 60 ? 'var(--yellow)' : 'var(--red)'};">คะแนน: ${result.score}/${result.total}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function openQuiz(quizId) {
  const quiz = QUIZZES.find(q => q.id === quizId);
  if (!quiz) return;
  currentQuiz = quiz;
  quizAnswers = {};
  quizSubmitted = false;
  replaceRouteHash('quiz', { quizId: quiz.id });
  renderQuiz();
}

function renderQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container || !currentQuiz) return;

  const total = currentQuiz.questions.length;
  const answered = Object.keys(quizAnswers).length;
  const progress = total > 0 ? (answered / total) * 100 : 0;

  container.innerHTML = `
    <div class="quiz-header">
      <div style="font-size:12px;color:var(--accent-light);font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
        ${currentQuiz.type === 'pre' ? '📋 แบบทดสอบก่อนเรียน' : '✅ แบบทดสอบหลังเรียน'}
      </div>
      <h1>${currentQuiz.title}</h1>
      <p>${currentQuiz.desc}</p>
    </div>
    <div class="quiz-progress">
      <span class="quiz-q-num">ตอบแล้ว ${answered}/${total}</span>
      <div class="quiz-progress-bar-wrap">
        <div class="quiz-progress-bar" style="width:${progress}%"></div>
      </div>
    </div>
    ${total === 0 ? `
      <div class="quiz-card" style="text-align:center;">
        <div class="no-results-icon">📝</div>
        <div class="quiz-question">ยังไม่มีคำถามในแบบทดสอบนี้</div>
        <p style="color:var(--text-muted);">ผู้ดูแลระบบสามารถเพิ่มคำถามได้จากหน้า Admin</p>
      </div>
    ` : currentQuiz.questions.map((q, qi) => renderQuestion(q, qi)).join('')}
    <div style="text-align:center;margin-top:32px;">
      <button class="btn-primary btn-lg" onclick="${total === 0 ? "navigate('quiz-list')" : 'submitQuiz()'}" ${total > 0 && answered < total ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
        ${total === 0 ? 'กลับไปหน้าแบบทดสอบ' : answered < total ? `ตอบอีก ${total - answered} ข้อ เพื่อส่ง` : '📤 ส่งคำตอบ'}
      </button>
    </div>
  `;
}

function renderQuestion(q, qi) {
  const letters = ['A','B','C','D'];
  const selected = quizAnswers[q.id];
  return `
    <div class="quiz-card">
      <div class="quiz-question">ข้อที่ ${qi+1}. ${q.question}</div>
      <div class="quiz-options">
        ${q.options.map((opt, oi) => `
          <div class="quiz-option ${selected === oi ? 'selected' : ''}"
            onclick="selectAnswer(${q.id},${oi})">
            <div class="quiz-option-letter">${letters[oi]}</div>
            <span>${opt}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function selectAnswer(questionId, optionIndex) {
  if (quizSubmitted) return;
  quizAnswers[questionId] = optionIndex;
  renderQuiz();
}

function submitQuiz() {
  if (!currentQuiz) return;
  const total = currentQuiz.questions.length;
  if (total === 0) {
    showToast('แบบทดสอบนี้ยังไม่มีคำถาม', 'info');
    return;
  }
  const answered = Object.keys(quizAnswers).length;
  if (answered < total) {
    showToast(`กรุณาตอบอีก ${total - answered} ข้อก่อนส่งคำตอบ`, 'info');
    return;
  }

  const user = DB.currentUser;
  if (!user) {
    showToast('กรุณาเข้าสู่ระบบก่อน', 'error');
    navigate('login');
    return;
  }

  let score = 0;
  currentQuiz.questions.forEach(q => {
    if (quizAnswers[q.id] === q.correct) score++;
  });

  const result = {
    score, total,
    answers: { ...quizAnswers },
    submittedAt: new Date().toISOString()
  };

  const results = DB.quizResults;
  if (!results[user.id]) results[user.id] = {};
  results[user.id][currentQuiz.id] = result;
  DB.quizResults = results;

  quizSubmitted = true;
  showQuizResult(result);
}

function showQuizResult(result) {
  const page = document.getElementById('page-quiz-result');
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  page.classList.add('active');

  const pct = Math.round((result.score / result.total) * 100);
  let emoji, msg, color;
  if (pct >= 80) {
    emoji = '🏆'; msg = 'ยอดเยี่ยมมาก! คุณเข้าใจเนื้อหาเป็นอย่างดี';
    color = 'var(--green)';
  } else if (pct >= 60) {
    emoji = '👍'; msg = 'ผ่านเกณฑ์! ลองทบทวนส่วนที่ยังไม่เข้าใจอีกครั้ง';
    color = 'var(--yellow)';
  } else {
    emoji = '📚'; msg = 'ยังไม่ผ่านเกณฑ์ ลองกลับไปทบทวนเนื้อหาแล้วทำใหม่อีกครั้ง';
    color = 'var(--red)';
  }

  const container = document.getElementById('quiz-result-container');
  container.innerHTML = `
    <div class="result-icon">${emoji}</div>
    <div class="result-title">ผลการทดสอบ</div>
    <div class="result-score" style="color:${color};">${result.score}/${result.total}</div>
    <div class="result-out-of">${pct}% คะแนน</div>
    <div class="result-msg">${msg}</div>
    
    <div class="result-answers">
      <div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:12px;">เฉลยคำตอบ</div>
      ${currentQuiz.questions.map(q => {
        const userAns = result.answers[q.id];
        const isCorrect = userAns === q.correct;
        return `
          <div class="result-answer-item">
            <div class="q-text">${q.question}</div>
            <div class="${isCorrect ? 'a-correct' : 'a-wrong'}">
              ${isCorrect ? '✅' : '❌'} คุณตอบ: ${q.options[userAns] || 'ไม่ได้ตอบ'}
            </div>
            ${!isCorrect ? `<div class="a-correct">✅ เฉลย: ${q.options[q.correct]}</div>` : ''}
          </div>
        `;
      }).join('')}
    </div>
    
    <div class="result-actions">
      <button class="btn-outline" onclick="navigate('quiz',{quizId:'${currentQuiz.id}'})">🔄 ทำอีกครั้ง</button>
      <button class="btn-primary" onclick="navigate('courses')">📚 ไปบทเรียน</button>
    </div>
  `;

  window.scrollTo(0, 0);
}

// ===== PROFILE =====
function renderProfile() {
  const user = DB.currentUser;
  if (!user) { navigate('login'); return; }

  const prog = DB.progress[user.id] || {};
  const doneCount = Object.keys(prog).length;
  const totalLessons = COURSES.reduce((sum, c) => sum + c.lessons.length, 0);
  const results = DB.quizResults[user.id] || {};
  const quizCount = Object.keys(results).length;

  document.getElementById('profile-card').innerHTML = `
    <div class="profile-avatar">${(user.firstname[0] + user.lastname[0]).toUpperCase()}</div>
    <div class="profile-name">${user.firstname} ${user.lastname}</div>
    <div class="profile-role">${user.role === 'admin' ? '⚙️ Admin' : '👤 ผู้ใช้งาน'}</div>
    <div class="profile-stats">
      <div class="profile-stat">
        <div class="num">${doneCount}</div>
        <div class="label">บทที่เรียนแล้ว</div>
      </div>
      <div class="profile-stat">
        <div class="num">${quizCount}</div>
        <div class="label">แบบทดสอบ</div>
      </div>
    </div>
    <div style="margin-bottom:16px;">
      <div style="font-size:13px;color:var(--text-dim);margin-bottom:6px;">ความก้าวหน้ารวม</div>
      <div class="course-progress">
        <div class="course-progress-bar" style="width:${totalLessons > 0 ? Math.round((doneCount/totalLessons)*100) : 0}%"></div>
      </div>
      <div style="font-size:12px;color:var(--text-dim);margin-top:4px;">${doneCount}/${totalLessons} บทเรียน</div>
    </div>
    <button class="btn-outline btn-full" onclick="showEditProfile()">✏️ แก้ไขโปรไฟล์</button>
  `;

  document.getElementById('profile-details').innerHTML = `
    <div class="profile-section">
      <h3>ข้อมูลส่วนตัว</h3>
      <div class="info-row"><span class="key">ชื่อผู้ใช้</span><span class="val">${user.username}</span></div>
      <div class="info-row"><span class="key">ชื่อ-นามสกุล</span><span class="val">${user.firstname} ${user.lastname}</span></div>
      <div class="info-row"><span class="key">อีเมล</span><span class="val">${user.email}</span></div>
      <div class="info-row"><span class="key">สิทธิ์</span><span class="val">${user.role === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน'}</span></div>
      <div class="info-row"><span class="key">วันที่สมัคร</span><span class="val">${new Date(user.createdAt).toLocaleDateString('th-TH')}</span></div>
    </div>
    <div class="profile-section">
      <h3>ความก้าวหน้าแต่ละหน่วย</h3>
      ${COURSES.map(c => {
        const lessons = c.lessons;
        const done = lessons.filter(l => prog[l.id]).length;
        const pct = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0;
        return `
          <div style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
              <span style="font-size:14px;color:var(--text);">${c.icon} ${c.unit}: ${c.title}</span>
              <span style="font-size:13px;color:${pct === 100 ? 'var(--green)' : 'var(--accent-light)'};">${pct}%</span>
            </div>
            <div class="course-progress">
              <div class="course-progress-bar" style="width:${pct}%"></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    <div class="profile-section">
      <h3>ผลการทดสอบ</h3>
      ${Object.keys(results).length === 0 ? '<p style="color:var(--text-dim);font-size:14px;">ยังไม่ได้ทำแบบทดสอบ</p>' : 
        Object.entries(results).map(([qid, r]) => {
          const q = QUIZZES.find(x => x.id === qid);
          if (!q) return '';
          const pct = Math.round((r.score / r.total) * 100);
          return `
            <div class="info-row">
              <span class="key" style="flex:1;">${q.title}</span>
              <span class="val" style="color:${pct>=80?'var(--green)':pct>=60?'var(--yellow)':'var(--red)'};">
                ${r.score}/${r.total} (${pct}%)
              </span>
            </div>
          `;
        }).join('')
      }
    </div>
  `;
}

function showEditProfile() {
  const user = DB.currentUser;
  showModal(`
    <h3>✏️ แก้ไขโปรไฟล์</h3>
    <div class="form-group">
      <label>ชื่อจริง</label>
      <div class="input-wrapper">
        <input type="text" id="edit-firstname" value="${user.firstname}" />
      </div>
    </div>
    <div class="form-group">
      <label>นามสกุล</label>
      <div class="input-wrapper">
        <input type="text" id="edit-lastname" value="${user.lastname}" />
      </div>
    </div>
    <div class="form-group">
      <label>อีเมล</label>
      <div class="input-wrapper">
        <input type="email" id="edit-email" value="${user.email}" />
      </div>
    </div>
    <div class="form-group">
      <label>รหัสผ่านใหม่ (เว้นว่างถ้าไม่เปลี่ยน)</label>
      <div class="input-wrapper">
        <input type="password" id="edit-password" placeholder="รหัสผ่านใหม่" />
      </div>
    </div>
    <button class="btn-primary btn-full" onclick="saveProfile()">💾 บันทึก</button>
  `);
}

function saveProfile() {
  const user = DB.currentUser;
  const firstname = document.getElementById('edit-firstname').value.trim();
  const lastname = document.getElementById('edit-lastname').value.trim();
  const email = document.getElementById('edit-email').value.trim();
  const password = document.getElementById('edit-password').value;

  const users = DB.users.map(u => {
    if (u.id === user.id) {
      return { ...u, firstname, lastname, email, ...(password ? { password } : {}) };
    }
    return u;
  });
  DB.users = users;
  DB.currentUser = users.find(u => u.id === user.id);
  updateNav();
  closeModal();
  renderProfile();
  showToast('✅ บันทึกข้อมูลสำเร็จ', 'success');
}

// ===== MY COURSES =====
function renderMyCourses() {
  const user = DB.currentUser;
  if (!user) { navigate('login'); return; }
  const grid = document.getElementById('my-courses-grid');
  const prog = DB.progress[user.id] || {};

  const active = COURSES.filter(c => c.lessons.some(l => prog[l.id]));
  if (active.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);">
      <div style="font-size:48px;margin-bottom:16px;">📚</div>
      <p>ยังไม่ได้เรียนบทใดเลย <a href="#" onclick="navigate('courses')" style="color:var(--accent-light);">เริ่มเรียนเลย</a></p>
    </div>`;
    return;
  }
  grid.innerHTML = active.map(c => renderCourseCard(c)).join('');
}

// ===== ADMIN =====
function renderAdmin() {
  showAdminSection('users');
  renderAdminStats();
}

function showAdminSection(section) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById('admin-section-' + section).classList.add('active');
  // Find the correct nav link
  document.querySelectorAll('.admin-nav-link').forEach(l => {
    if (l.getAttribute('data-section') === section) l.classList.add('active');
  });

  if (section === 'users') renderAdminUsers();
  if (section === 'courses') renderAdminCourses();
  if (section === 'quizzes') renderAdminQuizzes();
  if (section === 'stats') renderAdminStats();
}

function renderAdminUsers() {
  const users = DB.users;
  const container = document.getElementById('admin-users-table');
  container.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>ชื่อผู้ใช้</th>
          <th>ชื่อ-นามสกุล</th>
          <th>อีเมล</th>
          <th>สิทธิ์</th>
          <th>วันที่สมัคร</th>
          <th>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(u => `
          <tr>
            <td style="font-weight:600;color:var(--text);">${u.username}</td>
            <td>${u.firstname} ${u.lastname}</td>
            <td>${u.email}</td>
            <td><span class="badge ${u.role === 'admin' ? 'badge-admin' : 'badge-user'}">${u.role === 'admin' ? '⚙️ Admin' : '👤 User'}</span></td>
            <td>${new Date(u.createdAt).toLocaleDateString('th-TH')}</td>
            <td>
              <button class="btn-primary btn-sm" onclick="editUser('${u.id}')" style="margin-right:6px;">✏️ แก้ไข</button>
              ${u.id !== DB.currentUser?.id ? `<button class="btn-danger btn-sm" onclick="deleteUser('${u.id}')">🗑️ ลบ</button>` : ''}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderAdminCourses() {
  const container = document.getElementById('admin-courses-table');
  container.innerHTML = `
    <div class="admin-tools">
      <button class="btn-primary" onclick="showAddCourse()">+ เพิ่มหน่วยการเรียน</button>
      <button class="btn-outline" onclick="resetCoursesToDefault()">คืนค่าบทเรียนเริ่มต้น</button>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>หน่วย</th>
          <th>ชื่อบทเรียน</th>
          <th>จำนวนบทย่อย</th>
          <th>แบบทดสอบ</th>
          <th>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        ${COURSES.map(c => `
          <tr>
            <td>${c.unit}</td>
            <td style="font-weight:600;color:var(--text);">${c.icon} ${c.title}</td>
            <td>${c.lessons.length} บทย่อย</td>
            <td>${QUIZZES.filter(q => q.courseId === c.id).length} ชุด</td>
            <td class="table-actions">
              <button class="btn-primary btn-sm" onclick="showEditCourse(${c.id})">แก้หน่วย</button>
              <button class="btn-outline btn-sm" onclick="showManageLessons(${c.id})">บทเรียนย่อย</button>
              ${c.lessons[0] ? `<button class="btn-outline btn-sm" onclick="navigate('lesson',{courseId:${c.id},lessonId:'${c.lessons[0].id}'})">ดู</button>` : ''}
              <button class="btn-danger btn-sm" onclick="deleteCourse(${c.id})">ลบ</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderAdminQuizzes() {
  const container = document.getElementById('admin-quizzes-table');
  container.innerHTML = `
    <div class="admin-tools">
      <button class="btn-primary" onclick="showAddQuiz()">+ เพิ่มชุดแบบทดสอบ</button>
      <button class="btn-outline" onclick="resetQuizzesToDefault()">คืนค่าแบบทดสอบเริ่มต้น</button>
    </div>
    <table class="data-table">
      <thead>
        <tr><th>ชื่อแบบทดสอบ</th><th>หน่วย</th><th>ประเภท</th><th>จำนวนข้อ</th><th>จัดการ</th></tr>
      </thead>
      <tbody>
        ${QUIZZES.map(q => `
          <tr>
            <td style="font-weight:600;color:var(--text);">${q.title}</td>
            <td>${COURSES.find(c => c.id === q.courseId)?.unit || '-'}</td>
            <td><span class="badge ${q.type === 'pre' ? 'badge-user' : 'badge-active'}">${q.type === 'pre' ? '📋 ก่อนเรียน' : '✅ หลังเรียน'}</span></td>
            <td>${q.questions.length} ข้อ</td>
            <td class="table-actions">
              <button class="btn-primary btn-sm" onclick="showEditQuiz('${q.id}')">แก้ชุด</button>
              <button class="btn-outline btn-sm" onclick="showManageQuestions('${q.id}')">คำถาม</button>
              <button class="btn-outline btn-sm" onclick="navigate('quiz',{quizId:'${q.id}'})">ดู</button>
              <button class="btn-danger btn-sm" onclick="deleteQuiz('${q.id}')">ลบ</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function getQuizForm(quiz = {}) {
  const courseOptions = COURSES.map(c => `
    <option value="${c.id}" ${Number(quiz.courseId) === c.id ? 'selected' : ''}>${c.unit}: ${c.title}</option>
  `).join('');

  return `
    <div class="form-group">
      <label>หน่วยการเรียน</label>
      <div class="input-wrapper" style="padding:12px;">
        <select id="quiz-course-input" style="background:transparent;border:none;color:var(--text);font-size:15px;flex:1;outline:none;">
          ${courseOptions}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>ประเภท</label>
        <div class="input-wrapper" style="padding:12px;">
          <select id="quiz-type-input" style="background:transparent;border:none;color:var(--text);font-size:15px;flex:1;outline:none;">
            <option value="pre" ${quiz.type === 'pre' ? 'selected' : ''}>ก่อนเรียน</option>
            <option value="post" ${quiz.type === 'post' ? 'selected' : ''}>หลังเรียน</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>รหัสแบบทดสอบ</label>
        <div class="input-wrapper"><input type="text" id="quiz-id-input" value="${escapeHtml(quiz.id || '')}" placeholder="เช่น q1-pre" ${quiz.id ? 'disabled' : ''} /></div>
      </div>
    </div>
    <div class="form-group">
      <label>ชื่อแบบทดสอบ</label>
      <div class="input-wrapper"><input type="text" id="quiz-title-input" value="${escapeHtml(quiz.title || '')}" placeholder="แบบทดสอบก่อนเรียน (หน่วยที่ 1)" /></div>
    </div>
    <div class="form-group">
      <label>คำอธิบาย</label>
      <textarea id="quiz-desc-input" class="admin-textarea" placeholder="อธิบายวัตถุประสงค์ของแบบทดสอบ">${escapeHtml(quiz.desc || '')}</textarea>
    </div>
  `;
}

function showAddQuiz() {
  showModal(`
    <h3>+ เพิ่มชุดแบบทดสอบ</h3>
    ${getQuizForm()}
    <button class="btn-primary btn-full" onclick="confirmAddQuiz()">บันทึกชุดแบบทดสอบ</button>
  `);
}

function confirmAddQuiz() {
  const id = document.getElementById('quiz-id-input').value.trim();
  const courseId = Number(document.getElementById('quiz-course-input').value);
  const type = document.getElementById('quiz-type-input').value;
  const title = document.getElementById('quiz-title-input').value.trim();
  const desc = document.getElementById('quiz-desc-input').value.trim();

  if (!id || !title || !desc || !courseId) {
    showToast('กรุณากรอกข้อมูลแบบทดสอบให้ครบ', 'error');
    return;
  }
  if (QUIZZES.some(q => q.id === id)) {
    showToast('รหัสแบบทดสอบนี้ถูกใช้แล้ว', 'error');
    return;
  }

  QUIZZES.push({ id, courseId, type, title, desc, questions: [] });
  saveQuizzes();
  closeModal();
  renderAdminQuizzes();
  renderAdminStats();
  showToast('เพิ่มชุดแบบทดสอบแล้ว', 'success');
}

function showEditQuiz(quizId) {
  const quiz = QUIZZES.find(q => q.id === quizId);
  if (!quiz) return;
  showModal(`
    <h3>แก้ไขชุดแบบทดสอบ</h3>
    ${getQuizForm(quiz)}
    <button class="btn-primary btn-full" onclick="saveEditQuiz('${quizId}')">บันทึกการแก้ไข</button>
  `);
}

function saveEditQuiz(quizId) {
  const quiz = QUIZZES.find(q => q.id === quizId);
  if (!quiz) return;
  const courseId = Number(document.getElementById('quiz-course-input').value);
  const type = document.getElementById('quiz-type-input').value;
  const title = document.getElementById('quiz-title-input').value.trim();
  const desc = document.getElementById('quiz-desc-input').value.trim();

  if (!title || !desc || !courseId) {
    showToast('กรุณากรอกข้อมูลแบบทดสอบให้ครบ', 'error');
    return;
  }

  Object.assign(quiz, { courseId, type, title, desc });
  saveQuizzes();
  closeModal();
  renderAdminQuizzes();
  renderAdminStats();
  showToast('บันทึกชุดแบบทดสอบแล้ว', 'success');
}

function deleteQuiz(quizId) {
  const quiz = QUIZZES.find(q => q.id === quizId);
  if (!quiz) return;
  showModal(`
    <h3>ลบชุดแบบทดสอบ</h3>
    <p style="color:var(--text-muted);margin-bottom:24px;line-height:1.7;">ต้องการลบ "${quiz.title}" และคำถามทั้งหมดใช่ไหม?</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <button class="btn-ghost btn-full" onclick="closeModal()">ยกเลิก</button>
      <button class="btn-danger btn-full" onclick="confirmDeleteQuiz('${quizId}')">ลบชุดนี้</button>
    </div>
  `);
}

function confirmDeleteQuiz(quizId) {
  const idx = QUIZZES.findIndex(q => q.id === quizId);
  if (idx === -1) return;
  QUIZZES.splice(idx, 1);
  saveQuizzes();
  closeModal();
  renderAdminQuizzes();
  renderAdminStats();
  showToast('ลบชุดแบบทดสอบแล้ว', 'info');
}

function resetQuizzesToDefault() {
  showModal(`
    <h3>คืนค่าแบบทดสอบเริ่มต้น</h3>
    <p style="color:var(--text-muted);margin-bottom:24px;line-height:1.7;">การตั้งค่านี้จะลบแบบทดสอบที่แอดมินแก้ไว้ในเครื่องนี้ และกลับไปใช้ข้อมูลเริ่มต้นจากไฟล์</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <button class="btn-ghost btn-full" onclick="closeModal()">ยกเลิก</button>
      <button class="btn-danger btn-full" onclick="confirmResetQuizzes()">คืนค่าเริ่มต้น</button>
    </div>
  `);
}

function confirmResetQuizzes() {
  localStorage.removeItem('bm_quizzes');
  window.location.reload();
}

function showManageQuestions(quizId) {
  const quiz = QUIZZES.find(q => q.id === quizId);
  if (!quiz) return;
  showModal(`
    <h3>จัดการคำถาม</h3>
    <p style="color:var(--text-muted);margin-bottom:18px;">${quiz.title}</p>
    <div class="admin-lesson-list">
      ${(quiz.questions || []).map((question, index) => `
        <div class="admin-lesson-item">
          <div>
            <strong>${index + 1}. ${question.question}</strong>
            <span>เฉลย: ${question.options?.[question.correct] || '-'}</span>
          </div>
          <div class="table-actions">
            <button class="btn-primary btn-sm" onclick="showEditQuestion('${quizId}',${question.id})">แก้ไข</button>
            <button class="btn-danger btn-sm" onclick="deleteQuestion('${quizId}',${question.id})">ลบ</button>
          </div>
        </div>
      `).join('') || '<p style="color:var(--text-dim);font-size:14px;">ยังไม่มีคำถาม</p>'}
    </div>
    <button class="btn-primary btn-full" onclick="showAddQuestion('${quizId}')">+ เพิ่มคำถาม</button>
  `);
}

function getQuestionForm(question = {}) {
  const options = question.options || ['', '', '', ''];
  const optionInputs = [0, 1, 2, 3].map(i => `
    <div class="form-group">
      <label>ตัวเลือก ${String.fromCharCode(65 + i)}</label>
      <div class="input-wrapper"><input type="text" id="question-option-${i}" value="${escapeHtml(options[i] || '')}" placeholder="ตัวเลือก ${String.fromCharCode(65 + i)}" /></div>
    </div>
  `).join('');

  return `
    <div class="form-group">
      <label>คำถาม</label>
      <textarea id="question-text-input" class="admin-textarea" placeholder="พิมพ์คำถาม">${escapeHtml(question.question || '')}</textarea>
    </div>
    ${optionInputs}
    <div class="form-group">
      <label>เฉลยที่ถูกต้อง</label>
      <div class="input-wrapper" style="padding:12px;">
        <select id="question-correct-input" style="background:transparent;border:none;color:var(--text);font-size:15px;flex:1;outline:none;">
          ${[0, 1, 2, 3].map(i => `<option value="${i}" ${Number(question.correct) === i ? 'selected' : ''}>${String.fromCharCode(65 + i)}</option>`).join('')}
        </select>
      </div>
    </div>
  `;
}

function showAddQuestion(quizId) {
  showModal(`
    <h3>+ เพิ่มคำถาม</h3>
    ${getQuestionForm()}
    <button class="btn-primary btn-full" onclick="confirmAddQuestion('${quizId}')">บันทึกคำถาม</button>
  `);
}

function readQuestionForm() {
  const question = document.getElementById('question-text-input').value.trim();
  const options = [0, 1, 2, 3].map(i => document.getElementById(`question-option-${i}`).value.trim());
  const correct = Number(document.getElementById('question-correct-input').value);
  return { question, options, correct };
}

function confirmAddQuestion(quizId) {
  const quiz = QUIZZES.find(q => q.id === quizId);
  if (!quiz) return;
  const data = readQuestionForm();
  if (!data.question || data.options.some(opt => !opt)) {
    showToast('กรุณากรอกคำถามและตัวเลือกให้ครบ 4 ข้อ', 'error');
    return;
  }

  const nextId = (quiz.questions || []).reduce((max, q) => Math.max(max, Number(q.id) || 0), 0) + 1;
  quiz.questions.push({ id: nextId, ...data });
  saveQuizzes();
  closeModal();
  renderAdminQuizzes();
  showManageQuestions(quizId);
  showToast('เพิ่มคำถามแล้ว', 'success');
}

function showEditQuestion(quizId, questionId) {
  const quiz = QUIZZES.find(q => q.id === quizId);
  const question = quiz?.questions.find(q => Number(q.id) === Number(questionId));
  if (!quiz || !question) return;
  showModal(`
    <h3>แก้ไขคำถาม</h3>
    ${getQuestionForm(question)}
    <button class="btn-primary btn-full" onclick="saveEditQuestion('${quizId}',${questionId})">บันทึกคำถาม</button>
  `);
}

function saveEditQuestion(quizId, questionId) {
  const quiz = QUIZZES.find(q => q.id === quizId);
  const question = quiz?.questions.find(q => Number(q.id) === Number(questionId));
  if (!quiz || !question) return;
  const data = readQuestionForm();
  if (!data.question || data.options.some(opt => !opt)) {
    showToast('กรุณากรอกคำถามและตัวเลือกให้ครบ 4 ข้อ', 'error');
    return;
  }

  Object.assign(question, data);
  saveQuizzes();
  closeModal();
  renderAdminQuizzes();
  showManageQuestions(quizId);
  showToast('บันทึกคำถามแล้ว', 'success');
}

function deleteQuestion(quizId, questionId) {
  const quiz = QUIZZES.find(q => q.id === quizId);
  const question = quiz?.questions.find(q => Number(q.id) === Number(questionId));
  if (!quiz || !question) return;
  showModal(`
    <h3>ลบคำถาม</h3>
    <p style="color:var(--text-muted);margin-bottom:24px;line-height:1.7;">ต้องการลบคำถาม "${question.question}" ใช่ไหม?</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <button class="btn-ghost btn-full" onclick="showManageQuestions('${quizId}')">ยกเลิก</button>
      <button class="btn-danger btn-full" onclick="confirmDeleteQuestion('${quizId}',${questionId})">ลบคำถาม</button>
    </div>
  `);
}

function confirmDeleteQuestion(quizId, questionId) {
  const quiz = QUIZZES.find(q => q.id === quizId);
  if (!quiz) return;
  quiz.questions = quiz.questions.filter(q => Number(q.id) !== Number(questionId));
  saveQuizzes();
  closeModal();
  renderAdminQuizzes();
  showManageQuestions(quizId);
  showToast('ลบคำถามแล้ว', 'info');
}

function renderAdminStats() {
  const users = DB.users;
  const allResults = DB.quizResults;
  const allProgress = DB.progress;

  const totalQuizTaken = Object.values(allResults).reduce((sum, r) => sum + Object.keys(r).length, 0);
  const totalLessonsDone = Object.values(allProgress).reduce((sum, p) => sum + Object.keys(p).length, 0);
  const totalLessons = COURSES.reduce((sum, c) => sum + c.lessons.length, 0);

  document.getElementById('admin-stats-grid').innerHTML = `
    <div class="stat-card">
      <div class="stat-icon">👥</div>
      <div class="stat-num">${users.length}</div>
      <div class="stat-label">ผู้ใช้งานทั้งหมด</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">📚</div>
      <div class="stat-num">${COURSES.length}</div>
      <div class="stat-label">หน่วยการเรียน</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">📖</div>
      <div class="stat-num">${totalLessons}</div>
      <div class="stat-label">บทเรียนทั้งหมด</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">📝</div>
      <div class="stat-num">${QUIZZES.length}</div>
      <div class="stat-label">แบบทดสอบทั้งหมด</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">🏆</div>
      <div class="stat-num">${totalQuizTaken}</div>
      <div class="stat-label">การทำแบบทดสอบ</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">✅</div>
      <div class="stat-num">${totalLessonsDone}</div>
      <div class="stat-label">บทที่เรียนสำเร็จ</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">⚙️</div>
      <div class="stat-num">${users.filter(u => u.role === 'admin').length}</div>
      <div class="stat-label">ผู้ดูแลระบบ</div>
    </div>
  `;
}

function editUser(userId) {
  const user = DB.users.find(u => u.id === userId);
  if (!user) return;
  showModal(`
    <h3>✏️ แก้ไขข้อมูลผู้ใช้</h3>
    <div class="form-group">
      <label>ชื่อผู้ใช้</label>
      <div class="input-wrapper">
        <input type="text" id="edit-u-username" value="${user.username}" />
      </div>
    </div>
    <div class="form-group">
      <label>ชื่อจริง</label>
      <div class="input-wrapper">
        <input type="text" id="edit-u-firstname" value="${user.firstname}" />
      </div>
    </div>
    <div class="form-group">
      <label>นามสกุล</label>
      <div class="input-wrapper">
        <input type="text" id="edit-u-lastname" value="${user.lastname}" />
      </div>
    </div>
    <div class="form-group">
      <label>อีเมล</label>
      <div class="input-wrapper">
        <input type="email" id="edit-u-email" value="${user.email}" />
      </div>
    </div>
    <div class="form-group">
      <label>สิทธิ์</label>
      <div class="input-wrapper" style="padding:12px;">
        <select id="edit-u-role" style="background:transparent;border:none;color:var(--text);font-size:15px;flex:1;outline:none;">
          <option value="user" ${user.role === 'user' ? 'selected' : ''}>ผู้ใช้งาน</option>
          <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>ผู้ดูแลระบบ</option>
        </select>
      </div>
    </div>
    <button class="btn-primary btn-full" onclick="saveEditUser('${userId}')">💾 บันทึก</button>
  `);
}

function saveEditUser(userId) {
  const username = document.getElementById('edit-u-username').value.trim();
  const firstname = document.getElementById('edit-u-firstname').value.trim();
  const lastname = document.getElementById('edit-u-lastname').value.trim();
  const email = document.getElementById('edit-u-email').value.trim();
  const role = document.getElementById('edit-u-role').value;

  DB.users = DB.users.map(u => u.id === userId ? { ...u, username, firstname, lastname, email, role } : u);

  if (DB.currentUser?.id === userId) {
    DB.currentUser = DB.users.find(u => u.id === userId);
    updateNav();
  }
  closeModal();
  renderAdminUsers();
  showToast('✅ แก้ไขสำเร็จ', 'success');
}

function deleteUser(userId) {
  showModal(`
    <h3>🗑️ ยืนยันการลบ</h3>
    <p style="color:var(--text-muted);margin-bottom:24px;">คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
    <div style="display:flex;gap:12px;">
      <button class="btn-ghost btn-full" onclick="closeModal()">ยกเลิก</button>
      <button class="btn-danger btn-full" onclick="confirmDeleteUser('${userId}')">🗑️ ลบ</button>
    </div>
  `);
}

function confirmDeleteUser(userId) {
  DB.users = DB.users.filter(u => u.id !== userId);
  closeModal();
  renderAdminUsers();
  showToast('🗑️ ลบผู้ใช้สำเร็จ', 'info');
}

function showAddUser() {
  showModal(`
    <h3>➕ เพิ่มผู้ใช้ใหม่</h3>
    <div class="form-group">
      <label>ชื่อผู้ใช้</label>
      <div class="input-wrapper"><input type="text" id="add-username" placeholder="username" /></div>
    </div>
    <div class="form-group">
      <label>ชื่อจริง</label>
      <div class="input-wrapper"><input type="text" id="add-firstname" placeholder="ชื่อจริง" /></div>
    </div>
    <div class="form-group">
      <label>นามสกุล</label>
      <div class="input-wrapper"><input type="text" id="add-lastname" placeholder="นามสกุล" /></div>
    </div>
    <div class="form-group">
      <label>อีเมล</label>
      <div class="input-wrapper"><input type="email" id="add-email" placeholder="email@example.com" /></div>
    </div>
    <div class="form-group">
      <label>รหัสผ่าน</label>
      <div class="input-wrapper"><input type="password" id="add-password" placeholder="••••••••" /></div>
    </div>
    <div class="form-group">
      <label>สิทธิ์</label>
      <div class="input-wrapper" style="padding:12px;">
        <select id="add-role" style="background:transparent;border:none;color:var(--text);font-size:15px;flex:1;outline:none;">
          <option value="user">ผู้ใช้งาน</option>
          <option value="admin">ผู้ดูแลระบบ</option>
        </select>
      </div>
    </div>
    <button class="btn-primary btn-full" onclick="confirmAddUser()">➕ เพิ่มผู้ใช้</button>
  `);
}

function confirmAddUser() {
  const username = document.getElementById('add-username').value.trim();
  const firstname = document.getElementById('add-firstname').value.trim();
  const lastname = document.getElementById('add-lastname').value.trim();
  const email = document.getElementById('add-email').value.trim();
  const password = document.getElementById('add-password').value;
  const role = document.getElementById('add-role').value;

  if (!username || !firstname || !lastname || !email || !password) {
    showToast('กรุณากรอกข้อมูลให้ครบ', 'error');
    return;
  }

  DB.users = [...DB.users, {
    id: 'u-' + Date.now(), username, firstname, lastname, email, password, role,
    createdAt: new Date().toISOString()
  }];
  closeModal();
  renderAdminUsers();
  showToast('✅ เพิ่มผู้ใช้สำเร็จ', 'success');
}

function getCourseForm(course = {}) {
  return `
    <div class="form-row">
      <div class="form-group">
        <label>หน่วย</label>
        <div class="input-wrapper"><input type="text" id="course-unit" value="${escapeHtml(course.unit || '')}" placeholder="หน่วยที่ 1" /></div>
      </div>
      <div class="form-group">
        <label>ไอคอน</label>
        <div class="input-wrapper"><input type="text" id="course-icon" value="${escapeHtml(course.icon || '📚')}" placeholder="📚" /></div>
      </div>
    </div>
    <div class="form-group">
      <label>ชื่อหน่วยการเรียน</label>
      <div class="input-wrapper"><input type="text" id="course-title" value="${escapeHtml(course.title || '')}" placeholder="เช่น Node.js และ Express" /></div>
    </div>
    <div class="form-group">
      <label>คำอธิบาย</label>
      <textarea id="course-desc" class="admin-textarea" placeholder="อธิบายภาพรวมของหน่วยนี้">${escapeHtml(course.desc || '')}</textarea>
    </div>
    <div class="form-group">
      <label>สีแบนเนอร์</label>
      <div class="input-wrapper"><input type="text" id="course-color" value="${escapeHtml(course.color || 'linear-gradient(135deg, #0f3443, #34e89e)')}" /></div>
    </div>
  `;
}

function showAddCourse() {
  showModal(`
    <h3>+ เพิ่มหน่วยการเรียน</h3>
    ${getCourseForm()}
    <button class="btn-primary btn-full" onclick="confirmAddCourse()">บันทึกหน่วยการเรียน</button>
  `);
}

async function confirmAddCourse() {
  const title = document.getElementById('course-title').value.trim();
  const unit = document.getElementById('course-unit').value.trim();
  const desc = document.getElementById('course-desc').value.trim();
  const icon = document.getElementById('course-icon').value.trim() || '📚';
  const color = document.getElementById('course-color').value.trim() || 'linear-gradient(135deg, #0f3443, #34e89e)';
  if (!title || !unit || !desc) {
    showToast('กรุณากรอกข้อมูลหน่วยการเรียนให้ครบ', 'error');
    return;
  }

  const id = Date.now();
  COURSES.push({ id, unit, title, desc, icon, color, lessons: [] });
  const saved = await saveCourses();
  if (!saved) return;
  closeModal();
  renderAdminCourses();
  renderAdminStats();
  showToast('เพิ่มหน่วยการเรียนสำเร็จ', 'success');
}

function showEditCourse(courseId) {
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return;
  showModal(`
    <h3>แก้ไขหน่วยการเรียน</h3>
    ${getCourseForm(course)}
    <button class="btn-primary btn-full" onclick="saveEditCourse(${courseId})">บันทึกการแก้ไข</button>
  `);
}

async function saveEditCourse(courseId) {
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return;
  const title = document.getElementById('course-title').value.trim();
  const unit = document.getElementById('course-unit').value.trim();
  const desc = document.getElementById('course-desc').value.trim();
  const icon = document.getElementById('course-icon').value.trim() || '📚';
  const color = document.getElementById('course-color').value.trim() || course.color;
  if (!title || !unit || !desc) {
    showToast('กรุณากรอกข้อมูลหน่วยการเรียนให้ครบ', 'error');
    return;
  }

  Object.assign(course, { title, unit, desc, icon, color });
  const saved = await saveCourses();
  if (!saved) return;
  closeModal();
  renderAdminCourses();
  renderAdminStats();
  showToast('บันทึกหน่วยการเรียนแล้ว', 'success');
}

function deleteCourse(courseId) {
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return;
  showModal(`
    <h3>ลบหน่วยการเรียน</h3>
    <p style="color:var(--text-muted);margin-bottom:24px;line-height:1.7;">ต้องการลบ "${course.title}" และบทเรียนย่อยทั้งหมดใช่ไหม?</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <button class="btn-ghost btn-full" onclick="closeModal()">ยกเลิก</button>
      <button class="btn-danger btn-full" onclick="confirmDeleteCourse(${courseId})">ลบหน่วยนี้</button>
    </div>
  `);
}

async function confirmDeleteCourse(courseId) {
  const idx = COURSES.findIndex(c => c.id === courseId);
  if (idx === -1) return;
  const [removed] = COURSES.splice(idx, 1);
  const saved = await saveCourses();
  if (!saved) {
    COURSES.splice(idx, 0, removed);
    DB.courses = COURSES;
    return;
  }
  closeModal();
  renderAdminCourses();
  renderAdminStats();
  showToast('ลบหน่วยการเรียนแล้ว', 'info');
}

function resetCoursesToDefault() {
  showModal(`
    <h3>คืนค่าบทเรียนเริ่มต้น</h3>
    <p style="color:var(--text-muted);margin-bottom:24px;line-height:1.7;">การตั้งค่านี้จะลบข้อมูลคอร์สที่แอดมินแก้ไว้ในเครื่องนี้ และกลับไปใช้ข้อมูลเริ่มต้นจากไฟล์</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <button class="btn-ghost btn-full" onclick="closeModal()">ยกเลิก</button>
      <button class="btn-danger btn-full" onclick="confirmResetCourses()">คืนค่าเริ่มต้น</button>
    </div>
  `);
}

function confirmResetCourses() {
  localStorage.removeItem('bm_courses');
  window.location.reload();
}

function showManageLessons(courseId) {
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return;
  showModal(`
    <h3>จัดการบทเรียนย่อย</h3>
    <p style="color:var(--text-muted);margin-bottom:18px;">${course.icon} ${course.unit}: ${course.title}</p>
    <div class="admin-lesson-list">
      ${(course.lessons || []).map((lesson, index) => `
        <div class="admin-lesson-item">
          <div>
            <strong>${index + 1}. ${lesson.title}</strong>
            <span>${lesson.videoUrl ? 'มีคลิปวิดีโอแล้ว' : 'ยังไม่ได้ใส่คลิป'}</span>
          </div>
          <div class="table-actions">
            <button class="btn-primary btn-sm" onclick="showEditLesson(${courseId},'${lesson.id}')">แก้ไข</button>
            <button class="btn-outline btn-sm" onclick="navigate('lesson',{courseId:${courseId},lessonId:'${lesson.id}'})">ดู</button>
            <button class="btn-danger btn-sm" onclick="deleteLesson(${courseId},'${lesson.id}')">ลบ</button>
          </div>
        </div>
      `).join('') || '<p style="color:var(--text-dim);font-size:14px;">ยังไม่มีบทเรียนย่อย</p>'}
    </div>
    <button class="btn-primary btn-full" onclick="showAddLesson(${courseId})">+ เพิ่มบทเรียนย่อย</button>
  `);
}

function getLessonForm(lesson = {}) {
  return `
    <div class="form-group">
      <label>ชื่อบทเรียน</label>
      <div class="input-wrapper"><input type="text" id="lesson-title-input" value="${escapeHtml(lesson.title || '')}" placeholder="เช่น Routing และ Middleware" /></div>
    </div>
    <div class="form-group">
      <label>ลิงก์คลิปวิดีโอ</label>
      <div class="input-wrapper"><input type="url" id="lesson-video-input" value="${escapeHtml(lesson.videoUrl || '')}" placeholder="YouTube URL หรือไฟล์วิดีโอ" /></div>
    </div>
    <div class="form-group">
      <label>เนื้อหาบทเรียน (รองรับ HTML)</label>
      <textarea id="lesson-content-input" class="admin-textarea admin-codearea" placeholder="<h3>หัวข้อ</h3><p>เนื้อหา...</p>">${escapeHtml(lesson.content || '')}</textarea>
    </div>
  `;
}

function showAddLesson(courseId) {
  showModal(`
    <h3>+ เพิ่มบทเรียนย่อย</h3>
    ${getLessonForm()}
    <button class="btn-primary btn-full" onclick="confirmAddLesson(${courseId})">บันทึกบทเรียน</button>
  `);
}

async function confirmAddLesson(courseId) {
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return;
  const title = document.getElementById('lesson-title-input').value.trim();
  const videoUrl = normalizeVideoUrl(document.getElementById('lesson-video-input').value);
  const content = document.getElementById('lesson-content-input').value.trim();
  if (!title || !content) {
    showToast('กรุณากรอกชื่อและเนื้อหาบทเรียน', 'error');
    return;
  }

  const lesson = {
    id: `l${courseId}-${Date.now()}`,
    title,
    videoUrl,
    content
  };
  course.lessons.push(lesson);
  const saved = await saveCourses();
  if (!saved) {
    course.lessons = course.lessons.filter((item) => item.id !== lesson.id);
    DB.courses = COURSES;
    return;
  }
  closeModal();
  renderAdminCourses();
  showManageLessons(courseId);
  showToast('เพิ่มบทเรียนย่อยแล้ว', 'success');
}

function showEditLesson(courseId, lessonId) {
  const course = COURSES.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  if (!course || !lesson) return;
  showModal(`
    <h3>แก้ไขบทเรียนย่อย</h3>
    ${getLessonForm(lesson)}
    <button class="btn-primary btn-full" onclick="saveEditLesson(${courseId},'${lessonId}')">บันทึกบทเรียน</button>
  `);
}

async function saveEditLesson(courseId, lessonId) {
  const course = COURSES.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  if (!course || !lesson) return;
  const title = document.getElementById('lesson-title-input').value.trim();
  const videoUrl = normalizeVideoUrl(document.getElementById('lesson-video-input').value);
  const content = document.getElementById('lesson-content-input').value.trim();
  if (!title || !content) {
    showToast('กรุณากรอกชื่อและเนื้อหาบทเรียน', 'error');
    return;
  }

  const previous = { title: lesson.title, videoUrl: lesson.videoUrl, content: lesson.content };
  Object.assign(lesson, { title, videoUrl, content });
  const saved = await saveCourses();
  if (!saved) {
    Object.assign(lesson, previous);
    DB.courses = COURSES;
    return;
  }
  closeModal();
  renderAdminCourses();
  showManageLessons(courseId);
  showToast('บันทึกบทเรียนย่อยแล้ว', 'success');
}

function deleteLesson(courseId, lessonId) {
  const course = COURSES.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  if (!course || !lesson) return;
  showModal(`
    <h3>ลบบทเรียนย่อย</h3>
    <p style="color:var(--text-muted);margin-bottom:24px;line-height:1.7;">ต้องการลบ "${lesson.title}" ใช่ไหม?</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <button class="btn-ghost btn-full" onclick="showManageLessons(${courseId})">ยกเลิก</button>
      <button class="btn-danger btn-full" onclick="confirmDeleteLesson(${courseId},'${lessonId}')">ลบบทเรียน</button>
    </div>
  `);
}

async function confirmDeleteLesson(courseId, lessonId) {
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return;
  const previousLessons = [...course.lessons];
  course.lessons = course.lessons.filter(l => l.id !== lessonId);
  const saved = await saveCourses();
  if (!saved) {
    course.lessons = previousLessons;
    DB.courses = COURSES;
    return;
  }
  closeModal();
  renderAdminCourses();
  showManageLessons(courseId);
  showToast('ลบบทเรียนย่อยแล้ว', 'info');
}

// ===== FOOTER =====
function renderFooterStats() {
  const el = document.getElementById('footer-stats');
  if (!el) return;
  const totalLessons = COURSES.reduce((sum, c) => sum + c.lessons.length, 0);
  el.innerHTML = `
    <div class="footer-stat-item">
      <span class="footer-stat-num">${COURSES.length}</span>
      <span class="footer-stat-label">หน่วยการเรียน</span>
    </div>
    <div class="footer-stat-item">
      <span class="footer-stat-num">${totalLessons}</span>
      <span class="footer-stat-label">บทเรียน</span>
    </div>
    <div class="footer-stat-item">
      <span class="footer-stat-num">${QUIZZES.length}</span>
      <span class="footer-stat-label">แบบทดสอบ</span>
    </div>
    <div class="footer-stat-item">
      <span class="footer-stat-num">${QUIZZES.reduce((sum, q) => sum + q.questions.length, 0)}</span>
      <span class="footer-stat-label">ข้อคำถาม</span>
    </div>
  `;
}

// ===== MODAL =====
function showModal(content) {
  document.getElementById('modal-content').innerHTML = content;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

// ===== TOAST =====
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'none';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
  const el = document.getElementById('typing-target');
  if (!el) return;
  const words = ['Back-End', 'Node.js', 'MongoDB', 'Docker', 'AWS'];
  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pauseTimer = 0;

  function type() {
    const current = words[wordIdx];
    if (!deleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        pauseTimer = setTimeout(() => { deleting = true; type(); }, 2000);
        return;
      }
      setTimeout(type, 80 + Math.random() * 40);
    } else {
      el.textContent = current.substring(0, charIdx);
      charIdx--;
      if (charIdx < 0) {
        deleting = false;
        charIdx = 0;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(type, 500);
        return;
      }
      setTimeout(type, 40);
    }
  }

  setTimeout(type, 2000);
}

// ===== BACK TO TOP =====
window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

// ===== COURSE COMPLETION & CERTIFICATE =====
function checkCourseCompletion(courseId) {
  const user = DB.currentUser;
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return;

  if (!user) {
    navigate('courses');
    return;
  }

  const prog = DB.progress[user.id] || {};
  const done = course.lessons.filter(l => prog[l.id]).length;
  const total = course.lessons.length;

  if (done === total) {
    launchConfetti();
    navigate('certificate', { courseId });
  } else {
    showToast(`เรียนแล้ว ${done}/${total} บท เรียนต่อเพื่อรับใบรับรอง!`, 'info');
    navigate('courses');
  }
}

function showCertificate(courseId) {
  const user = DB.currentUser;
  const course = COURSES.find(c => String(c.id) === String(courseId));
  if (!user || !course) { navigate('courses'); return; }
  replaceRouteHash('certificate', { courseId: course.id });

  const container = document.getElementById('certificate-container');
  container.innerHTML = `
    <div class="certificate-card">
      <div class="certificate-inner">
        <div class="certificate-badge">🏆</div>
        <div class="certificate-title">Certificate of Completion</div>
        <div class="certificate-course">${course.icon} ${course.title}</div>
        <div class="certificate-name">มอบให้: ${user.firstname} ${user.lastname}</div>
        <div class="certificate-date">วันที่: ${new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <div class="certificate-seal">✅ Verified by Backend Mastery</div>
      </div>
    </div>
    <div style="margin-top:32px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <button class="btn-outline" onclick="navigate('courses')">📚 เรียนหน่วยถัดไป</button>
      <button class="btn-primary" onclick="navigate('profile')">👤 ดูโปรไฟล์</button>
    </div>
  `;
}

// ===== CONFETTI =====
function launchConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  const colors = ['#4f6ef7','#7b5ef8','#22d3a6','#f5c842','#f45c5c','#b57bff','#6c8aff'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (Math.random() * 8 + 5) + 'px';
    piece.style.height = (Math.random() * 8 + 5) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    piece.style.animationDelay = (Math.random() * 0.5) + 's';
    container.appendChild(piece);
  }

  setTimeout(() => container.remove(), 4000);
}

// ===== SCROLL ANIMATION OBSERVER =====
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .course-card, .testimonial-card, .roadmap-item, .stat-card, .about-card').forEach(el => {
    el.classList.add('animate-target');
    observer.observe(el);
  });
}

// ===== SCROLL EFFECTS =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const st = window.scrollY;
  if (st > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  lastScroll = st;
}, { passive: true });

// ===== START =====
window.addEventListener('DOMContentLoaded', init);
