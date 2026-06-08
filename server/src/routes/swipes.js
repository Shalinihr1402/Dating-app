import { Router } from 'express';
import { Swipe } from '../models/Swipe.js';

export const swipesRouter = Router();

swipesRouter.get('/', async (_req, res, next) => {
  try {
    const swipes = await Swipe.find().populate('profile').sort({ createdAt: -1 });
    res.json(swipes);
  } catch (error) {
    next(error);
  }
});

swipesRouter.post('/', async (req, res, next) => {
  try {
    const swipe = await Swipe.create(req.body);
    const populatedSwipe = await swipe.populate('profile');
    res.status(201).json(populatedSwipe);
  } catch (error) {
    next(error);
  }
});
