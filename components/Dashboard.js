import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Container,
  Divider,
  List,
  ListItem,
  CircularProgress,
  Button,
  Tooltip
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
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
import Link from "next/link";

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
    // alignItems: "start",
    justifyContent: "center",
    gridGap: "10px",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr)"
    }
  },
  gridIt: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
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
  const theme = useTheme();
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [latestbooks, setLatestBooks] = useState([]);
  const [count, setCount] = useState({
    autobiography: [],
    biography: [],
    selfhelp: [],
    business: [],
    science: [],
    philosophy: [],
    history: [],
    legal: []
  });
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState([]);
  const latestBookUrl = `${baseUrl}/api/latestbooks`;
  const logUrl = `${baseUrl}/api/log`;

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

  useEffect(() => {
    let abortController = new AbortController();
    let business = books.filter(book => {
      if (book.genre === "business") {
        return book;
      }
    });
    let selfhelp = books.filter(book => {
      if (book.genre === "selfhelp") {
        return book;
      }
    });
    let autobiography = books.filter(book => {
      if (book.genre === "autobiography") {
        return book;
      }
    });
    let biography = books.filter(book => {
      if (book.genre === "biography") {
        return book;
      }
    });
    let science = books.filter(book => {
      if (book.genre === "science") {
        return book;
      }
    });
    let history = books.filter(book => {
      if (book.genre === "history") {
        return book;
      }
    });
    let philosophy = books.filter(book => {
      if (book.genre === "philosophy") {
        return book;
      }
    });
    let legal = books.filter(book => {
      if (book.genre === "legal") {
        return book;
      }
    });
    setCount(prevState => ({
      business,
      selfhelp,
      history,
      autobiography,
      biography,
      science,
      philosophy,
      legal
    }));
    return () => {
      abortController.abort();
    };
  }, [books]);

  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(logUrl)
      .then(res => {
        setLog(res.data);
      })
      .catch(err => console.error(err));

    return () => {
      abortController.abort();
    };
  }, [logUrl]);

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
                  <strong>
                    Total Books as at{" "}
                    {moment(Date.now()).format("MMMM Do, YYYY")}{" "}
                  </strong>
                </Typography>
                <>
                  <Typography variant="h1" component="h1">
                    {books.length}
                  </Typography>
                </>
              </div>
              <Divider />
              <div style={{ margin: "20px 0" }}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ marginTop: 10 }}
                >
                  <strong> Book Count by Genre</strong>
                </Typography>
                <div className={classes.gridIt}>
                  <Chip
                    label="Self Help"
                    color="secondary"
                    avatar={<Avatar>{count.selfhelp.length}</Avatar>}
                    onClick={() => router.push(`/collection?genre=selfhelp`)}
                  />
                  <Chip
                    label="Autobiography"
                    color="secondary"
                    avatar={<Avatar>{count.autobiography.length}</Avatar>}
                    onClick={() =>
                      router.push(`/collection?genre=autobiography`)
                    }
                  />
                  <Chip
                    label="Business"
                    color="secondary"
                    avatar={<Avatar>{count.business.length}</Avatar>}
                    onClick={() => router.push(`/collection?genre=business`)}
                  />
                  <Chip
                    label="Biography"
                    color="secondary"
                    avatar={<Avatar>{count.biography.length}</Avatar>}
                    onClick={() => router.push(`/collection?genre=biography`)}
                  />
                  <Chip
                    label="History"
                    color="secondary"
                    avatar={<Avatar>{count.history.length}</Avatar>}
                    onClick={() => router.push(`/collection?genre=history`)}
                  />
                  <Chip
                    label="Philosophy"
                    color="secondary"
                    avatar={<Avatar>{count.philosophy.length}</Avatar>}
                    onClick={() => router.push(`/collection?genre=philosophy`)}
                  />
                  <Chip
                    label="Science"
                    color="secondary"
                    avatar={<Avatar>{count.science.length}</Avatar>}
                    onClick={() => router.push(`/collection?genre=science`)}
                  />
                </div>
              </div>
              <Divider />
              <div style={{ margin: "20px 0", fontStyle: "bold" }}>
                <Typography variant="subtitle2">
                  <strong>
                    Checked out:{" "}
                    <span className={classes.spanIt}>{log.length}</span>
                  </strong>
                </Typography>
                <Typography variant="subtitle2">
                  <strong>
                    Overdue: <span className={classes.spanIt}>0</span>
                  </strong>
                </Typography>
              </div>
            </Paper>
            <Paper className={classes.paper}>
              <Typography variant="subtitle1">
                <strong>New Arrivals</strong>
              </Typography>
              <List>
                {loading ? (
                  <CircularProgress />
                ) : (
                  latestbooks.map((book, i) => (
                    <ListItem key={book._id}>
                      <span style={{ marginRight: 5 }}>{i + 1}</span>{" "}
                      <Link href={`/book/info?id=${book._id}`}>
                        <a style={{ color: theme.palette.secondary.light }}>
                          {book.title}
                        </a>
                      </Link>
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
