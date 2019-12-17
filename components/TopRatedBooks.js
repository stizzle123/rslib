import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Icon } from "@material-ui/core";
import { makeStyles, withStyles, darken } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import baseUrl from "../utils/baseUrl";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import axios from "axios";
import Link from "next/link";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundImage:
      "linear-gradient(323deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.01) 16.667%,rgba(46, 46, 46, 0.01) 16.667%, rgba(46, 46, 46, 0.01) 33.334%,rgba(226, 226, 226, 0.01) 33.334%, rgba(226, 226, 226, 0.01) 50.001000000000005%,rgba(159, 159, 159, 0.01) 50.001%, rgba(159, 159, 159, 0.01) 66.668%,rgba(149, 149, 149, 0.01) 66.668%, rgba(149, 149, 149, 0.01) 83.33500000000001%,rgba(43, 43, 43, 0.01) 83.335%, rgba(43, 43, 43, 0.01) 100.002%),linear-gradient(346deg, rgba(166, 166, 166, 0.03) 0%, rgba(166, 166, 166, 0.03) 25%,rgba(240, 240, 240, 0.03) 25%, rgba(240, 240, 240, 0.03) 50%,rgba(121, 121, 121, 0.03) 50%, rgba(121, 121, 121, 0.03) 75%,rgba(40, 40, 40, 0.03) 75%, rgba(40, 40, 40, 0.03) 100%),linear-gradient(347deg, rgba(209, 209, 209, 0.01) 0%, rgba(209, 209, 209, 0.01) 25%,rgba(22, 22, 22, 0.01) 25%, rgba(22, 22, 22, 0.01) 50%,rgba(125, 125, 125, 0.01) 50%, rgba(125, 125, 125, 0.01) 75%,rgba(205, 205, 205, 0.01) 75%, rgba(205, 205, 205, 0.01) 100%),linear-gradient(84deg, rgba(195, 195, 195, 0.01) 0%, rgba(195, 195, 195, 0.01) 14.286%,rgba(64, 64, 64, 0.01) 14.286%, rgba(64, 64, 64, 0.01) 28.572%,rgba(67, 67, 67, 0.01) 28.572%, rgba(67, 67, 67, 0.01) 42.858%,rgba(214, 214, 214, 0.01) 42.858%, rgba(214, 214, 214, 0.01) 57.144%,rgba(45, 45, 45, 0.01) 57.144%, rgba(45, 45, 45, 0.01) 71.42999999999999%,rgba(47, 47, 47, 0.01) 71.43%, rgba(47, 47, 47, 0.01) 85.71600000000001%,rgba(172, 172, 172, 0.01) 85.716%, rgba(172, 172, 172, 0.01) 100.002%),linear-gradient(73deg, rgba(111, 111, 111, 0.03) 0%, rgba(111, 111, 111, 0.03) 16.667%,rgba(202, 202, 202, 0.03) 16.667%, rgba(202, 202, 202, 0.03) 33.334%,rgba(57, 57, 57, 0.03) 33.334%, rgba(57, 57, 57, 0.03) 50.001000000000005%,rgba(197, 197, 197, 0.03) 50.001%, rgba(197, 197, 197, 0.03) 66.668%,rgba(97, 97, 97, 0.03) 66.668%, rgba(97, 97, 97, 0.03) 83.33500000000001%,rgba(56, 56, 56, 0.03) 83.335%, rgba(56, 56, 56, 0.03) 100.002%),linear-gradient(132deg, rgba(88, 88, 88, 0.03) 0%, rgba(88, 88, 88, 0.03) 20%,rgba(249, 249, 249, 0.03) 20%, rgba(249, 249, 249, 0.03) 40%,rgba(2, 2, 2, 0.03) 40%, rgba(2, 2, 2, 0.03) 60%,rgba(185, 185, 185, 0.03) 60%, rgba(185, 185, 185, 0.03) 80%,rgba(196, 196, 196, 0.03) 80%, rgba(196, 196, 196, 0.03) 100%),linear-gradient(142deg, rgba(160, 160, 160, 0.03) 0%, rgba(160, 160, 160, 0.03) 12.5%,rgba(204, 204, 204, 0.03) 12.5%, rgba(204, 204, 204, 0.03) 25%,rgba(108, 108, 108, 0.03) 25%, rgba(108, 108, 108, 0.03) 37.5%,rgba(191, 191, 191, 0.03) 37.5%, rgba(191, 191, 191, 0.03) 50%,rgba(231, 231, 231, 0.03) 50%, rgba(231, 231, 231, 0.03) 62.5%,rgba(70, 70, 70, 0.03) 62.5%, rgba(70, 70, 70, 0.03) 75%,rgba(166, 166, 166, 0.03) 75%, rgba(166, 166, 166, 0.03) 87.5%,rgba(199, 199, 199, 0.03) 87.5%, rgba(199, 199, 199, 0.03) 100%),linear-gradient(238deg, rgba(116, 116, 116, 0.02) 0%, rgba(116, 116, 116, 0.02) 20%,rgba(141, 141, 141, 0.02) 20%, rgba(141, 141, 141, 0.02) 40%,rgba(152, 152, 152, 0.02) 40%, rgba(152, 152, 152, 0.02) 60%,rgba(61, 61, 61, 0.02) 60%, rgba(61, 61, 61, 0.02) 80%,rgba(139, 139, 139, 0.02) 80%, rgba(139, 139, 139, 0.02) 100%),linear-gradient(188deg, rgba(227, 227, 227, 0.01) 0%, rgba(227, 227, 227, 0.01) 20%,rgba(105, 105, 105, 0.01) 20%, rgba(105, 105, 105, 0.01) 40%,rgba(72, 72, 72, 0.01) 40%, rgba(72, 72, 72, 0.01) 60%,rgba(33, 33, 33, 0.01) 60%, rgba(33, 33, 33, 0.01) 80%,rgba(57, 57, 57, 0.01) 80%, rgba(57, 57, 57, 0.01) 100%),linear-gradient(90deg, hsl(237,0%,13%),hsl(237,0%,13%))",
    color: theme.palette.common.white,
    textAlign: "center"
  },
  body: {
    fontSize: 14,
    textAlign: "center"
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundImage:
        "linear-gradient(55deg, rgba(208, 208, 208, 0.03) 0%, rgba(208, 208, 208, 0.03) 20%,rgba(55, 55, 55, 0.03) 20%, rgba(55, 55, 55, 0.03) 40%,rgba(81, 81, 81, 0.03) 40%, rgba(81, 81, 81, 0.03) 60%,rgba(208, 208, 208, 0.03) 60%, rgba(208, 208, 208, 0.03) 80%,rgba(191, 191, 191, 0.03) 80%, rgba(191, 191, 191, 0.03) 100%),linear-gradient(291deg, rgba(190, 190, 190, 0.02) 0%, rgba(190, 190, 190, 0.02) 14.286%,rgba(105, 105, 105, 0.02) 14.286%, rgba(105, 105, 105, 0.02) 28.572%,rgba(230, 230, 230, 0.02) 28.572%, rgba(230, 230, 230, 0.02) 42.858%,rgba(216, 216, 216, 0.02) 42.858%, rgba(216, 216, 216, 0.02) 57.144%,rgba(181, 181, 181, 0.02) 57.144%, rgba(181, 181, 181, 0.02) 71.42999999999999%,rgba(129, 129, 129, 0.02) 71.43%, rgba(129, 129, 129, 0.02) 85.71600000000001%,rgba(75, 75, 75, 0.02) 85.716%, rgba(75, 75, 75, 0.02) 100.002%),linear-gradient(32deg, rgba(212, 212, 212, 0.03) 0%, rgba(212, 212, 212, 0.03) 12.5%,rgba(223, 223, 223, 0.03) 12.5%, rgba(223, 223, 223, 0.03) 25%,rgba(11, 11, 11, 0.03) 25%, rgba(11, 11, 11, 0.03) 37.5%,rgba(86, 86, 86, 0.03) 37.5%, rgba(86, 86, 86, 0.03) 50%,rgba(106, 106, 106, 0.03) 50%, rgba(106, 106, 106, 0.03) 62.5%,rgba(220, 220, 220, 0.03) 62.5%, rgba(220, 220, 220, 0.03) 75%,rgba(91, 91, 91, 0.03) 75%, rgba(91, 91, 91, 0.03) 87.5%,rgba(216, 216, 216, 0.03) 87.5%, rgba(216, 216, 216, 0.03) 100%),linear-gradient(312deg, rgba(113, 113, 113, 0.01) 0%, rgba(113, 113, 113, 0.01) 14.286%,rgba(54, 54, 54, 0.01) 14.286%, rgba(54, 54, 54, 0.01) 28.572%,rgba(166, 166, 166, 0.01) 28.572%, rgba(166, 166, 166, 0.01) 42.858%,rgba(226, 226, 226, 0.01) 42.858%, rgba(226, 226, 226, 0.01) 57.144%,rgba(109, 109, 109, 0.01) 57.144%, rgba(109, 109, 109, 0.01) 71.42999999999999%,rgba(239, 239, 239, 0.01) 71.43%, rgba(239, 239, 239, 0.01) 85.71600000000001%,rgba(54, 54, 54, 0.01) 85.716%, rgba(54, 54, 54, 0.01) 100.002%),linear-gradient(22deg, rgba(77, 77, 77, 0.03) 0%, rgba(77, 77, 77, 0.03) 20%,rgba(235, 235, 235, 0.03) 20%, rgba(235, 235, 235, 0.03) 40%,rgba(215, 215, 215, 0.03) 40%, rgba(215, 215, 215, 0.03) 60%,rgba(181, 181, 181, 0.03) 60%, rgba(181, 181, 181, 0.03) 80%,rgba(193, 193, 193, 0.03) 80%, rgba(193, 193, 193, 0.03) 100%),linear-gradient(80deg, rgba(139, 139, 139, 0.02) 0%, rgba(139, 139, 139, 0.02) 14.286%,rgba(114, 114, 114, 0.02) 14.286%, rgba(114, 114, 114, 0.02) 28.572%,rgba(240, 240, 240, 0.02) 28.572%, rgba(240, 240, 240, 0.02) 42.858%,rgba(221, 221, 221, 0.02) 42.858%, rgba(221, 221, 221, 0.02) 57.144%,rgba(74, 74, 74, 0.02) 57.144%, rgba(74, 74, 74, 0.02) 71.42999999999999%,rgba(201, 201, 201, 0.02) 71.43%, rgba(201, 201, 201, 0.02) 85.71600000000001%,rgba(187, 187, 187, 0.02) 85.716%, rgba(187, 187, 187, 0.02) 100.002%),linear-gradient(257deg, rgba(72, 72, 72, 0.03) 0%, rgba(72, 72, 72, 0.03) 16.667%,rgba(138, 138, 138, 0.03) 16.667%, rgba(138, 138, 138, 0.03) 33.334%,rgba(54, 54, 54, 0.03) 33.334%, rgba(54, 54, 54, 0.03) 50.001000000000005%,rgba(161, 161, 161, 0.03) 50.001%, rgba(161, 161, 161, 0.03) 66.668%,rgba(17, 17, 17, 0.03) 66.668%, rgba(17, 17, 17, 0.03) 83.33500000000001%,rgba(230, 230, 230, 0.03) 83.335%, rgba(230, 230, 230, 0.03) 100.002%),linear-gradient(47deg, rgba(191, 191, 191, 0.01) 0%, rgba(191, 191, 191, 0.01) 16.667%,rgba(27, 27, 27, 0.01) 16.667%, rgba(27, 27, 27, 0.01) 33.334%,rgba(66, 66, 66, 0.01) 33.334%, rgba(66, 66, 66, 0.01) 50.001000000000005%,rgba(36, 36, 36, 0.01) 50.001%, rgba(36, 36, 36, 0.01) 66.668%,rgba(230, 230, 230, 0.01) 66.668%, rgba(230, 230, 230, 0.01) 83.33500000000001%,rgba(93, 93, 93, 0.01) 83.335%, rgba(93, 93, 93, 0.01) 100.002%),linear-gradient(90deg, #FFF,#FFF)"
    },
    "&:hover": {
      // cursor: "pointer",
      backgroundColor: darken(theme.palette.background.default, 0.01)
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: "auto"
  },
  table: {
    // minWidth: 650
    width: "100%"
  },
  tableHead: {
    color: "#fff",
    backgroundImage:
      "linear-gradient(161deg, rgba(121, 121, 121, 0.02) 0%, rgba(121, 121, 121, 0.02) 16.667%,rgba(193, 193, 193, 0.02) 16.667%, rgba(193, 193, 193, 0.02) 33.334%,rgba(177, 177, 177, 0.02) 33.334%, rgba(177, 177, 177, 0.02) 50.001000000000005%,rgba(5, 5, 5, 0.02) 50.001%, rgba(5, 5, 5, 0.02) 66.668%,rgba(229, 229, 229, 0.02) 66.668%, rgba(229, 229, 229, 0.02) 83.33500000000001%,rgba(211, 211, 211, 0.02) 83.335%, rgba(211, 211, 211, 0.02) 100.002%),linear-gradient(45deg, rgba(223, 223, 223, 0.02) 0%, rgba(223, 223, 223, 0.02) 14.286%,rgba(70, 70, 70, 0.02) 14.286%, rgba(70, 70, 70, 0.02) 28.572%,rgba(109, 109, 109, 0.02) 28.572%, rgba(109, 109, 109, 0.02) 42.858%,rgba(19, 19, 19, 0.02) 42.858%, rgba(19, 19, 19, 0.02) 57.144%,rgba(180, 180, 180, 0.02) 57.144%, rgba(180, 180, 180, 0.02) 71.42999999999999%,rgba(63, 63, 63, 0.02) 71.43%, rgba(63, 63, 63, 0.02) 85.71600000000001%,rgba(87, 87, 87, 0.02) 85.716%, rgba(87, 87, 87, 0.02) 100.002%),linear-gradient(337deg, rgba(142, 142, 142, 0.02) 0%, rgba(142, 142, 142, 0.02) 20%,rgba(164, 164, 164, 0.02) 20%, rgba(164, 164, 164, 0.02) 40%,rgba(203, 203, 203, 0.02) 40%, rgba(203, 203, 203, 0.02) 60%,rgba(228, 228, 228, 0.02) 60%, rgba(228, 228, 228, 0.02) 80%,rgba(54, 54, 54, 0.02) 80%, rgba(54, 54, 54, 0.02) 100%),linear-gradient(314deg, rgba(187, 187, 187, 0.02) 0%, rgba(187, 187, 187, 0.02) 12.5%,rgba(170, 170, 170, 0.02) 12.5%, rgba(170, 170, 170, 0.02) 25%,rgba(214, 214, 214, 0.02) 25%, rgba(214, 214, 214, 0.02) 37.5%,rgba(187, 187, 187, 0.02) 37.5%, rgba(187, 187, 187, 0.02) 50%,rgba(190, 190, 190, 0.02) 50%, rgba(190, 190, 190, 0.02) 62.5%,rgba(6, 6, 6, 0.02) 62.5%, rgba(6, 6, 6, 0.02) 75%,rgba(206, 206, 206, 0.02) 75%, rgba(206, 206, 206, 0.02) 87.5%,rgba(171, 171, 171, 0.02) 87.5%, rgba(171, 171, 171, 0.02) 100%),linear-gradient(300deg, rgba(243, 243, 243, 0.01) 0%, rgba(243, 243, 243, 0.01) 12.5%,rgba(209, 209, 209, 0.01) 12.5%, rgba(209, 209, 209, 0.01) 25%,rgba(179, 179, 179, 0.01) 25%, rgba(179, 179, 179, 0.01) 37.5%,rgba(3, 3, 3, 0.01) 37.5%, rgba(3, 3, 3, 0.01) 50%,rgba(211, 211, 211, 0.01) 50%, rgba(211, 211, 211, 0.01) 62.5%,rgba(151, 151, 151, 0.01) 62.5%, rgba(151, 151, 151, 0.01) 75%,rgba(16, 16, 16, 0.01) 75%, rgba(16, 16, 16, 0.01) 87.5%,rgba(242, 242, 242, 0.01) 87.5%, rgba(242, 242, 242, 0.01) 100%),linear-gradient(6deg, rgba(31, 31, 31, 0.02) 0%, rgba(31, 31, 31, 0.02) 20%,rgba(193, 193, 193, 0.02) 20%, rgba(193, 193, 193, 0.02) 40%,rgba(139, 139, 139, 0.02) 40%, rgba(139, 139, 139, 0.02) 60%,rgba(14, 14, 14, 0.02) 60%, rgba(14, 14, 14, 0.02) 80%,rgba(122, 122, 122, 0.02) 80%, rgba(122, 122, 122, 0.02) 100%),linear-gradient(279deg, rgba(190, 190, 190, 0.02) 0%, rgba(190, 190, 190, 0.02) 14.286%,rgba(160, 160, 160, 0.02) 14.286%, rgba(160, 160, 160, 0.02) 28.572%,rgba(23, 23, 23, 0.02) 28.572%, rgba(23, 23, 23, 0.02) 42.858%,rgba(60, 60, 60, 0.02) 42.858%, rgba(60, 60, 60, 0.02) 57.144%,rgba(149, 149, 149, 0.02) 57.144%, rgba(149, 149, 149, 0.02) 71.42999999999999%,rgba(4, 4, 4, 0.02) 71.43%, rgba(4, 4, 4, 0.02) 85.71600000000001%,rgba(50, 50, 50, 0.02) 85.716%, rgba(50, 50, 50, 0.02) 100.002%),linear-gradient(109deg, rgba(124, 124, 124, 0.03) 0%, rgba(124, 124, 124, 0.03) 12.5%,rgba(61, 61, 61, 0.03) 12.5%, rgba(61, 61, 61, 0.03) 25%,rgba(187, 187, 187, 0.03) 25%, rgba(187, 187, 187, 0.03) 37.5%,rgba(207, 207, 207, 0.03) 37.5%, rgba(207, 207, 207, 0.03) 50%,rgba(206, 206, 206, 0.03) 50%, rgba(206, 206, 206, 0.03) 62.5%,rgba(118, 118, 118, 0.03) 62.5%, rgba(118, 118, 118, 0.03) 75%,rgba(89, 89, 89, 0.03) 75%, rgba(89, 89, 89, 0.03) 87.5%,rgba(96, 96, 96, 0.03) 87.5%, rgba(96, 96, 96, 0.03) 100%),linear-gradient(329deg, rgba(35, 35, 35, 0.02) 0%, rgba(35, 35, 35, 0.02) 20%,rgba(246, 246, 246, 0.02) 20%, rgba(246, 246, 246, 0.02) 40%,rgba(118, 118, 118, 0.02) 40%, rgba(118, 118, 118, 0.02) 60%,rgba(245, 245, 245, 0.02) 60%, rgba(245, 245, 245, 0.02) 80%,rgba(140, 140, 140, 0.02) 80%, rgba(140, 140, 140, 0.02) 100%),linear-gradient(90deg, hsl(314,0%,31%),hsl(314,0%,31%))"
  },
  link: {
    color: theme.palette.secondary.light,
    transition: theme.transitions.create("color", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    "&:hover": {
      color: theme.palette.secondary.grey
    }
  }
}));

