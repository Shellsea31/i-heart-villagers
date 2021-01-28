$(document).ready(function () {
  $(".sidenav").sidenav();
  $(".dropdown-trigger").dropdown();
  $(".modal").modal();

  let userId;
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.username);
    userId = data.id;
  });

  const searchInput = document.getElementById("searchInput");
  const searchForm = document.getElementById("searchForm");
  const villagerContent = document.getElementById("villagerContent");
  const favBtns = document.querySelectorAll(".favBtn");
  const username = document.getElementById("new-username");
  const updateForm = document.getElementById("updateForm");

  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newUsername = username.value.trim();

    $.get("/api/user_data").then(function (data) {
      const newUser = {
        username: newUsername,
        id: data.id,
      };

      updateUser(newUser);
    });
  });

  favBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      fetch(`/api/favorites/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          data.forEach((villager) => {
            fetch(`/api/${villager.name}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((results) => {
                let col = document.createElement("div");
                col.setAttribute("class", "col s12 m6 l4");
                let html = `
                <div class="card" id="CardHolder">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img
                      class="activator"
                      id="maiImg"
                      src="${results.photo}"
                    />
                  </div>
                  <div class="card-content">
                    <h4 class="logotext" id="villagerName">${results.name}</h4>
                    <span class="card-title activator grey-text text-darken-4"
                      ><i class="material-icons right">more_vert</i></span
                    >
                    <div class="delete">
                    <button value="${villager.id}" onclick="deleteVillager(e)"
                      class="btn-floating btn-small waves-effect waves-light cyan"
                      ><i class=" tiny material-icons">delete</i></button>
                    </div>
                  </div>
                  <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4"
                      >${results.name}<i class="material-icons right">close</i></span
                    >
                    <ul class="collection">
                      <li class="collection-item">Birthday: ${results.birthday}</li>
                      <li class="collection-item">Personality: ${results.personality}</li>
                      <li class="collection-item">Hobby: ${results.hobby}</li>
                      <li class="collection-item">Species: ${results.species}</li>
                      <li class="collection-item">Catchphrase: "${results.catchphrase}"</li>
                      <li class="collection-item">Fav Song: ${results.favoriteSong}</li>
                      <img
                        class="responsive-img"
                        src="${results.house}"
                      />
                    </ul>
                  </div>
                </div>`;
                col.innerHTML = html;
                const villagerContent = document.getElementById(
                  "villagerContent"
                );
                villagerContent.append(col);
              });
          });

          console.log(document.getElementsByClassName("delete"));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    character = searchInput.value.trim();
    searchCharacter(character);
    addVillager();
  });

  function updateUser(user) {
    fetch("/api/username", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

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
          UserId: userId,
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
