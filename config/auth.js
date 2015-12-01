// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1654043754848368', // your App ID
        'clientSecret'  : 'b5d81326d143a2bbf2eff926039fd1b6', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        scope: 'publish_stream'
    }

};