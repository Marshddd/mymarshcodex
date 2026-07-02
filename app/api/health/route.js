import { MongoClient } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  const mongoUri = process.env.MONGODB_URI;
  const mongoDb = process.env.MONGODB_DB || 'backend_mastery';

  if (!mongoUri) {
    return Response.json({
      ok: true,
      service: 'backend-mastery-next',
      storage: 'in-memory',
      mongo: false,
      reason: 'MONGODB_URI not set'
    });
  }

  // ทดสอบ connect MongoDB จริงๆ
  try {
    const client = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    const db = client.db(mongoDb);
    const userCount = await db.collection('users').countDocuments();
    await client.close();

    return Response.json({
      ok: true,
      service: 'backend-mastery-next',
      storage: 'mongodb',
      mongo: true,
      database: mongoDb,
      userCount
    });
  } catch (err) {
    return Response.json({
      ok: true,
      service: 'backend-mastery-next',
      storage: 'in-memory (mongodb failed)',
      mongo: false,
      error: err.message
    });
  }
}
