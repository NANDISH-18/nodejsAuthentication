const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Create new user in database
router.post('/signup',userController.signUp);

// rendering the sign up page 
router.get('/', userController.signUpPage);


module.exports = router;