import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Container,
  Divider,
  List,
  ListItem,
  CircularProgress,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import TimelineIcon from "@material-ui/icons/Timeline";
import PollIcon from "@material-ui/icons/Poll";
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/router";
import baseUrl from "../utils/baseUrl";
import TopRatedBooks from "./TopRatedBooks";

const useStyles = makeStyles(theme => ({
  header: {
    backgroundImage:
      "linear-gradient(52deg, rgba(163, 163, 163, 0.09) 0%, rgba(163, 163, 163, 0.09) 33.3%,rgba(100, 100, 100, 0.09) 33.3%, rgba(100, 100, 100, 0.09) 66.6%,rgba(162, 162, 162, 0.09) 66.6%, rgba(162, 162, 162, 0.09) 99%),linear-gradient(258deg, rgba(193, 193, 193, 0.06) 0%, rgba(193, 193, 193, 0.06) 33.3%,rgba(169, 169, 169, 0.06) 33.3%, rgba(169, 169, 169, 0.06) 66.6%,rgba(92, 92, 92, 0.06) 66.6%, rgba(92, 92, 92, 0.06) 99%),linear-gradient(129deg, rgba(45, 45, 45, 0.03) 0%, rgba(45, 45, 45, 0.03) 33.3%,rgba(223, 223, 223, 0.03) 33.3%, rgba(223, 223, 223, 0.03) 66.6%,rgba(173, 173, 173, 0.03) 66.6%, rgba(173, 173, 173, 0.03) 99%),linear-gradient(280deg, rgba(226, 226, 226, 0.06) 0%, rgba(226, 226, 226, 0.06) 33.3%,rgba(81, 81, 81, 0.06) 33.3%, rgba(81, 81, 81, 0.06) 66.6%,rgba(186, 186, 186, 0.06) 66.6%, rgba(186, 186, 186, 0.06) 99%),linear-gradient(85deg, rgba(225, 225, 225, 0.04) 0%, rgba(225, 225, 225, 0.04) 33.3%,rgba(95, 95, 95, 0.04) 33.3%, rgba(95, 95, 95, 0.04) 66.6%,rgba(39, 39, 39, 0.04) 66.6%, rgba(39, 39, 39, 0.04) 99%),linear-gradient(128deg, rgba(184, 184, 184, 0.06) 0%, rgba(184, 184, 184, 0.06) 33.3%,rgba(0, 0, 0, 0.06) 33.3%, rgba(0, 0, 0, 0.06) 66.6%,rgba(140, 140, 140, 0.06) 66.6%, rgba(140, 140, 140, 0.06) 99.89999999999999%),linear-gradient(323deg, rgba(40, 40, 40, 0.07) 0%, rgba(40, 40, 40, 0.07) 33.3%,rgba(214, 214, 214, 0.07) 33.3%, rgba(214, 214, 214, 0.07) 66.6%,rgba(190, 190, 190, 0.07) 66.6%, rgba(190, 190, 190, 0.07) 99.89999999999999%),linear-gradient(61deg, rgba(230, 230, 230, 0) 0%, rgba(230, 230, 230, 0) 33.3%,rgba(241, 241, 241, 0) 33.3%, rgba(241, 241, 241, 0) 66.6%,rgba(55, 55, 55, 0) 66.6%, rgba(55, 55, 55, 0) 99%),linear-gradient(0deg, #2625e3,#0bbaef)",
    width: "100%",
    height: "80vh",
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
  gridIt: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gridGap: 6,
    // margin: "20px 0",
    "& > *": {
      marginRight: 10,
      justifySelf: "start",
      alignSelf: "center"
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
  const router = useRouter();
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="subtitle2"
                  style={{ display: "flex" }}
                  gutterBottom
                >
                  <TimelineIcon
                    fontSize="small"
                    color="secondary"
                    style={{ marginLeft: "5px" }}
                  />
                  Total Books as at {moment(Date.now()).format("MMMM Do, YYYY")}{" "}
                </Typography>
                <>
                  <Typography variant="h1" component="h1">
                    {books.length}
                  </Typography>
                  <sup
                    style={{
                      marginTop: "50px",
                      marginLeft: "-3px",
                      fontWeight: 700
                    }}
                  >
                    books
                  </sup>
                </>
              </div>
              <Divider />
              <div style={{ margin: "20px 0" }}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ marginTop: 10 }}
                >
                  Book Count by Genre
                </Typography>
                <div className={classes.gridIt}>
                  <Chip
                    label="Self Help"
                    color="secondary"
                    avatar={<Avatar>8</Avatar>}
                    onClick={() => console.log("Hello...")}
                  />
                  <Chip
                    label="Autobiography"
                    color="secondary"
                    avatar={<Avatar>2</Avatar>}
                    onClick={() => console.log("Hello...")}
                  />
                  <Chip
                    label="Business"
                    color="secondary"
                    avatar={<Avatar>12</Avatar>}
                    onClick={() => console.log("Hello...")}
                  />
                  <Chip
                    label="Biography"
                    color="secondary"
                    avatar={<Avatar>2</Avatar>}
                    onClick={() => console.log("Hello...")}
                  />
                  <Chip
                    label="History"
                    color="secondary"
                    avatar={<Avatar>4</Avatar>}
                    onClick={() => console.log("Hello...")}
                  />
                  <Chip
                    label="Philosophy"
                    color="secondary"
                    avatar={<Avatar>5</Avatar>}
                    onClick={() => console.log("Hello...")}
                  />
                  <Chip
                    label="Science"
                    color="secondary"
                    avatar={<Avatar>3</Avatar>}
                    onClick={() => console.log("Hello...")}
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
              <Divider />
              <Button
                style={{ margin: "10px 0" }}
                color="secondary"
                onClick={() => router.replace("/books")}
              >
                View all Books
              </Button>
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
