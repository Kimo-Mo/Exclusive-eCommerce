import { getAuth, signOut } from "firebase/auth";
import app from "./firebase.js";
import "../style/style.css";

import { ScrollReveal } from "/src/js/scrollreveal.min.js";
// get url
const url = window.location.pathname;
// =============== CREATE HEADER COMPONENT ===============
const header = document.createElement("header");
header.classList.add(
  "py-4",
  "bg-white",
  "w-full",
  "fixed",
  "z-20",
  "top-0",
  "left-0",
  "h-[75px]",
  "shadow-sm"
);
// =============== DISPLAY HEADER ===============
updateHeaderAndNav();
function displayHeader() {
  const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn")) || false;
  const getItemCount = (key) =>
    JSON.parse(localStorage.getItem(key))?.length || 0;
  const NumberOfCartItems = getItemCount("cart");
  const NumberOfWishItems = getItemCount("wishList");
  const createNavLink = (page, label) =>
    url.endsWith(page)
      ? `<a href="#" class="active">${label}</a>`
      : `<a href="/pages/${page}">${label}</a>`;
  header.innerHTML = `
    <nav class="container mx-auto px-6 lg:px-12 flex items-center justify-between">
      <a href=${
        url.includes("index.html") ? "#" : `/index.html`
      } class="text-2xl font-bold tracking-[0.75px]">Exclusive</a>
      <ul class="nav py-10 sm:py-0 px-6 sm:px-0 flex gap-12 bg-white">
        <li>${
          url.includes("index.html")
            ? `<a href="#" class="active">Home</a>`
            : `<a href="/index.html">Home</a>`
        }</li>
        <li>
          ${createNavLink("contact.html", "Contact")}
        </li>
        <li>
          ${createNavLink("about.html", "About")}
        </li>
        <li class="block md:hidden">${createNavLink("cart.html", "Cart")}</li>
        <li class="block md:hidden">${createNavLink(
          "wish-list.html",
          "Wishlist"
        )}</li>
        ${
          isLoggedIn
            ? `<li class="hidden md:block">
                ${createNavLink("profile.html", "profile")}
              </li>`
            : `<li>
                ${createNavLink("login.html", "Login")}
              </li>`
        }
        <li class="md:hidden ${isLoggedIn ? "block" : "hidden"}">
          ${createNavLink("profile.html", "profile")}
        </li>
        <li class="${
          isLoggedIn ? "flex" : "hidden"
        } md:hidden gap-2 items-center">
          <span id="log-out" class="cursor-pointer">log out</span>
          <img class="rotate-180" src="/imgs/icons/Icon-logout.png" alt="logout" />
        </li>
      </ul>
      <div class="hidden md:flex justify-between items-center gap-4">
        <a href=${
          url.includes("wish-list.html") ? "#" : `/pages/wish-list.html`
        } class="cursor-pointer relative">
          <img src="/imgs/icons/heart.png" class="cursor-pointer" alt="heart icon" />
          ${
            NumberOfWishItems > 0
              ? `<span class="bg-(--primary-color) text-white rounded-[50%] size-[20px] flex items-center justify-center p-1 absolute top-[-10px] right-[-12px]">${NumberOfWishItems}</span>`
              : ""
          }
        </a>
        <a href=${
          url.includes("cart.html") ? "#" : `/pages/cart.html`
        } class="cursor-pointer relative">
          <img src="/imgs/icons/cart.png" class="cursor-pointer" alt="cart icon" />
          ${
            NumberOfCartItems > 0
              ? `<span class="bg-(--primary-color) text-white rounded-[50%] size-[20px] flex items-center justify-center p-1 absolute top-[-5px] right-[-5px]">${NumberOfCartItems}</span>`
              : ""
          }
        </a>
        ${
          isLoggedIn
            ? `<span class="relative">
                <img src="/imgs/icons/User=Off.png" alt="profile" class="cursor-pointer profileIcon" />
                  <ul class="dropdownProfileMenu opacity-0 capitalize absolute top-[99%] right-0 bg-white shadow-md rounded-md flex flex-col gap-4 p-6 w-[150px] transition-[150ms] -z-10">
                    <li class="cursor-pointer">${
                      url.includes("profile.html")
                        ? `<a href="#" class="active w-full inline-block">Profile</a>`
                        : `<a href="/pages/profile.html" class="w-full inline-block">Profile</a>`
                    }</li>
                    <li id="log-out" class="cursor-pointer">log out</li>
                  </ul>
              </span>`
            : ""
        }
      </div>
      <label class="hamburger flex flex-col gap-2 w-8 md:hidden cursor-pointer">
        <input class="peer hidden" name="hamburger" type="checkbox" />
        <div class="rounded-2xl h-[3px] w-1/2 bg-black duration-500 peer-checked:rotate-[225deg] origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]"></div>
        <div class="rounded-2xl h-[3px] w-full bg-black duration-500 peer-checked:-rotate-45"></div>
        <div class="rounded-2xl h-[3px] w-1/2 bg-black duration-500 place-self-end peer-checked:rotate-[225deg] origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]"></div>
      </label>
    </nav>
  `;
  document.body.prepend(header);
}
// open profile dropdown
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("profileIcon")) {
    const dropdown = document.querySelector(".dropdownProfileMenu");
    dropdown.classList.toggle("showDropdown");
  }
});
// handle log out
document.addEventListener("click", (e) => {
  if (e.target.id === "log-out") {
    const auth = getAuth(app);
    signOut(auth);
    sessionStorage.clear();
    window.location.href = `/index.html`;
  }
});
// =============== INITIALIZE HAMBURGER MENU ===============
function initHamburger() {
  const hamburger = document.querySelector(".hamburger input");
  const nav = document.querySelector(".nav");

  if (hamburger) {
    // Add new event listener
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
}
function updateHeaderAndNav() {
  displayHeader();
  initHamburger();
}

// =============== CREATE FOOTER COMPONENT ===============
const footer = document.createElement("div");
footer.classList.add("footer", "bg-black", "text-white", "mt-[140px]");
footer.innerHTML = `
    <div
      class="container mx-auto px-6 lg:px-12 pt-20 pb-10 grid justify-between items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 text-white *:flex *:flex-col *:gap-y-6">
      <div class="links">
        <a href="#" class="text-2xl font-bold">Exclusive</a>
        <a href="#">Subscribe</a>
        <p>Get 10% off your first order</p>
      </div>
      <div class="links">
        <h1 class="text-xl">Support</h1>
        <ul class="*:mb-4">
          <li><a href="#">Stockholm sweden</a></li>
          <li><a href="#">exclusive@gmail.com</a></li>
          <li><a href="#">+88015-88888-9999</a></li>
        </ul>
      </div>
      <div class="links">
        <h1 class="text-xl">Account</h1>
        <ul class="*:mb-4">
          <li><a href="/pages/profile.html">My Account</a></li>
          <li><a href="/pages/login.html">Login / Register</a></li>
          <li><a href="/pages/cart.html">Cart</a></li>
          <li><a href="/pages/wish-list.html">Wishlist</a></li>
          <li><a href="/pages/all-products.html">Shop</a></li>
        </ul>
      </div>
      <div class="links">
        <h1 class="text-xl">Quick Link</h1>
        <ul class="*:mb-4">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms Of Use</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="/pages/contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="links">
        <h1 class="text-xl">Download App</h1>
        <div>
          <p class="text-xs mb-4 text-gray-300">
            Save $3 with App New User Only
          </p>
          <img
            class="max-w-[160px] mb-3 cursor-pointer"
            src="/imgs/appStore.png"
            alt="App Store" />
          <img
            class="max-w-[160px] mb-3 cursor-pointer"
            src="/imgs/googlePlay.png"
            alt="Google Play" />
          <div class="icons flex gap-6 my-4">
            <a href="#">
              <img src="/imgs/icons/Icon-Facebook.png" alt="facebook" />
            </a>
            <a href="#">
              <img src="/imgs/icons/icon-instagram.png" alt="instagram" />
            </a>
            <a href="#">
              <img src="/imgs/icons/Icon-Twitter.png" alt="twitter" />
            </a>
            <a href="#">
              <img src="/imgs/icons/Icon-Linkedin.png" alt="linkedin" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <p class="text-center p-8 m-0">
      &copy; Copyright Exclusive 2023. All right reserved
    </p>
`;
document.body.append(footer);

// =============== MAKE NOTIFICATION COMPONENT ===============
function initToast() {
  if (!document.getElementById("toast")) {
    const toast = document.createElement("div");
    toast.id = "toast";
    toast.classList.add(
      "toast",
      "shadow-md",
      "capitalize",
      "w-full",
      "md:w-fit",
      "fixed",
      "top-[80px]",
      "right-[-100%]",
      "py-4",
      "bg-white",
      "rounded-sm",
      "z-[21]"
    );
    toast.innerHTML = `
      <div class="container mx-auto px-6 flex items-center justify-between gap-4">
        <p class="section_category_p"></p>
        <img
          class="cursor-pointer size-[25px]"
          src="/imgs/icons/icon-cancel.png"
          alt="delete" />
      </div>
    `;
    // Add event listener to close button
    const closeButton = toast.querySelector("img");
    closeButton.addEventListener("click", () => {
      toast.classList.remove("showToast");
      clearTimeout(t);
    });
    document.body.append(toast);
  }
}
initToast();
// Initialize timeout variable
let t = null;

// Function to show toast notification
function showToast(text) {
  // Clear existing timeout if any
  if (t !== null) {
    clearTimeout(t);
  }

  // Get the toast element
  const toast = document.getElementById("toast");
  if (!toast) return;

  // Function to display the toast message
  const showToastMessage = () => {
    document.querySelector(".toast .section_category_p").textContent = text;
    toast.classList.add("showToast");
    t = setTimeout(() => {
      toast.classList.remove("showToast");
    }, 5000);
  };

  // If toast is already visible, hide it first then show the new message
  if (toast.classList.contains("showToast")) {
    toast.classList.remove("showToast");
    setTimeout(showToastMessage, 500);
  } else {
    showToastMessage();
  }
}
// =============== edit heart icon ===============
function updateHeartIcons(productId, isActive) {
  const cardHearts = document.querySelectorAll(
    `.card[data-product-id="${productId}"] .heart`
  );
  cardHearts.forEach((heart) => {
    if (isActive) {
      heart.classList.remove("bg-white");
      heart.classList.add("bg-(--primary-color)");
    } else {
      heart.classList.remove("bg-(--primary-color)");
      heart.classList.add("bg-white");
    }
  });

  // Update heart icon in modal if open
  const modalHeart = document.querySelector("#quickViewModalContent .heart");
  if (modalHeart) {
    if (isActive) {
      modalHeart.classList.remove("bg-white");
      modalHeart.classList.add("bg-(--primary-color)");
    } else {
      modalHeart.classList.remove("bg-(--primary-color)");
      modalHeart.classList.add("bg-white");
    }
  }
}
// =============== SHOW SCROLL UP ===============
const scrollUp = document.createElement("span");
scrollUp.id = "scroll-up";
scrollUp.className =
  "scrollUp size-[50px] text-[18px] md:text-[24px] fixed right-4 md:right-12 bottom-[-100%] hover:translate-y-[-5px] text-black bg-white flex items-center justify-center z-[9] rounded-[50%] transition-all duration-300 border-2 border-black cursor-pointer";
scrollUp.innerHTML = `<img src="/imgs/icons/icons_arrow-up.jpg" alt="arrow up" />`;
document.body.append(scrollUp);

function scrollUpFunc() {
  const scrollUp = document.getElementById("scroll-up");
  window.scrollY >= 250
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
}

window.addEventListener("load", () => {
  window.addEventListener("scroll", scrollUpFunc);
  scrollUp.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
// =============== SCROLL REVEAL ANIMATION ===============
window.addEventListener("load", () => {
  const sr = ScrollReveal({
    origin: "bottom",
    distance: "60px",
    duration: 2500,
    delay: 250,
    // reset: true,
  });

  sr.reveal(
    `.heroImg, .heroInfo ,.speakerImg , .trendingInfo, .gallery_img img, .authImg, .aboutImg`
  );
  sr.reveal(`.card, .cat , .wishListItem, .cartItem `, {
    distance: "100px",
    interval: 100,
  });
});

export { updateHeaderAndNav, showToast, updateHeartIcons };
