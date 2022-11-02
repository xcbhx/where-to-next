var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'WHERE TO NEXT?' });
});


router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    scope: ['profile', 'email'],
    // Optional
    prompt: 'select_account'
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/destinations',
    // Change to what's best for YOUR app
    failureRedirect: '/destinations'
  }
));

router.get('/logout', function (req, res) {
  req.logout(function () {
    // Change path for your "landing" page
    res.redirect('/index');
  });
});

module.exports = router;