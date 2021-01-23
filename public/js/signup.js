$(document).ready(function () {
  $(".sidenav").sidenav();

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

    console.log(userSignUp);
  });
});

$(".dropdown-trigger").dropdown();
