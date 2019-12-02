import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Container,
  Divider,
  List,
  ListItem,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import TimelineIcon from "@material-ui/icons/Timeline";
import PollIcon from "@material-ui/icons/Poll";
import moment from "moment";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import Link from "next/link";
import TopRatedBooks from "./TopRatedBooks";

const useStyles = makeStyles(theme => ({
  header: {
    background: "#42a5f5",
    width: "100%",
    height: "70vh",
    padding: "20px 0",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      height: "100%"
    }
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    alignItems: "start",
    justifyContent: "center",
    gridGap: "10px",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr)"
    }
  },
  flex: {
    display: "flex",
    // margin: "20px 0",
    "& > *": {
      marginRight: 10
    }
  },
  paper: {
    padding: "20px 10px"
  },
  chip: {
    background: theme.palette.primary.light
  },
  spanIt: {
    color: "#26a69a"
  }
}));

export default function Dashboard({ collections }) {
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [latestbooks, setLatestBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const latestBookUrl = `${baseUrl}/api/latestbooks`;

  useEffect(() => {
    let abortController = new AbortController();

    setLoading(true);
    axios.get(`${baseUrl}/api/books`).then(res => {
      setBooks(res.data);
      setLoading(false);
    });
    axios.get(latestBookUrl).then(res => {
      setLatestBooks(res.data);
      setLoading(false);
    });
    return () => {
      abortController.abort();
      setBooks([]);
    };
  }, [latestBookUrl]);
  return (
    <div>
      <div className={classes.header}>
        <Container>
          <Typography
            style={{ color: "#fff", display: "flex", alignItems: "center" }}
            variant="h6"
            component="h5"
            gutterBottom
          >
            Library Overview <PollIcon />
          </Typography>
          <div className={classes.grid}>
            <Paper className={classes.paper}>
              <Typography variant="subtitle2" style={{ display: "flex" }}>
                Total Books as at {moment(Date.now()).format("MMMM Do, YYYY")}{" "}
                <TimelineIcon
                  fontSize="small"
                  color="secondary"
                  style={{ marginLeft: "5px" }}
                />
              </Typography>
              <Typography variant="h6" component="h6" gutterBottom>
                {books.length}{" "}
                <ArrowUpwardIcon color="secondary" fontSize="small" />
              </Typography>
              <Divider />
              <div style={{ margin: "20px 0" }}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ marginTop: 10 }}
                >
                  Book Count by Genre
                </Typography>
                <div className={classes.flex}>
                  <Chip
                    label="Self Development"
                    color="secondary"
                    avatar={<Avatar>8</Avatar>}
                  />
                  <Chip
                    label="Business"
                    color="secondary"
                    avatar={<Avatar>12</Avatar>}
                  />
                  <Chip
                    label="Biography"
                    color="secondary"
                    avatar={<Avatar>2</Avatar>}
                  />
                  <Chip
                    label="Technical"
                    color="secondary"
                    avatar={<Avatar>4</Avatar>}
                  />
                </div>
              </div>
              <Divider />
              <div style={{ margin: "20px 0" }}>
                <Typography variant="subtitle2">
                  Checked out: <span className={classes.spanIt}>18</span>
                </Typography>
                <Typography variant="subtitle2">
                  Overdue: <span className={classes.spanIt}>6</span>
                </Typography>
              </div>
            </Paper>
            <Paper className={classes.paper}>
              <Typography variant="subtitle1">New Arrivals</Typography>
              <List>
                {loading ? (
                  <CircularProgress />
                ) : (
                  latestbooks.map((book, i) => (
                    <ListItem key={book._id}>
                      {i + 1}{" "}
                      <Avatar
                        src={book.imageUrl}
                        variant="square"
                        style={{ margin: "0 10px" }}
                      />{" "}
                      {book.title}
                    </ListItem>
                  ))
                )}
              </List>
              <Link href="/books">
                <a>View all Books</a>
              </Link>
            </Paper>
          </div>
        </Container>
      </div>
      <Container>
        <Divider style={{ margin: "40px" }} />
        <TopRatedBooks />
      </Container>
    </div>
  );
}
