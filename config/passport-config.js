const User = require('../models/User')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done) {
            User.findOne({ email: email}, (err, user) => {
                if(err)
                    return done(err)
                
                if(!user)
                    return done(null,false, { message: 'Incorrect Email.'})
                
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err)
                        throw new Error('Errorrr')
                    
                    if(isMatch) {
                        return done(null,user)
                    } else {
                        return done(null, false, { message: 'Incorrect password!'})
                    }
                })
            })
        }
    ))
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
}