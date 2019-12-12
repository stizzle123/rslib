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
  Container
} from "@material-ui/core";
import ScrollAnimation from "react-animate-on-scroll";
import Rating from "@material-ui/lab/Rating";
import { useRouter } from "next/router";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

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
      width: "100%"
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
  }
}));

export default function Book() {
  const router = useRouter();
  const classes = useStyles();
  const URL = `${baseUrl}/api/book`;
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);

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

  return (
    <div className={classes.root}>
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
                    <Rating readOnly name="read-only" value={4} />
                    {/* <Box>2,350</Box> */}
                  </Typography>
                  <Typography
                    style={{ marginLeft: "auto" }}
                    variant="subtitle2"
                  >
                    4/5
                  </Typography>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animateIn="fadeInUp" delay={800}>
                <Button variant="contained" color="secondary">
                  Borrow this Book
                </Button>
              </ScrollAnimation>
            </CardContent>
          </Card>
          <Divider variant="middle" style={{ margin: "20px 0" }} light />
          <Container>
            <Typography variant="h6" gutterBottom align="justify">
              Top Reviews
            </Typography>
            <Card className={classes.cardReview}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    J
                  </Avatar>
                }
                title="John"
                action={
                  <IconButton color="inherit" aria-label="delete">
                    <DeleteIcon color="error" />
                  </IconButton>
                }
              />
              <CardContent>
                <Box style={{ marginBottom: 20 }}>
                  <Rating size="small" readOnly name="read-only" value={4} />
                  <small style={{ display: "block" }}>December 14, 2019</small>
                </Box>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta, in? Suscipit ipsam corporis quisquam deleniti eos fuga
                  illum sequi, sunt libero, minus similique nam assumenda error
                  quos! Similique, autem eveniet.
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.cardReview}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    J
                  </Avatar>
                }
                title="Jane"
                action={
                  <IconButton color="inherit" aria-label="delete">
                    <DeleteIcon color="error" />
                  </IconButton>
                }
              />
              <CardContent>
                <Box style={{ marginBottom: 20 }}>
                  <Rating size="small" readOnly name="read-only" value={3} />
                  <small style={{ display: "block" }}>December 24, 2019</small>
                </Box>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta, in? Suscipit ipsam corporis quisquam deleniti eos fuga
                  illum sequi, sunt libero, minus similique nam assumenda error
                  quos! Similique, autem eveniet.
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.cardReview}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    K
                  </Avatar>
                }
                title="Kenneth"
                action={
                  <IconButton color="inherit" aria-label="delete">
                    <DeleteIcon color="error" />
                  </IconButton>
                }
              />
              <CardContent>
                <Box style={{ marginBottom: 20 }}>
                  <Rating size="small" readOnly name="read-only" value={5} />
                  <small style={{ display: "block" }}>December 29, 2019</small>
                </Box>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta, in? Suscipit ipsam corporis quisquam deleniti eos fuga
                  illum sequi, sunt libero, minus similique nam assumenda error
                  quos! Similique, autem eveniet.
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </Container>
      )}
    </div>
  );
}
