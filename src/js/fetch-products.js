import { showToast, updateHeaderAndNav, updateHeartIcons } from "./main.js";
let AllProducts = [];
async function fetchProducts() {
  try {
    const response = await fetch(`/js/products.json`);
    const data = await response.json();
    AllProducts = data;
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function displayCard(product) {
  let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
  if (wishList.find((p) => p.id == product.id)) {
    product.isWishList = true;
  } else {
    product.isWishList = false;
  }
  const { id, image, title, price, originalPrice, rating, reviews, discount } =
    product;
  return `
    <div class="card h-full rounded-sm shadow-md relative" data-product-id="${id}">
      <div class="relative overflow-hidden rounded-sm">
        <img
          src="${image}"
          class="card-img-top"
          alt="${title}" />
        <button class="add_btn absolute bottom-[-42px] left-0 w-full h-[40px] bg-black text-white border-none outline-none transition-[300ms] cursor-pointer" onclick="window.AddToCart(${id})">Add To Cart</button>
      </div>
      <div class="info p-4 text-left">
        <p class="card_title mb-2">${title}</p>
        <div class="price mb-2">
          <span class="text-(--primary-color) mr-4">$${price}</span>
          ${
            originalPrice
              ? `<span class="last_price line-through">$${originalPrice}</span>`
              : ""
          }
        </div>
        <div class="rate flex items-center gap-2">
            <img src="/imgs/icons/${
              rating == 1
                ? "One"
                : rating == 2
                ? "Two"
                : rating == 3
                ? "Three"
                : rating == 4
                ? "Four"
                : rating == 4.5
                ? "Four Half"
                : "Five"
            } Star.jpg" alt="Review Stars" />
          (${reviews})
        </div>
      </div>
      ${
        discount > 0
          ? `<span class="sale-per absolute">-${discount}%</span>`
          : ""
      }
      <button
        class="heart absolute top-[12px] cursor-pointer ${
          product.isWishList ? "bg-(--primary-color)" : "bg-white"
        } hover:bg-(--primary-color) transition-[150ms]" onclick="window.AddToWishList(${id},this)">
          <img
            src="/imgs/icons/heart small.png"
            alt="add to wish list" />
      </button>
      <button class="eye absolute top-[54px] cursor-pointer bg-white hover:bg-(--primary-color) transition-[150ms]" onclick="window.quickView(${id})">
          <img src="/imgs/icons/Quick View.png" alt="Quick View" />
      </button>
    </div>
  `;
}
// =============== ADD TO CART FUNCTION ===============
window.AddToCart = function AddToCart(id) {
  // find the target product
  const product = AllProducts.find((p) => p.id == id);
  // get the exist cart array of initiate empty one
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // check if the product already in the cart
  if (cart.find((p) => p.id == id)) {
    showToast("product already in cart.");
    return;
  }
  product.quantity = 1; // add quantity property to the product
  cart.push(product); // push target product
  // save the cart array in local storage
  localStorage.setItem("cart", JSON.stringify(cart));
  // show toast message
  showToast("product added to cart.");
  // refresh the header component
  updateHeaderAndNav();
};

// =============== ADD TO WISHLIST FUNCTION ===============
window.AddToWishList = function AddToWishList(id, btn) {
  // Find the target product
  const product = AllProducts.find((product) => product.id == id);
  // Get the existing wish list array or initiate an empty one
  let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
  // Check if the product is already in the wish list
  const isInWishList = wishList.some((p) => p.id == id);

  if (isInWishList) {
    // If the product is in the wish list, remove it
    wishList = wishList.filter((p) => p.id != id);
    // Update heart icons to reflect removal
    updateHeartIcons(id, false);
    // Show toast message
    showToast("product removed from wish list.");
  } else {
    // If the product is not in the wish list, add it
    product.isWishList = true;
    wishList.push(product);
    // Update heart icons to reflect addition
    updateHeartIcons(id, true);
    // Show toast message
    showToast("product added to wish list.");
  }

  // Save the updated wish list array in local storage
  localStorage.setItem("wishList", JSON.stringify(wishList));
  // Refresh the header component
  updateHeaderAndNav();
};
// =============== QUICK VIEW FUNCTION ===============
window.quickView = function quickView(id) {
  let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
  const product = AllProducts.find((product) => product.id == id);
  product.isWishList = wishList.some((p) => p.id == id);

  const modal = document.getElementById("quickViewModal");
  const modalContent = document.getElementById("quickViewModalContent");

  modalContent.innerHTML = `
    <button
      class="absolute top-2 right-2 rotate-[45deg] bg-(--primary-color) text-white border-none outline-none p-1 sm:p-2 rounded-[50%] cursor-pointer z-10"
      onclick="window.closeModal()">
      <img src="/imgs/icons/icon-plus.png" alt="close" />
    </button>
    <div class="flex flex-col md:flex-row gap-y-6 gap-x-10 justify-center">
      <div class="flex-1 flex justify-center">
        <img src="${product.image}" alt="${product.title}" />
      </div>
      <div class="flex-1 flex flex-col gap-4 md:gap-7">
        <h1 class="text-2xl">${product.title}</h1>
        <div class="flex items-center gap-4">
          <img src="/imgs/icons/${getRatingImage(
            product.rating
          )} Star.jpg" alt="${product.title}" />
          <span>(${product.reviews})</span>
        </div>
        <div class="flex gap-4 items-center">
          <p class="text-(--primary-color) text-2xl">$${product.price}</p>
          ${
            product.originalPrice
              ? `<span class="line-through text-gray-700 text-[16px]">$${product.originalPrice}</span>`
              : ""
          }
        </div>
        <p>${product.description}</p>
        <div class="flex gap-4">
          <button
            onclick="window.AddToCart(${product.id})"
            class="py-4 px-12 inline-block h-[50px] rounded-sm transition-[150ms] bg-(--primary-color) text-white hover:bg-(--hover-btn-color) cursor-pointer flex-1">
            Add to cart
          </button>
          <button
            onclick="window.AddToWishList(${product.id},this)"
            class="heart py-4 px-6 lg:px-12 inline-block h-[50px] rounded-sm transition-[150ms] border border-gray-300 ${
              product.isWishList ? "bg-(--primary-color)" : "bg-white"
            } hover:bg-(--hover-btn-color) cursor-pointer">
            <img src="/imgs/icons/heart small.png" alt="add to wishlist" />
          </button>
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    modal.style.zIndex = "10";
    modal.classList.add("active");
  });
};

function getRatingImage(rating) {
  switch (rating) {
    case 1:
      return "One";
    case 2:
      return "Two";
    case 3:
      return "Three";
    case 4:
      return "Four";
    case 4.5:
      return "Four Half";
    case 5:
      return "Five";
    default:
      return "No";
  }
}
// =============== CLOSE MODAL FUNCTION ===============
window.closeModal = function closeModal() {
  // get the modal element
  const modal = document.getElementById("quickViewModal");
  // hide the modal
  modal.classList.remove("active");
  modal.style.zIndex = "-1";
};

export { fetchProducts, displayCard, AllProducts };
