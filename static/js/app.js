const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'



// Demographic Info
function demoInfo(id) {
    d3.json(url).then(function (data) {
        let subjectData = data;
        let metadata = subjectData.metadata;
        let subjectMeta = metadata.filter(subject =>
            subject.id.toString() === id)[0];
        let panel = d3.select('#sample-metadata');
        panel.html('');
        Object.entries(subjectMeta).forEach(([key, value]) => {
            panel.append('h6').text(`${key}: ${value}`);
        })
    })
};

//Plots
function Plots(id) {
    d3.json(url).then(function (data) {
        let sampleData = data;
        let samples = sampleData.samples;
        let identifier = samples.filter(sample => sample.id === id);
        let filtered = identifier[0];
        let OTUvalues = filtered.sample_values.slice(0, 10).reverse();
        let OTUids = filtered.otu_ids.slice(0, 10).reverse();
        let labels = filtered.otu_labels.slice(0, 10).reverse();
        let barTrace = {
            x: OTUvalues,
            y: OTUids.map(object => 'OTU ' + object),
            name: labels,
            marker: {
              color: 'red',
              opacity: 0.9,
            },
            type: 'bar',
            orientation: 'h'
        };
        let barLayout = {
            title: `Top 10 OTUs for Subject ${id}`,
            xaxis: { title: 'Sample Values' },
            yaxis: { title: 'OTU ID' }
        };
        let barData = [barTrace];
        Plotly.newPlot('bar', barData, barLayout);
        let bubbleTrace = {
            x: filtered.otu_ids,
            y: filtered.sample_values,
            mode: 'markers',
            marker: {
                size: filtered.sample_values,
                color: filtered.otu_ids,
                colorscale: 'Bluered',
            },
            text: filtered.otu_labels,
        };
        let bubbleData = [bubbleTrace];
        let bubbleLayout = {
            title: `OTUs for Subject ${id}`,
            xaxis: { title: 'OTU ID' },
            yaxis: { title: 'Sample Values' }
        };
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
      
    })
};

//Function called for Dropdown
function init() {
  let dropDown = d3.select('#selDataset');
  let id = dropDown.property('value');
  d3.json(url).then(function (data) {
      sampleData = data;
      let names = sampleData.names;
      let samples = sampleData.samples;
      Object.values(names).forEach(value => {
          dropDown.append('option').text(value);
      })
      demoInfo(names[0]);
      Plots(names[0])
  })
};
function demoInfo(id) {
  d3.json(url)
      .then(function (data) {
          let subjectData = data;
          let metadata = subjectData.metadata;
          let subjectMeta = metadata.filter(subject => subject.id.toString() === id)[0];
          let value = subjectData.wfreq;
          let panel = d3.select('#sample-metadata');
          panel.html('');
          Object.entries(subjectMeta).forEach(([key, value]) => {
              panel.append('h6').text(`${key}: ${value}`);
          })

          let gaugeData = [{
              domain: { x: [0, 1], y: [0, 1] },
              type: 'indicator',
              mode: 'gauge+number+delta',
              value: value,
              title: { text: 'Belly Button Washing Frequency<br>Scrubs per Week', font: { size: 16, color: 'rgb(49,54,149)', family: 'calibri' } },
              delta: { reference: 2.83, increasing: { color: "#5aa9b5" } },
              gauge: {
                  axis: { range: [0, 9], tickwidth: 1, tickcolor: 'black', tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], nticks:9},
                  bar: { color: "black", thickness: 0.2 },
                  borderwidth: 1,
                  bordercolor: "black",
            
                  steps: [
                    { range: [0, 1], color: "rgb(215,48,39)" },
                    { range: [1, 2], color: "rgb(244,109,67)" },
                    { range: [2, 3], color: "rgb(253,174,97)" },
                    { range: [3, 4], color: "rgb(254,224,144)" },
                    { range: [4, 5], color: "rgb(224,243,248)"},
                    { range: [5, 6], color: "rgb(171,217,233)"},
                    { range: [6, 7], color: "rgb(116,173,209)"},
                    { range: [7, 8], color: "rgb(69,117,180)"},
                    { range: [8, 9], color: "rgb(49,54,149)"},
                ],
                  threshold: { line: { color: "black", width: 2 }, thickness: 1}
              }
          }];
          let layout = { width: 350, height: 330,
              margin: { t: 0, r: 20, l: 20, b: 0 },
              font: { size: 14, color: '151518', family: 'calibri' }
          };
          Plotly.newPlot('gauge', gaugeData, layout);
      });
};

//Build new upon ID change
function optionChanged(id) {
    Plots(id);
    demoInfo(id);
};



init();