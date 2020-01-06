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
  Tooltip,
  Grid
} from "@material-ui/core";
import { makeStyles, useTheme, withStyles } from "@material-ui/styles";
import Badge from "@material-ui/core/Badge";

import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import TimelineIcon from "@material-ui/icons/Timeline";
import PollIcon from "@material-ui/icons/Poll";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/router";
import baseUrl from "../utils/baseUrl";
import TopRatedBooks from "./TopRatedBooks";
import Link from "next/link";
import BookRequest from "./BookRequest";
import DataChart from "./DataChart";

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
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    // alignItems: "start",
    justifyContent: "center",
    gridGap: "20px",
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
  },
  container: {
    width: "100%",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    backgroundImage:
      "linear-gradient(84deg, rgba(110, 147, 161, 0.04) 0%, rgba(110, 147, 161, 0.04) 50%,rgba(31, 225, 91, 0.04) 50%, rgba(31, 225, 91, 0.04) 100%),linear-gradient(338deg, rgba(201, 121, 180, 0.04) 0%, rgba(201, 121, 180, 0.04) 50%,rgba(1, 113, 56, 0.04) 50%, rgba(1, 113, 56, 0.04) 100%),linear-gradient(223deg, rgba(211, 211, 180, 0.04) 0%, rgba(211, 211, 180, 0.04) 50%,rgba(13, 109, 126, 0.04) 50%, rgba(13, 109, 126, 0.04) 100%),linear-gradient(327deg, rgba(52, 121, 135, 0.04) 0%, rgba(52, 121, 135, 0.04) 50%,rgba(18, 246, 96, 0.04) 50%, rgba(18, 246, 96, 0.04) 100%),linear-gradient(289deg, rgba(127, 18, 115, 0.04) 0%, rgba(127, 18, 115, 0.04) 50%,rgba(70, 203, 229, 0.04) 50%, rgba(70, 203, 229, 0.04) 100%),linear-gradient(203deg, rgba(131, 205, 141, 0.04) 0%, rgba(131, 205, 141, 0.04) 50%,rgba(37, 31, 18, 0.04) 50%, rgba(37, 31, 18, 0.04) 100%),linear-gradient(221deg, rgba(13, 183, 43, 0.04) 0%, rgba(13, 183, 43, 0.04) 50%,rgba(103, 42, 135, 0.04) 50%, rgba(103, 42, 135, 0.04) 100%),linear-gradient(232deg, rgba(85, 200, 233, 0.04) 0%, rgba(85, 200, 233, 0.04) 50%,rgba(215, 24, 12, 0.04) 50%, rgba(215, 24, 12, 0.04) 100%),linear-gradient(226deg, rgba(95, 197, 25, 0.04) 0%, rgba(95, 197, 25, 0.04) 50%,rgba(30, 61, 7, 0.04) 50%, rgba(30, 61, 7, 0.04) 100%),linear-gradient(178deg, rgba(132, 241, 60, 0.04) 0%, rgba(132, 241, 60, 0.04) 50%,rgba(52, 203, 19, 0.04) 50%, rgba(52, 203, 19, 0.04) 100%),linear-gradient(138deg, rgba(67, 161, 9, 0.04) 0%, rgba(67, 161, 9, 0.04) 50%,rgba(27, 242, 201, 0.04) 50%, rgba(27, 242, 201, 0.04) 100%),linear-gradient(342deg, rgba(33, 36, 218, 0.04) 0%, rgba(33, 36, 218, 0.04) 50%,rgba(248, 232, 35, 0.04) 50%, rgba(248, 232, 35, 0.04) 100%),linear-gradient(70deg, rgba(236, 115, 112, 0.04) 0%, rgba(236, 115, 112, 0.04) 50%,rgba(33, 180, 6, 0.04) 50%, rgba(33, 180, 6, 0.04) 100%),linear-gradient(106deg, rgba(11, 133, 241, 0.04) 0%, rgba(11, 133, 241, 0.04) 50%,rgba(197, 131, 207, 0.04) 50%, rgba(197, 131, 207, 0.04) 100%),linear-gradient(127deg, rgb(50, 233, 241),rgb(7, 146, 201))"
  },
  chartContainer: {
    // backgroundImage:
    //   "linear-gradient(297deg, transparent 0%, transparent 34%,rgba(178, 178, 178,0.02) 34%, rgba(178, 178, 178,0.02) 53%,transparent 53%, transparent 100%),linear-gradient(222deg, transparent 0%, transparent 30%,rgba(8, 8, 8,0.02) 30%, rgba(8, 8, 8,0.02) 58%,transparent 58%, transparent 100%),linear-gradient(352deg, transparent 0%, transparent 25%,rgba(88, 88, 88,0.02) 25%, rgba(88, 88, 88,0.02) 57%,transparent 57%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  chart: {
    padding: theme.spacing(6),
    // height: "100vh",

    backgroundImage:
      "linear-gradient(348deg, transparent 0%, transparent 76%,rgba(194, 194, 194,0.04) 76%, rgba(194, 194, 194,0.04) 93%,transparent 93%, transparent 100%),linear-gradient(150deg, transparent 0%, transparent 10%,rgba(194, 194, 194,0.04) 10%, rgba(194, 194, 194,0.04) 74%,transparent 74%, transparent 100%),linear-gradient(68deg, transparent 0%, transparent 36%,rgba(194, 194, 194,0.04) 36%, rgba(194, 194, 194,0.04) 47%,transparent 47%, transparent 100%),linear-gradient(199deg, transparent 0%, transparent 37%,rgba(194, 194, 194,0.04) 37%, rgba(194, 194, 194,0.04) 47%,transparent 47%, transparent 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0))"
  },
  chartIllustration: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",

    display: "block",
    opacity: 0.9,
    // backgroundImage: "url(images/icon-bg.png)",
    backgroundImage:
      "radial-gradient(circle at 40% 49%, rgba(196, 196, 196,0.04) 0%, rgba(196, 196, 196,0.04) 50%,rgba(91, 91, 91,0.04) 50%, rgba(91, 91, 91,0.04) 100%),radial-gradient(circle at 32% 80%, rgba(42, 42, 42,0.04) 0%, rgba(42, 42, 42,0.04) 50%,rgba(186, 186, 186,0.04) 50%, rgba(186, 186, 186,0.04) 100%),radial-gradient(circle at 72% 99%, rgba(233, 233, 233,0.04) 0%, rgba(233, 233, 233,0.04) 50%,rgba(53, 53, 53,0.04) 50%, rgba(53, 53, 53,0.04) 100%),linear-gradient(148deg, rgb(126, 9, 68),rgb(223, 57, 181))",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    "&:after": {
      content: "",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.6)"
    }
  },
  dashboardBg: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  card: {
    maxWidth: 345,
    display: "none",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  media: {
    height: 140
  },
  cardContainer: {
    width: "100%",
    // height: "100vh",
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    paddingRight: theme.spacing(6),
    backgroundImage:
      "linear-gradient(348deg, transparent 0%, transparent 76%,rgba(194, 194, 194,0.04) 76%, rgba(194, 194, 194,0.04) 93%,transparent 93%, transparent 100%),linear-gradient(150deg, transparent 0%, transparent 10%,rgba(194, 194, 194,0.04) 10%, rgba(194, 194, 194,0.04) 74%,transparent 74%, transparent 100%),linear-gradient(68deg, transparent 0%, transparent 36%,rgba(194, 194, 194,0.04) 36%, rgba(194, 194, 194,0.04) 47%,transparent 47%, transparent 100%),linear-gradient(199deg, transparent 0%, transparent 37%,rgba(194, 194, 194,0.04) 37%, rgba(194, 194, 194,0.04) 47%,transparent 47%, transparent 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0))",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  cardContent: {
    padding: theme.spacing(6),
    backgroundImage:
      "linear-gradient(161deg, rgba(75, 75, 75,0.03) 0%, rgba(75, 75, 75,0.03) 27%,rgba(85, 85, 85,0.03) 27%, rgba(85, 85, 85,0.03) 32%,rgba(174, 174, 174,0.03) 32%, rgba(174, 174, 174,0.03) 100%),linear-gradient(320deg, rgba(138, 138, 138,0.03) 0%, rgba(138, 138, 138,0.03) 55%,rgba(234, 234, 234,0.03) 55%, rgba(234, 234, 234,0.03) 66%,rgba(197, 197, 197,0.03) 66%, rgba(197, 197, 197,0.03) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))"
  },
  cardTop: {
    padding: theme.spacing(3),
    // backgroundImage: "url(/images/icon-bg.png)",
    backgroundImage:
      "radial-gradient(circle at 40% 49%, rgba(196, 196, 196,0.04) 0%, rgba(196, 196, 196,0.04) 50%,rgba(91, 91, 91,0.04) 50%, rgba(91, 91, 91,0.04) 100%),radial-gradient(circle at 32% 80%, rgba(42, 42, 42,0.04) 0%, rgba(42, 42, 42,0.04) 50%,rgba(186, 186, 186,0.04) 50%, rgba(186, 186, 186,0.04) 100%),radial-gradient(circle at 72% 99%, rgba(233, 233, 233,0.04) 0%, rgba(233, 233, 233,0.04) 50%,rgba(53, 53, 53,0.04) 50%, rgba(53, 53, 53,0.04) 100%),linear-gradient(148deg, rgb(126, 9, 68),rgb(223, 57, 181))",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }
}));

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,

    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}))(Badge);

