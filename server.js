var express = require('express')
  , api = require('./config/facebook')
  , pass = require('./config/passport')
  , app = express();

var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var request = require('request');
// var graph = require('fbgraph');
var FB = require('fb');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.post('/post', function(req, res) {
  // Check to ensure user has a valid access_token

    // Call function that contains API call to post on Facebook (see facebook.js)
    FB.api(

    "/me/feed",
    "POST",
    {
        message: "This is a test message"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
    
  });

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);