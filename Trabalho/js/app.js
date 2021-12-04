var body = document.querySelector("body");
body.addEventListener("load", loadPersonalInfo());

function loadPersonalInfo() {
  let req = new XMLHttpRequest();

  req.onload = function () {
    let data = JSON.parse(this.responseText);
    let perfilSection = `
                    <div>
                    <img
                        id="picNathan3345"
                        src="${data.avatar_url}"
                        alt="foto perfil"
                    />
                    <div class="personalContainer">
                        <h2>${data.name} <br> (${data.login})</h2>
                        <div id="personalTextContainer">
                        <p>
                            <strong>Sobre mim:</strong>
                            ${data.bio}
                        </p>
                        <div id="git-stats">
                            <a target="_blank" href="${data.html_url}">
                                <img src="https://github-readme-stats.vercel.app/api?username=Nathan3345&show_icons=true&theme=dark&include_all_commits=true&count_private=true"/>
                            </a>
                        </div>
                        <div class="socialTextContainer">
                            <h3>Redes Sociais</h3>
                            <div id="socialContainer">
                            <a
                                target="_blank"
                                href="${data.html_url}"
                                ><img
                                class="socialImg"
                                src="img/github-svgrepo-com.svg"
                                alt=""
                            /></a>
                            <a
                                target="_blank"
                                href="${data.blog}"
                                ><img
                                class="socialImg"
                                src="img/linkedin-svgrepo-com.svg"
                                alt=""
                            /></a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                        `;

    document.getElementById("personal").innerHTML = perfilSection;
  };

  req.onerror = function () {
    alert(`Erro na request, error: "  ${this.status} - ${this.statusText} `);
  };
  req.open("GET", "https://api.github.com/users/Nathan3345");

  req.send();

  loadRepo();
}

function loadRepo() {
  let req = new XMLHttpRequest();

  req.onload = () => {
    let dataJson = JSON.parse(req.responseText);
    let repoContainerEl = document.querySelector("#repoAll");
    let allReposArr = [];

    for (let data of dataJson) {
      let repoUnit = `
                        <div class="repoUnit">
                        <a
                        target="_blank"
                        href="${data.html_url}"
                        >
                        <img class="repoImg" src="img/folder-svgrepo-com.svg" alt="" />
                        </a>
                        <div class="repoDesc">
                        <h3>${data.name}</h3>
                        <p>
                            ${data.description}
                        </p>
                        <h4>${data.updated_at}</h4>
                        </div>
                    </div>
                    `;

      allReposArr.push(repoUnit);
    }
    repoContainerEl.innerHTML = allReposArr.join("");
  };

  req.onerror = function () {
    alert(`Erro na request, error: "  ${this.status} - ${this.statusText} `);
  };
  req.open("GET", "https://api.github.com/users/Nathan3345/repos");

  req.send();
}

function search(searchIn) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      const dataJson = JSON.parse(xhr.responseText);
      const responseItems = dataJson.items;
      let searchContainer = document.querySelector("#searchContainer");
      let allSearchArr = [];

      for (let data of responseItems) {
        let responseUnit = `
                <a target="_blank" href="${data.html_url}" 
                  <div class="searchImgEl">
                        <img src="${data.avatar_url}" alt="resultado da pesquisa - imagem" />
                        <h4>Nome: ${data.login}</h4>
                  </div>
                </a>
                `;
        allSearchArr.push(responseUnit);
        if (allSearchArr.length == 5) {
          break;
        }
      }
      if (allSearchArr.length != 0 || allSearchArr.length != null) {
        searchContainer.innerHTML = allSearchArr.join("");
      } else {
        searchContainer.innerHTML = `
                  <div class="searchImgEl">
                        <h4>Nada encontrado, tente outra pesquisa</h4>
                  </div>
      `;
      }
      document.querySelector(".containerSearch").style.display = "block";
    }
  });

  let searchQuery = "https://api.github.com/search/users?q=" + searchIn.value;
  xhr.open("GET", searchQuery);
  xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
  xhr.onerror = function () {
    alert(`Erro na request, error: "  ${this.status} - ${this.statusText} `);
  };
  xhr.send();
}

let searchIn = document.querySelector("input[name=search]");
let searchBtn = document.getElementById("searchBtn");

searchIn.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    event.preventDefault();
    // Trigger the button element with a click
    searchBtn.click();
  }
});

searchBtn.addEventListener("click", function (event) {
  search(searchIn);
});