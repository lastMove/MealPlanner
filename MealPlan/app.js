var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session      = require('express-session')
var routes = require('./routes/index');
var users = require('./routes/users');
var store = new session.MemoryStore;
var app = express();

var orm = require('orm');
var fs = require('fs');
var router = require('./router').myRouter;

//var dbConfig = fs.readFileSync('config/db-config.json');

orm.settings.set("connection.debug", true);
orm.settings.set("instance.cache", false);
orm.settings.set("instance.autoFetch", true);
orm.settings.set("instance.autoFetchLimit", 1);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'whatever', store: store}));

app.use(orm.express({
    "password" : "root",
    "host"     : "localhost",
    "database" : "mealPlan",
    "protocol" : "mysql"
}, 
{
    define: function (db, models, next) {
        db.load("./models/models", function (err2)
            {
             if (err2)  
                 throw err2;
             db.sync();
         });
            next();
        }
    }));

router(app);

app.use(express.static(path.join(__dirname, 'public')));
/// catch 404 and forwarding to error handler





app.use(function(req, res, next) {
    var err = new Error('Not Found2');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') 
{
    app.use(function(err, req, res, next) {
        res.status(err.status || 501);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
