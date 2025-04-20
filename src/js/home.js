import { fetchProducts, displayCard, AllProducts } from "./fetch-products.js";
// fetchProducts function from js/fetch-products.js
fetchProducts().then(() => {
  const flash_sale = document.getElementById("flash_sale");
  const best = document.getElementById("best");
  const products = document.getElementById("products");
  AllProducts.forEach((product) => {
    const cardHTML = displayCard(product);
    if (product.onSale) {
      flash_sale.innerHTML += cardHTML;
    } else if (product.bestSeller) {
      best.innerHTML += cardHTML;
    } else {
      products.innerHTML += cardHTML;
    }
  });
});

// ============== manage the countdown timer ==============
function getLastDayOfMonth(year, month, time = "23:59:59") {
  // Set the date to the last day of the month
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const [hours, minutes, seconds] = time.split(":").map(Number);
  lastDayOfMonth.setHours(hours, minutes, seconds, 999);

  return lastDayOfMonth;
}

// Get the last day of the current month
const currentDate = new Date();
const lastDayOfCurrentMonth = getLastDayOfMonth(
  currentDate.getFullYear(),
  currentDate.getMonth()
).getTime();

// Get the last day of the next month
const lastDayOfNextMonth = getLastDayOfMonth(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1
);

const countDownElement = document.getElementById("demo");

let countDownDate = lastDayOfCurrentMonth;

setInterval(() => {
  const now = Date.now();
  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countDownElement.innerHTML = `${days < 10 ? "0" + days : days} : ${
    hours < 10 ? "0" + hours : hours
  } : ${minutes < 10 ? "0" + minutes : minutes} : ${
    seconds < 10 ? "0" + seconds : seconds
  }`;

  if (distance < 0) {
    countDownDate = lastDayOfNextMonth;
  }
}, 1000);
