import { promises as fs } from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';

const defaultPath = path.join(process.cwd(), 'data', 'db.json');
const dbPath = process.env.DATA_FILE || defaultPath;
const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB || 'backend_mastery';

let mongoClientPromise;

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

async function ensureDbFile() {
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  try {
    await fs.access(dbPath);
  } catch {
    await fs.writeFile(dbPath, JSON.stringify({ users: [], courses: [], quizzes: [] }, null, 2));
  }
}

async function readSeedFile() {
  await ensureDbFile();
  const raw = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(raw);
}

async function ensureMongoSeed(db) {
  const hasCourses = await db.collection('courses').estimatedDocumentCount();
  const hasQuizzes = await db.collection('quizzes').estimatedDocumentCount();
  const hasUsers = await db.collection('users').estimatedDocumentCount();

  if (hasCourses && hasQuizzes && hasUsers) return;

  const seed = await readSeedFile();
  if (!hasUsers && seed.users?.length) await db.collection('users').insertMany(seed.users);
  if (!hasCourses && seed.courses?.length) await db.collection('courses').insertMany(seed.courses);
  if (!hasQuizzes && seed.quizzes?.length) await db.collection('quizzes').insertMany(seed.quizzes);
}

export async function readDb() {
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

  await ensureDbFile();
  const raw = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(raw);
}

export async function writeDb(data) {
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

  await ensureDbFile();
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  return data;
}

export function json(data, init = {}) {
  return Response.json(data, init);
}
