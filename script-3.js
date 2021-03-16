let product;
let favorities = JSON.parse(localStorage.getItem("favorities"));
let isFav, indexFav;
/**Get item to a product */
getItem = () => {
  product = JSON.parse(localStorage.getItem("idDetail"));
  isFav = checkfavorites();
  fillInfo(product);
  //Check favorities
};

getItem();

function fillInfo(product) {
  let imagePhone = document.getElementById("imagePhone");
  let descriptionText = document.getElementById("descriptionText");
  let condition = document.getElementById("condition");
  let productName = document.getElementById("productName");
  let productPrice = document.getElementById("productPrice");
  let titleFav = document.getElementById("favTitle");
  let favButton = document.getElementById("favButton");
 let nameModal = document.getElementById("nameModal");
  //Lests create the info
  imagePhone.src = product.picture;
  descriptionText.textContent = product.description;
  if (product.condition == "new") {
    condition.textContent = "Nuevo | " + product.sold_quantity + " Vendidos";
  } else {
    condition.textContent = "Usado | " + product.sold_quantity + " Vendidos";
  }
  productName.textContent = product.title;
  nameModal.textContent =  product.title;

  productPrice.textContent = product["price"].amount;

  //Titulo fav
  let categories = [];
  for (let i = 0; i < product["categories"].length; i++) {
    const category = product["categories"][i];
    
    if (product["categories"].length - 1 == i) {
      categories += category;
    } else {
      categories += category + " > ";
    }
  }
  titleFav.textContent = categories;
  if (isFav) {
    favButton.textContent = "Quitar de favoritos";
  }
}

/**Manejo de todos los favoritos! */
addFavorites = () => {
  //let phone = searchPhone(id);
  //First fav
  if (favorities == null) {
    favorities = [];
    favorities.push(product);
  } else {
    favorities.push(product);
  }
  favButton.textContent = "Quitar de favoritos";
  isFav = true;
  indexFav = favorities.length;

  localStorage.setItem("favorities", JSON.stringify(favorities));
};

deleteFavorities = () => {
  if (favorities != null) {
    if ((favorities.length == 1)) {
      localStorage.clear();
    } else {
      delete favorities[indexFav];
      isFav = false;
      localStorage.setItem("favorities", JSON.stringify(favorities));
    }
  }
  favButton.textContent = "Añadir a favoritos";
};

manageFav = () => {
  if (isFav) {
    deleteFavorities();
  } else {
    addFavorites();
  }
};

function checkfavorites() {
  let isFav = false;
  if (favorities !== null) {
    favorities.forEach(function (value, i) {
      if (product.id == value.id) {
        isFav = true;
        indexFav = i;
      }
    });
  }
  return isFav;
}
