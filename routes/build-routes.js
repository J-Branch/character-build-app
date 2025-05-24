const express = require('express');
const router = express.Router();

// this is the schema so it will know how the data is supposed to be organized
const Build = require('../models/build');

// logic for when a user posts a new build
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
