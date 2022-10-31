const Destination = require('../models/destination');



module.exports = {
    index,
    show,
    new: newDestination,
    create
};

function index(req, res) {
    Destination.find({userId: req.user._id}, function (err, destinations) {
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
    req.body.userId = req.user._id;
    const destination = new Destination(req.body);
    destination.save(function (err) {
        if (err) return res.redirect('/destinations/new');
        res.redirect('/destinations');
    });
}