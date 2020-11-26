$(document).ready(() => {
  const displayEl = $("#displayEl");
  const submitBtn = $("#submitBtn");
  // getting the name of the city and converting it to geo locations
  $(submitBtn).on("click", event => {
    event.preventDefault();
    const searchValue = $("#cityValue :selected").text();
    $.post("/api/amadeus", {
      cityName: searchValue
    })
      .then(data => {
        console.log(data);
        $(displayEl).html(`
        
          <div class="flights jumbotron" id="tours-activities">
              <div style='
              opacity: none!important;
              justify-content:center;
              margin: 0 auto!important;
              justify-content: center!important;
              align-items: center!important;
              width: max-content;
              text-align: center!important;
              '>
              <h2 class='text'>${data[1].name}</h2>
              <img class='picture'src="${data[1].pictures[0]}" alt="">
              </div>
            
              <div class='textbox jumbotron' style= ' 
              opacity: none!important;
              background-color:gray;
              color: white;
              padding: .5rem!important;
              margin: 1rem 1rem 0rem 1rem;
            >
            <p class='text'>${data[1].shortDescription}</p>
            </div>
          </div>
      
        `);
      })
      .catch(err => {
        console.log(err);
      });
  });
});
