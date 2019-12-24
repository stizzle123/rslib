const Rating = require("../../models/Rating");
const jwt = require("jsonwebtoken");

exports.handleBookRating = async (req, res) => {
  const { id } = req.query;
  try {
    const rating = await Rating.findOne({ book: id });
    res.status(200).json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.handleGetBookReviews = async (req, res) => {
  const { id } = req.query;
  try {
    const ratings = await Rating.find({ book: id }).sort({ createdAt: "desc" });
    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
exports.handleGetReview = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const reviews = await Rating.find({ user: userId }).sort({
      createdAt: "desc"
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(403).send("Invalid token");
  }
};

exports.handleGetRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ createdAt: "desc" });
    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.handleGetTopRated = async (req, res) => {
  try {
    const ratings = await Rating.find()
      .sort({ createdAt: "desc" })
      .limit(10);
    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.handlePostRating = async (req, res) => {
  const data = { ...req.body };
  const payload = {
    user: data.user,
    book: data.book,
    ratings: data.ratings,
    review: data.review
  };
  try {
    const rating = await new Rating(payload).save();
    res.status(200).json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.handleGetAllReviews = async (req, res) => {
  try {
    const ratings = await Rating.find({}).sort({ createdAt: "desc" });
    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
