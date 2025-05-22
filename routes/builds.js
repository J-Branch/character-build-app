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
  const { characterName, act} = req.query;
  const filter = {};

  if(characterName) filter.characterName = characterName;
  if(act) filter.Act = Number(act);

  try{
    const builds = await Build.find(filter);
    res.json(builds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
