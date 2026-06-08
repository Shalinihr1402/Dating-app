import { Router } from 'express';
import { Profile } from '../models/Profile.js';

export const profilesRouter = Router();

profilesRouter.get('/', async (_req, res, next) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.json(profiles);
  } catch (error) {
    next(error);
  }
});

profilesRouter.get('/:id', async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
});

profilesRouter.post('/', async (req, res, next) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    next(error);
  }
});

profilesRouter.patch('/:id', async (req, res, next) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
});

profilesRouter.delete('/:id', async (req, res, next) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
