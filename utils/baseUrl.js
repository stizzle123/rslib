const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://rs-library.herokuapp.com"
    : "http://localhost:3000";

export default baseUrl;
