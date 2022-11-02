const Destination = require('../models/destination');



module.exports = {
    index,
    show,
    new: newDestination,
    create,
    update,
    delete: deleteDestination
};

function index(req, res) {
    Destination.find({ userId: req.user._id }, function (err, destinations) {
        res.render('destinations/index', { title: 'All Destinations', destinations });
    });
}

function show(req, res) {
    console.log('show', req.params.id);
    Destination.findById(req.params.id, function (err, destination) {
        console.log(destination, err);
        res.render('destinations/show', {
            title: 'Destinations Page',
            destination,
        });
    });
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

function update(req, res) {
    Destination.findOneAndUpdate(
        {_id: req.params.id, userRecommending: req.user._id},
        req.body,
        {new: true},
        function(err, destination) {
            if (err || !destination) return res.redirect('/destinations');
            res.redirect(`/destinations/${destination._id}`);
        }
    );
}

function deleteDestination(req, res) {
    Destination.findOneAndDelete(
        {_id: req.params.Id, userRecommending: req.user._id}, function(err) {
        res.redirect('/destinations');
        }
    );
}