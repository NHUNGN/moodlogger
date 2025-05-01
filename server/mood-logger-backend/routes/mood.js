const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');

// POST /api/moods/addMood
router.post('/addMood', async (req, res) => {
  const { mood, note, date } = req.body;
  console.log('Incoming date (POST):', date);

  if (!mood || !date) {
    return res.status(400).json({ message: 'Mood and date are required.' });
  }

  try {
    const [entry, created] = await Mood.findOrCreate({
      where: { date },
      defaults: { mood, note }
    });

    if (!created) {
      return res.status(400).json({ message: 'Mood already exists for this date.' });
    }

    console.log('📥 Mood logged:', { mood, note, date });
    res.status(201).json({ message: 'Mood logged successfully!' });
  } catch (err) {
    console.error('❌ Error logging mood:', err);
    res.status(500).json({ message: 'Failed to log mood.' });
  }
});

// GET /api/moods/by-date?date=YYYY-MM-DD
router.get('/by-date', async (req, res) => {
  const { date } = req.query;
  console.log('Incoming date (GET):', date);

  if (!date) {
    return res.status(400).json({ message: 'Date is required.' });
  }

  try {
    const moodEntry = await Mood.findOne({ where: { date } });

    if (!moodEntry) {
      return res.status(404).json(null); // No entry
    }

    res.json({
      mood: moodEntry.mood,
      note: moodEntry.note,
      date: moodEntry.date,
    });
  } catch (err) {
    console.error('❌ Error fetching mood:', err);
    res.status(500).json({ message: 'Failed to fetch mood.' });
  }
});

// PUT /api/moods/update
router.put('/update', async (req, res) => {
  const { mood, note, date } = req.body;
  console.log('Incoming date (PUT):', date);

  if (!mood || !date) {
    return res.status(400).json({ message: 'Mood and date are required.' });
  }

  try {
    const [updatedRows] = await Mood.update({ mood, note }, { where: { date } });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'No mood found to update.' });
    }

    res.json({ message: 'Mood updated successfully.' });
  } catch (err) {
    console.error('❌ Error updating mood:', err);
    res.status(500).json({ message: 'Failed to update mood.' });
  }
});

// DELETE /api/moods/delete?date=YYYY-MM-DD
router.delete('/delete', async (req, res) => {
  const { date } = req.query;
  console.log('Incoming date (DELETE):', date);

  if (!date) {
    return res.status(400).json({ message: 'Date is required.' });
  }

  try {
    const deletedRows = await Mood.destroy({ where: { date } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'No mood found to delete.' });
    }

    res.json({ message: 'Mood deleted successfully.' });
  } catch (err) {
    console.error('❌ Error deleting mood:', err);
    res.status(500).json({ message: 'Failed to delete mood.' });
  }
});

module.exports = router;
