var User = require('../models/user');

exports.postUsers = function(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    user.save(function(err) {
        if(err)
            res.send(err);
            
        res.json({ message: "New beer drinker added to the locker"});
    });
};

exports.getUsers = function(req, res) {
  User.find(function(err, users) {
      if(err)
        res.send(err);
        
    res.json(users);
  });
};

exports.getUser = (function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
            
        res.json(user);
    });
});

exports.deleteUser = (function(req, res) {
    User.findByIdAndRemove(req.params.user_id, function(err) {
        if(err)
            res.send(err);
        res.json({ message: "User removed from the locker" });
    });
});