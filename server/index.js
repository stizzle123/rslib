require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const mongoose = require("mongoose");
const path = require("path");

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

  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  server.get("/_next/*", (req, res) => {
    handle(req, res);
  });

  server.get("/public/*", (req, res) => {
    handle(req, res);
  });

  server.use("/", routes);

  server.get("/service-worker.js", (req, res) => {
    // Don't cache service worker is a best practice (otherwise clients wont get emergency bug fix)
    res.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.set("Content-Type", "application/javascript");
    if (dev) {
      app.serveStatic(
        req,
        res,
        path.join(__dirname, "public/service-worker.js")
      );
    } else {
      app.serveStatic(req, res, path.resolve("./.next/service-worker.js"));
    }
  });

  server.get("*", (req, res) => {
    handle(req, res);
  });
  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
