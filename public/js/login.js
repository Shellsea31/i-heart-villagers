$(document).ready(function () {
  $(".sidenav").sidenav();

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("icon_prefix");
  const passwordInput = document.getElementById("password");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const userLogin = {
      username: usernameInput.value,
      password: passwordInput.value,
    };

    console.log(userLogin);
  });
});

$(".dropdown-trigger").dropdown();
