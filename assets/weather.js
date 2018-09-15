
function APIcall(lat, lon){
    var APIkey = "6d0904d150c48c780a450173fe05427a";
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/6d0904d150c48c780a450173fe05427a/"+lat+","+lon;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        
        var summary = response.currently.summary; //summary is sunny, mostly cloudy, etc.
        var temperature = response.currently.temperature;//in farenheit.
        var nsd = response.currently.nearestStormDistance; //distance is in kilometers. Need to convert.
        var cNSD = nsd*0.62;//converts kilometers to miles.
        
        displayWeather(summary,temperature,cNSD);

        for (var i=0; i<3; i++){ //loop for 3 days of upcoming weather summary and temp.
            var dSum = response.daily.data[i+1].summary;//daily summary.
            var dTempH = response.daily.data[i+1].apparentTemperatureHigh;///daily High Temperature.
            var dTempL = response.daily.data[i+1].apparentTemperatureLow;//daily Low Temperature.
            var dTime = response.daily.data[i+1].time;
            var cTime = timeConverter(dTime);//this converts a UNIX timestamp to a readable date.
            var wTime = $("#date"+i);
            var sum = $("#summary"+i);
            var temH = $("#tempHi"+i);
            var temL = $("#tempLo"+i);
            wTime.text("[Date]:  "+cTime);
            sum.text("[Summary]:  "+dSum);
            temH.text("[Highest Temp]:  "+dTempH);
            temL.text("[Lowest Temp]:  "+dTempL);    
        };
    });
};

function displayWeather (sum, temperature, nsd) {
    $(".card-header").text("WEATHER");
    var cnsd = nsd.toFixed(1);//changes the number of decimal places to 1.
    var cTemp = temperature.toFixed(1);
    var summary = $("#summary");
    var temp = $("#temp");
    var near = $("#nsd");
    summary.text(sum);
    temp.text(cTemp+" Farenheit");
    near.text("Storm is " +cnsd+" miles away.");
};

function timeConverter(UNIX){
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var a = new Date(UNIX * 1000);//converts the UNIX stamp to seconds.
    var year = a.getFullYear();
    var month = months[a.getMonth()];//gets month of timestamp and places into array.
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var cTime = date + ' ' + month;
    
    return cTime;
};