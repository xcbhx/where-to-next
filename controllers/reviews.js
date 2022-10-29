const Destination = require('../models/destination');

module.exports = {
    create,
    delete: deleteReview
  };
  
  function deleteReview(req, res, next) {
    Destination.findOne({
      'reviews._id': req.params.id,
      'reviews.user': req.user._id
    }).then(function(destination) {
      if (!destination) return res.redirect('/destinations');
      destination.reviews.remove(req.params.id);
      destination.save().then(function() {
        res.redirect(`/destinations/${destination._id}`);
      }).catch(function(err) {
        return next(err);
      });
    });
  }

function create(req, res) {
    Destination.findById(req.params.id, function(err, destination) {
      req.body.user = req.user._id;
      req.body.userName = req.user.name;
      req.body.userAvatar = req.user.avatar;
      
      destination.reviews.push(req.body);
      destination.save(function(err) {
        // Step 5: Respond with a redirect because we've mutated data
        res.redirect(`/destinations/${destination._id}`);
      });
    });
  }