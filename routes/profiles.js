const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controllers/profiles');
const ensureLoggedIn = require('../config/ensureLoggedIn');

//GET /profiles/new
router.get('/profiles/new', ensureLoggedIn, profilesCtrl.new);
//GET /profiles
router.post('/profiles', ensureLoggedIn, profilesCtrl.create);
// POST /destinations/:id/profiles (assoc destination & profile)
router.post('/destinations/:id/profiles', ensureLoggedIn, profilesCtrl.addToUser);

module.exports = router;
