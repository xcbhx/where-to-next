const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');


// POST /destinations/:id/reviews
router.post('/destinations/:id/reviews', ensureLoggedIn, reviewsCtrl.create);
// DETELE /reviews/:id
router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete);

module.exports = router;