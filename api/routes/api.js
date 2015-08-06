var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var db = require('./../database/db.js');

var tokenVerification = require('./../middlewares/tokenVerification.js');


/* GET home page. */
router.post('/login', function(req, res, next) {
    
    var user =  db.find(req.body.id);  

    if (!user) {
        // incorrect username
        return res.send(401);
    }

    if (!user.password === req.body.password) {
        // incorrect password
        return res.send(401);
    }

    var expires = moment().add('days', 7).valueOf();
    var token = jwt.encode({
        iss: user.id,
        exp: expires
    }, app.get('jwtTokenSecret'));

    res.json({
        token : token,
        expires: expires,
        user: user.toJSON()
    });
});

router.get('/date', tokenVerification, function(req, res, next) {    
       
    res.json(new Date());
});

module.exports = router;
