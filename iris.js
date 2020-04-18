<<<<<<< HEAD
//script tag to add to html: https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js

function harryPlotter(TING) {
    // get sample data for the plots
    d3.json("simpson_script.json").then( (sample) => {
    // bubble chart
    //  Create the Traces
    var trace1 = {
    x: data.organ,
    y: data.survival.map(val => Math.sqrt(val)),
    type: "box",
    name: "Cancer Survival",
    boxpoints: "all"
var data = sample.;
    var resultsArray = data.filter((fart) => {
      //data.id === TING;
      //console.log(fart.id);
      //console.log(TING);
      return String(fart.id) === TING;
    });
    //console.log(resultsArray);
    var response = resultsArray[0];
    var x_axis = response.otu_ids;
    var y_axis = response.sample_values;
    var size = response.sample_values;
    var color = response.otu_ids;
    var textz = response.otu_labels;
    
      var bub = {
        x: x_axis,
        y: y_axis,
        text: textz,
        mode: 'markers',
        marker: {
          size: size, 
          color: color
        }
      };
        
      var data = [bub];
      var layout = {
        xaxis: {title: "OTU ID"}, 
        title: "Belly Button Bacteria"
        
      };
    
      Plotly.newPlot('bubble', data, layout);
      // horizontal bar chart with a dropdown menu
      // to display the top 10 OTUs found in that individual
      var values = response.sample_values.slice(0,10);
      var labels = response.otu_ids.slice(0,10);
      var huv = response.otu_labels.slice(0,10);
          
          var bar_chart = [{
          type: 'bar',
          x: values,
          y: String(labels),
          hovertext: huv,
          orientation: 'h' 
        }];
        Plotly.newPlot("bar", bar_chart);
    });  
};
=======
<script>
function myFunction() {

    var request;
    var input1 = document.getElementById('sname');
    var input2 = document.getElementById('ename');
    var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var apikey =
        '&APPID=433b12b793d7ebc17989745c069a540b';
    var sum = api + input1.value + apikey;

    request = new XMLHttpRequest();

    request.open('GET', sum, true);
    request.onload = function () {

        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            console.log(data);
        } else {
            console.log(input1.value);
        }
    }

    request.send();
}
</script>

>>>>>>> f77f7c456c163712db74141ba79d8afc4be717c7
