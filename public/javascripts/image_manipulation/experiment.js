$(document).ready(function() {

  // Test 1 -------------------------------------------------------------------
  var test1 = $('#test1_img');

  test1.on('click', function() {
    $( this ).toggleClass('full-width');
  });

  // Test 2 -------------------------------------------------------------------
  $('.t2img').on('click', function( e ) {
    console.log( e, this );
    $( this ).toggleClass('full-width');
  });

});
