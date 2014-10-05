/* LINE CHART */

var datasetLineChart = [
    {teamMember: "Total", year: 2010, performance: 884523},
    {teamMember: "Total", year: 2011, performance: 1014798},
    {teamMember: "Total", year: 2012, performance: 975616},
    {teamMember: "Total", year: 2013, performance: 1003665},
    {teamMember: "Total", year: 2014, performance: 1064960},
    {teamMember: "Jon", year: 2010, performance: 1035578},
    {teamMember: "Jon", year: 2011, performance: 980113},
    {teamMember: "Jon", year: 2012, performance: 1197960},
    {teamMember: "Jon", year: 2013, performance: 1669406},
    {teamMember: "Jon", year: 2014, performance: 1863680},
    {teamMember: "Sansa", year: 2010, performance: 918109},
    {teamMember: "Sansa", year: 2011, performance: 1394044},
    {teamMember: "Sansa", year: 2012, performance: 931075},
    {teamMember: "Sansa", year: 2013, performance: 1243683},
    {teamMember: "Sansa", year: 2014, performance: 1597440},
    {teamMember: "Arya", year: 2010, performance: 884523},
    {teamMember: "Arya", year: 2011, performance: 1034798},
    {teamMember: "Arya", year: 2012, performance: 925616},
    {teamMember: "Arya", year: 2013, performance: 1063665},
    {teamMember: "Arya", year: 2014, performance: 1064960},
    {teamMember: "Bran", year: 2010, performance: 894296},
    {teamMember: "Bran", year: 2011, performance: 943113},
    {teamMember: "Bran", year: 2012, performance: 860415},
    {teamMember: "Bran", year: 2013, performance: 882801},
    {teamMember: "Bran", year: 2014, performance: 692224},
    {teamMember: "Robb", year: 2010, performance: 749653},
    {teamMember: "Robb", year: 2011, performance: 823756},
    {teamMember: "Robb", year: 2012, performance: 765618},
    {teamMember: "Robb", year: 2013, performance: 787189},
    {teamMember: "Robb", year: 2014, performance: 266240}
  ];

function drawLineChart() {

  var w = 400;
  var h = 283;
  var p = 30;

  var teamMember = "Total";

  var selectedLCData = datasetSelected(teamMember, datasetLineChart);

  var svg = d3.select("#lineChart") // Finds the body in the DOM
              .append("svg") // Adds svg element to the body
              .attr("width", w) // with these attributes
              .attr("height", h)
              .style("padding", p);

  var x = d3.time.scale()
            .domain(d3.extent(selectedLCData, function(d) {return d.year;}))
            .range([p, w-p]);

  var y = d3.scale.linear()
            .domain([d3.min(selectedLCData, function(d) {return d.performance})*0.9, d3.max(selectedLCData, function(d) { return d.performance;
            })*1.1])
            .range([h - p, p]);

  var xAxis = d3.svg.axis()
                .scale(x)
                .tickFormat(d3.format("04d"));

  var yAxis = d3.svg.axis()
                .scale(y)
                .tickFormat(d3.format("s"))
                .orient('left');

  svg.selectAll("circle")
      .data(selectedLCData)
      .enter()
      .append("circle")
      .attr("cx", function(d,i){
        return x(d.year);
      })
      .attr("cy", function(d){
        return y(d.performance);
      })
      .attr("r", 5)
      .attr("fill", "#ccc")
      .attr("stroke", "#545")
      .attr("stroke-width","2px");

  svg.append("g")
     .attr("class", "axis")
     .attr("transform", 'translate(0,' + (h - p) + ')')
     .call(xAxis);

  svg.append('g')
       .attr('class', 'axis')
       .attr('transform', 'translate(' + p + ',0)')
       .call(yAxis)
     .append("text")
       .attr("x", 340)
       .attr("y", 235)
       .attr("dy", ".7em")
       .style("text-anchor", "end")
       .style("fill", "#ccc")
       .text("Average Individual Performance ($)");

  var drawLine = d3.svg.line()
                   .x(function(d) {return x(d.year);})
                   .y(function(d) {return y(d.performance);})
                   .interpolate("cardinal");

  var path = svg.append('path')
      .attr('d', drawLine(selectedLCData))
      .attr('stroke', '#000')
      .attr('stroke-width', 3)
      .attr('fill', 'none');

 var lineLength = path.node().getTotalLength(); // 1. get length

 path.attr("stroke-dasharray", // 2. pattern big enough to hide line
                 lineLength + ", "+lineLength)
      .attr("stroke-dashoffset",lineLength); // 3. start with gap

 path.transition()
      .duration(1000)
      .attr("stroke-dashoffset", 0); // 4. shift pattern to reveal

};

function updateLineChart(teamMember, color) {

var selectedLCData = datasetSelected(teamMember, datasetLineChart);


};
