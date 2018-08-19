$(document).ready(function () {
  console.log('Document ready')

});

function updateDOM(res) {
  //  console.log(res)
  if (res["Glassroom"] === "-99.9") {
    glassRoomTemp.innerHTML = ("--.-" + "°C");
  } else if (res["Glassroom"]) {
    glassRoomTemp.innerHTML = (res["Glassroom"] + "°C");
  }

  if (res["indoor"] === "-99.9") {
    livingRoomTemp.innerHTML = ("--.-" + "°C");
  } else if (res["indoor"]) {
    livingRoomTemp.innerHTML = (res["indoor"] + "°C");
  }

  if (res["Outdoor north"] === "-99.9") {
    outsideNorthTemp.innerHTML = ("--.-" + "°C");
  } else if (res["Outdoor north"]) {
    outsideNorthTemp.innerHTML = res["Outdoor north"] + "°C";
  }

  if (res["Outdoor south"] === "-99.9") {
    outsideSouthTemp.innerHTML = ("--.-" + "°C");
  } else if (res["Outdoor south"]) {
    outsideSouthTemp.innerHTML = res["Outdoor south"] + "°C";
  }

  if (res["Garage"] === "-99.9") {
    garageTemp.innerHTML = ("--.-" + "°C");
  } else if (res["Garage"]) {
    garageTemp.innerHTML = (res["Garage"] + "°C");
  }

  if (res["Pool"] === "-99.9") {
    poolTemp.innerHTML = ("--.-" + "°C");
  } else if (res["Pool"]) {
    poolTemp.innerHTML = (res["Pool"] + "°C");
  }

  if (res["Poolheat"] === "-99.9") {
    poolHeatTemp.innerHTML = ("--.-" + "°C");
  } else if (res["Poolheat"]) {
    poolHeatTemp.innerHTML = (res["Poolheat"] + "°C");
  }
  //minMaxIn.innerHTML = (res["Poolheat"] + "°C");
  // Show/hide mouse direction
  // console.log(res["Mouse trapped"]);
  // var mouse = document.getElementById("icon-mouse-trap");
  // if (res["Mouse trapped"] === "Trip") {
  //   mouse.style.display = "inline";
  // } else {
  //   mouse.style.display = "none";
  // }
  
  getTime();
}

(function () {
  let pubnub = PUBNUB.init({
    publish_key: 'pub-c-6a121d53-b962-4a48-b425-10281417b24d',
    subscribe_key: 'sub-c-9e12300c-4af3-11e7-bf50-02ee2ddab7fe',
    uuid: 'mannbyUUID',
    ssl: true
  });

  let channel = 'RpiGate'

  pubnub.subscribe({
    channel: channel,
    callback: (res) => updateDOM(res),
    connect: () => {
      console.log('PubNub channel connected')
      pubnub.publish({
        channel: channel,
        message: 'connected'
      })
    }
  })
})()

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