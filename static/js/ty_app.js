

d3.json("static/data/simpson_episodes.json").then(function(simpsonsData) 
    { 
      // console.log(simpsonsData.result[0].season)

    function updateChart() {

      // Remove the old canvas.
      var oldCanvas = document.getElementById("tyChart");
      oldCanvas.parentNode.removeChild(oldCanvas);

      // Add the canvas to the chart div.
      var chartDiv = document.getElementById("tyChart-div");
      var canvas = document.createElement("canvas");
      canvas.setAttribute("id", "tyChart");
      canvas.setAttribute("width", "1000");
      canvas.setAttribute("height", "500");
      chartDiv.appendChild(canvas);

      var selection = d3.select("#seasons").node().value;   

      var selectedSeason =  simpsonsData.result.filter(function(episode) {
        return episode.season == selection;
      });
      // console.log(selectedSeason)
      
      selectedSeason = selectedSeason.sort((a, b) => (a.number_in_season > b.number_in_season) ? 1 : -1)

      var views = selectedSeason.map( d => d.us_viewers_in_millions)
      var episode = selectedSeason.map( d => d.number_in_season)

      new Chart(canvas, {
        type: 'line',
        data: {
          labels: episode,
          datasets: [{ 
              data: views,
              label: "US Viewers (millions)",
              borderColor: "#3e95cd",
              fill: false
            }
          ]
        },
        options: {
          // layout: {
          //   padding: {
          //       left: 50,
          //       right: 50
          //   }
          // };
          maintainAspectRatio: true,
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Episode'
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'US Viewers (millions)'
              }
            }]
          }     
        }
      });
    } 

      d3.selectAll("#seasons").on("change", updateChart);
      updateChart();
    });

    






