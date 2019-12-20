import "date-fns";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import {
  Avatar,
  makeStyles,
  Divider,
  IconButton,
  CircularProgress
} from "@material-ui/core";

import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
import { capitalize } from "../utils/capitalize";

import axios from "axios";
import baseUrl from "../utils/baseUrl";
import Cookie from "js-cookie";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100% !important",
    padding: 40,
    position: "absolute"
  },
  modal: {
    width: "100%",
    height: "auto"
  },
  avatar: {
    width: 150,
    height: 200,
    margin: "auto",
    marginTop: "10px",
    objectPosition: "50% 50%",
    objectFit: "contain",
    border: "6px solid #424242",
    borderRadius: 5
  }
}));

export default function BorrowModal({ handleClose, open, book, name, userId }) {
  const classes = useStyles();
  const date = new Date();
  const [state, setState] = useState({
    checked: false
  });
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);
  const [snack, setSnack] = useState({
    open: false,
    Transition: Fade,
    openError: false,
    error: "",
    success: false,
    message: ""
  });

  const showError = err => {
    const error = (err.response && err.response.data) || err.message;
    setSnack({ error, openError: true });
    setLoading(false);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const showSuccess = msg => {
    setSnack({ success: true, message: msg });
  };

  const handleCloseSuccess = () => {
    setSnack({ success: false });
  };

  const handleBorrow = async book => {
    setLoading(true);
    const token = Cookie.get("token");
    try {
      const payload = { headers: { Authorization: token } };

      const data = {
        borrower: userId,
        book: book._id,
        returnDate: selectedDate
      };
      const response = await axios.post(`${baseUrl}/api/log`, data, payload);
      setLoading(false);
      handleClose();
      showSuccess("Book was borrowed successfully");
    } catch (error) {
      console.error(error);
      showError(error);
      setLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      {snack.error && (
        <Snackbar
          open={snack.openError}
          onClose={handleClose}
          TransitionComponent={snack.Transition}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id" style={{ color: "red" }}>
              {snack.error}
            </span>
          }
        />
      )}
      {snack.success && (
        <Snackbar
          open={snack.success}
          onClose={handleCloseSuccess}
          TransitionComponent={snack.Transition}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          // autoHideDuration={6000}
          message={<span id="message-id-2">{snack.message}</span>}
        />
      )}
      {book.map(book => (
        <Dialog
          fullWidth={true}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          key={book._id}
          className={classes.modal}
        >
          <DialogTitle id="responsive-dialog-title">
            <strong>Book Title:</strong> {book.title}
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              <strong>Author:</strong> {capitalize(book.authorName)}
            </DialogContentText>
            <DialogContentText>
              <strong>Genre:</strong> {capitalize(book.genre)}
            </DialogContentText>
            <Divider variant="middle" />
            <Avatar
              src={book.imageUrl}
              variant="square"
              className={classes.avatar}
            />
            <>
              <Switch
                onChange={handleChange("checked")}
                checked={state.checked}
                value="checked"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />{" "}
              <small>
                I {capitalize(name)}, do hereby agree to return this book on or
                before the return date in good condition and be held accountable
                for any misplacement or damage done to the integrity of this
                book.
              </small>
            </>
          </DialogContent>
          <Divider variant="middle" />
          <DialogActions>
            <Grid container justify="space-between" alignItems="center">
              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                style={{ display: "inline-block" }}
              >
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Select return date"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                  disabled={!state.checked}
                  disablePast
                  style={{ top: "-10px", left: "30px" }}
                  maxDate={date.setDate(date.getDate() + 14)}
                />
              </MuiPickersUtilsProvider>

              <Button
                variant="contained"
                autoFocus
                onClick={() => handleBorrow(book)}
                color="secondary"
                style={{ marginRight: "30px" }}
                disabled={!state.checked || loading}
              >
                {loading ? (
                  <span>
                    Loading...
                    <CircularProgress size={10} />
                  </span>
                ) : (
                  <span>Borrow</span>
                )}
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      ))}
    </div>
  );
}
