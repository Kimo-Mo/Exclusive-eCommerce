import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        cart: resolve(__dirname, "pages/cart.html"),
        login: resolve(__dirname, "pages/login.html"),
        signup: resolve(__dirname, "pages/signup.html"),
        profile: resolve(__dirname, "pages/profile.html"),
        wishList: resolve(__dirname, "pages/wish-list.html"),
        about: resolve(__dirname, "pages/about.html"),
        contact: resolve(__dirname, "pages/contact.html"),
        checkout: resolve(__dirname, "pages/checkout.html"),
        allProducts: resolve(__dirname, "pages/all-products.html"),
        productDetails: resolve(__dirname, "pages/product-details.html"),
      },
    },
  },
});
