var product;
var favorities = JSON.parse(localStorage.getItem("favorities"));
var isFav, indexFav;
/**Get item to a product */
getItem = () => {
  product = JSON.parse(localStorage.getItem("idDetail"));
  isFav = checkfavorites();
  fillInfo(product);
  //Check favorities
};

getItem();

function fillInfo(product) {
  var imagePhone = document.getElementById("imagePhone");
  var descriptionText = document.getElementById("descriptionText");
  var condition = document.getElementById("condition");
  var productName = document.getElementById("productName");
  var productPrice = document.getElementById("productPrice");
  var titleFav = document.getElementById("favTitle");
  var favButton = document.getElementById("favButton");
 var nameModal = document.getElementById('nameModal');
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
  var categories = [];
  for (let i = 0; i < product["categories"].length; i++) {
    const category = product["categories"][i];
    console.log(category);
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
  //var phone = searchPhone(id);
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
    if ((favorities.length = 1)) {
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
  var isFav = false;
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
