const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

// import user
const User = require('../models/user');

// /authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    async function(req,email, password, done){

        try {
            // Let find  the user and establish the identiy
            let user = await User.findOne({email: email});
            console.log(user);

            if(!user || user.password !== password){

                console.log('Invalid password');
                return done(null, false);
            }

            return done(null,user);
        } catch (error) {
            console.log(error,'something is wrong');
            return done(error)
        }

        
        
    }
));

// Serializig the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//  Deserialize the user from the key in the cookies
passport.deserializeUser(async function(id,done){
    try {
        let user = await User.findById(id);
        if(!user){
            return done(null,false);
        }
        return done(null,user);
        

    } catch (error) {
        console.log('Error in finding the user in DB');
        return done(error);
    }
});

// Check user authenticated
passport.checkAuthentication = function(req,res){
    // if user authenticated 
    if(req.isAuthenticated()){
        console.log("user is authntenticated");
        return next();
    }
    return res.redirect('/user/login');
}

passport.setAuthenticatedUser =  function(req,res,next){
    if(req.isAuthenticated()){

        res.locals.user = req.user;
    }
    next();
}

module.exports =passport;

