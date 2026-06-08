import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 100
    },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    bio: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280
    },
    interests: {
      type: [String],
      default: []
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const Profile = mongoose.model('Profile', profileSchema);
