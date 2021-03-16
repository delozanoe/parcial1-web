let favorities = JSON.parse(localStorage.getItem("favorities"));
let maxCheckBox = document.getElementById("maxCheckBox");
let buttondelete = document.getElementById("deleteallfav");
document.getElementById("deleteallfav").disabled = true;

function goDetail(id) {
  //alert('Probando' + id);
  localStorage.setItem("idDetail", JSON.stringify(searchPhone(id)));
}

function searchPhone(id) {
  let ans;
  favorities.forEach((product) => {
    if (product.id == id) {
      ans = product;
    }
  });
  return ans;
}

function initializeList() {
  let favorities = JSON.parse(localStorage.getItem("favorities"));
  cardContinerFav = document.getElementById("cardContinerFav");
  menufav = document.getElementById("menu-fav");
  if (favorities == null) {
    let h2Title = document.createElement("h2");
    h2Title.textContent = "Ups, parece que aun no tienes favoritos!";
    let h3Title = document.createElement("h3");
    h3Title.textContent = "Añade y acá apareceran!";

    cardContinerFav.innerHTML = "";
    menufav.innerHTML = "";
    cardContinerFav.appendChild(h2Title);
    cardContinerFav.appendChild(h3Title);
  } else {
    const htmlInput = favorities
      .map(
        (product) =>
          `<div class="card">
          <div class="row g-0">
            <div class="col-1">
            <input type="checkbox" class="checkbox-item" value="checked" onclick='enableButton()'/>
            </div>
            <div class="col-2">
              <a href="">
                <img
                  src=${product.picture}
                  alt="phone"
                  class="phoneImage"
                />
              </a>
            </div>
            <div class="col-7">
              <div class="card-body">
                <div class="row cardPrice">
                  <h5 class="card-title priceTitle">${product["price"].amount}</h5>
                  <div class="smallImage${product.free_shipping}"></div>
                </div>
                <p class="card-text cardName">${product.title}</p>
              </div>
            </div>
            <div class="col-2 center-items">

             <a onclick="goDetail('${product.id}')" href="index-3.html"
                ><button class="button-config button-fav">
                  Ver artículo
                </button></a
              >
            </div>
          </div>
        </div>`
      )
      .join(" ");

    cardContinerFav.innerHTML = htmlInput;
  }
}

initializeList();

maxCheckBox.addEventListener("click", function () {
  let checkboxs = document.getElementsByClassName("checkbox-item");

  for (let i = 0; i < checkboxs.length; i++) {
    const checkbox = checkboxs[i];
    if (maxCheckBox.checked) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  }

  enableButton();
});

buttondelete.addEventListener("click", function () {
  if (maxCheckBox.checked) {
    localStorage.clear();
  } else {
    //Toca mirar uno por uno
    let checkboxs = document.getElementsByClassName("checkbox-item");
    //Manage delete fav
    let newFavs = [];
    for (let i = 0; i < checkboxs.length; i++) {
      const checkbox = checkboxs[i];
      if (checkbox.checked) {
        document.getElementById("deleteallfav").disabled = false;
        document.getElementById("deleteallfav").style.background = "#e1677d";
      } else {
        //Estos son los que vamos a dejar
        newFavs.push(favorities[i]);
      }
    }
    localStorage.setItem("favorities", JSON.stringify(newFavs));
  }
  window.location.reload();
});

enableButton = () => {
  let checked = checkToEnable();
  if (checked) {
    document.getElementById("deleteallfav").disabled = false;
    document.getElementById("deleteallfav").style.background = "#e1677d";
  } else {
    document.getElementById("deleteallfav").disabled = true;
    document.getElementById("deleteallfav").style.background = "#d3cbcb";
  }
};

checkToEnable = () => {
  let checkboxs = document.getElementsByClassName("checkbox-item");

  let cont = 0;
  for (let i = 0; i < checkboxs.length; i++) {
    const checkbox = checkboxs[i];

    if (checkbox.checked) {
      cont++;
    }
  }
  if (cont > 0) {
    return true;
  } else {
    return false;
  }
};
