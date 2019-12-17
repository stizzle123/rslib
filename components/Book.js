import React, { useState, useEffect } from "react";
import {
  Typography,
  makeStyles,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
  Divider,
  Box,
  CardActions,
  Avatar,
  CardHeader,
  Container,
  Chip
} from "@material-ui/core";

import ScrollAnimation from "react-animate-on-scroll";
import Rating from "@material-ui/lab/Rating";
import { useRouter } from "next/router";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "./Modal";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    height: "100%",
    minHeight: "100vh",
    backgroundImage:
      "linear-gradient(22.5deg, rgba(242, 242, 242, 0.03) 0%, rgba(242, 242, 242, 0.03) 16%,rgba(81, 81, 81, 0.03) 16%, rgba(81, 81, 81, 0.03) 26%,rgba(99, 99, 99, 0.03) 26%, rgba(99, 99, 99, 0.03) 73%,rgba(43, 43, 43, 0.03) 73%, rgba(43, 43, 43, 0.03) 84%,rgba(213, 213, 213, 0.03) 84%, rgba(213, 213, 213, 0.03) 85%,rgba(125, 125, 125, 0.03) 85%, rgba(125, 125, 125, 0.03) 100%),linear-gradient(22.5deg, rgba(25, 25, 25, 0.03) 0%, rgba(25, 25, 25, 0.03) 54%,rgba(144, 144, 144, 0.03) 54%, rgba(144, 144, 144, 0.03) 60%,rgba(204, 204, 204, 0.03) 60%, rgba(204, 204, 204, 0.03) 76%,rgba(37, 37, 37, 0.03) 76%, rgba(37, 37, 37, 0.03) 78%,rgba(115, 115, 115, 0.03) 78%, rgba(115, 115, 115, 0.03) 91%,rgba(63, 63, 63, 0.03) 91%, rgba(63, 63, 63, 0.03) 100%),linear-gradient(157.5deg, rgba(71, 71, 71, 0.03) 0%, rgba(71, 71, 71, 0.03) 6%,rgba(75, 75, 75, 0.03) 6%, rgba(75, 75, 75, 0.03) 15%,rgba(131, 131, 131, 0.03) 15%, rgba(131, 131, 131, 0.03) 18%,rgba(110, 110, 110, 0.03) 18%, rgba(110, 110, 110, 0.03) 37%,rgba(215, 215, 215, 0.03) 37%, rgba(215, 215, 215, 0.03) 62%,rgba(5, 5, 5, 0.03) 62%, rgba(5, 5, 5, 0.03) 100%),linear-gradient(90deg, #FFF,#FFF)"
  },
  card: {
    display: "flex",
    // marginTop: "30px",
    // marginLeft: "auto",
    // marginRight: "auto",
    width: "60%",
    padding: theme.spacing(6),
    margin: "auto",
    // height: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column"
    }
  },
  media: {
    width: 300,
    height: 300,
    backgroundSize: "contain",
    backgroundPosition: "center",
    // paddingTop: "56.25%" // 16:9,
    [theme.breakpoints.down("md")]: {
      // width: "100%"
      display: "none"
    }
  },
  centered: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  cardReview: {
    margin: "auto",
    width: "auto",
    marginBottom: 30
  },
  avatar2: {
    width: 150,
    height: 200,
    margin: "auto",
    marginTop: "10px",
    objectPosition: "50% 50%",
    objectFit: "contain",
    border: "6px solid #424242",
    borderRadius: 5
  },
  badge: {
    color: theme.palette.secondary.light,
    borderColor: theme.palette.secondary.light
  }
}));

