var dataset = [
    { type: "spell", count: 63 },
    { type: "charm", count: 20 },
    { type: "jinx", count: 2 },
    { type: "curse", count: 7 }
];

var width = 420;
var height = 420;
var radius = Math.min(width, height) / 2;
var donutWidth = 75;
var legendRectSize = 18;
var legendSpacing = 4;

var color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

// var color = d3.scaleOrdinal(d3.schemeCategory20b);

var svg = d3.select('#chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

var arc = d3.arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius);

var pie = d3.pie()
  .value(function(d) { return d.count; })
  .sort(null);

var path = svg.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d, i) {
    return color(d.data.type);
});

var legend = svg.selectAll('.legend')
  .data(color.domain())
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr('transform', function(d, i) {
    var height = legendRectSize + legendSpacing;
    var offset =  height * color.domain().length / 2;
    var horz = -2 * legendRectSize;
    var vert = i * height - offset;
    return 'translate(' + horz + ',' + vert + ')';
});

legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .style('fill', color)
  .style('stroke', color);

legend.append('text')
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - legendSpacing)
  .text(function(d) { return d; });
