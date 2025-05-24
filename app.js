// ================ Imports ====================
const express = require('express');
const path = require('path');


// =============== App Setup ===================
const app = express();

// ===================== Middleware =============
// parse any incoming json
app.use(express.json());

// static files that are from public/
app.use(express.static(path.join(__dirname, 'public')));

// =================== Routes =====================
const buildRoutes = require('./routes/build-routes');
app.use('/api/builds', buildRoutes);

// ================= Export App =================
module.exports = app;