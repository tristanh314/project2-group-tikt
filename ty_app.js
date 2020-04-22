

d3.json("static/data/simpson_episodes.json").then(function(simpsonsData) 
    { console.log(simpsonsData.result[0].season)

    function updateChart() {
      var selection = d3.select("#seasons").node().value;   

      var selectedSeason =  simpsonsData.result.filter(function(episode) {
        return episode.season == selection;
      });
      console.log(selectedSeason)
      
      selectedSeason = selectedSeason.sort((a, b) => (a.number_in_season > b.number_in_season) ? 1 : -1)

      var views = selectedSeason.map( d => d.us_viewers_in_millions)
      var episode = selectedSeason.map( d => d.number_in_season)

      new Chart(document.getElementById("tyChart"), {
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
          responsive: false,
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

    






