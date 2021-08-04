var express = require('express');
var User = require('../models/admin-model');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var email = req.session.email;
  User.findOne({email},(err,admin)=>{
    var fullname =  admin.fullName();
    res.render('admin',{fullname});
  })
});

router.get('/register', (req, res) => {
  res.render('admin-register-form');
})

router.get('/login', (req, res) => {
  res.render('admin-login-form');
})

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, admin) => {
    console.log(err, admin)
    res.redirect('/admin/login')
  })
})

router.post('/login', (req, res, next) => {
  var {email, password}  = req.body;
  if(!email || !password) {
    return res.redirect('/admin/login');
  }


  User.findOne({email}, (err, admin) => {
    if(err) return next(err);
    if(!admin) {
      return res.redirect('/admin/login');
    }

    admin.verifyPassword(password, (err, result) => {
      if(!result) {
        return res.redirect('/admin/login');
      }



      req.session.adminId = admin.id;
      req.session.email = admin.email;
      res.redirect('/admin')
    })
  })
})

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/')
})

module.exports = router;
