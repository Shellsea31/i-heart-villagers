$(document).ready(function () {
  $(".sidenav").sidenav();
  $(".dropdown-trigger").dropdown();
  $('.modal').modal();

  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.username);
  });

  const searchInput = document.getElementById("searchInput");
  const searchForm = document.getElementById("searchForm");
  const villagerContent = document.getElementById("villagerContent");
  const favBtns = document.querySelectorAll(".favBtn");

  favBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
    
        // fetch(`/api/favorites/${}`, {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log(data);
        //   });


      });
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    character = searchInput.value.trim();
    searchCharacter(character);
    addVillager();
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

        let html = `<div class="card" id="CardHolder">
        <div class="card-image waves-effect waves-block waves-light">
          <img
            class="activator"
            id="maiImg"
            src="${data.photo}"
          />
        </div>
        <div class="card-content">
         <h4 class="logotext" id="villagerName">${data.name}</h4>
          <span class="card-title activator grey-text text-darken-4"
            ><i class="material-icons right">more_vert</i></
          >
          <a id="addBtn" class="btn-floating btn-small waves-effect waves-light cyan"><i class="material-icons">add</i></a>
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
            <li class="collection-item">Catchphrase: "${data.catchphrase}"</li>
            <li class="collection-item">Fav Song: ${data.favoriteSong}</li>
            <img class="responsive-img" src="${data.house}">
          </ul>
        </div>
      </div>`;

        villagerContent.innerHTML = html;
        const addBtn = document.getElementById("addBtn");
        const villagerName = document.getElementById("villagerName");
        addVillager(addBtn, villagerName);
      })
      .catch((err) => {
        console.log(err);
        alert(
          "Sorry, we couldn't find the villager you're looking for, check your spelling."
        );
      });
  }

  function addVillager(addBtn, villagerName) {
    if (addBtn) {
      addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const newVillager = {
          name: villagerName.innerText,
        };

        fetch("/api/character", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVillager),
        })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }
});
