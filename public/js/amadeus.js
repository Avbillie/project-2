$(document).ready(() => {
  // getting the name of the city and converting it to geo locations
  $("#submitBtn").on("click", () => {
    const searchValue = $("#cityValue :selected").text();

    getCityInfo(searchValue);
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
});
