$(document).ready(function () {
  $(".sidenav").sidenav();
  $(".dropdown-trigger").dropdown();

  const signUpForm = document.getElementById("signupForm");
  const usernameInput = document.getElementById("icon_prefix");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  signUpForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const userSignUp = {
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };


    if (!userSignUp.username || !userSignUp.email || !userSignUp.password) {
      return;
    }

    signUpUser(userSignUp.username, userSignUp.email, userSignUp.password);
  });

  function signUpUser(username, email, password) {
    $.post("/api/signup", {
      username: username,
      email: email,
      password: password,
    })
      .then((data) => {
        window.location.replace("/main");
        // If there's an error, handle it by throwing up an alert
      })
      .catch((err) => {
        alert("Something went wrong. Try again.");
        console.log(err);
      });
  }
});
