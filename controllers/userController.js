const User = require('../models/user')

// Signp page
module.exports.signUpPage = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('signUp',{
        title: 'Sign Up'
    })
}

// Sign up functionality
module.exports.signUp = async (req,res) => {
    
        const {name , email, password, confirm_password} = req.body;

        // Check password and confirm password is match or not
        if(password != confirm_password){
            req.flash('error','password does not match')
            return res.redirect('/');
        }
        // Check if user is exist already in database
        const existUser = await User.findOne({email: email});

        if(existUser){

            console.log("User exist already");
            return res.redirect('/')
        }

        const user = await User.create({
            name: name,
            email: email,
            password: password
        });
        req.flash('success','Register successfully');
        return res.redirect('/login');

    
}

// Sign in page
module.exports.signInPage = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    res.render('signIn',{
        title: 'Sign In'
    })
}

// Sign in functionality
module.exports.signIn = (req,res)=>{
    req.flash('success','User logged in successfully');
    console.log("User is logged in successfully");
    return res.redirect('/home');
}


// Home page
module.exports.homePage = function(req,res){
    if(req.isAuthenticated()){
        return res.render('home',{
            title: 'home'
        })
    }
    return res.redirect('/login')
}

// Logout
module.exports.logOut = function(req,res,next){
    req.logout(function(error){
        if(error){
            return next(error);
        }
        req.flash('success','You have logged out');
        res.redirect('/login');
    })
}

// reset password page
module.exports.resetPage = function(req,res){
    return res.render('resetPassword',{
        title: 'Reset Password'
    })
}

// Reset password functionality
module.exports.reset = async (req,res)=> {
    const {email, oldpassword, newpassword} = req.body;
    
    const user = await User.findOne({email: email});
    if(!user){
        req.flash('error','user does not exist');
        console.log('user not exist');
        return res.redirect('/');
    }
    // Check password exist in database or not
    if(user.password !== oldpassword){
        req.flash('error','Current password does not match');
        console.log('current password does not match');
        return res.redirect('/');
    }
    user.password = newpassword;
    user.save();
    req.flash('success','Password updated successfully');
    console.log('Password updated successfully')
    res.redirect('/login');
}
