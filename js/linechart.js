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

var tip = d3.tip()
            .attr("class", "d3-tip")
            .offset([-10, 0])
            .html(function(d) {
              return d.year + " : <span style='color:#ccc'>" + formatAsCurrency(d.performance) + "</span>";
            });

function drawLineChart() {

  var w = 400;
  var h = 283;
  var p = 30;

  var teamMember = "Total";

  var selectedLCData = datasetSelected(teamMember, datasetLineChart);

  var datasetNest = d3.nest()
                      .key(function(d){return d.teamMember;})
                      .entries(datasetLineChart);

  var svg = d3.select("#lineChart")
              .append("svg")
              .attr("width", w)
              .attr("height", h)
              .style("padding", p)
              .call(tip);

  var x = d3.time.scale()
            .domain(d3.extent(datasetLineChart, function(d) {return d.year;}))
            .range([p, w-p]);

  var y = d3.scale.linear()
            .domain([d3.min(datasetLineChart, function(d) {return d.performance}), d3.max(datasetLineChart, function(d) { return d.performance;
            })])
            .range([h - p, p]);

  var xAxis = d3.svg.axis()
                .scale(x)
                .tickFormat(d3.format("04d"));

  var yAxis = d3.svg.axis()
                .scale(y)
                .tickFormat(d3.format("s"))
                .orient("left");

  var groupElement = svg.selectAll("g")
                        .data(datasetNest)
                        .enter()
                        .append("g")
                        .attr("id", function(d){return d.key + "-line";})
                        .attr("class", "hide");

  d3.select("#Total-line")
    .attr("class", "sticky");

  var drawLine = d3.svg.line()
                 .x(function(d) {return x(d.year);})
                 .y(function(d) {return y(d.performance);})
                 .interpolate("cardinal");

  var dots = d3.select("#"+ teamMember +"-line")
                .selectAll("circle")
                .data(selectedLCData)
                .enter()
                .append("circle")
                .attr("cx", function(d,i){return x(d.year);})
                .attr("cy", function(d){return y(d.performance);})
                .attr("r", 5)
                .attr("fill", "#ccc")
                .attr("stroke", "#545")
                .attr("stroke-width","2px")
                .on("mouseover", tip.show)
                .on("mouseout", tip.hide);

  var path = d3.select("#"+ teamMember +"-line")
               .append("path")
               .attr("d", drawLine(selectedLCData))
               .attr("stroke", "#000")
               .attr("stroke-width", 3)
               .attr("fill", "none");

  var lineLength = path.node().getTotalLength();

  path.attr("stroke-dasharray",lineLength + ", "+lineLength)
      .attr("stroke-dashoffset",lineLength);

  path.transition()
      .duration(1000)
      .attr("stroke-dashoffset", 0);

  svg.append("g")
     .attr("class", "axis")
     .attr("transform", 'translate(0,' + (h - p) + ')')
     .call(xAxis);

  svg.append("g")
      .attr("class", "axis")
       .attr("transform", "translate(" + p + ",0)")
       .call(yAxis)
     .append("text")
       .attr("x", 310)
       .attr("y", 15)
       .attr("dy", ".7em")
       .attr("class", "lineChartTitle")
       .style("text-anchor", "end")
       .style("fill", "#ccc")
       .text("Average Individual Performance");

};

/* UPDATE LINE CHART */

function updateLineChart(teamMember, color) {

  var selectedLCData = datasetSelected(teamMember, datasetLineChart);
  var w = 400;
  var h = 283;
  var p = 30;

  var svg = d3.select("#lineChart svg")
              .call(tip);

  d3.selectAll(".show path")
    .remove();

  d3.selectAll(".show circle")
    .remove();

  d3.select("#"+teamMember+"-line")
    .attr("class", "show");

  var x = d3.time.scale()
            .domain(d3.extent(datasetLineChart, function(d) {return d.year;}))
            .range([p, w-p]);

  var y = d3.scale.linear()
            .domain([d3.min(datasetLineChart, function(d) {return d.performance}), d3.max(datasetLineChart, function(d) { return d.performance;
            })])
            .range([h - p, p]);

  var drawLine = d3.svg.line()
                 .x(function(d) {return x(d.year);})
                 .y(function(d) {return y(d.performance);})
                 .interpolate("cardinal");

  var dots = d3.select("#"+ teamMember +"-line")
                .selectAll("circle")
                .data(selectedLCData)
                .enter()
                .append("circle")
                .attr("cx", function(d,i){return x(d.year);})
                .attr("cy", function(d){return y(d.performance);})
                .attr("r", 5)
                .attr("fill", "#ccc")
                .attr("stroke", color)
                .attr("stroke-width","2px")
                .on("mouseover", tip.show)
                .on("mouseout", tip.hide);

  var path = d3.select("#"+ teamMember +"-line")
               .append("path")
               .attr("d", drawLine(selectedLCData))
               .attr("stroke", color)
               .attr("stroke-width", 3)
               .attr("fill", "none");

  var lineLength = path.node().getTotalLength();

  path.attr("stroke-dasharray",lineLength + ", "+lineLength)
      .attr("stroke-dashoffset",lineLength);

  path.transition()
      .duration(1000)
      .attr("stroke-dashoffset", 0);

  svg.selectAll("text.lineChartTitle")
     .transition()
     .duration(300)
     .text(teamMember + " vs. Average Individual Performance");

};
