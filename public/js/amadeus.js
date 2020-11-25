$(document).ready(() => {
  const apiKey = "&appid=df40e453f18e8b1150a67320b38cc787";

  // getting the name of the city and converting it to geo locations

  const name = "maldives";

  getLatLon(name);

  function getLatLon(cityName) {
    const queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(response => {
      geoLocation(response.coord.lat, response.coord.lon);
    });
  }

  function geoLocation(lat, lon) {
    $post("api/amadeus", {
      lat: lat,
      lon: lon
    })
      .then(() => {
        window.location.replace("/members");
      })
      .catch(err => {
        console.log(err);
      });
  }
});
