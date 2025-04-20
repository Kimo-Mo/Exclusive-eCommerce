import { fetchProducts, displayCard, AllProducts } from "./fetch-products.js";
// display all products
fetchProducts().then(() => {
  const products = document.getElementById("products");
  AllProducts.forEach((product) => {
    const cardHTML = displayCard(product);
    products.innerHTML += cardHTML;
  });
});

// search functionality
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const products = document.getElementById("products");
  products.innerHTML = "";
  const filteredProducts = AllProducts.filter((product) =>
    product.title.toLowerCase().includes(searchValue)
  );
  filteredProducts.forEach((product) => {
    const cardHTML = displayCard(product);
    products.innerHTML += cardHTML;
  });
});

// sort functionality
const sortSelect = document.getElementById("sort");
sortSelect.addEventListener("change", () => {
  const products = document.getElementById("products");
  products.innerHTML = "";
  let sortedProducts = [];
  switch (sortSelect.value) {
    case "price-asc":
      sortedProducts = AllProducts.slice().sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sortedProducts = AllProducts.slice().sort((a, b) => b.price - a.price);
      break;
    case "relevant":
      sortedProducts = AllProducts.slice().sort((a, b) => a.id - b.id);
      break;
    default:
      sortedProducts = AllProducts;
  }
  sortedProducts.forEach((product) => {
    const cardHTML = displayCard(product);
    products.innerHTML += cardHTML;
  });
});
