const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const passport = require('passport');

// Create new user in database
router.post('/signup',userController.signUp);

// rendering the sign up page 
router.get('/', userController.signUpPage);

// Rendering signin page
router.get('/login', userController.signInPage);

// Home page
router.get('/home',userController.homePage);

// logout
router.get('/logout',userController.logOut);

// reset password page
router.get('/reset',userController.resetPage);

// update password in database
router.post('/reset',userController.reset);

// google authentication route
router.get('/auth/google',passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect: '/login'}),userController.signIn);


//Login -> create new session for user
router.post('/signin',passport.authenticate('local',{failureRedirect: '/login'}),userController.signIn);



module.exports = router;