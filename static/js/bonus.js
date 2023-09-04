//Test Subject Dropdown and initial function
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
        panelInfo(names[0]);
        Plots(names[0])
    })
};

function panelInfo(id) {
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
                title: { text: 'Belly Button Washing Frequency<br>Scrubs per Week', font: { size: 16, color: '#22666a', family: 'calibri' } },
                delta: { reference: 2.83, increasing: { color: "#5aa9b5" } },
                gauge: {
                    axis: { range: [0, 9], tickwidth: 1, tickcolor: '#71594d', tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], nticks:9},
                    bar: { color: "black", thickness: 0.2 },
                    borderwidth: 1,
                    bordercolor: "#71594d",
                    colorscale: [
                        ['0.0', 'rgb(165,0,38)'],
                        ['0.111111111111', 'rgb(215,48,39)'],
                        ['0.222222222222', 'rgb(244,109,67)'],
                        ['0.333333333333', 'rgb(253,174,97)'],
                        ['0.444444444444', 'rgb(254,224,144)'],
                        ['0.555555555556', 'rgb(224,243,248)'],
                        ['0.666666666667', 'rgb(171,217,233)'],
                        ['0.777777777778', 'rgb(116,173,209)'],
                        ['0.888888888889', 'rgb(69,117,180)'],
                      ],
                      type: 'heatmap'
                    steps: [
                        { range: [0   , 2.35], color: "#f2f2f2" },
                        { range: [2.35, 2.83], color: "#9d3d3650" },
                        { range: [2.83, 3.31], color: "#5aa9b550" },
                        { range: [3.31, 9   ], color: "#f2f2f2" },
                    ],
                    threshold: { line: { color: "red", width: 2 }, thickness: 1, value: 2.83 }
                }
            }];
            let layout = { width: 350, height: 330,
                margin: { t: 0, r: 20, l: 20, b: 0 },
                font: { size: 14, color: '151518', family: 'calibri' }
            };
            Plotly.newPlot('gauge', gaugeData, layout);
        });
};


init();