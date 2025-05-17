// import the modules needed
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// loads enviormenr variables from .env
// dotenv.config();

// initialize the express app
const app = express();

// middleware to parse JSON request bodies
app.use(express.json());

// static files that are from public/
app.use(express.static(path.join(__dirname, 'public')));

// set up routes
const buildRoutes = require('./routes/builds');
app.use('/api/builds', buildRoutes);

module.exports = app;