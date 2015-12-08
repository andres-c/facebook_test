var User            = require('../app/models/user');
var FB = require('fb');

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email','publish_actions'] }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/post',
        passport.authenticate('facebook'),
        function (req, res, message) {
        FB.api(
            "/{user-id}/feed",
            "POST",
            {
                'message': message
            },
            function (response) {
              if (response && !response.error) {
                /* handle the result */
                successRedirect : '/profile'
                alert('Demo was liked successfully! Action ID: ' + response.id);
              }
            }
        );
        }
    );
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}