export default function TopRatedBooks() {
  const classes = useStyles();

  const URL = `${baseUrl}/api/toprated`;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    setLoading(true);

    axios
      .get(URL)
      .then(res => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response.data);
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [URL]);

  return (
    <div>
      <Typography
        variant="h6"
        component="h1"
        gutterBottom
        style={{ color: "#fff", display: "flex", alignItems: "center" }}
      >
        Top Rated books{" "}
        <Icon className="fas fa-chart-line" style={{ marginLeft: 10 }} />
      </Typography>
      {loading ? (
        <CircularProgress size="3rem" style={{ margin: "auto" }} />
      ) : (
        <Paper className={classes.root}>
          <TableContainer component={Paper} style={{ width: "100%" }}>
            <Table className={classes.table}>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell align="right">Author</StyledTableCell>
                  <StyledTableCell align="right">Genre</StyledTableCell>
                  {/* <StyledTableCell align="right">Rated By</StyledTableCell> */}
                  <StyledTableCell align="right">Ratings</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map(item => (
                  <StyledTableRow key={item._id}>
                    <StyledTableCell component="th" scope="row">
                      <Link href={`/book/info?id=${item.book._id}`}>
                        <a className={classes.link}>{item.book.title}</a>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.book.authorName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.book.genre}
                    </StyledTableCell>
                    {/* <StyledTableCell align="right">
                      {item.user.email}
                    </StyledTableCell> */}
                    <StyledTableCell align="right">
                      <Rating
                        precision={0.5}
                        name="read-only"
                        value={item.ratings}
                        readOnly
                        size="small"
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
}
