/* BAR CHART */

var datasetBarChart = [
  {teamMember: "Total", month: "January", performance: 14880},
  {teamMember: "Total", month: "February", performance: 24880},
  {teamMember: "Total", month: "March", performance: 21880},
  {teamMember: "Total", month: "April", performance: 33880},
  {teamMember: "Total", month: "May", performance: 23880},
  {teamMember: "Total", month: "June", performance: 41880},
  {teamMember: "Total", month: "July", performance: 38880},
  {teamMember: "Total", month: "August", performance: 35880},
  {teamMember: "Total", month: "September", performance: 36880},
  {teamMember: "Jon", month: "January", performance: 17880},
  {teamMember: "Jon", month: "February", performance: 31080},
  {teamMember: "Jon", month: "March", performance: 11080},
  {teamMember: "Jon", month: "April", performance: 19080},
  {teamMember: "Jon", month: "May", performance: 21880},
  {teamMember: "Jon", month: "June", performance: 27880},
  {teamMember: "Jon", month: "July", performance: 29880},
  {teamMember: "Jon", month: "August", performance: 38880},
  {teamMember: "Jon", month: "September", performance: 31880},
  {teamMember: "Sansa", month: "January", performance: 15880},
  {teamMember: "Sansa", month: "February", performance: 30080},
  {teamMember: "Sansa", month: "March", performance: 12080},
  {teamMember: "Sansa", month: "April", performance: 15880},
  {teamMember: "Sansa", month: "May", performance: 22980},
  {teamMember: "Sansa", month: "June", performance: 21080},
  {teamMember: "Sansa", month: "July", performance: 25480},
  {teamMember: "Sansa", month: "August", performance: 32380},
  {teamMember: "Sansa", month: "September", performance: 32480},
  {teamMember: "Arya", month: "January", performance: 16880},
  {teamMember: "Arya", month: "February", performance: 28080},
  {teamMember: "Arya", month: "March", performance: 16080},
  {teamMember: "Arya", month: "April", performance: 13880},
  {teamMember: "Arya", month: "May", performance: 23080},
  {teamMember: "Arya", month: "June", performance: 22080},
  {teamMember: "Arya", month: "July", performance: 25480},
  {teamMember: "Arya", month: "August", performance: 28380},
  {teamMember: "Arya", month: "September", performance: 27480},
  {teamMember: "Bran", month: "January", performance: 13880},
  {teamMember: "Bran", month: "February", performance: 25080},
  {teamMember: "Bran", month: "March", performance: 17080},
  {teamMember: "Bran", month: "April", performance: 12880},
  {teamMember: "Bran", month: "May", performance: 20080},
  {teamMember: "Bran", month: "June", performance: 21080},
  {teamMember: "Bran", month: "July", performance: 23480},
  {teamMember: "Bran", month: "August", performance: 23380},
  {teamMember: "Bran", month: "September", performance: 22480},
  {teamMember: "Robb", month: "January", performance: 10880},
  {teamMember: "Robb", month: "February", performance: 20080},
  {teamMember: "Robb", month: "March", performance: 14080},
  {teamMember: "Robb", month: "April", performance: 11880},
  {teamMember: "Robb", month: "May", performance: 19080},
  {teamMember: "Robb", month: "June", performance: 18080},
  {teamMember: "Robb", month: "July", performance: 20480},
  {teamMember: "Robb", month: "August", performance: 20380},
  {teamMember: "Robb", month: "September", performance: 21480}
];

function drawBarChart() {

  var w = 800; //width
  var h = 280; //height
  var m = 30; //margin
  var p = 2; //padding for bars

  var teamMember = "Total";

  var selectedBCData = datasetSelected(teamMember, datasetBarChart);

  var svg = d3.select("#barChart")
              .append("svg")
              .attr("width", w+(2*m))
              .attr("height", h+(2*m));

  var x = d3.scale.linear()
            .domain([0, selectedBCData.length])
            .range([0, w]);

  var y = d3.scale.linear()
            .domain([0, d3.max(selectedBCData, function(d){return d.performance;})])
            .range([h,0]);

  var chart = svg.append("g")
                 .attr("transform", "translate(" + m + "," + m + ")");

  var bars = chart.selectAll('rect')
                 .data(selectedBCData)
                 .enter()
                 .append('rect')
                 .attr('x', function(d, i){return i*(w/selectedBCData.length);})
                 .attr('y', function(d){return h;})
                 .attr('width', w/selectedBCData.length - p)
                 .attr('height', 0)
                 .attr("fill", "#fff");

  bars.transition()
         .duration(1000)
         .attr('y', function(d){return y(d.performance);})
         .attr('height', function(d){return h - y(d.performance);})
         .attr("fill", "#bbb");

  svg.selectAll("text")
           .data(selectedBCData)
           .enter()
           .append("text")
           .text(function(d) {return d.month})
           .attr("text-anchor", "middle")
           .attr("x", function(d,i) {return (i * (w/selectedBCData.length)) + (w/(selectedBCData.length + p))})
           .attr("y", h+50);

  chart.selectAll("text")
        .data(selectedBCData)
        .enter()
        .append("text")
        .text(function(d) {
            return formatAsCurrency(d.performance);
        })
        .attr("class", "breakdown")
        .attr("x", function(d, i) {
            return (i * (w / selectedBCData.length)) + ((w / selectedBCData.length - p) / 2);
        })
        .attr("y", function(d) {
            return y(d.performance) + 20;
        });

  svg.append("text")
    .attr("x", m)
    .attr("y", 15)
    .attr("class","title")
    .attr("text-anchor", "left")
    .text("Monthly Sales Breakdown (2014 to Date)");

};

/* UPDATE BAR CHART */

function updateBarChart(teamMember, color) {

    var w = 800;
    var h = 280;
    var m = 30;
    var p = 2;

    var selectedBCData = datasetSelected(teamMember, datasetBarChart);

    var updateArea = d3.select("#barChart")
                     .data(selectedBCData);

    var x = d3.scale.linear()
              .domain([0, selectedBCData.length])
              .range([0, w]);


    var y = d3.scale.linear()
              .domain([0, d3.max(selectedBCData, function(d) { return d.performance; })])
              .range([h,0]);

     var svg = d3.select("#barChart svg");

     svg.selectAll("rect")
        .data(selectedBCData)
        .transition()
        .duration(750)
        .attr("x", function(d, i) {
            return x(i);
        })
        .attr("width", w / selectedBCData.length - p)
        .attr("y", function(d) {
          return y(d.performance);
        })
        .attr("height", function(d) {
            return h-y(d.performance);
        })
        .attr("fill", color);

      svg.selectAll(".breakdown")
         .data(selectedBCData)
         .transition()
         .duration(750)
         .text(function(d) {
             return formatAsCurrency(d.performance);
         })
         .attr("x", function(d, i) {
             return (i * (w / selectedBCData.length)) + ((w / selectedBCData.length - p) / 2);
         })
         .attr("y", function(d) {
             return y(d.performance) + 20;
         });

      svg.selectAll("text.title")
         .text(teamMember + "'s Monthly Sales Breakdown (2014 to Date)");

}
