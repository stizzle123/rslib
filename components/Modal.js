import React, { useState, useEffect } from "react";

import {
  makeStyles,
  Button,
  CircularProgress,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Switch,
  DialogActions,
  Typography
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
import { capitalize } from "../utils/capitalize";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

const useStyles = makeStyles(theme => ({
  modal: {
    width: "100%",
    height: "auto"
  },
  avatar2: {
    width: 150,
    height: 200,
    margin: "auto",
    marginTop: "10px",
    objectPosition: "50% 50%",
    objectFit: "contain",
    border: `6px solid ${theme.palette.primary.light}`,
    borderRadius: 5
  },
  icon: {
    fontSize: 20
  }
}));

export default function Modal({ book, open, handleClose, name, userId }) {
  const router = useRouter();

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

  const closeError = () => {
    setSnack({ openError: false });
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
      setTimeout(() => {
        router.reload();
      }, 1500);
    } catch (error) {
      console.error(error);
      showError(error);
      setLoading(false);
    }
  };

  return (
    <>
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
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={closeError}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
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
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      )}
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleCloseSuccess}
        aria-labelledby="responsive-dialog-title"
        className={classes.modal}
      >
        <DialogTitle id="responsive-dialog-title">
          <strong>Book Title:</strong> {book.title}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <strong>Author:</strong>{" "}
            <Typography variant="overline">{book.authorName}</Typography>
          </DialogContentText>
          <DialogContentText>
            <strong>Genre:</strong>{" "}
            <Typography variant="overline">{book.genre}</Typography>
          </DialogContentText>
          <Divider variant="middle" />
          <Avatar
            src={book.imageUrl}
            variant="square"
            className={classes.avatar2}
          />
          <>
            <Switch
              onChange={handleChange("checked")}
              checked={state.checked}
              value="checked"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />{" "}
            <small>
              I{" "}
              <Typography variant="overline" color="textSecondary">
                {name}
              </Typography>
              , do hereby agree to return this book on or before the return date
              in good condition and be held accountable for any misplacement or
              damage done to the integrity of this book.
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
    </>
  );
}
