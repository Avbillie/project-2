// $(document).ready(() => {

//   // getting the name of the city and converting it to geo locations
//   // $("#submitBtn").on("click", event => {
//   //   event.preventDefault;
//   //   const searchValue = $("#cityValue :selected").text();

//   //   getCityInfo(searchValue);
//   //   function getCityInfo(city) {
//   //     $.post("/api/amadeus", {
//   //       cityName: city
//   //     })
//   //       .then(data => {
//   //         console.log(data);
//   //         // window.location.replace("/members");
//   //       })
//   //       .catch(err => {
//   //         console.log(err);
//   //       });
//   //   }
//   // });

//    const searchValue = "New York"; 
//    getCityInfo(searchValue);

//    function getCityInfo(city) {
//      $.post("/api/amadeus", {
//          cityName: city
//        })
//        .then(data => {
//          console.log(data);
//          renderEl1(data);
//          // window.location.replace("/members");
//        })
//        .catch(err => {
//          console.log(err);
//        });
//    }

// function renderEl1(data) {
//   $("#displayEl").empty();
//   const div = $(" <div class = 'col-md-2> ");
//   const name = $("<h2>");
//   name.text(`Name: ${data[0].name}`);
//   console.log(data[0].name);
//   const img = $("<img>");
//   const imgSrc = data[0].pictures[0];
//   img.attr("src", imgSrc);
//   const placeDes = $("<p>");
//   placeDes.text(data[0].shortDescription);
//   const booking = $("<p>");
//   booking.text(`Book your tickets here: ${data[0].bookingLink}`);
//   div.append(name, img, placeDes, booking);
//   $("#displayEl").append(div);
//   renderEl2(data);
// }

// function renderEl2(data) {
//   const div = $(" <div class = 'col-md-2> ");
//   const name = $("<h2>");
//   name.text(`Name: ${data[1].name}`);
//   const img = $("<img>");
//   const imgSrc = data[1].pictures[0];
//   img.attr("src", imgSrc);
//   const placeDes = $("<p>");
//   placeDes.text(data[1].shortDescription);
//   const booking = $("<p>");
//   booking.text(`Book your tickets here: ${data[1].bookingLink}`);
//   console.log(data[1].bookingLink)
//   div.append(name, img, placeDes, booking);
//   $("#displayEl").append(div);
//   renderEl3(data);
// }

// function renderEl3(data) {
//   const div = $("<div class='col-md-2>");
//   const name = $("<h2>");
//   name.text(`Name: ${data[2].name}`);
//   const img = $("<img>");
//   const imgSrc = data[2].pictures[0];
//   img.attr("src", imgSrc);
//   const placeDes = $("<p>");
//   placeDes.text(data[2].shortDescription);
//   console.log(data[2].shortDescription);
//   const booking = $("<p>");
//   booking.text(`Book your tickets here: ${data[2].bookingLink}`);
//   div.append(name, img, placeDes, booking);
//   $("#displayEl").append(div);
// }

// });

// this function will grab the data received from amadeus and render the elements 

$(document).ready(() => {
      
      const submitBtn = $("#submitBtn");
      // getting the name of the city and converting it to geo locations
      $(submitBtn).on("click", event => {
        event.preventDefault;
        const searchValue = $("#cityValue").val();
        // const searchValue = $("#cityValue :selected").text();
        $.post("/api/amadeus", {
            cityName: searchValue
          })
          .then(data => {
            console.log(data);
            $(displayEl).html(`
          <div class="jumbotron row container" style="opacity: 0.8">
          <div class="jumbotron flights" id="tours-activities" style="opacity: 0.8">
            <h1>${data[1].name}</h1>
            <img src="${data[1].pictures[0]}" alt="">
            <p>${data[1].shortDescription}</p>
          </div>
        </div>
        `);
          })
          .catch(err => {
            console.log(err);
          });
      });

    });
      // const submitBtn = $("#submitBtn");

//       $(submitBtn).on("submit", event => {
//               event.preventDefault;
//               const searchValue = $("#cityValue :selected").text();
//               console.log(searchValue)
// });
//       const searchValue = "New York";
//               $.post("/api/amadeus", {
//                   cityName: searchValue
//                 })
//                 .then(data => {
//                   console.log(data);
//                   $(displayEl).html(`
//           <div class="jumbotron row container" style="opacity: 0.8">
//           <div class="jumbotron flights" id="tours-activities" style="opacity: 0.8">
//             <h1>${data[1].name}</h1>
//             <img src="${data[1].pictures[0]}" alt="">
//             <p>${data[1].shortDescription}</p>
//           </div>
//         </div>
//         `);
//                 })
//                 .catch(err => {
//                   console.log(err);
//                 });
