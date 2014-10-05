/* ANNUAL PERFORMANCE */

var datasetAnnualPerformance = [
  {teamMember: "Total", performance: 5324880},
  {teamMember: "Sansa", performance: 1597440},
  {teamMember: "Arya", performance: 905216},
  {teamMember: "Bran", performance: 692224},
  {teamMember: "Robb", performance: 266240},
  {teamMember: "Jon", performance: 1863680},
];

var teamMember = "Total";

function drawAnnualPerformance(){

  var w = 350;
  var h = 150;

  var svg = d3.select("#annualPerformance").append("svg")
              .data(datasetAnnualPerformance)
              .attr("width", w)
              .attr("height", h);

  var title = svg.append("g")
                 .attr("transform", "translate(" + w/6 +","+ h/4 + ")");

  title.append("text")
       .attr("class", "performanceTitle")
       .text("Performance, 2014");

  svg.append("text")
     .attr("class", "performance")
     .attr("x", w/6)
     .attr("y", h/2)
     .style("fill", "#777")
     .transition()
     .duration(1000)
     .tween("text", function(d){
       var i = d3.interpolateRound(0, d.performance);
       return function(t) {
         this.textContent = formatAsCurrency(i(t)) + " (100%)";
       }
     });

};

/* UPDATE ANNUAL PERFORMANCE */

function updateAnnualPerformance(teamMember, color){

  var selectedAPData = datasetSelected(teamMember, datasetAnnualPerformance);

  var updateArea = d3.select("#annualPerformance .performance")
                     .data(selectedAPData);

  updateArea.transition()
            .duration(1000)
            .style("fill", color)
            .tween("text", function(d){
              var i = d3.interpolateRound(0, d.performance);
              return function(t) {
                this.textContent = formatAsCurrency(i(t)) + " (" + formatAsPercentage(i(t)/5324880) + ")";
              }
            });

  d3.select("text.performanceTitle")
    .text(teamMember + "'s Performance, 2014");

};
