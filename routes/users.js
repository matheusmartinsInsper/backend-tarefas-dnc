var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.send('respond with a 32');
});

module.exports = router;
