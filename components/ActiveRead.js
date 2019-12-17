import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePaginationActions from "./TablePaginationActions";
import ArchiveIcon from "@material-ui/icons/Archive";
import Chip from "@material-ui/core/Chip";
import {
  TableHead,
  Typography,
  CircularProgress,
  IconButton,
  useTheme,
  Button
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import { capitalize } from "../utils/capitalize";
import { darken } from "@material-ui/core/styles";
import moment from "moment";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";

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
      backgroundColor: theme.palette.background.default
    },
    "&:hover": {
      backgroundColor: darken(theme.palette.background.default, 0.01)
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  base: {
    padding: theme.spacing(8),
    textAlign: "center",
    height: "100vh",
    minHeight: "100%",
    position: "relative",
    backgroundImage:
      "linear-gradient(74deg, rgba(236, 236, 236,0.02) 0%, rgba(236, 236, 236,0.02) 13%,transparent 13%, transparent 64%,rgba(55, 55, 55,0.02) 64%, rgba(55, 55, 55,0.02) 71%,rgba(239, 239, 239,0.02) 71%, rgba(239, 239, 239,0.02) 100%),linear-gradient(170deg, rgba(8, 8, 8,0.02) 0%, rgba(8, 8, 8,0.02) 1%,transparent 1%, transparent 60%,rgba(9, 9, 9,0.02) 60%, rgba(9, 9, 9,0.02) 80%,rgba(198, 198, 198,0.02) 80%, rgba(198, 198, 198,0.02) 100%),linear-gradient(118deg, rgba(134, 134, 134,0.02) 0%, rgba(134, 134, 134,0.02) 30%,transparent 30%, transparent 43%,rgba(85, 85, 85,0.02) 43%, rgba(85, 85, 85,0.02) 47%,rgba(103, 103, 103,0.02) 47%, rgba(103, 103, 103,0.02) 100%),linear-gradient(249deg, rgba(178, 178, 178,0.02) 0%, rgba(178, 178, 178,0.02) 8%,transparent 8%, transparent 47%,rgba(161, 161, 161,0.02) 47%, rgba(161, 161, 161,0.02) 61%,rgba(19, 19, 19,0.02) 61%, rgba(19, 19, 19,0.02) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))",
    backgroundAttachment: "fixed",
    [theme.breakpoints.down("sm")]: {
      minHeight: "100vh",
      height: "100%"
    }
  },
  root: {
    width: "100%"
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  },
  tableHeader: {
    backgroundImage:
      "linear-gradient(323deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.01) 16.667%,rgba(46, 46, 46, 0.01) 16.667%, rgba(46, 46, 46, 0.01) 33.334%,rgba(226, 226, 226, 0.01) 33.334%, rgba(226, 226, 226, 0.01) 50.001000000000005%,rgba(159, 159, 159, 0.01) 50.001%, rgba(159, 159, 159, 0.01) 66.668%,rgba(149, 149, 149, 0.01) 66.668%, rgba(149, 149, 149, 0.01) 83.33500000000001%,rgba(43, 43, 43, 0.01) 83.335%, rgba(43, 43, 43, 0.01) 100.002%),linear-gradient(346deg, rgba(166, 166, 166, 0.03) 0%, rgba(166, 166, 166, 0.03) 25%,rgba(240, 240, 240, 0.03) 25%, rgba(240, 240, 240, 0.03) 50%,rgba(121, 121, 121, 0.03) 50%, rgba(121, 121, 121, 0.03) 75%,rgba(40, 40, 40, 0.03) 75%, rgba(40, 40, 40, 0.03) 100%),linear-gradient(347deg, rgba(209, 209, 209, 0.01) 0%, rgba(209, 209, 209, 0.01) 25%,rgba(22, 22, 22, 0.01) 25%, rgba(22, 22, 22, 0.01) 50%,rgba(125, 125, 125, 0.01) 50%, rgba(125, 125, 125, 0.01) 75%,rgba(205, 205, 205, 0.01) 75%, rgba(205, 205, 205, 0.01) 100%),linear-gradient(84deg, rgba(195, 195, 195, 0.01) 0%, rgba(195, 195, 195, 0.01) 14.286%,rgba(64, 64, 64, 0.01) 14.286%, rgba(64, 64, 64, 0.01) 28.572%,rgba(67, 67, 67, 0.01) 28.572%, rgba(67, 67, 67, 0.01) 42.858%,rgba(214, 214, 214, 0.01) 42.858%, rgba(214, 214, 214, 0.01) 57.144%,rgba(45, 45, 45, 0.01) 57.144%, rgba(45, 45, 45, 0.01) 71.42999999999999%,rgba(47, 47, 47, 0.01) 71.43%, rgba(47, 47, 47, 0.01) 85.71600000000001%,rgba(172, 172, 172, 0.01) 85.716%, rgba(172, 172, 172, 0.01) 100.002%),linear-gradient(73deg, rgba(111, 111, 111, 0.03) 0%, rgba(111, 111, 111, 0.03) 16.667%,rgba(202, 202, 202, 0.03) 16.667%, rgba(202, 202, 202, 0.03) 33.334%,rgba(57, 57, 57, 0.03) 33.334%, rgba(57, 57, 57, 0.03) 50.001000000000005%,rgba(197, 197, 197, 0.03) 50.001%, rgba(197, 197, 197, 0.03) 66.668%,rgba(97, 97, 97, 0.03) 66.668%, rgba(97, 97, 97, 0.03) 83.33500000000001%,rgba(56, 56, 56, 0.03) 83.335%, rgba(56, 56, 56, 0.03) 100.002%),linear-gradient(132deg, rgba(88, 88, 88, 0.03) 0%, rgba(88, 88, 88, 0.03) 20%,rgba(249, 249, 249, 0.03) 20%, rgba(249, 249, 249, 0.03) 40%,rgba(2, 2, 2, 0.03) 40%, rgba(2, 2, 2, 0.03) 60%,rgba(185, 185, 185, 0.03) 60%, rgba(185, 185, 185, 0.03) 80%,rgba(196, 196, 196, 0.03) 80%, rgba(196, 196, 196, 0.03) 100%),linear-gradient(142deg, rgba(160, 160, 160, 0.03) 0%, rgba(160, 160, 160, 0.03) 12.5%,rgba(204, 204, 204, 0.03) 12.5%, rgba(204, 204, 204, 0.03) 25%,rgba(108, 108, 108, 0.03) 25%, rgba(108, 108, 108, 0.03) 37.5%,rgba(191, 191, 191, 0.03) 37.5%, rgba(191, 191, 191, 0.03) 50%,rgba(231, 231, 231, 0.03) 50%, rgba(231, 231, 231, 0.03) 62.5%,rgba(70, 70, 70, 0.03) 62.5%, rgba(70, 70, 70, 0.03) 75%,rgba(166, 166, 166, 0.03) 75%, rgba(166, 166, 166, 0.03) 87.5%,rgba(199, 199, 199, 0.03) 87.5%, rgba(199, 199, 199, 0.03) 100%),linear-gradient(238deg, rgba(116, 116, 116, 0.02) 0%, rgba(116, 116, 116, 0.02) 20%,rgba(141, 141, 141, 0.02) 20%, rgba(141, 141, 141, 0.02) 40%,rgba(152, 152, 152, 0.02) 40%, rgba(152, 152, 152, 0.02) 60%,rgba(61, 61, 61, 0.02) 60%, rgba(61, 61, 61, 0.02) 80%,rgba(139, 139, 139, 0.02) 80%, rgba(139, 139, 139, 0.02) 100%),linear-gradient(188deg, rgba(227, 227, 227, 0.01) 0%, rgba(227, 227, 227, 0.01) 20%,rgba(105, 105, 105, 0.01) 20%, rgba(105, 105, 105, 0.01) 40%,rgba(72, 72, 72, 0.01) 40%, rgba(72, 72, 72, 0.01) 60%,rgba(33, 33, 33, 0.01) 60%, rgba(33, 33, 33, 0.01) 80%,rgba(57, 57, 57, 0.01) 80%, rgba(57, 57, 57, 0.01) 100%),linear-gradient(90deg, hsl(237,0%,13%),hsl(237,0%,13%))",
    color: "#fff",
    textAlign: "center"
  },
  spinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
    // [theme.breakpoints.down("sm")]: {
    //   fontSize: "0.8rem"
    // }
  },
  pagination: {
    "&.MuiTablePagination-root": {
      overflow: "none"
    }
  }
}));

