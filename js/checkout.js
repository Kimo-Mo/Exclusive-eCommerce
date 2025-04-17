import { showToast, updateHeaderAndNav } from "./main.js";
// get cart items form local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// place to add cart item slides
const itemsList = document.getElementById("itemsList");
let total = 0; // total price

displayCheckoutPage();
function displayCheckoutPage() {
  itemsList.innerHTML = ""; // Clear previous items
  total = 0; // Reset total price
  if (cart.length === 0) {
    itemsList.innerHTML = `
    <p class="text-2xl text-center capitalize font-semibold">
      No items in the cart
    </p>
    `;
  } else {
    cart.forEach((item) => {
      total += item.price * item.quantity;
      const itemHtml = displayItem(item);
      itemsList.innerHTML += itemHtml;
    });
  }
  document.getElementById("subtotal").textContent = `$${total}`;
  document.getElementById("total").textContent = `$${total}`;
}
function displayItem(item) {
  return `
    <div class="item flex justify-between items-center">
      <div class="flex items-center gap-4">
        <img
          class="size-16"
          src="${item.image}"
          alt="${item.title}" />
        <p>${item.title}</p>
      </div>
      <p>$${item.price * item.quantity}</p>
    </div>`;
}

// form submission
const orders = JSON.parse(localStorage.getItem("Orders")) || [];
const form = document.getElementById("checkoutForm");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  showToast("Order placed successfully!");
  // Save order to localStorage
  orders.push({
    items: cart,
    total: total,
    date: new Date().toLocaleString(),
  });
  localStorage.setItem("orders", JSON.stringify(orders));
  // Clear cart
  localStorage.removeItem("cart");
  // Clear form
  form.reset();
  // Clear items list
  itemsList.innerHTML = "";
  // Update total
  document.getElementById("subtotal").textContent = "$0";
  document.getElementById("total").textContent = "$0";
  // update update cart count
  updateHeaderAndNav();
  // Redirect to home page
  setTimeout(() => {
    window.location.href = `../index.html`;
  }, 5000);
});
