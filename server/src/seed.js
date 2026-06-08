import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDb } from './config/db.js';
import { Profile } from './models/Profile.js';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dating_app';

const profiles = [
  {
    name: 'Aisha',
    age: 24,
    location: 'Bengaluru',
    bio: 'Weekend baker, design student, and sunrise walk enthusiast.',
    interests: ['Coffee', 'Art', 'Travel'],
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    verified: true
  },
  {
    name: 'Rohan',
    age: 27,
    location: 'Mumbai',
    bio: 'Product engineer who likes live music, coastal drives, and spicy food.',
    interests: ['Music', 'Startups', 'Food'],
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    verified: false
  },
  {
    name: 'Maya',
    age: 25,
    location: 'Pune',
    bio: 'Book collector, amateur photographer, and always hunting for better chai.',
    interests: ['Books', 'Photography', 'Chai'],
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80',
    verified: true
  }
  {
    name:'Shalini H R',
    age:26,
    location:'Banglore',
    bio:'Software Engineer,foodie,traveler and music lover',
    intrests:['Web Development','Dancing','Singing'],
    imageUrl:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    verified:true
  }
];

async function seed() {
  await connectDb(mongoUri);
  await Profile.deleteMany({});
  await Profile.insertMany(profiles);
  await mongoose.connection.close();
  console.log('Seeded profiles');
}

seed().catch(async (error) => {
  console.error('Seed failed:', error.message);
  await mongoose.connection.close();
  process.exit(1);
});
