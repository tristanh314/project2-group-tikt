function make_imdb_chart() {
    d3.json("static/data/simpson_episodes.json").then((data) => {
        var ratingsSample = data.result.filter(episode => episode.season===10);
        // console.log(ratingsSample);
        var labels = ratingsSample.sort((a, b) => (a.season - b.season));
        
    var dataSet = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        datasets: [
            {
                label: "IMDB Ratings",
                data: ratingsSample.map(episode => episode.imdb_rating),
                backgroundColor: ['rgba(17, 203, 255, 1)'],
                pointBackgroundColor: ['rgba(17, 203, 255, 1)'],
                borderColor: ['rgba(17, 203, 255, 1)'],
                yAxisID: "y-axis-1",
                fill: false
            },
            {
                label: "IMBD Vote Counter",
                data: ratingsSample.map(episode => episode.imdb_votes),
                backgroundColor: ['rgba(145, 14, 105, 1)'],
                pointBackgroundColor: ['rgba(145, 14, 105, 1)'],
                borderColor: ['rgba(145, 14, 105, 1)'],
                yAxisID: "y-axis-2",
                fill: false
            }
        ]};
    var ctx = document.getElementById("karlChart")
    var karlChart = new Chart(ctx, {
        type: 'line',
        data: dataSet,
        options: {
            maintainAspectRatio: true,
            stacked: false,
            title:{
                display: true,
                text:'The Simpsons Season: 10, IMDB ratings and IMDB vote count'
            },
            scales: {
                yAxes: [{
                    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: "left",
                    id: "y-axis-1",
                    ticks: {
                        beginAtZero: false,
                        stepSize: 1,
                    },
                    scaleLabel: {
                        display: true,
                        fontSize: 14,
                        labelString: "IMDB Rating",
                    }
                    },
                    {
                    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: "right",
                    id: "y-axis-2",
                    ticks: {
                        beginAtZero: false,
                        stepSize: 100,
                    },
                    scaleLabel: {
                        display: true,
                        fontSize: 14,
                        labelString: "IMDB Vote Count",
                    },

                    // grid line settings
                    gridLines: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                }],
                xAxes: [{
                    type: "category", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: "left",
                    scaleLabel: {
                        display: true,
                        fontSize: 14,
                        labelString: "Episodes",
                    }
                }]
            }
        }
    });
    });
}
make_imdb_chart();