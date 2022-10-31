const Profile = require('../models/profile');
const Destination = require('../models/destination');

module.exports = {
    new: newProfile,
    create,
    addToUser
}

function addToUser(req, res) {
    Destination.findById(req.params.id, function (err, destination) {
        destination.user.push(req.body.profileId);
        destination.save(function (err) {
            res.redirect('/destinations/${destination._id}');
        });
    });
}


function create(req, res) {
    const profile = req.body;
    profile.destination = req.params.id;
    Profile.create(profile, function (err, profile) {
        res.redirect('/destinations/${req.params.id}');
    });
}


function newProfile(req, res) {
    Profile.find({})
        .sort('user')
        .exec(function (err, profiles) {
            res.render('profiles/new', {
                title: 'Profile',
                profiles
            });
        });
}