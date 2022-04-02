const nodemailer = require('nodemailer');
require('dotenv').config();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const companyMailAddress = process.env.COMPANY_MAIL;

const createNewUser = (req, res) => {
    User
    .findOne({email: req.body.email})
    .then((err, user) => {
        if(err) {
            return;
        }
        else if(user) {
            res.json(user);
        }
        else {
            User.create({
                fullName: res.body.fullName,
                email: res.body.email,
                password: res.body.password
            }).then((data) => {
                res.json(data);
            })
        }
    })
}

const verifyEmail = (req, res) => {
    
}