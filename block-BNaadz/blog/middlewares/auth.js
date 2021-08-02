var User = require('../models/user-model');

module.exports = {
    loggedInUser : (req, res, next) => {
        if(req.session && req.session.userId) {
            next();
        } else {
            res.redirect('/users/login');
        }
    },

    userInfo : (req, res, next) => {
        var userId = req.session && req.session.userId;
        if(userId) {
            User.findById(userId, "firstName lastName email", (err, user) => {
                if(err) return next(err);
                req.user = user;
                res.locals.user = user;
                next() 
            })
        } else {
            req.user = null;
            res.locals.user = null;
            next();
        }
    }
}