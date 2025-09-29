var express = require('express');
var router = express.Router();
var maincontroller = require('../controllers/main');

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', {
//     title: 'Toko Online Sederhana',
//     products: products,
//   });
// });
router.get('/', maincontroller.index);

module.exports = router;
