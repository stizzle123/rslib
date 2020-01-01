import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Typography, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import axios from "axios";
import baseUrl from "../utils/baseUrl";

import InsertChartIcon from "@material-ui/icons/InsertChart";

const useStyles = makeStyles(theme => ({
  chart: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "auto"
    }
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  typo: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
}));

export default function DataChart() {
  const classes = useStyles();
  const booksUrl = `${baseUrl}/api/books`;
  const usersUrl = `${baseUrl}/api/totalusers`;
  const reviewsUrl = `${baseUrl}/api/reviews`;
  const requestsUrl = `${baseUrl}/api/requestbook`;
  const [loading, setLoading] = useState(false);

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    axios
      .get(booksUrl)
      .then(res => {
        setLoading(false);
        setBooks(res.data);
      })
      .catch(err => console.error(err));

    return () => {
      abortController.abort();
    };
  }, [booksUrl]);
  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(usersUrl)
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.error(err));

    return () => {
      abortController.abort();
    };
  }, [usersUrl]);
  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(reviewsUrl)
      .then(res => {
        setReviews(res.data);
      })
      .catch(err => console.error(err));

    return () => {
      abortController.abort();
    };
  }, [reviewsUrl]);
  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(requestsUrl)
      .then(res => {
        setRequests(res.data);
      })
      .catch(err => console.error(err));

    return () => {
      abortController.abort();
    };
  }, [requestsUrl]);

  const state = {
    labels: ["Books", "Users", "Reviews", "Requests"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#e3516f", "#C9DE00", "#2FDE00", "#00A6B4"],
        hoverBackgroundColor: ["#ad1457", "#4B5000", "#175000", "#003350"],
        data: [books.length, users, reviews.length, requests.length]
      }
    ]
  };
  return (
    <div>
      <Doughnut
        data={state}
        options={{
          title: {
            display: true,
            fontSize: 20,
            color: "#fff"
          },
          legend: {
            display: true,
            position: "right",
            labels: {
              fontColor: "white"
            }
          }
        }}
        // className={classes.chart}
      />

      <Typography
        variant="h6"
        component="h1"
        color="textSecondary"
        className={classes.typo}
      >
        Data Analytics <InsertChartIcon />
      </Typography>
    </div>
  );
}
