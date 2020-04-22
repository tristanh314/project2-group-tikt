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
function renderBubble(season, catchphrase) {
    
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
                episode.original_air_date = new Date(episode.original_air_date);
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

            // Console log episodes in season to check formatting.
            // console.log(episodesInSeason);

            // Create arrays for x coords, y coords, radii, colors, and hovertext.
            var xCoords = episodesInSeason.map(episode => episode.original_air_date);
            var yCoords = episodesInSeason.map(episode => episode.imdb_rating);
            var radii = episodesInSeason.map(episode => 5 * episode.catchphrase_count);
            var colors = episodesInSeason.map(episode => "rgba(193,46,12,0.5)");
            var hovertext = episodesInSeason.map(episode => `${catchphrase} meantioned ${episode.catchphrase_count} times in ${episode.title}`);
            
            var trace = {
                x: xCoords,
                y: yCoords,
                text: hovertext,
                mode: "markers",
                marker: {
                    color: colors,
                    size: radii
                }
            };
        
            // Create the plotting data array from trace.
            var plotData = [trace];
            
            // Create a layout for the plot.
            var layout = {
                title: "Phrase Count Per Episode",
                xaxis: { title: "Original Air Date" },
                yaxis: { title: "IMDB Rating"},
                plot_bgcolor: "#FED90F",
                paper_bgcolor: "#FED90F"
            };

            // Create a config for the bubble chart.
            var config = { responsive: true };
    
            // Render the bubble chart.
            Plotly.newPlot("chart-div", plotData, layout, config);
        });
    });
}

// Function to update the bubble chart.
function updateBubble(season, catchphrase) {
    
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
                episode.original_air_date = new Date(episode.original_air_date);
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

            // Console log episodes in season to check formatting.
            // console.log(episodesInSeason);

            // Create arrays for x coords, y coords, radii, colors, and hovertext.
            var xCoords = episodesInSeason.map(episode => episode.original_air_date);
            var yCoords = episodesInSeason.map(episode => episode.imdb_rating);
            var radii = episodesInSeason.map(episode => 5 * episode.catchphrase_count);
            var colors = episodesInSeason.map(episode => "rgba(193,46,12,0.5)");
            var hovertext = episodesInSeason.map(episode => `${catchphrase} meantioned ${episode.catchphrase_count} times in ${episode.title}`);
            
            // Restyle the bubble chart.
            Plotly.restyle("chart-div", "x", [xCoords]);
            Plotly.restyle("chart-div", "y", [yCoords]);
            Plotly.restyle("chart-div", "marker", [{ color: colors, size: radii }]);
            Plotly.restyle("chart-div", "text", [hovertext]);
        });
    });
}

// Function to run when the page first loads.
function inittdh() {

    // Set the initial season.
    var season = 1;

    // Set the initial catchphrase.
    var catchphrase = "homer";
    
    // Render the initial bubble chart.
    var chart = renderBubble(season, catchphrase);
}

// Function to run when a selection changes.
function optionChangedtdh() {

    // Get the season.
    var season = parseInt(d3.select("#selSeason").property("value"));

    // Get the catchphrase.
    var catchphrase = d3.select("#input-catchphrase").property("value"); 

    // Render the initial bubble chart.
    updateBubble(season, catchphrase)
}

// Call optionChanged() when a change takes place to the DOM
d3.select("#input-catchphrase").on("change", optionChangedtdh);
d3.select("#selSeason").on("change", optionChangedtdh);

// Run the init function
inittdh();