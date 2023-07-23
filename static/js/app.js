const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//fetch the JSON data and console log it
d3.json(url).then(function(data) {
    var dropdown = d3.select("#selDataset");

    data.names.forEach(function(name) {
        dropdown.append("option").attr("value", name).text(name);
    });

    updateSampleMetadata(data.names[0]);
    
}) 
.catch(function(error) {
    console.log("Error loading data:", error);
});    
// const sample_values = 

// //Create the bar chart using Plotly
// let trace = {
//     x:
//     y:
//     type: "bar"
//     orientation: "h"
// }