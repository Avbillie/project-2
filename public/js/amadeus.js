$(document).ready(() => {
  // const searchValue= ${}

  // getting the name of the city and converting it to geo locations

  const name = "New York";
  getCityInfo(name);
  function getCityInfo(city) {
    $.post("/api/amadeus", {
      cityName: city
    })
      .then(data => {
        console.log(data);
        // window.location.replace("/members");
      })
      .catch(err => {
        console.log(err);
      });
  }
});
