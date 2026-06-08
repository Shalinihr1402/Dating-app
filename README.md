# Dating App with MERN

A simple dating app built with MongoDB, Express, React, and Node.js. The backend exposes profile and swipe endpoints, while the frontend shows a swipe-style profile deck using Material UI components and icons.

## Project Structure

```text
.
├── client   React + Vite frontend
└── server   Express + MongoDB API
```

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create backend environment file:

```bash
copy server\.env.example server\.env
```

Update `server\.env` with your MongoDB connection string.

3. Seed sample profiles:

```bash
npm run seed
```

4. Run both apps:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173` and the backend runs at `http://localhost:5000`.

## API Endpoints

- `GET /api/health`
- `GET /api/profiles`
- `GET /api/profiles/:id`
- `POST /api/profiles`
- `PATCH /api/profiles/:id`
- `DELETE /api/profiles/:id`
- `POST /api/swipes`
- `GET /api/swipes`
