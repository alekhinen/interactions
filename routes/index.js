var express = require('express');
var router  = express.Router();

// GET / page.
router.get('/', function( req, res ) {
  res.render('index', { title: 'Interactions' });
});

module.exports = router;
