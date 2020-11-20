/* eslint-disable no-unused-vars */
$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const usernameInput = $("input#user-name-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const reEnterpass = $("input#re-password-input");
  const userArr = [];
  // const specialChar = [
  //   "!",
  //   "@",
  //   "#",
  //   "$",
  //   "%",
  //   "^",
  //   "&",
  //   "*",
  //   "()",
  //   "{",
  //   "[",
  //   "}",
  //   "]",
  //   "|",
  //   ";",
  //   ":",
  //   "<",
  //   ">",
  //   "?",
  //   "/",
  //   "*",
  //   "-",
  //   "+",
  //   "~"
  // ];
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      reEnterpass: reEnterpass.val().trim()
    };
    userArr.push(userData);

    if (!userData.username || !userData.email || !userData.password) {
      $("p#alert").html(
        "Please enter a valid username, email address and password."
      );
      return;
    }
    if (userData.password !== userData.reEnterpass) {
      $("p#alert").html("Passwords do not match.");
      return;
    }
    userArr.forEach(element => {
      if (
        userData.email === element.email ||
        userData.username === element.username
      ) {
        $("p#alert").html("Username or Email address already exists.");
        return;
      }
    });
    // specialChar.forEach(element => {
    //   if (userData.username === element) {
    //     $("p#alert").html("Username cannot contain special characters.");
    //     return;
    //   }
    // });

    // If we have an email and password, run the signUpUser function
    signUpUser(userData.username, userData.password);
    usernameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(username, password) {
    $.post("/api/signup", {
      username: username,
      password: password
    })
      .then(() => {
        alert("Sign Up successful, Thank you!");
        window.location.replace("/");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
