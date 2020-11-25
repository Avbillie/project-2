//date object
const calendar = $("#calendar-container");
const calendarImg = $("#calendar-image");
const dateC = $("#dateId");
const date = new Date();

// render function
const renderCalendar = () => {
  date.setDate(1);
  //document.querySelector('.days').getDay();
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const monthDays = document.querySelector(".days");
  console.log(monthDays);

  const firstDayIndex = date.getDay();
  console.log(date);

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();
  const nextDays = 7 - lastDayIndex - 1;

  //get month

  // const month = date.getMonth();
  // console.log(month);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  document.querySelector(".date p").innerHTML = new Date().toDateString();
  document.querySelector(".date2 h5").innerHTML = months[date.getMonth()];
  document.querySelector(".date2 p").innerHTML = new Date().toDateString();

  //display the days
  let days = "";

  for (let i = 0; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = firstDayIndex; j > 0; j--) {
    days += `<div class="prev-date">${prevLastDay - j + 1}</div>`;
  }

  for (let x = 1; x <= nextDays; x++) {
    days += `<div class="next-date">${x}</div>`;
    monthDays.innerHTML = days;
  }
};
$(dateC).on("click", () => {
  $(calendar).html(`
  <div id="calendar" class="jumbotron container mb-4" style="opacity: 0.8">
  <div class="calendar">
  <div class="month"><i class="fas fa-angle-left prev"></i>
    <div class="date2">
      <h5></h5>
      <p></p>
    </div>
    <i class="fas fa-angle-right next"></i>
  </div>
  <div class="weekdays">
    <div>Sun</div>
    <div>Mon</div>
    <div>Tue</div>
    <div>Wed</div>
    <div>Thu</div>
    <div>Fri</div>
    <div>Sat</div>
  </div>
  <div class="days">
  </div>
</div>
</div>`);
  $(calendarImg).html(`
<div id="bloglist" class="jumbotron container mb-4" style="opacity: 0.8">
<h3>Recent Blogs</h3>
</div>
`);
  $(".prev").on("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });
  $(".next").on("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });
  renderCalendar();
});
renderCalendar();

$(".prev").on("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});
$(".next").on("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});
/* <div id="bloglist" class="jumbotron container mb-4" style="opacity: 0.8">
<h3>Most viewed blogs</h3>
</div> */
