(function () {
  var pubnub = PUBNUB.init({
    publish_key: 'pub-c-6a121d53-b962-4a48-b425-10281417b24d',
    subscribe_key: 'sub-c-9e12300c-4af3-11e7-bf50-02ee2ddab7fe',
    uuid: 'mannbyUUID',
    ssl: true
  });
  var box = PUBNUB.$('box'),
    input = PUBNUB.$('input'),
    channel = 'RpiGate';

  pubnub.subscribe({
    channel: channel,
    callback: function (text) {
      if (text["Glassroom"] === "-99.9") {
        glassRoomTemp.innerHTML = ("--.-" + "°C");
      } else {
        glassRoomTemp.innerHTML = (text["Glassroom"] + "°C");
      }

      if (text["indoor"] === "-99.9") {
        livingRoomTemp.innerHTML = ("--.-" + "°C");
      } else {
        livingRoomTemp.innerHTML = (text["indoor"] + "°C");
      }

      if (text["Outdoor north"] === "-99.9") {
        outsideNorthTemp.innerHTML = ("--.-" + "°C");
      } else {
        outsideNorthTemp.innerHTML = text["Outdoor north"] + "°C n";
      }

      if (text["Outdoor south"] === "-99.9") {
        outsideSouthTemp.innerHTML = ("--.-" + "°C");
      } else {
        outsideSouthTemp.innerHTML = text["Outdoor south"] + "°C";
      }

      if (text["Garage"] === "-99.9") {
        garageTemp.innerHTML = ("--.-" + "°C");
      } else {
        garageTemp.innerHTML = (text["Garage"] + "°C");
      }

      if (text["Pool"] === "-99.9") {
        poolTemp.innerHTML = ("--.-" + "°C");
      } else {
        poolTemp.innerHTML = (text["Pool"] + "°C");
      }

      if (text["Poolheat"] === "-99.9") {
        poolHeatTemp.innerHTML = ("--.-" + "°C");
      } else {
        poolHeatTemp.innerHTML = (text["Poolheat"] + "°C");
      }
      //minMaxIn.innerHTML = (text["Poolheat"] + "°C");
      // Show/hide mouse direction
      // console.log(text["Mouse trapped"]);
      // var mouse = document.getElementById("icon-mouse-trap");
      // if (text["Mouse trapped"] === "Trip") {
      //   mouse.style.display = "inline";
      // } else {
      //   mouse.style.display = "none";
      // }
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

  mainHeader.innerHTML = `Home Monitor ${headerTime}`;

  // console.log("Time: " + updateTime);


}