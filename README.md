Dating App (MERN Stack)

A simple dating app built using MongoDB, Express.js, React, and Node.js. Users can browse profiles and swipe to like or pass.

Features

- View user profiles
- Swipe left or right
- Store swipe history
- REST API with MongoDB

Project Structure

.
├── client   # React + Vite frontend
└── server   # Express + MongoDB backend

Installation

npm run install:all

Environment Setup

Create a ".env" file inside the "server" folder and add your MongoDB connection string.

MONGO_URI=your_mongodb_connection_string

Seed Sample Data

npm run seed

Run the Application

npm run dev

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

API Routes

Profiles

- "GET /api/profiles"
- "GET /api/profiles/:id"
- "POST /api/profiles"
- "PATCH /api/profiles/:id"
- "DELETE /api/profiles/:id"

Swipes

- "POST /api/swipes"
- "GET /api/swipes"

Health Check

- "GET /api/health"
