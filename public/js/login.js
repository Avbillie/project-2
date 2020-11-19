$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const passwordArr = [];

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    passwordArr.push(userData);

    if (!userData.email || !userData.password) {
      return $("p#alert").html("Enter a valid email and password.");
    }
    passwordArr.forEach(element => {
      if (userData.password !== element.password) {
        $("p#alert").html("Access Denied, invalid password.");
        return;
      }
      if (userData.email !== element.email) {
        $("p#alert").html("Access Denied, invalid email.");
        return;
      }
      if (
        userData.email &&
        userData.password !== element.email &&
        element.password
      ) {
        $("p#alert").html("Access Denied, user does not exist.");
      }
    });
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
        return;
      });
  }
});
