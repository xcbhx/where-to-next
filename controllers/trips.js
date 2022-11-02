const Destination = require('../models/destination');
const Trip = require('../models/trip');

module.exports = {
    new: newTrip,
    create,
    addToTrip,
    delete: deleteTrip
};

function deleteTrip(req, res, next) {
    Destination.findOne({
      'reviews._id': req.params.id,
      'reviews.user': req.user._id
    }).then(function (destination) {
      if (!destination) return res.redirect('/destinations');
      destination.trips.remove(req.params.id);
      destination.save().then(function () {
        res.redirect(`/destinations/${destination._id}`);
      }).catch(function (err) {
        return next(err);
      });
    });
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

