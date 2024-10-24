import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
import schedule from 'node-schedule';

const router = express.Router();

// Get user profile
router.get('/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// Update user profile
router.post('/updateProfile', auth, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Prevent password update through this route

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Schedule email if emailTriggerTime is provided
    if (updates.emailTriggerTime) {
      const [hours, minutes] = updates.emailTriggerTime.split(':');
      const rule = new schedule.RecurrenceRule();
      rule.hour = parseInt(hours);
      rule.minute = parseInt(minutes);

      schedule.scheduleJob(rule, async () => {
        // Here you would implement your email sending logic
        console.log(`Sending scheduled email to ${user.email}`);
      });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Update user preferences
router.post('/updatePreferences', auth, async (req, res) => {
  try {
    const { interests, religion, profession, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          interests,
          religion,
          profession,
          preferences
        }
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating preferences', error: error.message });
  }
});

export default router;