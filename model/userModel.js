const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true,'Enter your First Name'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true,'Enter your Last Name'],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Enter your Email'],
        validate: {
            validator: validator.isEmail,
            message: 'Enter a valid email address'
        }
    },
    password: {
        type: String,
        required: [true, 'Enter a password'],
        minlength: 6,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Confirm your password'],
        minlength: 6,
        validate:{
            validator: function(el) {
                return el === this.password
            },
            message: 'Passwords are not the same!'
        }
    },
    photo: String,
    role: {
        type: String,
        enum: ['customer','vendor'],
        default: 'customer'
    },
    passwordChangedAt: Date
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) next();
   
  this.password = await bcrypt.hash(this.password,12);
  this.passwordConfirm = undefined;

  next()
});

userSchema.pre('save',function(next){
    if(!this.isModified('password') || this.isNew) return next();
 
    this.passwordChangedAt = Date.now() - 1000;
    next();
    });

userSchema.methods.comparePassword = async function(
    candidatePassword,
    userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = 
function(JWTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() /1000,10);

        return JWTimestamp < changedTimestamp;
    } ;
       return false
};

module.exports = mongoose.model('User',userSchema)