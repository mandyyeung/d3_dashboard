/* PIE CHART */

function drawPieChart() {
  //Width, height, padding
  var w = 350;
  var h = 350;
  var p = 30;

  var datasetPieChart = [
    {teamMember: "Sansa", portion: 0.30},
    {teamMember: "Arya", portion: 0.17},
    {teamMember: "Bran", portion: 0.13},
    {teamMember: "Robb", portion: 0.05},
    {teamMember: "Jon", portion: 0.35}
  ];

  var outerRadius = w / 2;
  var outerRadiusOut = w / 1.9;
  var innerRadiusInitial = outerRadius * 0.999;
  var innerRadius = w / 4;

  var arc = d3.svg
              .arc()
              .innerRadius(innerRadiusInitial)
              .outerRadius(outerRadius);
  var arcOut = d3.svg
                 .arc()
                 .innerRadius(innerRadius)
                 .outerRadius(outerRadiusOut);

  var arcIn = d3.svg
                .arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

  var pie = d3.layout.pie()
              .value(function(d) {return d.portion;});

  //Color palette via colourlovers.com (u.make.me.happy)
  var color = d3.scale.ordinal()
                .domain(function(d){return d.teamMember;})
                .range(["#5CACC4", "#8CD19D", "#CEE879", "#FCB653", "#FF5254"]);
                //Alternative palette = Blue Eyes:
                //.range(["#005FA8","#3777BD","#5A91CC","#88B4E3","#ACE"]);


  //Create SVG element
  var svg = d3.select("#pieChart")
              .append("svg")
              .attr("width", w+p)
              .attr("height", h+p);

  //Set up groups
  var arcs = svg.selectAll("g.arc")
                .data(pie(datasetPieChart))
                .enter()
                .append("g")
                .attr("class", "arc")
                .attr("transform", "translate(" + (outerRadius + p/2) + "," + (p/2 + outerRadius) + ")")
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                .on("click", update);

  //Draw arc paths
  arcs.append("path")
      .attr("fill", function(d, i) {return color(i);})
      .attr("d", arc)
      .append("title")
      .text(function(d){ return d.data.teamMember + ": " + formatAsPercentage(d.data.portion); });

  //Initial animation
  d3.selectAll("path").transition()
    .duration(1000)
    .delay(10)
    .attr("d", arcIn);

  //Labels
  arcs.append("text")
      .attr("transform", function(d) {return "translate(" + arcIn.centroid(d) + ")";})
      .attr("text-anchor", "middle")
      .text(function(d) {return d.data.teamMember;});

  //Title in the middle
  svg.append("text")
     .attr("dy", "12em")
     .attr("dx", "12em")
     .attr("text-anchor", "middle")
     .text("Revenue Share, 2014")
     .attr("class", "title");

  //Mouseover animations
  function mouseover(){
    d3.select(this).select("path").transition()
      .duration(300)
      .attr("d", arcOut);
  };

  function mouseout(){
    d3.select(this).select("path").transition()
      .duration(300)
      .attr("d", arcIn);
  };

  function update(d,i){
    updateAnnualPerformance(d.data.teamMember, color(i));
    updateLineChart(d.data.teamMember, color(i));
    updateBarChart(d.data.teamMember, color(i));
  }
};
