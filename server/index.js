require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const mongoose = require("mongoose");

const routes = require("./routes");
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`[MongoDB]: Connected to database successfully`))
  .catch(err => console.error(`Failed to connect to database: ${err}`));

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Be sure to pass `true` as the second argument to `url.parse`.
  // This tells it to parse the query portion of the URL.

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === "/sw.js" || pathname.startsWith("/precache-manifest.")) {
      const filePath = join(__dirname, ".next", pathname);
      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  });
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  server.get("/_next/*", (req, res) => {
    handle(req, res);
  });

  server.get("/public/*", (req, res) => {
    handle(req, res);
  });

  server.use("/", routes);

  server.get("/hello", (req, res) => {
    res.send("Hello...");
  });

  server.get("*", (req, res) => {
    handle(req, res);
  });
  server.listen(PORT, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
