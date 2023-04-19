const express= require('express');

const authController = require('./../controller/authController');
const userController = require('./../controller/userController');

const router = express.Router();

router.post('/signUp', authController.signUp);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword',authController.updatePassword);

router.route('/me')
.get(userController.getMe,userController.getUser)
.patch(userController.uploadUserPhoto,
       userController.resizeUserPhoto,
       userController.updateMe
)
.delete(userController.deleteMe);

//Admin routes
router.use(authController.restrictTo('admin'));

router.route('/')
.get( userController.getAllUsers);

router.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router;