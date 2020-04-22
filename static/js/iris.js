

function makeGraph(TING) {
  d3.json("static/data/simpson_script.json").then((sample) => { 
    // Remove the old canvas.
    var oldCanvas = document.getElementById("myChart");
    oldCanvas.parentNode.removeChild(oldCanvas);

    // Add the canvas to the chart div.
    var chartDiv = document.getElementById("myChart-div");
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "myChart");
    canvas.setAttribute("width", "1000");
    canvas.setAttribute("height", "500");
    chartDiv.appendChild(canvas);

    var metadata = sample.result; 
    //console.log(metadata);
    var resultsArray = metadata.filter((data) => String(data.episode_id) === TING);
    //console.log(resultsArray);
    var bart = 0;
    var homer = 0;
    var marge = 0;
    var lisa = 0;
    var skinner = 0;
    var flanders = 0;
    var milhouse = 0;
    var burns = 0;
    var krusty = 0;
    var lovejoy = 0;
    for (var i = 0; i < resultsArray.length; i++) {
      var currentLine = resultsArray[i];
      var currentSpeaker = String(currentLine.character_id); //THIS IS A NUMBER
      if (currentSpeaker === "8") {
        bart += 1
      }
      else if (currentSpeaker === "2") {
        homer += 1
      }
      else if (currentSpeaker === "1") {
        marge += 1
      }
      else if (currentSpeaker === "9") {
        lisa += 1
      }
      else if (currentSpeaker === "3") {
        skinner += 1
      }
      else if (currentSpeaker === "11") {
        flanders += 1
      }
      else if (currentSpeaker === "25") {
        milhouse += 1
      }
      else if (currentSpeaker === "15") {
        burns += 1
      }
      else if (currentSpeaker === "139") {
        krusty += 1
      }
      else if (currentSpeaker === "140") {
        lovejoy += 1
      }
    };
    //console.log(bart);
    var darta = [bart, homer, marge, lisa, skinner, flanders, milhouse, burns, krusty, lovejoy];
    var larbels = ["Bart", "Homer", "Marge", "Lisa", "Skinner", "Flanders", "Milhouse", "Burns", "Krusty", "Lovejoy"];
    //console.log(larbels);
    var myChart = new Chart(canvas, {
      type: 'bar',
      data: {
          datasets: [{
              label: 'Bar Dataset',
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: darta
          }],
          labels: larbels
      },
      options: {
        maintainAspectRatio: true
      }
    });
  });
}


function init() {
    // reff to the dropdown select element
    var selection = d3.select("#selDataset");  
    // list of sample names used as select options
    d3.json("static/data/simpson_episodes.json").then((data) => {
      var episodeSample = data.result;
      episodeSample.sort((a, b) => (a.id-b.id));
      //console.log(episodeSample);
        episodeSample.forEach((sample) => {
            selection
            .append("option")
            .text(sample.id)
            .property("value", sample.id);
        });
        // build the initial plots w/ first sample
        makeGraph("1");
    });
  };


function optionChanged(sampleNew) {
    // get new data each time a new sample is selected
    makeGraph(sampleNew);
};
// Initialize the dashboard
init();


