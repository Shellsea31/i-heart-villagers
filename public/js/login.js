$(document).ready(function () {
  $(".sidenav").sidenav();

  $(".dropdown-trigger").dropdown();

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("icon_prefix");
  const passwordInput = document.getElementById("password");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const userLogin = {
      username: usernameInput.value.trim(),
      password: passwordInput.value.trim(),
    };

    console.log(userLogin);
    if (!userLogin.username || !userLogin.password) {
      return;
    }

    loginUser(userLogin.username, userLogin.password);
  });

  function loginUser(username, password) {
    // ajax request
    $.post("/api/login", {
      username: username,
      password: password,
    })
      .then(() => {
        window.location.replace("/main");
      })
      .catch((err) => {
        alert("Incorrect password or username.");
        console.log(err);
      });
  }
});
