import { showToast, updateHeaderAndNav } from "./main.js";

// get cart items form local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// place to add cart item slides
const cartItems = document.querySelector(".cartItems");
let total = 0; // total price

displayCartPage();
function displayCartPage() {
  cartItems.innerHTML = ""; // Clear previous items
  total = 0; // Reset total price
  if (cart.length === 0) {
    cartItems.innerHTML = `
    <p class="text-2xl text-center capitalize font-semibold">
      No items in the cart
    </p>
    `;
  } else {
    cart.forEach((item) => {
      total += item.price * item.quantity;
      const itemHtml = displayItem(item);
      cartItems.innerHTML += itemHtml;
    });
  }
  document.querySelector(".total").textContent = `Total: $${total}`;
}
function displayItem(item) {
  const { id, image, title, price, quantity } = item;
  return `
    <div
      class="cartItem shadow-sm p-4 md:p-6 rounded-sm flex items-center justify-between gap-4 flex-col md:flex-row">
      <div class="flex items-center justify-between md:justify-normal gap-4 flex-2 w-full">
        <img class="size-[25px] cursor-pointer order-1 md:order-none" src="/imgs/icons/icon-cancel.png" alt="delete icon" onclick="window.removeFromCart(${id})" />
        <img class="h-16" src="${image}" alt="${title}" />
        <p>${title}</p>
      </div>
      <div class="flex items-center justify-between flex-3 w-full">
        <p>$${price}</p>
        <input
          type="number"
          name="quantity"
          min="0"
          value="${quantity}"
          onchange="window.handleQuantity(${id}, this)"
          class="w-20 border border-gray-300 rounded-sm w outline-none py-2 px-4 justify-self-end" />
        <p class="justify-self-end">$${quantity * price}</p>
      </div>
    </div>
  `;
}

window.handleQuantity = function handleQuantity(id, input) {
  let quantity = Math.max(1, Number(input.value)); // Ensure quantity is at least 1
  // Update the quantity in cart
  let item = cart.find((p) => p.id === id);
  if (item) {
    item.quantity = quantity;
  }
  // Save updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update UI
  displayCartPage();
  // refresh the header component
  updateHeaderAndNav();
};

window.removeFromCart = function removeFromCart(id) {
  // Remove item from cart
  cart = cart.filter((item) => item.id !== id);

  // Save updated cart to localStorage
  if (cart.length === 0) {
    localStorage.removeItem("cart");
  } else {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Update UI
  displayCartPage();
  // Show toast message
  showToast("Product removed from cart.");
  // Refresh the header component
  updateHeaderAndNav();
};

// go to checkout
const isLoggedIn = sessionStorage.getItem("isLoggedIn") || false;
const gotoCheckoutBtn = document.getElementById("gotoCheckout");
gotoCheckoutBtn.addEventListener("click", goToCheckout);
function goToCheckout() {
  if (cart.length === 0) {
    showToast("No items in the cart.");
  } else if (!isLoggedIn) {
    showToast("Please login to checkout.");
  } else {
    window.location.href = "checkout.html";
  }
}
