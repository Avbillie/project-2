$(document).ready(() => {
  const userName = $("#member-name");
  const blogPost = $("#blog");

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(userName).text(`Welcome ${data.username} !`);
  });
  $(blogPost).click(() => {
    window.location.href = "/blog.html";
  });
});
