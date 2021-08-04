module.exports = {
    loggedInAdmin : (req, res, next) => {
        if(req.session && req.session.adminId) {
            next();
        } else {
            res.redirect('/admin/login')
        }
    }
}