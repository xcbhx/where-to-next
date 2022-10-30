const destination = require('../models/destination');
const Destination = require('../models/destination');


module.exports = {
index,
show,
new: newDestination,
create
};

function index(req, res) {
    Destination.find({}, function(err, destinations) {
        res.render('destinations/index', { title: 'All Destinations', destinations});
    });
}

function show(req, res) {
    Destination.findById(req.params.id),
    function(err, destination) {
    Destination.find({ destination: destination._id },
        function(err, profiles) {
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
    res.render('destination/new', { title: 'Add Destination' });
}

function create(req, res) {
    console.log(req.body);
    const destination = new destination(req.body);
    destination.save(function(err) {
        if (err) return res.redirect('/destinations/new');
        console.log(destination);
        res.redirect(`/destinations/${destination._id}`);
    });
}