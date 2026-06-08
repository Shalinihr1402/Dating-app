import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { profilesRouter } from './routes/profiles.js';
import { swipesRouter } from './routes/swipes.js';

export function createApp() {
  const app = express();
  const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

  app.use(cors({ origin: clientOrigin }));
  app.use(express.json());
  app.use(morgan('dev'));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'dating-app-api' });
  });

  app.use('/api/profiles', profilesRouter);
  app.use('/api/swipes', swipesRouter);

  app.use((req, res) => {
    res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
  });

  app.use((error, _req, res, _next) => {
    const status = error.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ message: error.message || 'Server error' });
  });

  return app;
}
