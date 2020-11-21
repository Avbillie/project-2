/* eslint-disable no-unused-vars */
$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const usernameInput = $("input#user-name-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const reEnterpass = $("input#re-password-input");
  const alertDiv = $("#alertprompts");
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      reEnterpass: reEnterpass.val().trim()
    };

    if (!userData.username || !userData.email || !userData.password) {
      $(alertDiv).html(
        "<p class = 'alert'>Please enter a valid username, email address and password.</p>"
      );
      return;
    }
    if (userData.password !== userData.reEnterpass) {
      $(alertDiv).html("<p class = 'alert'>Passwords do not match.</p>");
      // eslint-disable-next-line no-else-return
      return;
    }
    signUpUser(userData.username, userData.email, userData.password);
    usernameInput.val("");
    emailInput.val("");
    passwordInput.val("");

    // specialChar.forEach(element => {
    //   if (userData.username === element) {
    //     $("p#alert").html("Username cannot contain special characters.");
    //     return;
    //   }
    // });

    // If we have an email and password, run the signUpUser function
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(username, email, password) {
    $.post("/api/signup", {
      username: username,
      email: email,
      password: password
    })
      .then(() => {
        ("Sign up successful, user created!");
        window.location.replace("/");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(err => {
        console.log(err);
        $(alertDiv).html(
          "<p class = 'alert'>Username or email address already exists.</p>"
        );
      });
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
