import { showToast, updateHeaderAndNav } from "./main.js";
// get wish list items form local storage
let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
// get cart items form local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// place to add wish list item slides
const wishListItems = document.querySelector(".wishListItems");

displayWishListPage();
function displayWishListPage() {
  wishListItems.innerHTML = ""; // Clear previous items
  if (wishList.length === 0) {
    wishListItems.innerHTML = `
    <p class="text-2xl text-center capitalize font-semibold">
      No items in the wishlist
    </p>
    `;
    return;
  }
  wishList.forEach((item) => {
    const itemHtml = displayItem(item);
    wishListItems.innerHTML += itemHtml;
  });
}
function displayItem(item) {
  const { id, image, title, price } = item;
  return `
    <div
      class="wishListItem shadow-sm p-4 md:p-6 rounded-sm flex items-center justify-between gap-4 flex-col md:flex-row">
      <div class="flex items-center justify-between md:justify-normal gap-4 flex-1 w-full">
        <img class="size-[25px] cursor-pointer order-1 md:order-none" src="/imgs/icons/icon-cancel.png" alt="delete icon" onclick="window.removeFromWishList(${id})" />
        <img class="h-16" src="${image}" alt="${title}" />
        <p>${title}</p>
      </div>
      <div class="flex items-center justify-between flex-1 w-full">
        <p>$${price}</p>
        <button onclick="window.AddToCart(${id})" class="bg-(--primary-color) hover:bg-(--hover-btn-color) text-white rounded-sm px-4 py-2 transition-[150ms] cursor-pointer">Add to Cart</button>
      </div>
    </div>
  `;
}

window.AddToCart = function AddToCart(id) {
  // get the target product from wishList
  const product = wishList.find((p) => p.id === id);

  // check if the product is already in the cart
  if (cart.find((p) => p.id === id)) {
    showToast("Product already in cart.");
  } else {
    // add the product to the cart
    product.quantity = 1; // add quantity property to the product
    cart.push(product); // push target product
    // save the cart array in local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    // show toast message
    showToast("Product added to cart.");
    // refresh the header component
    updateHeaderAndNav();
  }
};
window.removeFromWishList = function removeFromWishList(id) {
  // remove item from wishList
  wishList = wishList.filter((p) => p.id !== id);

  // Save updated wishList back to localStorage
  if (wishList.length === 0) {
    localStorage.removeItem("wishList");
  } else {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }

  // Update UI
  displayWishListPage();
  // show toast message
  showToast("product removed from wishlist");
  // refresh the header component
  updateHeaderAndNav();
};
