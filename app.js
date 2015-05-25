var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var Sequelize = require('sequelize');
var AWS = require('aws-sdk');
var debug = require('debug')('flag');
var CONFIG = require('./config');


var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = CONFIG.PORT;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: CONFIG.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var sequelize = new Sequelize(
  CONFIG.PGDB_NAME,
  CONFIG.PGDB_USERNAME,
  CONFIG.PGDB_PASSWORD,
  {'dialect':'postgres'}
);

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {
    Bucket: 'flag-assets',
    ACL: 'public-read'
  }
});

var routes = require('./routes/index')(sequelize);
var users = require('./routes/users')(sequelize);

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (CONFIG.ENV === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});

http.listen(PORT);

module.exports = app;