// Function to run when the page first loads.
function init() {
    
    // Select the canvas to contain the bubble chart.
    var canvas = document.getElementById("tdhchart");

    // Set the initial season.
    var season = 1;

    // Set the initial catchphrase.
    var catchphrase = "homer";
    
    // Render the initial bubble chart.
    renderBubble(canvas, season, catchphrase);
}

// Function to run when a selection changes.
function optionChanged() {

    // Select the canvas to contain the bubble chart.
    var canvas = document.getElementById("tdhchart");

    // Get the season.
    var season = parseInt(d3.select("#selSeason").property("value"));

    // Get the catchphrase.
    var catchphrase = d3.select("#input-catchphrase").property("value"); 

    // Render the new bubble chart.
    renderBubble(canvas, season, catchphrase);
}

// Call optionChanged() when a change takes place to the DOM
d3.select("#input-catchphrase").on("change", optionChanged);
d3.select("#selDataset").on("change", optionChanged);

// Run the init function
init();