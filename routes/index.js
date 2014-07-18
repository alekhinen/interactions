var express = require('express');
var router  = express.Router();

// GET / page.
router.get('/', function( req, res ) {
  res.render('index', { title: 'Interactions' });
});

router.get('/rebound', function( req, res ) {
  res.render('rebound', { title: 'Using Rebound' });
});

router.get('/image_manipulation', function( req, res ) {
  res.render('image_manipulation', { title: 'Image Manipulation' });
});

module.exports = router;
