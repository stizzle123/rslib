import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  tableHead: {
    color: "#fff",
    backgroundImage:
      "linear-gradient(45deg, transparent 0%, transparent 12%,rgba(115, 115, 115,0.07) 12%, rgba(115, 115, 115,0.07) 30%,transparent 30%, transparent 100%),linear-gradient(135deg, transparent 0%, transparent 22%,rgba(115, 115, 115,0.07) 22%, rgba(115, 115, 115,0.07) 65%,transparent 65%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 12%,rgba(115, 115, 115,0.07) 12%, rgba(115, 115, 115,0.07) 26%,transparent 26%, transparent 100%),linear-gradient(90deg, transparent 0%, transparent 42%,rgba(115, 115, 115,0.07) 42%, rgba(115, 115, 115,0.07) 74%,transparent 74%, transparent 100%),linear-gradient(90deg, rgb(0,0,0),rgb(0,0,0))"
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
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell style={{ color: "#fff", textAlign: "center" }}>
                  Title
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: "#fff", textAlign: "center" }}
                >
                  Author
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: "#fff", textAlign: "center" }}
                >
                  Genre
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: "#fff", textAlign: "center" }}
                >
                  Ratings
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map(item => (
                <TableRow key={item._id}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "center" }}
                  >
                    {item.book.title}
                  </TableCell>
                  <TableCell align="right" style={{ textAlign: "center" }}>
                    {item.book.authorName}
                  </TableCell>
                  <TableCell align="right" style={{ textAlign: "center" }}>
                    {item.book.genre}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Box ml={2}>
                      <small>{item.ratings}/5</small>
                    </Box>

                    <Rating
                      precision={0.5}
                      name="read-only"
                      value={item.ratings}
                      readOnly
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
