$(document).ready(function () {
  $(".sidenav").sidenav();
  $(".dropdown-trigger").dropdown();
  $(".modal").modal();

  let userId;
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.username);
    userId = data.id;
  });

  // DOM variables
  const searchInput = document.getElementById("searchInput");
  const searchForm = document.getElementById("searchForm");
  const villagerContent = document.getElementById("villagerContent");
  const username = document.getElementById("new-username");
  const updateForm = document.getElementById("updateForm");

  // click the welcome! button to update your username
  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newUsername = username.value.trim();

    $.get("/api/user_data").then(function (data) {
      const newUser = {
        username: newUsername,
        id: data.id,
      };

      // call function to update username
      updateUser(newUser);
    });
  });

  // both favorite buttons get user's favorite villagers
  $(".favBtn").each(function () {
    $(this).click(function () {
      fetch(`/api/favorites/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // call function to get villager info and append to page
          viewFavorites(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

  // search for your favorite villager
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    character = searchInput.value.trim();
    searchCharacter(character);
    addVillager();
  });

  // function to get villager names from villagers table, find them with npm and append info to page
  function viewFavorites(data) {
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
          col.setAttribute("class", "col s12 m6 l6");
          let html = `
          <div class="card" id="CardHolder">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" id="maiImg" src="${results.photo}" />
        </div>
        <div class="card-content">
          <h4 class="logotext" id="villagerName">${results.name}</h4>
          <span class="card-title activator grey-text text-darken-4"
            ><i class="material-icons right">more_vert</i></span
          >
          <button value="${villager.id}"
          class="waves-effect waves-light btn-small">Delete</button>
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
            <li class="collection-item">
              Catchphrase: "${results.catchphrase}"
            </li>
            <li class="collection-item">Fav Song: ${results.favoriteSong}</li>
            <img class="responsive-img" src="${results.house}" />
          </ul>
        </div>
      </div>`;
          col.innerHTML = html;
          const villagerContent = document.getElementById("villagerContent");
          villagerContent.append(col);

          $("button").on("click", function () {
            console.log(this.getAttribute("value"));
            const id = this.getAttribute("value");

            fetch(`/api/delete/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(() => {
                window.location.reload();
              })
              .catch((err) => console.log(err));
          });
        });
    });
  }

  // function to update your username
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

  // function to search for a villager by name with animal-crossing npm and append them to main page with their info
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
          <img class="activator" id="maiImg" src="${data.photo}" />
        </div>
        <div class="card-content">
          <h4 class="logotext" id="villagerName">${data.name}</h4>
          <span class="card-title activator grey-text text-darken-4"
            ><i class="material-icons right">more_vert</i></span
          >
          <a
            id="addBtn"
            class="btn-floating btn-small waves-effect waves-light cyan"
            ><i class="material-icons">add</i></a
          >
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4"
            >${data.name}<i class="material-icons right">close</i></span
          >
          <ul class="collection">
            <li class="collection-item">Birthday: ${data.birthday}</li>
            <li class="collection-item">Personality: ${data.personality}</li>
            <li class="collection-item">Hobby: ${data.hobby}</li>
            <li class="collection-item">Species: ${data.species}</li>
            <li class="collection-item">Catchphrase: "${data.catchphrase}"</li>
            <li class="collection-item">Fav Song: ${data.favoriteSong}</li>
            <img class="responsive-img" src="${data.house}" />
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

  // function to add villager to villagers table with UserId corresponding to the current user's id
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
