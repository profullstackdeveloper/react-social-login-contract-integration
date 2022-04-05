const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    verifyCode: String,
    wallet: String,
});


mongoose.model('User', userSchema);