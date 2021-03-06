$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const userNameInput = $("input#username-input");
  const passwordInput = $("input#password-input");
  const alertDiv = $("#alertprompts");
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();

    const userData = {
      username: userNameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      $(alertDiv).html(
        "<p class = 'alert'>Enter a valid username and password.</p>"
      );
      return;
    }
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    userNameInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) {
    $.post("/api/", {
      username: username,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
        $(alertDiv).html("<p class ='alert'>Invalid username or password.</p>");
        return;
      });
  }
});
