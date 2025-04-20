import { showToast, updateHeaderAndNav } from "./main.js";
const mainProduct = {
  id: 17,
  image: "/imgs/PS5-Controller.png",
  title: "PS5-Controller",
  price: 180,
  originalPrice: 200,
  rating: 5,
  reviews: 155,
  discount: 20,
  onSale: true,
  bestSeller: true,
  wishlist: false,
  quickView: false,
  description:
    "Sony DualSense Wireless Controller for PlayStation 5 - Black and White",
};

let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const addToCartBtn = document.getElementById("addToCart");
const addToWishListBtn = document.getElementById("addToWishList");
const quantityInput = document.getElementById("quantity");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");

plusBtn.addEventListener("click", () => {
  quantityInput.textContent = parseInt(quantityInput.textContent) + 1;
});
minusBtn.addEventListener("click", () => {
  if (parseInt(quantityInput.textContent) > 1) {
    quantityInput.textContent = parseInt(quantityInput.textContent) - 1;
  }
});

addToCartBtn.addEventListener("click", () => {
  AddToCart(mainProduct.id);
});
if (wishList.find((p) => p.id === mainProduct.id)) {
  addToWishListBtn.style.backgroundColor = "var(--primary-color)";
} else {
  addToWishListBtn.style.backgroundColor = "white";
}
addToWishListBtn.addEventListener("click", () => {
  AddToWishList(mainProduct.id);
});

function AddToCart(id) {
  // check if the product is already in the cart
  if (cart.find((p) => p.id === id)) {
    showToast("Product already in cart.");
  } else {
    // add the product to the cart
    mainProduct.quantity = parseInt(quantityInput.textContent); // add quantity property to the product
    cart.push(mainProduct); // push target product
    // save the cart array in local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    // show toast message
    showToast("Product added to cart.");
    // refresh the header component
    updateHeaderAndNav();
  }
}
function AddToWishList(id) {
  // Check if the product is already in the wish list
  if (wishList.find((p) => p.id === id)) {
    // If the product is in the wish list, remove it
    wishList = wishList.filter((p) => p.id != id);
    // Update heart icons to reflect removal
    addToWishListBtn.style.backgroundColor = "white";
    // Show toast message
    showToast("product deleted from wish list.");
  } else {
    // If the product is not in the wish list, add it
    mainProduct.wishlist = true;
    wishList.push(mainProduct);
    // Update heart icons to reflect addition
    addToWishListBtn.style.backgroundColor = "var(--primary-color)";
    // Show toast message
    showToast("product added to wish list.");
  }

  // Save the updated wish list array in local storage
  localStorage.setItem("wishList", JSON.stringify(wishList));
  // Refresh the header component
  updateHeaderAndNav();
}
