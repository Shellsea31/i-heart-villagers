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

      // console.log(newUser);
      // $(".member-name").text(newUser.username);

      updateUser(newUser);
    });
  });

  favBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // console.log(target);
      console.log(userId);

      fetch(`/api/favorites/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          data.forEach((villager) => {
            console.log(villager.name);
            fetch(`/api/${villager.name}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) =>
                // console.log(res)
                res.json()
              )
              .then((results) => {
                console.log(results);
                let col = document.createElement("div");
                col.setAttribute("class", "col s3");
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
                    <h4 class="logotext" id="villagerName">Agnes</h4>
                    <span class="card-title activator grey-text text-darken-4"
                      ><i class="material-icons right">more_vert</i></span
                    >
                    <a onclick="deleteVillager(event)" value="${villager.id}"
                      id="deleteBtn"
                      class="btn-floating btn-small waves-effect waves-light cyan"
                      ><i class="material-icons">add</i></a
                    >
                  </div>
                  <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4"
                      >Agnes<i class="material-icons right">close</i></span
                    >
                    <ul class="collection">
                      <li class="collection-item">Birthday:</li>
                      <li class="collection-item">Personality:</li>
                      <li class="collection-item">Hobby:</li>
                      <li class="collection-item">Species:</li>
                      <li class="collection-item">Catchphrase:</li>
                      <li class="collection-item">Fav Song:</li>
                      <img
                        class="responsive-img"
                        src="https://acnhcdn.com/drivesync/render/houses/pig17_313_Agnes.png"
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

  function deleteVillager(event) {
    console.log(event.target, event.target.getAttribute("value"));
    // id=event.target.getAttribute("value")

    // fetch(`/api/delete/${id}`)
  }

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
