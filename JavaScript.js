(function () {
    var pubnub = PUBNUB.init({ publish_key: 'pub-c-6a121d53-b962-4a48-b425-10281417b24d', subscribe_key: 'sub-c-9e12300c-4af3-11e7-bf50-02ee2ddab7fe', uuid: 'mannbyUUID', ssl: true });
    var box = PUBNUB.$('box'), input = PUBNUB.$('input'), channel = 'RpiGate';

    pubnub.subscribe({
        channel: channel,
        //callback: function (text) { console.log("Temperature 1: " + text["Temperature 1"] + "\nTemperature 2: " + text["Temperature 2"]) }
        //callback: function (text) { box.innerHTML = (JSON.stringify(text)).replace(/[<>]/g, '') + '<br>' + box.innerHTML }
        //callback: function (text) { box.innerHTML = ("Temperature 1: " + text["Temperature 1"] + "  Temperature 2: " + text["Temperature 2"]).replace(/[<>]/g, '') + '<br>' + box.innerHTML }
        callback: function (text) {
            glassRoomTemp.innerHTML = (text["Glassroom"] + "°C");
            livingRoomTemp.innerHTML = (text["indoor"] + "°C");
            outsideNorthTemp.innerHTML = (text["Outdoor north"] + "°C");
            outsideSouthTemp.innerHTML = (text["Outdoor south"] + "°C");

            poolTemp.innerHTML = (text["Pool"] + "°C");
            poolHeatTemp.innerHTML = (text["Poolheat"] + "°C");
            //minMaxIn.innerHTML = (text["Poolheat"] + "°C");

            getTime();
        }
    });

    //PUBNUB.bind('keyup', input, function (e) {
    //    (e.keyCode || e.charCode) === 13 && pubnub.publish({
    //        channel: channel, message: input.value, x: (input.value = '')
    //    })
    //})
})();


function getTime() {

    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    if (m < 10) {
        m = '0' + m;
    }
    //var s = d.getSeconds();
    //var updateTime = h + ":" + m + ":" + s;
    var updateTime = d.toLocaleTimeString();
    var headerTime = h + ':' + m;

    time.innerHTML = headerTime;

    // console.log("Time: " + updateTime);


}

$(document).ready(function () {
    getWeather(); //Get the initial weather.
    setInterval(getWeather, 600000); //Update the weather every 10 minutes.
});

function convert(f) {
    return Math.round((f-32) * 5/9);
}

function kphToMps(k) {
    return Math.round(k / 3.6);
}

var transCode = {
    0: 'Tornado',
    1: 'Tropisk storm',
    2: 'Orkan',
    3: 'Kraftiga åskväder',
    4: 'Åskväder',
    5: 'Blandat regn och snö',
    6: 'Blandat regn och slask',
    7: 'Blandat snö och slask',
    8: 'Underkylt duggregn',
    9: 'Duggregn',
    10: 'Underskylt regn',
    11: 'Regnskurar',
    12: 'Regnskurar',
    13: 'Snöbyar',
    14: 'Lätta snöbyar',
    15: 'Snöyra',
    16: 'Snö',
    17: 'Hagel',
    18: 'Snöblandat regn',
    19: 'Damm',
    20: 'Dimmigt',
    21: 'Disigt',
    22: 'Rökig',
    23: 'Stormigt',
    24: 'Blåsigt',
    25: 'Kyligt',
    26: 'Molnigt',
    27: 'Mestadels molnigt',
    28: 'Mestadels molnigt',
    29: 'Delvis molnigt',
    30: 'Delvis molnigt',
    31: 'Klart',
    32: 'Soligt',
    33: 'Fint',
    34: 'Fint',
    35: 'Blandat regn och hagel',
    36: 'Varmt',
    37: 'Enstaka åskväder',
    38: 'Spridda åskväder',
    39: 'Spridda åskväder',
    40: 'Spridda skurar',
    41: 'Tung snö',
    42: 'Spridda snöbyar',
    43: 'Tung snö',
    44: 'Delvis molnigt',
    45: 'Åskskurar',
    46: 'Snöbyar',
    47: 'Enstaka åskskurar',
    3200: 'NaN'

};


function getWeather() {
    $.simpleWeather({
        location: '',
        woeid: '887417', //Bracksta, Uppland
        unit: 'f',

        success: function (weather) {
            //html = '<h2>' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
            //html += '<ul><li>' + weather.city + ', ' + weather.region + '</li>';
            ////html += '<img style="float:left;" width="125px" src="' + weather.image + '">';
            //html += '<li class="currently">' + weather.currently + '</li>';
            //html += '<li>' + weather.wind.direction + '</li>';
            //html += '<li>' + weather.wind.speed + weather.units.speed + '</li>';
            //html += '<img style="float:left;" width="125px" src="images/weather/' + weather.code + '.svg">';
            //html += '<img style="float:left;" width="125px" src="images/weather/' + weather.forecast[1].code + '.svg">';
            //html += '<img style="float:left;" width="125px" src="images/weather/' + weather.forecast[2].code + '.svg">';
            ////html += '<li>' + weather.alt.temp + '&deg;C</li></ul>';

            //forcastDay0.innerHTML = weather.city + ', ' + weather.region;
            //Weather updated
            //var timestamp = moment(weather.updated);
            //lastUpdate.innerHTML = 'Weather updated ' + moment(timestamp).fromNow();
            lastUpdate.innerHTML = weather.updated;

            //Today
            todayTemp.innerHTML = convert(weather.temp) + '&deg;C';
            // windChill.innerHTML = convert(weather.wind.chill) + '&deg;C';
            currently.innerHTML = transCode[weather.code];
            dayHigh.innerHTML = convert(weather.high) + '&deg';
            dayLow.innerHTML = convert(weather.low) + '&deg';
            wind.innerHTML = 'Vind ' + weather.wind.direction + ' ' + kphToMps(weather.wind.speed) + ' m/s';
            pressure.innerHTML = 'Barometer ' + Math.round(weather.pressure) + ' mbar';
            document.getElementById('idImgDay').src = "images/weather/" + weather.code + ".svg";

            //Forcast day 1
            day1.innerHTML = weather.forecast[1].day;
            forecast1.innerHTML = transCode[weather.forecast[1].code];
            day1High.innerHTML = convert(weather.forecast[1].high) + '&deg';
            day1Low.innerHTML = convert(weather.forecast[1].low) + '&deg';
            document.getElementById('idImg1').src = "images/weather/" + weather.forecast[1].code + ".svg";

            //Forcast day 2
            day2.innerHTML = weather.forecast[2].day;
            forecast2.innerHTML = transCode[weather.forecast[2].code];
            day2High.innerHTML = convert(weather.forecast[2].high) + '&deg';
            day2Low.innerHTML = convert(weather.forecast[2].low) + '&deg';
            document.getElementById('idImg2').src = "images/weather/" + weather.forecast[2].code + ".svg";

            //Forcast day 3
            day3.innerHTML = weather.forecast[3].day;
            forecast3.innerHTML = transCode[weather.forecast[3].code];
            day3High.innerHTML = convert(weather.forecast[3].high) + '&deg';
            day3Low.innerHTML = convert(weather.forecast[3].low) + '&deg';
            document.getElementById('idImg3').src = "images/weather/" + weather.forecast[3].code + ".svg";

            //$("#weather").html(html);
            $("#weatherError").html('<p></p>');
        },
        error: function (error) {
            console.log(error);
            //$("#weatherError").html('<p>' + error + '</p>');
        }
    });
}
