require('dotenv').load();
var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var fs = require('fs');
var uglifyJs = require('uglify-js');
var passport = require('passport');
//get Database
require('./app_api/models/db');
//require strategy
require('./app_api/config/passport');

var app = express();

//views engine set up
app.set("view engine","jade");
app.set("views",path.join(__dirname,"app_server","views"));
//minify using uglify

// var a = uglifyJs.minify({
//     'about.controller.js': fs.readFileSync('./app-client/about/about.controller.js','utf8')
// });
// console.log(a.code);

var appClientFiles = {
    'app.js' : fs.readFileSync('./app-client/app.js','utf8'),
    //controller
    'home.controller.js': fs.readFileSync('./app-client/home/home.controller.js','utf8'),
    'about.controller.js': fs.readFileSync('./app-client/about/about.controller.js','utf8'),
    'register.controller.js': fs.readFileSync('./app-client/auth/register/register.controller.js','utf8'),
    'login.controller.js': fs.readFileSync('./app-client/auth/login/login.controller.js','utf8'),
    'locationDetail.controller.js': fs.readFileSync('./app-client/locationDetail/locationDetail.controller.js','utf8'),
    'navigation.controller.js': fs.readFileSync('./app-client/common/directives/navigation/navigation.controller.js','utf8'),
    //service
    'geolocation.service.js' : fs.readFileSync('./app-client/common/services/geolocation.service.js','utf8'),
    'authentication.service.js' : fs.readFileSync('./app-client/common/services/authentication.service.js','utf8'),
    'loc8rData.service.js' : fs.readFileSync('./app-client/common/services/loc8rData.service.js','utf8'),
    //filter
    'formatDistance.filter.js' : fs.readFileSync('./app-client/common/filters/formatDistance.filter.js','utf8'),
    'addHtmlLineBreak.filter.js' : fs.readFileSync('./app-client/common/filters/addHtmlLineBreak.filter.js','utf8'),
    'trustAsResourceUrl.filter.js' : fs.readFileSync('./app-client/common/filters/trustAsResourceUrl.filter.js','utf8'),
    // directive
    'ratingStars.directive.js' : fs.readFileSync('./app-client/common/directives/ratingStars/ratingStars.directive.js','utf8'),
    'footerGeneric.directive.js' : fs.readFileSync('./app-client/common/directives/footerGeneric/footerGeneric.directive.js','utf8'),
    'navigation.directive.js' : fs.readFileSync('./app-client/common/directives/navigation/navigation.directive.js','utf8'),
    'pageHeader.directive.js' : fs.readFileSync('./app-client/common/directives/pageHeader/pageHeader.directive.js','utf8'),
};
var uglified = uglifyJs.minify(appClientFiles,{compress : false});
fs.writeFile('public/angular/loc8r.min.js', uglified.code , function (err) {
    if(err){
        console.log(err);
    }else{
        console.log('script generated and saved : loc8r.min.js');
    }
});
//favicon

//app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"app-client")));

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));


// var router = require('./app_server/routes/index');
// app.use('/', router);
var routerAPI = require('./app_api/routes/index');
app.use('/api',routerAPI);

//SPA Routing
app.use(function (req,res) {
    res.sendfile(path.join(__dirname,'app-client','index.html'))
})

/*Error catching and handling*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
/*Catch unauthorised errors*/
app.use(function (err,req,res,next) {
    if(err.name === 'UnauthorizedError'){
        res.status(401);
        res.json({
            "message" : err.name + ": " +err.message
        });
    }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
    		title: 'ERROR',
    		pageHeader:{
    			title: err.status,
    			strapline: 'Something went wrong.'
    		},
      	  content: 'ERROR message: ' + err.message,
      	  error: {}
   		});
    });
};

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
    	title: 'ERROR',
    	pageHeader:{
    		title: err.status,
    		strapline: ''
    	},
        content: err.message,
        error: {}
    });
});

module.exports = app;
