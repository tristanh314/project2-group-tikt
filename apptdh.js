// Function to find the minimum in an array of moments.
function minMoment(dates) {
    var start = moment(new Date(9999, 0, 1));
    dates.forEach((date) => {
        if (moment(date).isBefore(start)) {
              start = moment(date);
        }
    });
    return start
}

// Function to find the maximum of an array of dates
function maxMoment(dates) {
    var start = moment(new Date(1970, 0, 1));
    dates.forEach((date) => {
        if (moment(date).isAfter(start)) {
              start = moment(date);
        }
    });
    return start
}

// Fetch the episode data
d3.json("static/data/simpson_episodes.json").then(function(episodeData, err) {
    if (err) throw err;

    // Select the subject ID dropdown.
    var seasonMenu = d3.select("#selSeason");

    // Create a seasons array to hold all seasons included in the data set.
    var seasons = [];

    // Create a menuOptions array to hold the html for the drop down menu.
    var menuOptions = [];

    // Loop through the array of test subjects.
    episodeData.result.forEach(episode => {
        if (!seasons.includes(episode.season)) {
            // Push the new season to the array of included seasons.
            seasons.push(episode.season);
            // Create the option HTML for the subject.
            option = `<option value="${episode.season}">Season ${episode.season}</option>`
            // Push the option HTML to menuOptions.
            menuOptions.push(option);
        }
    });

    // Create an HTML string for the menu.
    menuHTML = menuOptions.join("");
        
    // Insert the HTML for #selSeason.
    seasonMenu.html(menuHTML);
});

// Function to render the bubble chart.
function renderBubble(canvas, season, catchphrase) {
    console.log(catchphrase);
    // Get the script data.
    d3.json("static/data/simpson_script.json").then(function(lineData, err) {
        if (err) throw err;

        // Console log data to check format.
        // console.log(lineData.result);

        // Get the episode data
        d3.json("static/data/simpson_episodes.json").then(function(episodeData, err) {
            if (err) throw err;

            // Cast needed variables as numbers and dates, respectively.
            episodeData.result.forEach(episode => {
                episode.id = +episode.id;
                episode.season = +episode.season;
                episode.imdb_rating = +episode.imdb_rating;
                episode.original_air_date = moment(episode.original_air_date).format("YYYY MM DD");
            });

            // Console log data to check format.
            // console.log(episodeData.result);

            // Create an array for episodes in the chosen season.
            var episodesInSeason = [];

            // Loop through all episodes, pushing those in the chosen season to episodesInSeason.
            episodeData.result.forEach(episode => {
                if (episode.season === season) {
                    episodesInSeason.push(episode);
                }
            });

            // Console log episodesInSeason to check the array.
            // console.log(episodesInSeason);

            // Loop through all episodes in the given season.
            episodesInSeason.forEach(episode => {
                // Add catchphrase_count key to each episode with initial value of 0.
                episode["catchphrase_count"] = 0;
                // Loop through all lines of dialogue.
                lineData.result.forEach(line => {

                    // If the line contains the catchphrase, increase the catchphrase count by 1.
                    if (line.normalized_text){
                        if (line.normalized_text.includes(catchphrase.toLowerCase()) && line.episode_id === episode.id) {
                            episode.catchphrase_count += 1;
                        }
                    }
                });
            });
            console.log(catchphrase);
            // Console log episodes in season to check formatting.
            // console.log(episodesInSeason);

            // Create variables for the chart data and chart options.
            var chartData = [];

            // Loop through all episodes in a given season.
            episodesInSeason.forEach(episode => {
                // Create a plotInfo object to hold the plotting information for the bubble.
                var plotInfo = {};
                // Include all necessary information in the plotInfo object.
                plotInfo["label"] = [`Episode ${episode.id}`];
                plotInfo["backgroundColor"] = "rgba(193,46,12,0.2)";
                plotInfo["borderColor"] = "rgba(193,46,12,1)";
                plotInfo["data"] = [{
                    x: episode.original_air_date,
                    y: episode.imdb_rating,
                    r: episode.catchphrase_count
                }];
                // Push plotInfo for the given episode to the chartData array.
                chartData.push(plotInfo);
            });
            
            // Console log chartData to check formatting.
            // console.log(chartData);

            // Set the options for the plot.
            chartOptions = {
                // responsive: false,
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: `Season ${season} Occurances of ${catchphrase}`
                }, 
                scales: {
                    yAxes: [{
                        ticks: {
                            min: Math.min(...episodesInSeason.map(episode => episode.imdb_rating)) - 1,
                            max: Math.max(...episodesInSeason.map(episode => episode.imdb_rating)) + 1
                        }, 
                        scaleLabel: {
                            display: true,
                            labelString: "IMDB Rating"
                        }
                    }],
                    xAxes: [{ 
                        type: "time",
                        ticks: {
                            min: minMoment(episodesInSeason.map(episode => episode.original_air_date)).subtract(1, "M"),
                            max: maxMoment(episodesInSeason.map(episode => episode.original_air_date)).add(1, "M")
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Original Air date"
                        }
                    }]
                }
            }

            // Render the bubble chart.
            new Chart(canvas, {
                type: 'bubble',
                data: {
                    labels: `Season ${season} Occurances of ${catchphrase}`,
                    datasets: chartData
                },
                options: chartOptions
            });
        });
    });
}