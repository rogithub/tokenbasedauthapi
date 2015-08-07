var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var db = require('./../database/db.js');
var moment = require('moment');


var tokenVerification = require('./../middlewares/tokenVerification.js');


/* GET home page. */
router.post('/login', function(req, res, next) {
    
    var user =  db.find(parseInt(req.body.id, 10));  
    
    if (!user) {
        // incorrect username
        return res.sendStatus(401);
    }

    if (!user.password === req.body.password) {
        // incorrect password
        return res.sendStatus(401);
    }

    var expires = moment().add(1, 'minutes').valueOf();
    var token = jwt.encode({
        iss: user.id,
        exp: expires
    }, 'F7CA77BE-622C-4CA5-8540-361A3E3CE1A7');

    res.json({
        token : token,
        expires: expires,
        user: user
    });
});

router.get('/date', tokenVerification, function(req, res, next) {    
       
    res.json(new Date());
});

module.exports = router;
