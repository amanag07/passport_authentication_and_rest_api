const express = require('express')
const User = require('../models/User')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { forwardAuthentication, checkAuthentication } = require('../config/auth') 

router.get('/', forwardAuthentication, (req, res) => res.render('welcome'));

router.get('/login', forwardAuthentication, (req,res) => {
    res.render('login')
})

router.get('/register', forwardAuthentication, (req,res) => {
    res.render('register')
})

router.get('/logout', (req,res) => {
    req.logout()
    req.flash('log_out', 'You have been logged out')
    res.redirect('/login')
})

router.post('/login',
  passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);


router.post('/register',async (req,res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const email = await User.findOne({ email: req.body.email})
        if(email) {
            req.flash('email_exist', 'Email is already registered!')
            return res.status(500).redirect('/register')
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        user.password = hashedPassword
        user.save()
        req.flash('success', 'Successfully Registered!');
        res.redirect('/login')
    } catch(e) {
        res.status(500).send('Error: Cannot register user!')
    }
})

router.get('/dashboard', checkAuthentication, (req,res) => {
    res.render('dashboard', {
        user: req.user
    })
})

module.exports = router