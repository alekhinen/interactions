// Get a reference to the logo element.
var el = document.getElementById('test1_btn');

// create a SpringSystem and a Spring with a bouncy config.
var springSystem = new rebound.SpringSystem();
var spring = springSystem.createSpring(50, 3);

// Add a listener to the spring. Every time the physics
// solver updates the Spring's value onSpringUpdate will
// be called.
spring.addListener({
  onSpringUpdate: function(spring) {
    var val = spring.getCurrentValue();
    val = rebound.MathUtil.mapValueInRange(val, 0, 1, 1, 0.5);
    scale(el, val);
  }
});

// Listen for mouse down/up/out and toggle the
//springs endValue from 0 to 1.
el.addEventListener('mousedown', function() {
  spring.setEndValue(1);
});

el.addEventListener('mouseout', function() {
  spring.setEndValue(0);
});

el.addEventListener('mouseup', function() {
  spring.setEndValue(0);
});

// Helper for scaling an element with css transforms.
function scale(el, val) {
  el.style.mozTransform =
  el.style.msTransform =
  el.style.webkitTransform =
  el.style.transform = 'scale3d(' +
    val + ', ' + val + ', 1)';
}
