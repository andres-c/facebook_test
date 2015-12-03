var secret = require('./secret.js');

module.exports = {

    'facebookAuth' : {
        'clientID'      : secret.FACEBOOK_APP_ID, // your App ID
        'clientSecret'  : secret.FACEBOOK_APP_SECRET, // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'

    }

};