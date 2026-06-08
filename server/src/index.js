import 'dotenv/config';
import { createApp } from './app.js';
import { connectDb } from './config/db.js';

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dating_app';

async function start() {
  await connectDb(mongoUri);
  const app = createApp();

  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
