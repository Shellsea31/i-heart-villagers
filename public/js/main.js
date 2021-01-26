$(document).ready(function () {
  $(".sidenav").sidenav();
  $(".dropdown-trigger").dropdown();

  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.username);
  });

  const searchInput = document.getElementById("searchInput");
  console.log(searchInput);
});
