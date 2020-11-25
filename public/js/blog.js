$(document).ready(() => {
  const submit = $("#submit");
  const userName = $("#userName");
  const title = $("input#title");
  const text = $("textarea#text");
  const alertDiv = $("#alertprompts");
  $.get("/api/user_data").then(data => {
    $(userName).text(data.username);
  });

  submit.on("click", event => {
    event.preventDefault();
    alertDiv.text("");
    const inputData = {
      title: title.val(),
      text: text.val()
    };

    // making the sure enters the user name, title and the blog text before they can submit

    if (!inputData.title || !inputData.text) {
      $(alertDiv).append(
        "<p class = 'alert2'> You must include a title and text.</p>"
      );
      return;
      // eslint-disable-next-line no-else-return
    } else {
      $(alertDiv).append("<p class = 'alert3'>Blog posted succesfully!</p>");
    }

    blogData(inputData.title, inputData.text);

    title.val("");
    text.val("");
  });

  function blogData(blogTitle, blogText) {
    $.post("/api/blog", {
      title: blogTitle,
      text: blogText
    })
      .then(() => {
        window.location.replace("/members");
      })
      .catch(err => {
        console.log(err);
      });
  }
});
