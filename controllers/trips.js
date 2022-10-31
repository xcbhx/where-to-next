const Destination = require('../models/destination');
const Trip = require('../models/trip');

module.exports = {
    new: newTrip,
    create,
    addToTrip
}

function addToTrip(req, res) {
    Destination.findById(req.params.id, function (err, destination) {
        destination.user.push(req.body.tripId);
        destination.save(function (err) {
            res.redirect('/destinations/${destination._id}');
        });
    });
}


function create(req, res) {
    req.body.user = req.user._id;
    Trip.create(req.body, function (err, trip) {
        res.redirect('/trips/new');
    });
}


function newTrip(req, res) {
    Trip.find({})
        .sort('userId')
        .exec(function (err, trips) {
            res.render('trips/new', {
                title: 'Trip',
                trips
            });
        });
}