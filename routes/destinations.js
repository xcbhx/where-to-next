const express = require('express');
const router = express.Router();
const destinationsCtrl = require('../controllers/destinations');
const ensureLoggedIn = require('../config/ensureLoggedIn');


// All routes start with '/destinations'

// GET /destinations (display all destinations)
router.get('/', destinationsCtrl.index);
// GET /destinations(display a form for entering a new destination)
router.get('/new', ensureLoggedIn, destinationsCtrl.new);
// GET /destinations/:id (display a "detail/show" page for a single destination)
router.get('/:id', destinationsCtrl.show);
// POST /destinations (handle the new form being submitted)
router.post('/', ensureLoggedIn, destinationsCtrl.create);
// PUT /destinations/:id
router.put('/:id', ensureLoggedIn, destinationsCtrl.update);
//DELETE /destinations/:id
router.delete('/:id', ensureLoggedIn, destinationsCtrl.delete);


module.exports = router;