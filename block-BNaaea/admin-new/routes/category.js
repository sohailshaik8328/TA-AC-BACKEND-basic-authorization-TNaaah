var express = require('express');
var router = express.Router();
var Product = require('../models/product-model');
var Comment = require('../models/comment-model');


router.get('/:category', (req, res, next) => {
    var category = req.params.category;
    Product.find({}, (err, product) => {
        var some = product.filter(elm => {
            if(elm.category.split(" ").includes(category)) {
                return elm;
            }
        })
        res.render('category', {product : some});
    })
})


module.exports = router;