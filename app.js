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

