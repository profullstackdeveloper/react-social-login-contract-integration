var express = require('express');
var router = express.Router();
const userController = require('../controller/user.controller');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/googleSignUp', userController.signUpWithGoogle);
router.post('/emailSignUp', userController.signUpWithEmail);
router.post('/signIn', userController.signIn);

module.exports = router;
