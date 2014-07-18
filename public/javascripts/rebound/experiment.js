// Test 1 ---------------------------------------------------------------------
// Get a reference to the logo element.
var test1 = document.getElementById('test1_btn');

// create a SpringSystem and a Spring with a bouncy config.
var springSystem = new rebound.SpringSystem();
var t1Spring = springSystem.createSpring(50, 3);

// Add a listener to the spring. Every time the physics
// solver updates the Spring's value onSpringUpdate will
// be called.
t1Spring.addListener({
  onSpringUpdate: function(spring) {
    var val = t1Spring.getCurrentValue();
    val = rebound.MathUtil.mapValueInRange(val, 0, 1, 1, 0.5);
    scale(test1, val);
  }
});

// Listen for mouse down/up/out and toggle the
//springs endValue from 0 to 1.
test1.addEventListener('mousedown', function() {
  t1Spring.setEndValue(1);
});

test1.addEventListener('mouseout', function() {
  t1Spring.setEndValue(0);
});

test1.addEventListener('mouseup', function() {
  t1Spring.setEndValue(0);
});

// Helper for scaling an element with css transforms.
function scale(el, val) {
  el.style.mozTransform =
  el.style.msTransform =
  el.style.webkitTransform =
  el.style.transform = 'scale3d(' +
    val + ', ' + val + ', 1)';
}



// Test 2 ---------------------------------------------------------------------
// Get a ref to the image
var test2 = document.getElementById('test2_img');
var t2Clicked = false;

// SpringSystem for the image
var t2Spring = springSystem.createSpring(50, 6);

t2Spring.addListener({
  onSpringUpdate: function( spring ) {
    var val = t2Spring.getCurrentValue();
    val = rebound.MathUtil.mapValueInRange(val, 0, 1, 1, 0.5);
    scale( test2, val );
  }
});

// Image event listeners.
test2.addEventListener('click', function() {
  if ( t2Clicked ) {
    t2Spring.setEndValue(0);
    t2Clicked = false;
  } else {
    t2Spring.setEndValue(-3);
    t2Clicked = true;
  }
});

// Test 3 ---------------------------------------------------------------------
// Get a ref to the image
var test3C = document.getElementById('test3_container');
var test3 = document.getElementById('test3_img');
var curVal = 0, isDragging, initialX, xDisplacement = 0;

// SpringSystem
var t3Spring = springSystem.createSpring(80, 5);

t3Spring.addListener({
  onSpringUpdate: function( spring ) {
    var val = t3Spring.getCurrentValue();
    val = rebound.MathUtil.mapValueInRange(val, 0, 1, 1, 0.5);
    pull( test3, val );
  }
});

test3C.addEventListener('mousedown', function( e ) {
  isDragging = true;
  initialX = e.clientX;
});

test3C.addEventListener('mousemove', function( e ) {
  if ( isDragging ) {
    xDisplacement = e.clientX - initialX
    // curVal += 5;
    t3Spring.setCurrentValue( -xDisplacement );
    t3Spring.setAtRest();
  }
});

test3C.addEventListener('mouseup', function() {
  curVal = 0;
  t3Spring.setEndValue( 0 );
  isDragging = false;
});

test3C.addEventListener('mouseleave', function() {
  curVal = 0;
  t3Spring.setEndValue( 0 );
  isDragging = false;
});

function pull( el, val ) {
  el.style.mozTransform =
  el.style.msTransform =
  el.style.webkitTransform =
  el.style.transform = 'translate3d(' +
    val + 'px, 0, 0)';
}



// Test 4 ---------------------------------------------------------------------
