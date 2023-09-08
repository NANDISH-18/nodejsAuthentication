const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "somethigapp"
}

passport.use(new jwtStrategy(opts, function(jwt_payload,done){
    User.findOne({email: jwt_payload.email},function(err,user){
        if(err){
            return done(err,false);
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }

    })
}))
