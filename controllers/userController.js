const User = require('../models/user')

// Signp page
module.exports.signUpPage = function(req,res){

    res.render('signUp',{
        title: 'Sign Up'
    })
}

// Sign up functionality
module.exports.signUp = async (req,res) => {
    
        const {name , email, password, confirm_password} = req.body;

        // Check password and confirm password is match or not
        if(password != confirm_password){

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
        return res.redirect('/');

    
}
