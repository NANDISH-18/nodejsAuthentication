const express = require('express');
const port = 8000;

const db = require('./config/mongoose');

const app = express();

const passport = require('passport');
const LocalStrategy = require('./config/passport_local_strategy');

const session = require('express-session');


// EJS
app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');

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



app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log(`Server is running on port ${port}`);
})