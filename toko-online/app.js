var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//panggil file koneksi database
require('./app_toko_online/models/db'); 

//perbaikan 2
var indexRouter = require('./app_toko_online/routes/index');
var usersRouter = require('./app_toko_online/routes/users');
var productRouter = require('./app_toko_online/routes/product'); //  router produk

var apiproductRouter = require('./app_toko_online/routes/api/product'); // router api produk

// view engine setup
var engine = require('ejs-blocks'); // pakai ejs-blocks
var app = express();

// view engine setup
app.set('views', path.join(__dirname,'app_toko_online', 'views')); //perbaikan 1
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/produk', productRouter);
app.use('/api/produk', apiproductRouter); // router api produk

// serving bootstrap
app.use(
  '/bootstrap',
  express.static(path.join(__dirname + '/node_modules/bootstrap/dist'))
);

// catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
