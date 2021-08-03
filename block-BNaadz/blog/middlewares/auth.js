var User = require('../models/user-model');
var Article = require('../models/article-model');

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
    },

    userAllow : (req, res, next) => {
        console.log("hello middleware userAllow")
        console.log(req.params)
        var slug = req.params.slug;
        console.log(slug)
        Article.findOne({slug}).populate('author', 'firstName lastName email').exec((err, article) => {
            if(err) return next(err);
            if(req.session.userId === article.author.id) {
                next();
            } else {
                res.redirect('/articles/' + slug);
            }
        })
    }
}