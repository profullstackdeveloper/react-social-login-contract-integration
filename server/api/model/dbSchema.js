const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    verifyCode: String
});

mongoose.model('User', userSchema);