export default function ActiveRead({ reads, id, loading, setLoading }) {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const URL = `${baseUrl}/api/return`;
  const [books, setBooks] = useState([]);
  const [getId, setGetId] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const abortController = new AbortController();
    setBooks(reads);
    return () => {
      abortController.abort();
    };
  }, [reads]);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBookReturn = async (bookId, logId) => {
    setGetId(logId);
    const payload = {
      borrower: id,
      book: bookId,
      _id: logId,
      status: "returned"
    };
    setLoad(true);
    try {
      const response = await axios.patch(URL, payload);
      setLoad(false);
      let arr = [
        ...books.map(book =>
          book._id === response.data._id ? response.data : book
        )
      ];

      setBooks(arr);
    } catch (error) {
      console.error(error);
      setLoad(false);
    }
  };

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          {loading ? (
            <CircularProgress
              style={{
                position: "absolute",
                left: "50%"
              }}
            />
          ) : (
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell align="right">Author</StyledTableCell>
                    <StyledTableCell align="right">Status</StyledTableCell>
                    <StyledTableCell align="right">Due Date</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(rowsPerPage > 0
                    ? books.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : books
                  ).map(read => (
                    <StyledTableRow key={read._id}>
                      <StyledTableCell component="th" scope="row">
                        {read.book.title}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {read.book.authorName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Chip
                          variant="outlined"
                          color={
                            read.status === "in-use" ? "secondary" : "primary"
                          }
                          label={read.status}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {moment(read.returnDate).format("Do MMMM, YYYY")}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          color="secondary"
                          variant="contained"
                          // size="small"
                          onClick={() =>
                            handleBookReturn(read.book._id, read._id)
                          }
                          disabled={
                            (load && read._id === getId) ||
                            read.status === "returned" ||
                            read.status === "closedout"
                          }
                        >
                          {load && read._id === getId ? (
                            <span>
                              Loading...
                              <CircularProgress size={10} />
                            </span>
                          ) : (
                            <span>Return</span>
                          )}
                        </Button>
                        {/* {read.status === "closedout" ? (
                        <IconButton>
                          <DeleteIcon color="error" />
                        </IconButton>
                      ) : (
                        ""
                      )} */}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={books.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                component="div"
                className={classes.pagination}
              />
            </TableContainer>
          )}
        </div>
      </Paper>
    </>
  );
}
