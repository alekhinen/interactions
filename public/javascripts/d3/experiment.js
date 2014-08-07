// data
var circleRadii = [40, 20, 10];

// ----------------------------------------------------------------------------
// circles inside circles
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

// ----------------------------------------------------------------------------
// handling json
var jsonCircles = [
  {
    'x_axis': 30,
    'y_axis': 30,
    'radius': 20,
    'color': 'green'
  }, {
    'x_axis': 70,
    'y_axis': 70,
    'radius': 20,
    'color': 'purple'
  }, {
    'x_axis': 110,
    'y_axis': 100,
    'radius': 20,
    'color': 'red'
  }];

var svgContainer = bodySelection.append( 'svg' )
  .attr( 'width', 200 )
  .attr( 'height', 200 );

var jCircles = svgContainer.selectAll( 'circle' )
  .data( jsonCircles )
  .enter()
  .append( 'circle' );

var jCirAttr = jCircles
  .attr( 'cx', function ( d ) {
    return d.x_axis;
  })
  .attr( 'cy', function ( d ) {
    return d.y_axis;
  })
  .attr( 'r', function ( d ) {
    return d.radius;
  })
  .style( 'fill', function ( d ) {
    return d.color;
  });

// ----------------------------------------------------------------------------
var width, height, nodes, root, color, force, svg;

// get the width and height of the browser
width  = window.innerWidth;
height = window.innerHeight;

// create the nodes (circles)
nodes = d3.range(200).map( function() {
    return {
      radius: Math.random() * 12 + 4
    };
  });
root  = nodes[0];
color = d3.scale.category10();

// set the size of the 'brush'
root.radius = 0;
root.fixed  = true;

// set the gravity
force = d3.layout.force()
  .gravity( 0.03 )
  .charge( function( d, i ) {
    return i ? 0 : -1000;
  })
  .nodes( nodes )
  .size( [width, height] );

// init force
force.start();

// create the svg element
svg = d3.select( 'body' ).append( 'svg' )
  .attr( 'width', width )
  .attr( 'height', height );

svg.selectAll( 'circle' )
  .data( nodes.slice(1) )
  .enter().append( 'circle' )
  .attr( 'r', function( d ) {
    return d.radius;
  })
  .style( 'fill', function( d, i ) {
    return color(i % 5);
  });

force.on( 'tick', function( e ) {
  var q = d3.geom.quadtree(nodes),
      i = 0,
      n = nodes.length;

  while (++i < n) {
    q.visit(collide(nodes[i]));
  }

  svg.selectAll('circle')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
});

svg.on('mousemove', function() {
  var p1 = d3.mouse(this);
  root.px = p1[0];
  root.py = p1[1];
  force.resume();
  particle();
});

function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * 0.5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
}

function particle() {
  var m = d3.mouse(this);

  svg.insert('circle', 'rect')
      .attr('cx', m[0])
      .attr('cy', m[1])
      .attr('r', 1e-6)
      .style('stroke', d3.hsl((i = (i + 1) % 360), 1, -0.5))
      .style('stroke-opacity', 1)
    .transition()
      .duration(2000)
      .ease(Math.sqrt)
      .attr('r', 100)
      .style('stroke-opacity', 1e-6)
      .remove();

  d3.event.preventDefault();
}
