$(document).ready(() => {
  const submit = $("#submit");
  const userName = $("#userName");
  const title = $("#title");
  const text = $("#text");

  submit.on("submit", event => {
    event.preventDefault();

    const inputData = {
      userName: userName.val().trim(),
      title: title.val(),
      text: text.val()
    };

    // making the sure enters the user name, title and the blog text before they can submit

    if (!inputData.userName || !inputData.title || !inputData.text) {
      return;
    }
    blogData(inputData.userName, inputData.title, inputData.text);
    userName.val("");
    title.val("");
    text.val("");
  });

  function blogData(name, blogTitle, blogText) {
    $post("api/blog", {
      userName: name,
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
