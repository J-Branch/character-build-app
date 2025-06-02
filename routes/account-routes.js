const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const path = require('path');
const router = express.Router();

// middleware to protect routes 
function requireLogin(req, res, next) {
    if(!req.session.userId) {
        return res.status(401).json({ message: "not authorized" });
    }
    next();
}

// route for when a user wants to logout
router.post('/logout', async (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.error(err);
            return res.status(500).json({ message: "Logout failed" });
        }

        res.clearCookie('connect.sid');
        res.redirect('/index.html');
    });
});

// route for when the user makes an account
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try{
        const exists = await User.findOne({ username });
        if(exists) {
            return res.status(400).json({ message: "username already taken" });
        }

        
        const hashedP = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedP});
        await newUser.save();

        // res.status(201).json({ message: "User registered successfully" });
        res.redirect('/')
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Server error"} );
    }
});

// route for when the user wants to login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        req.session.userId = user._id;
        // res.status(200).json({ message: "Login successful" });
        res.sendFile(path.join(__dirname, '../public/my-builds.html'));
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "server error" });
    }
});

// route for checking to see if a user is logged in
router.get('/check-auth', (req, res) => {
    if(req.session.userId) {
        res.json({ loggedIn: true, userId: req.session.userId });
    } else {
        res.json({ loggedIn: false });
    }
});

// route for if the user is currently logged in(EX. to look at my builds)
router.get('/profile', requireLogin, (req, res) => {
    res.status(200).json({ message: "welcome to your builds" });
});

module.exports = router;