const express = require('express');
const port = 8000;

const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

const app = express();

const passport = require('passport');
const LocalStrategy = require('./config/passport_local_strategy');
const googleStrategy = require('./config/passport-google.oauth2-strategy');

const session = require('express-session');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

// EJS
app.use(expressLayouts);
app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');
// Extract the style
app.set('layout extractStyles',true);
app.set('layout extractScript',true);

app.use(express.urlencoded());

// session
app.use(session({
    name:"authenticationapp",
    secret: 'somenthing',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    }
}))

// Use passport
app.use(passport.initialize());
app.use(passport.session())
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setflash);



app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log(`Server is running on port ${port}`);
})