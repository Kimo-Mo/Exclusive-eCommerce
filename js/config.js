const config = {
  basePath:
    location.hostname === "localhost" || location.hostname === "127.0.0.1"
      ? ""
      : "exclusive-e-commerce-one.vercel.app",
};

// Export for use in other files
export default config;
