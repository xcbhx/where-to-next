const Destination = require('../models/destination');
const Profile = require('..models/profile');


module.exports = {
    index,
    show,
    new: newDestination,
    create
};

function index(req, res) {
    Destination.find({}, function (err, destinations) {
        res.render('destinations/index', { title: 'All Destinations', destinations });
    });
}

function show(req, res) {
    Destination.findById(req.params.id),
        function (err, destination) {
            Destination.find({ destination: destination._id },
                function (err, profiles) {
                    console.log(profiles);
                    res.render('destinations/show', {
                        title: 'Destinations Page',
                        destination,
                        profiles
                    });
                });
        }
}

function newDestination(req, res) {
    res.render('destinations/new', { title: 'Add Destination' });
}

function create(req, res) {
    const destination = new Destination(req.body);
    destination.save(function (err) {
        if (err) return res.redirect('/destinations/new');
        res.redirect(`/destinations/${destination._id}`);
    });
}