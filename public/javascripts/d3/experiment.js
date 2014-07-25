// data
var circleRadii = [40, 20, 10];

// setting stuff for dom.
var bodySelection = d3.select('body');

var svgSelection = bodySelection.append('svg')
  .attr( 'width', 200 )
  .attr( 'height', 200 );

var circles = svgSelection.selectAll('circle')
  .data( circleRadii )
  .enter()
  .append( 'circle' );

var circleAttributes = circles
  .attr( 'cx', 50 )
  .attr( 'cy', 50 )
  .attr( 'r', function ( d ) {
    return d;
  })
  .style( 'fill', function ( d ) {
    if ( d >= 40 ) {
      return 'green';
    } else if ( d >= 20 ) {
      return 'purple';
    } else {
      return 'red';
    }
  } );
