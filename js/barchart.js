/* BAR CHART */

var datasetBarChart = [
  {teamMember: "Total", month: "January", performance: 425990},
  {teamMember: "Total", month: "February", performance: 532488},
  {teamMember: "Total", month: "March", performance: 745483},
  {teamMember: "Total", month: "April", performance: 692234},
  {teamMember: "Total", month: "May", performance: 692234},
  {teamMember: "Total", month: "June", performance: 532488},
  {teamMember: "Total", month: "July", performance: 638986},
  {teamMember: "Total", month: "August", performance: 585737},
  {teamMember: "Total", month: "September", performance: 479239},
  {teamMember: "Jon", month: "January", performance: 223642},
  {teamMember: "Jon", month: "February", performance: 260915},
  {teamMember: "Jon", month: "March", performance: 242278},
  {teamMember: "Jon", month: "April", performance: 167731},
  {teamMember: "Jon", month: "May", performance: 205005},
  {teamMember: "Jon", month: "June", performance: 205005},
  {teamMember: "Jon", month: "July", performance: 242278},
  {teamMember: "Jon", month: "August", performance: 149094},
  {teamMember: "Jon", month: "September", performance: 167731},
  {teamMember: "Sansa", month: "January", performance: 175718},
  {teamMember: "Sansa", month: "February", performance: 127795},
  {teamMember: "Sansa", month: "March", performance: 143770},
  {teamMember: "Sansa", month: "April", performance: 79872},
  {teamMember: "Sansa", month: "May", performance: 191593},
  {teamMember: "Sansa", month: "June", performance: 191793},
  {teamMember: "Sansa", month: "July", performance: 207667},
  {teamMember: "Sansa", month: "August", performance: 287539},
  {teamMember: "Sansa", month: "September", performance: 191693},
  {teamMember: "Arya", month: "January", performance: 126730},
  {teamMember: "Arya", month: "February", performance: 90522},
  {teamMember: "Arya", month: "March", performance: 81469},
  {teamMember: "Arya", month: "April", performance: 45261},
  {teamMember: "Arya", month: "May", performance: 99574},
  {teamMember: "Arya", month: "June", performance: 108626},
  {teamMember: "Arya", month: "July", performance: 90522},
  {teamMember: "Arya", month: "August", performance: 135782},
  {teamMember: "Arya", month: "September", performance: 126730},
  {teamMember: "Bran", month: "January", performance: 62300},
  {teamMember: "Bran", month: "February", performance: 34611},
  {teamMember: "Bran", month: "March", performance: 69222},
  {teamMember: "Bran", month: "April", performance: 89989},
  {teamMember: "Bran", month: "May", performance: 76145},
  {teamMember: "Bran", month: "June", performance: 83067},
  {teamMember: "Bran", month: "July", performance: 89989},
  {teamMember: "Bran", month: "August", performance: 89989},
  {teamMember: "Bran", month: "September", performance: 96911},
  {teamMember: "Robb", month: "January", performance: 34611},
  {teamMember: "Robb", month: "February", performance: 29286},
  {teamMember: "Robb", month: "March", performance: 31949},
  {teamMember: "Robb", month: "April", performance: 21199},
  {teamMember: "Robb", month: "May", performance: 21399},
  {teamMember: "Robb", month: "June", performance: 34611},
  {teamMember: "Robb", month: "July", performance: 31949},
  {teamMember: "Robb", month: "August", performance: 25299},
  {teamMember: "Robb", month: "September", performance: 35936}
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
    .text("Overall Monthly Sales Breakdown (2014 to Date)");

};

/* UPDATE BAR CHART */

function updateBarChart(teamMember, color) {

    var w = 800;
    var h = 280;
    var m = 30;
    var p = 2;

    var selectedBCData = datasetSelected(teamMember, datasetBarChart);

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
        .duration(1000)
        .attr("x", function(d, i) {return x(i);})
        .attr("width", w / selectedBCData.length - p)
        .attr("y", function(d) {return y(d.performance);})
        .attr("height", function(d) {return h-y(d.performance);})
        .attr("fill", color);

      svg.selectAll(".breakdown")
         .data(selectedBCData)
         .transition()
         .duration(1000)
         .text(function(d) {return formatAsCurrency(d.performance);})
         .attr("x", function(d, i) {
             return (i * (w / selectedBCData.length)) + ((w / selectedBCData.length - p) / 2);
         })
         .attr("y", function(d) {return y(d.performance) + 20;});

      svg.selectAll("text.title")
         .text(teamMember + "'s Monthly Sales Breakdown (2014 to Date)");

}
