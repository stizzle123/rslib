const express = require("express");

const account = require("../controllers/account");
const auth = require("../controllers/auth");
const book = require("../controllers/book");
const bookrating = require("../controllers/bookrating");
const collections = require("../controllers/collections");
const log = require("../controllers/log");
const notification = require("../controllers/notification");
const requestbook = require("../controllers/requestbook");
const signup = require("../controllers/signup");
const users = require("../controllers/users");

const router = express.Router();

router.get("/api/account", account.handleGetRequest);
router.patch("/api/account", account.handleUpdateAvatar);

router.patch("/api/changepass", auth.handleChangePassword);
router.post("/api/login", auth.handleLogin);
router.patch("/api/permissions", auth.handleUserPermissions);

router.post("/api/book", book.handleCreateBook);
router.get("/api/book", book.handleGetBook);
router.patch("/api/book", book.handleUpdateBook);
router.delete("/api/book", book.handleDeleteBook);
router.get("/api/books", book.handleGetBooks);
router.get("/api/genre", book.handleGetGenre);
router.get("/api/latestbooks", book.handleGetLatestBooks);

router.get("/api/bookrating", bookrating.handleBookRating);

router.get("/api/rating", bookrating.handleGetRatings);
router.get("/api/toprated", bookrating.handleGetTopRated);
router.post("/api/rating", bookrating.handlePostRating);
router.get("/api/reviews", bookrating.handleGetAllReviews);
router.get("/api/myreviews", bookrating.handleGetReview);
router.get("/api/bookreview", bookrating.handleGetBookReviews);

router.get("/api/collections", collections.handleGetCollections);
router.put("/api/collections", collections.handleUpdateCollections);
router.delete("/api/collections", collections.handleDeleteCollection);

router.post("/api/log", log.handleCreateLog);
router.get("/api/log", log.handleGetLogs);
router.patch("/api/log", log.handleUpdateLog);
router.delete("/api/log", log.handleDeleteLog);

router.get("/api/borrowed", log.handleGetBorrowedBooks);
router.patch("/api/return", log.handleReturnBook);
router.get("/api/overdue", log.handleOverdue);

router.get("/api/notification", notification.handleGetNotification);
router.delete("/api/notification", notification.handleDeleteNotification);

router.post("/api/requestbook", requestbook.handleSubmitRequest);
router.get("/api/requestbook", requestbook.handleGetRequests);

router.post("/api/signup", signup.handleSignup);

router.get("/api/totalusers", users.handleGetUsersCount);
router.get("/api/user", users.handleGetUserDetails);
router.patch("/api/user", users.handleUpdateUser);

router.get("/api/users", users.handleGetAllUsers);

module.exports = router;
