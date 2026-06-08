import mongoose from 'mongoose';

const swipeSchema = new mongoose.Schema(
  {
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true
    },
    action: {
      type: String,
      enum: ['like', 'pass'],
      required: true
    }
  },
  { timestamps: true }
);

export const Swipe = mongoose.model('Swipe', swipeSchema);
