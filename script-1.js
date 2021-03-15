
let requestOptions = {
  method: "GET",
  redirect: "follow",
};
var products;

fetch(
  "https://gist.githubusercontent.com/jhonatan89/719f8a95a8dce961597f04b3ce37f97b/raw/4b7f1ac723a14b372ba6899ce63dbd7c2679e345/products-ecommerce",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    
    products = result["items"];
    console.log(products);
    priceFormatter(products);
    
    initializeList(products);
  })
  .catch((error) => console.log("error", error));

currencyFormatter = (price, currency) =>{
    var value = price;
    var result = value.toLocaleString('es-ar', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
    });
    return result;
}

priceFormatter = (data) =>{
    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        product['price'].amount = currencyFormatter(product['price'].amount,product['price'].currency);
    }
}


function initializeList(products) {
  const htmlInput = products
    .map(
      (product) =>
        `<div class="card">
       <div class="row g-0">
         <div class="col-2">
           <a href="index-3.html"  onclick="goDetail('${product.id}')">
             <img
               src= ${product.picture}
               alt="phone"
               class="phoneImage"
             />
           </a>
         </div>
         <div class="col-8">
           <div class="card-body">
             <div class="row cardPrice">
               <h5 class="card-title priceTitle">${product["price"].amount}</h5>
               <div class="smallImage${product.free_shipping}"></div>
             </div>
             <p class="card-text cardName">${product.title}</p>
           </div>
         </div>
         <div class="col-2">
           <p class="cityname">${product.location}</p>
         </div>
       </div>
     </div>`
    )
    .join(" ");
  cardListContiner = document.getElementById("cardListContiner");
  cardListContiner.innerHTML = htmlInput;
}

function goDetail(id){
    //alert('Probando' + id);
    localStorage.setItem('idDetail', JSON.stringify(searchPhone(id)));
    

}

function searchPhone(id){
  var ans;
  products.forEach(product => {
    if(product.id  == id){
      ans = product;
    }
  });
  return ans;
}

/**Manejo de todos los favoritos! */
addFavorites = (id) =>{
  alert(id);

  var favorities = JSON.parse(localStorage.getItem("favorities"));
  var phone = searchPhone(id);
  //First fav
  if(favorities.length = 0){
    favorities = [];
    favorities.push(phone);
  }
  else{
    favorities.push(phone);
  }

  localStorage.setItem("favorities", JSON.stringify(favorities));
}

/**Filtrar por categoria! 
 * Pasos 1: mirar la categoria que nos entra
 * 2: Recorrer los productos 
 * 3: Mostraros
*/
const filterCategories = async searchText =>{
 // console.log(operators);
  matchesCategori = products.filter(product => {
          
          const regex = new RegExp(`${searchText}`, 'gi');

          return product['categories'].value.match(regex);
      });

    initializeList(matchesCategori);
};
var searchCategories = document.getElementById('filterCategories');

prueba = () =>{
  var newProducts = [];
  var objectiveCategory = searchCategories.value;

  products.forEach(product => {
    var categoriesOfProduct = product.categories;
    categoriesOfProduct.forEach(category => {
      if(category == objectiveCategory){
        newProducts.push(product);
      }
    });
  });

  initializeList(newProducts);
}



