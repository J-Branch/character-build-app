const mongoose = require('mongoose');

// this file will be a schema on how a character build will be stored
const buildSchema = new mongoose.Schema({
    characterName: {type: String, required: true},
    Act: {type: Number, required: true},
    buildName: {type: String, required: true}, 
    skills: [String], // array for the skills
    weapon:{type: String, required: true}, // weapon name 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null } // added for when a user is logged in or not, to fetch their builds
});

const build = mongoose.model('Build',buildSchema);

module.exports = build;