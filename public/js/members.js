$(document).ready(() => {
  const userName = $("#member-name");
  const signOut = $("#signout");

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(userName).text(`Welcome ${data.username} !`);
  });
  $(signOut).click(() => {
    window.location.href = "/login.html";
  });
});
