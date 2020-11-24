//date object
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

  document.querySelector(".date h5").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

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

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
