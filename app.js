// ================ Imports ====================
const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();
// =============== App Setup ===================
const app = express();

// ===================== Middleware =============
// parse any incoming json
app.use(express.json());

// parse any from submitions
app.use(express.urlencoded({ extended: true}))

// static files that are from public/
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// =================== Routes =====================
const buildRoutes = require('./routes/build-routes');
app.use('/api/builds', buildRoutes);

const accountRoutes = require('./routes/account-routes');
app.use('/accounts', accountRoutes);

// ================= Export App =================
module.exports = app;