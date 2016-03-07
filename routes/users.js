var express = require('express');
var router = express.Router();

//get the services to update the user database
var databaseFucntion = require('../services/users');




/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
