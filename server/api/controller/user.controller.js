const nodemailer = require('nodemailer');
require('dotenv').config();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const companyMailAddress = process.env.COMPANY_MAIL;
const companyMailPassword = process.env.COMPANY_MAIL_PASSWORD;

//verify Email-----REUQEST TYPE!!!!!------------
// {
//     from: 'Andris <andris@kreata.ee>',
//     // Comma separated list of recipients
//     to: 'Andris Reinman <andris.reinman@gmail.com>',
//     bcc: 'andris@ethereal.email',
//     // Subject of the message
//     subject: 'Nodemailer is unicode friendly ✔',
//     // plaintext body
//     text: 'Hello to myself!',
//     // HTML body
//     html:
//         '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
//         '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',
//     // An array of attachments
//     attachments: [
//         // String attachment
//         {
//             filename: 'notes.txt',
//             content: 'Some notes about this e-mail',
//             contentType: 'text/plain' // optional, would be detected from the filename
//         },
//         // Binary Buffer attachment
//         {
//             filename: 'image.png',
//             content: Buffer.from(
//                 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
//                     '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
//                     'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
//                 'base64'
//             ),
//             cid: 'note@example.com' // should be as unique as possible
//         },
//         // File Stream attachment
//         {
//             filename: 'nyan cat ✔.gif',
//             path: __dirname + '/assets/nyan.gif',
//             cid: 'nyan@example.com' // should be as unique as possible
//         }
//     ]
// };

const createAccount = (req, res, responseMessage="") => {
    User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        wallet: req.body.wallet
    }).then((newUser, err) => {
        if (err) {
            console.log("Error occurred while creating user!", err);
            res.status(404).json('Error occurred while creating user!');
        } else {
            console.log("user created!");
            newUser.save();
            res.status(200).json({ newUser, responseMessage });
        }
    })
}

const signUpWithEmail = (req, res) => {
    const salt = process.env.SALT || 'salt';
    const provider = req.body.provider;
    const verifyCode = req.body.verifyCode;
    const message = {
        from: companyMailAddress,
        to: req.body.email,
        text: 'Please check your mail box and click the link.',
        html: '<p>Hello!</p>' + `<p>Click <a href="http://localhost:3001/verification/${verifyCode}">here</a> to complete verification.</p>`,
    }
    var smtpTransport = nodemailer.createTransport({
        service: provider,
        auth: {
            user: companyMailAddress,
            pass: companyMailPassword
        }
    });
    User
    .findOne({email: req.body.email})
    .then((user, err) => {
        if (err) {
            res.status(404).json('Error occurred in finding user');
            return;
        }
        if (user) {
            res.status(201).json({ message: 'Already registered', user });
            return;
        }
        else {
            smtpTransport.sendMail(message).then((response, err) => {
                if (!response) {
                    res.status(503).json('Verification Error!')
                } else {
                    createAccount(req, res, response);
                }
            })
        }
    })
}

const signUpWithGoogle = (req, res) => {
    User.findOne({email: req.body.email})
    .then((user, err) => {
        if(err) {
            console.log('Error occurred in finding user', err, user);
            res.status(404).json('Error occurred in finding user!');
            return ;
        }
        else {
            if(user) {
                res.status(201).json({message: 'Already registered', user});
                return ;
            }
            else {
                createAccount(req, res);
            }
        }
    })
}

const signIn = (req, res) => {
    User
    .findOne({email: req.body.email})
    .then((user, err) => {
        if(err) {
            console.log("Error occurred while finding user", err);
            res.status(500).json('Server has problems with this request.');
            return;
        }
        if(user) {
            console.log("user found!")
            res.status(200).json({message: 'success', user});
        } else {
            console.log('user is not found', user)
            res.status(404).json({message: 'Cannot find user. Please sign up.'});
        }
    })
}

module.exports = {
    signUpWithEmail,
    signUpWithGoogle,
    signIn
}