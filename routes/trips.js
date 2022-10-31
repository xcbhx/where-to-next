const express = require('express');
const router = express.Router();
const tripsCtrl = require('../controllers/trips');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// This router is mounted to a "starts with" path of '/'

// GET /trips/new
router.get('/trips/new', ensureLoggedIn, tripsCtrl.new);
// POST /trips
router.post('/trips', ensureLoggedIn, tripsCtrl.create);
// POST /destinations/:id/trips (assoc destination & trip)
router.post('/destinations/:id/trips', ensureLoggedIn, tripsCtrl.addToTrip);

module.exports = router;