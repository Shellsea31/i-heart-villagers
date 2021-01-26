$(document).ready(function () {
  $(".sidenav").sidenav();
  $(".dropdown-trigger").dropdown();

  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.username);
  });

  const searchInput = document.getElementById("searchInput");
  const searchForm = document.getElementById("searchForm");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    character = searchInput.value.trim();
    searchCharacter(character);


  });

  function searchCharacter(name) {
    fetch(`/api/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        html = `<div class="card" id="CardHolder">
        <div class="card-image waves-effect waves-block waves-light">
          <img
            class="activator"
            id="maiImg"
            src="${data.photo}"
          />
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4"
            >${data.name}<i class="material-icons right">more_vert</i></span
          >
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4"
            >${data.name}<i class="material-icons right">close</i></span
          >
          <ul class="collection">
            <li class="collection-item">Birthday: ${data.birthday} </li>
            <li class="collection-item">Personality: ${data.personality}</li>
            <li class="collection-item">Hobby: ${data.hobby}</li>
            <li class="collection-item">Species: ${data.species}</li>
            <li class="collection-item">Catchphrase: ${data.catchphrase}</li>
            <li class="collection-item">Fav Song: ${data.favoriteSong}</li>
          </ul>
        </div>
      </div>`

      console.log(html)
      })
      .catch((err) => console.log(err));
  }
});
