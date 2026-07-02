import { promises as fsPromises } from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';

// Static import — bundled at build time, ใช้ได้แน่นอนบน Render
// ไม่ต้องอ่านไฟล์ที่ runtime เลย
import seedData from '../data/db.json' with { type: 'json' };

const defaultPath = path.join(process.cwd(), 'data', 'db.json');
const dbPath = process.env.DATA_FILE || defaultPath;
const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB || 'backend_mastery';

let mongoClientPromise;

// In-memory store สำหรับ Render read-only filesystem
let memoryStore = null;

function usesMongo() {
  return Boolean(mongoUri);
}

async function getMongoDb() {
  if (!mongoClientPromise) {
    const client = new MongoClient(mongoUri);
    mongoClientPromise = client.connect();
  }
  const client = await mongoClientPromise;
  return client.db(mongoDbName);
}

function getMemoryStore() {
  if (!memoryStore) {
    memoryStore = {
      users: Array.isArray(seedData.users) ? [...seedData.users] : [],
      courses: Array.isArray(seedData.courses) ? [...seedData.courses] : [],
      quizzes: Array.isArray(seedData.quizzes) ? [...seedData.quizzes] : []
    };
  }
  return memoryStore;
}

async function ensureMongoSeed(db) {
  try {
    const hasCourses = await db.collection('courses').estimatedDocumentCount();
    const hasQuizzes = await db.collection('quizzes').estimatedDocumentCount();
    const hasUsers = await db.collection('users').estimatedDocumentCount();

    const seed = seedData;
    if (!hasUsers && seed.users?.length) await db.collection('users').insertMany(seed.users);
    if (!hasCourses && seed.courses?.length) await db.collection('courses').insertMany(seed.courses);
    if (!hasQuizzes && seed.quizzes?.length) await db.collection('quizzes').insertMany(seed.quizzes);

    const [courses, quizzes] = await Promise.all([
      db.collection('courses').find({}, { projection: { _id: 0 } }).toArray(),
      db.collection('quizzes').find({}, { projection: { _id: 0 } }).toArray()
    ]);

    const currentLessonCount = courses.reduce((sum, c) => sum + (c.lessons?.length || 0), 0);
    const seedLessonCount = seed.courses?.reduce((sum, c) => sum + (c.lessons?.length || 0), 0) || 0;
    const currentQuestionCount = quizzes.reduce((sum, q) => sum + (q.questions?.length || 0), 0);
    const seedQuestionCount = seed.quizzes?.reduce((sum, q) => sum + (q.questions?.length || 0), 0) || 0;

    if (seedLessonCount > currentLessonCount) {
      await db.collection('courses').deleteMany({});
      if (seed.courses?.length) await db.collection('courses').insertMany(seed.courses);
    }
    if (seedQuestionCount > currentQuestionCount) {
      await db.collection('quizzes').deleteMany({});
      if (seed.quizzes?.length) await db.collection('quizzes').insertMany(seed.quizzes);
    }
  } catch (err) {
    console.error('[db] ensureMongoSeed error:', err.message);
  }
}

export async function readDb() {
  try {
    if (usesMongo()) {
      const db = await getMongoDb();
      await ensureMongoSeed(db);
      const [users, courses, quizzes] = await Promise.all([
        db.collection('users').find({}, { projection: { _id: 0 } }).toArray(),
        db.collection('courses').find({}, { projection: { _id: 0 } }).sort({ id: 1 }).toArray(),
        db.collection('quizzes').find({}, { projection: { _id: 0 } }).sort({ id: 1 }).toArray()
      ]);
      return { users, courses, quizzes };
    }

    // ลองอ่านไฟล์ก่อน
    try {
      const raw = await fsPromises.readFile(dbPath, 'utf8');
      return JSON.parse(raw);
    } catch {
      // ไฟล์ไม่มีหรือ read-only → ใช้ in-memory (seed มาจาก static import)
      return getMemoryStore();
    }
  } catch (err) {
    console.error('[db] readDb error:', err.message);
    // Never throw — always return valid structure
    return getMemoryStore();
  }
}

export async function writeDb(data) {
  try {
    if (usesMongo()) {
      const db = await getMongoDb();
      await Promise.all([
        db.collection('users').deleteMany({}),
        db.collection('courses').deleteMany({}),
        db.collection('quizzes').deleteMany({})
      ]);
      await Promise.all([
        data.users?.length ? db.collection('users').insertMany(data.users) : Promise.resolve(),
        data.courses?.length ? db.collection('courses').insertMany(data.courses) : Promise.resolve(),
        data.quizzes?.length ? db.collection('quizzes').insertMany(data.quizzes) : Promise.resolve()
      ]);
      return data;
    }

    // ลองเขียนไฟล์
    try {
      await fsPromises.mkdir(path.dirname(dbPath), { recursive: true });
      await fsPromises.writeFile(dbPath, JSON.stringify(data, null, 2));
    } catch {
      // read-only → เก็บ in-memory
      memoryStore = {
        users: data.users || [],
        courses: data.courses || [],
        quizzes: data.quizzes || []
      };
    }
  } catch (err) {
    console.error('[db] writeDb error:', err.message);
    // เก็บ in-memory เสมอเมื่อ error
    memoryStore = {
      users: data.users || [],
      courses: data.courses || [],
      quizzes: data.quizzes || []
    };
  }
  return data;
}

export function json(data, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  headers.set('Pragma', 'no-cache');
  headers.set('Expires', '0');
  return Response.json(data, { ...init, headers });
}
