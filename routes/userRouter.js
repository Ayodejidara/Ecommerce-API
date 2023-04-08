const express= require('express');

const authController = require('./../controller/authController');
const userController = require('./../controller/userController');

const router = express.Router();

router.post('/signUp',authController.signUp);
router.post('/login',authController.login);

router.route('/')
.get(authController.protect,userController.getAllUsers)

module.exports = router;