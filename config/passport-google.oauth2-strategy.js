const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: '546999924528-n89k3ikpudqq5d769blrjc0756pqtdt3.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/auth/google/callback'
},
    async function(request, accessToken, refreseToken, profile, done){
        try {
            const user = await User.findOne({email: profile.emails[0].value});
            if(user){
                return done(null,user);

            }
            if(!user){
                // If not found, we have to create and set it as req.user
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                })
                if(newUser){
                    return done(null,newUser);
                }
            }

        } catch (error) {
            console.log('error in google strategy passport',error);
        }
    }
))



