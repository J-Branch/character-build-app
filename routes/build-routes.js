const express = require('express');
const router = express.Router();

// this is the schema so it will know how the data is supposed to be organized
const Build = require('../models/build');

// middleware to protect routes
function requiredLogin(req, res, next) {
  if(!req.session.userId) {
    return res.status(401).json({ message: "not authorized" });
  }
  next();
}

// logic for when a user posts a new build
router.post('/user', requiredLogin, async (req, res) => {
  try {
    const newBuild = new Build({
      ...req.body,
      userId: req.session.userId
    });s
    const saveBuild = await newBuild.save();
    res.status(201).json(saveBuild);
  } catch (err) {
    res.status(400).json({ error: err.message});
  }
});

// get builds from public builds
router.get('/', async (req, res) => {
  const { characterName, act} = req.query;
  const filter = { userId: null };

  if(characterName) filter.characterName = characterName;
  if(act) filter.Act = Number(act);

  try{
    const builds = await Build.find(filter);
    res.json(builds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get builds from logged in user builds
router.get('/user', requiredLogin, async (req, res) => {
  try{
    const userBuilds = await Build.find({ userId: req.session.userId });
    res.json(userBuilds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete build by owned user 
router.delete('user/:id', requiredLogin, async (req, res) => {
  try {
    const deleted = await Build.findOneAndDelete({
      _id: req.params.id,
      userId: req.session.userId
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Build not found or not authorized.' });
    }

    res.json({ message: 'Build deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
