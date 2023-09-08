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

//Login -> create new session for user
router.post('/signin',passport.authenticate('local',{failureRedirect: '/login'}),userController.signIn);

module.exports = router;