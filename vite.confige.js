import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: "index.html",
        about: "pages/about.html",
        cart: "pages/cart.html",
        contact: "pages/contact.html",
        login: "pages/login.html",
        profile: "pages/profile.html",
        signup: "pages/sign-up.html",
        wishlist: "pages/wish-list.html",
        checkout: "pages/checkout.html",
        products: "pages/all-products.html",
        details: "pages/product-details.html",
      },
    },
  },
});
