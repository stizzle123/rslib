import React, { useState, useEffect } from "react";
import {
  Typography,
  makeStyles,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress
} from "@material-ui/core";
import ScrollAnimation from "react-animate-on-scroll";
import { useRouter } from "next/router";
import baseUrl from "../utils/baseUrl";
import axios from "axios";

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
      flexDirection: "column",
      textAlign: "center"
    }
  },
  media: {
    width: 300,
    // height: 300,
    backgroundSize: "contain",
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
      {loading ? (
        <div className={classes.centered}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Card className={classes.card}>
          {detail.imageUrl && (
            <CardMedia
              className={classes.media}
              image={detail.imageUrl}
              title={detail.title}
            />
          )}
          <CardContent>
            <ScrollAnimation animateIn="fadeInUp" delay={300}>
              <Typography variant="h3" component="h1" gutterBottom>
                Title: {detail.title}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Author: {detail.authorName}
              </Typography>
              <Typography variant="overline" gutterBottom>
                Summary:{" "}
                {detail.summary ? detail.summary : "No Summary for this book"}
              </Typography>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" delay={500}>
              <Button variant="contained" color="secondary">
                Borrow this Book
              </Button>
            </ScrollAnimation>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