export default function Dashboard({ collections, _id }) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [latestbooks, setLatestBooks] = useState([]);
  const [totalusers, setTotalUsers] = useState(0);
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
  const [load, setLoad] = useState(false);
  const [log, setLog] = useState([]);
  const latestBookUrl = `${baseUrl}/api/latestbooks`;
  const logUrl = `${baseUrl}/api/log`;
  const countUrl = `${baseUrl}/api/totalusers`;
  const booksUrl = `${baseUrl}/api/books`;

  useEffect(() => {
    let abortController = new AbortController();

    setLoading(true);
    axios
      .get(booksUrl)
      .then(res => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    return () => {
      abortController.abort();
      setBooks([]);
    };
  }, [booksUrl]);

  useEffect(() => {
    let abortController = new AbortController();

    axios
      .get(latestBookUrl)
      .then(res => {
        setLatestBooks(res.data);
      })
      .catch(err => {
        console.error(err);
      });
    return () => {
      abortController.abort();
      setBooks([]);
    };
  }, [latestBookUrl]);

  useEffect(() => {
    let abortController = new AbortController();
    setLoad(true);
    axios
      .get(countUrl)
      .then(res => {
        setTotalUsers(res.data);
        setLoad(false);
      })
      .catch(err => {
        console.error(err);
        setLoad(false);
      });
    return () => {
      abortController.abort();
    };
  }, [countUrl]);

  useEffect(() => {
    let abortController = new AbortController();

    let business = getGenre("business");
    let selfhelp = getGenre("selfhelp");
    let history = getGenre("history");
    let autobiography = getGenre("autobiography");
    let biography = getGenre("biography");
    let science = getGenre("science");
    let philosophy = getGenre("philosophy");
    let legal = getGenre("legal");
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

  const getGenre = key => {
    return books.filter(book => {
      if (book.genre === key) {
        return book;
      }
    });
  };

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

  const getOverdue = () => {
    return log.filter(log => log.status === "overdue");
  };

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
                    style={{ marginLeft: 3 }}
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
              <Chip
                label={
                  <strong
                    style={{
                      marginLeft: 3,
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    Active users:{" "}
                    {load ? (
                      <CircularProgress
                        size="0.8rem"
                        color="secondary"
                        style={{ marginLeft: 4 }}
                      />
                    ) : (
                      totalusers
                    )}
                  </strong>
                }
                style={{ marginBottom: 10, marginLeft: 2 }}
                variant="outlined"
                color="secondary"
                icon={
                  <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right"
                    }}
                    variant="dot"
                    style={{ marginLeft: -1 }}
                  />
                }
              />

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
                    Overdue:{" "}
                    <span className={classes.spanIt}>
                      {getOverdue().length}
                    </span>
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
      <div className={classes.container}>
        <Container>
          <Divider style={{ margin: "40px" }} />
          <div style={{ margin: "30px 0" }}>
            <div className={classes.grid2}>
              <TopRatedBooks />
              <BookRequest />
            </div>
          </div>
        </Container>
      </div>
      <Grid container className={classes.chartContainer}>
        <Grid item md={6} sm={12} className={classes.chart}>
          <DataChart />
        </Grid>
        <Grid item md={6} sm={12} className={classes.chartIllustration}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            <Typography
              variant="h3"
              align="center"
              style={{ color: "#fff" }}
              gutterBottom
            >
              Analytics
            </Typography>
            <Typography paragraph style={{ color: "#fff" }} align="center">
              Detailed analytics to measure and analyse users engagement with RS
              Library application
            </Typography>
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={() => router.push("/books")}
                variant="contained"
                color="primary"
              >
                Get Started
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className={classes.cardContainer}>
        <Card className={classes.card}>
          <CardContent className={classes.cardTop}>
            <DataChart />
          </CardContent>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              Analytics
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ marginBottom: 20 }}
            >
              Detailed analytics to measure and analyse users engagement with RS
              Library
            </Typography>
            <Button
              onClick={() => router.push("/books")}
              variant="contained"
              color="primary"
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
