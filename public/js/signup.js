/* eslint-disable no-unused-vars */
$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const reEnterpass = $("input#re-password-input");
  const userArr = [];
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      reEnterpass: reEnterpass.val().trim()
    };
    userArr.push(userData.email);

    if (!userData.email || !userData.password) {
      $("p#alert").html("Please enter a valid email address and password.");
      return;
    }
    if (userData.password !== userData.reEnterpass) {
      $("p#alert").html("Passwords do not match.");
      return;
    }

    userArr.forEach(element => {
      if (userData.email === element) {
        $("p#alert").html("Email already exists.");
        return;
      }
    });

    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
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