export default function Book({ _id, name, role }) {
  const router = useRouter();
  const classes = useStyles();
  const URL = `${baseUrl}/api/book`;
  const BOOKREVIEWURL = `${baseUrl}/api/bookreview`;
  const RATINGURL = `${baseUrl}/api/bookrating`;
  const [reviews, setReviews] = useState([]);
  const [detail, setDetail] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [rating, setRating] = useState({});

  useEffect(() => {
    const payload = {
      params: { id: router.query.id }
    };
    setLoading(true);
    axios
      .get(URL, payload)
      .then(res => {
        setDetail(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [URL]);

  useEffect(() => {
    const payload = {
      params: { id: router.query.id }
    };
    setLoad(true);
    axios
      .get(BOOKREVIEWURL, payload)
      .then(res => {
        setReviews(res.data);
        setLoad(false);
      })
      .catch(err => {
        console.error(err);
        setLoad(false);
      });
  }, [BOOKREVIEWURL]);

  useEffect(() => {
    const payload = {
      params: { id: router.query.id }
    };
    axios
      .get(RATINGURL, payload)
      .then(res => {
        setRating(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [RATINGURL]);

  const handleClickOpen = id => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Modal
        name={name}
        userId={_id}
        book={detail}
        open={open}
        handleClose={handleClose}
      />
      <Typography variant="h3" align="center" gutterBottom>
        Book Info
      </Typography>
      {loading ? (
        <div className={classes.centered}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Container>
          <Card className={classes.card}>
            <>
              {detail.imageUrl && (
                <CardMedia
                  className={classes.media}
                  image={detail.imageUrl}
                  title={detail.title}
                />
              )}
            </>
            <CardContent>
              <ScrollAnimation animateIn="fadeInUp" delay={300}>
                <Typography variant="h3" component="h6" gutterBottom>
                  {detail.title}
                </Typography>
                <Typography variant="overline" component="h1" gutterBottom>
                  Author: <strong>{detail.authorName}</strong>
                </Typography>
                <Typography variant="overline" gutterBottom>
                  Summary:{" "}
                  <strong>
                    {detail.summary
                      ? detail.summary
                      : "No Summary for this book"}
                  </strong>
                </Typography>
              </ScrollAnimation>

              <ScrollAnimation animateIn="fadeInUp" delay={1000}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 20
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{ textAlign: "center" }}
                  >
                    <Rating readOnly name="read-only" value={rating.ratings} />
                    {/* <Box>2,350</Box> */}
                  </Typography>
                  <Typography
                    style={{ marginLeft: "auto" }}
                    variant="subtitle2"
                  >
                    <Chip
                      variant="outlined"
                      size="small"
                      label={<span>{rating.ratings || 0} / 5</span>}
                      // color="secondary"
                      className={classes.badge}
                    />
                    {/* {rating.ratings || 0}/5 */}
                  </Typography>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animateIn="fadeInUp" delay={800}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleClickOpen(detail._id)}
                  disabled={detail.quantity === 0}
                >
                  {detail.quantity === 0 ? (
                    <span>Unavailable</span>
                  ) : (
                    <span>Borrow this Book</span>
                  )}
                </Button>
              </ScrollAnimation>
            </CardContent>
          </Card>
          <Divider variant="middle" style={{ margin: "20px 0" }} light />
          <Container>
            <Typography variant="h6" gutterBottom align="justify">
              Top Reviews
            </Typography>
            {load ? (
              <CircularProgress
                size="3rem"
                style={{
                  position: "absolute",
                  left: "50%"
                }}
              />
            ) : reviews.length ? (
              reviews.map(review => (
                <Card className={classes.cardReview} key={review._id}>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="recipe"
                        src={review.user.avatar}
                        alt={review.user.name}
                        className={classes.avatar}
                      />
                    }
                    title={
                      <div
                        style={{
                          display: "grid",
                          gridRowGap: 2
                        }}
                      >
                        <small>{review.user.name.toUpperCase()}</small>

                        <Rating
                          size="small"
                          readOnly
                          name="read-only"
                          value={review.ratings}
                        />
                        <small style={{ display: "block" }}>
                          {moment(review.createdAt).format("Do MMMM, YYYY")}
                        </small>
                      </div>
                    }
                    action={
                      review.user._id === _id && (
                        <IconButton color="inherit" aria-label="delete">
                          <DeleteIcon color="error" />
                        </IconButton>
                      )
                    }
                  />
                  <Divider variant="middle" light />
                  <CardContent>
                    <Typography variant="subtitle1">{review.review}</Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card style={{ padding: 60 }}>
                <Typography variant="h3" align="center" color="textSecondary">
                  No Reviews for this book
                </Typography>
              </Card>
            )}
          </Container>
        </Container>
      )}
    </div>
  );
}
