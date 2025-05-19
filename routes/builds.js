const express = require('express');
const router = express.Router();

const Build = require('../models/build');

router.post('/', async (req, res) => {
  try {
    const newBuild = new Build(req.body);
    const saveBuild = await newBuild.save();
    res.status(201).json(saveBuild);
  } catch (err) {
    res.status(400).json({ error: err.message});
  }
});

router.get('/', async (req, res) => {
  try {
    const builds = await Build.find();
    res.json(builds);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
});

router.get('/', (req, res) => {
  res.json({ message: 'Build routes working!' });
});

module.exports = router;
