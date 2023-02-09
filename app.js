fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    data.sort((a, b) => b.rating.rate - a.rating.rate);
    displayProducts(data);
    handleFilter();
    handleSearch();
  })
  .catch((error) => {
    console.log("Error in fetching data: ", error);
  });

// Function to display products
function displayProducts(data) {
  let productList = document.querySelector(".product-list");
  let template = document.querySelector("#template");

  data.forEach((product) => {
    let newTemplate = template.cloneNode(true);
    newTemplate.removeAttribute("id");
    newTemplate.querySelector(".product-title").innerText = product.title;
    newTemplate.querySelector(".product-category").innerText = product.category;
    newTemplate.querySelector(".product-rating").innerText = `${product.rating.rate}`;
    newTemplate.style.display = "block";
    let productImage = newTemplate.querySelector(".product-image");
    productImage.src = product.image;
    productImage.alt = product.title;
    productList.appendChild(newTemplate);
  });
}

// Function to handle filter
function handleFilter() {
  let categorySelect = document.querySelector("#category-select");
  let ratingSelect = document.querySelector("#rating-select");

  categorySelect.addEventListener("change", function () {
    filterProducts();
  });

  ratingSelect.addEventListener("change", function () {
    filterProducts();
  });

  function filterProducts() {
    let category = categorySelect.value;
    let rating = ratingSelect.value;
    let productItems = document.querySelectorAll(".product-item");
    productItems.forEach((productItem) => {
      let productCategory =
        productItem.querySelector(".product-category").innerText;
      let productRating = productItem
        .querySelector(".product-rating")
        .innerText.split(" ")[0];
      if (category === "" || category === productCategory) {
        if (rating === "" || parseInt(rating) <= parseInt(productRating)) {
          productItem.style.display = "block";
        } else {
          productItem.style.display = "none";
        }
      } else {
        productItem.style.display = "none";
      }
    });
  }
}

// Function to handle search
function handleSearch() {
  document
    .querySelector("#search-input")
    .addEventListener("input", function () {
      var searchTerm = this.value.toLowerCase();
      var productItems = document.querySelectorAll(".product-item");
      for (var i = 0; i < productItems.length; i++) {
        var productTitle = productItems[i]
          .querySelector(".product-title")
          .innerText.toLowerCase();
        if (productTitle.indexOf(searchTerm) === -1) {
          productItems[i].style.display = "none";
        } else {
          productItems[i].style.display = "block";
        }
      }
    });
}
