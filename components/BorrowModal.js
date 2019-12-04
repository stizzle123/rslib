import "date-fns";
import React from "react";
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
import { Avatar, makeStyles, Divider } from "@material-ui/core";
import { capitalize } from "../utils/capitalize";

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
    objectFit: "contain"
  }
}));

export default function BorrowModal({ handleClose, open, book }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checked: false
  });
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  return (
    <div className={classes.root}>
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
                I hereby agree to return this book in good condition and be
                liable for any damage done to the integrity of the book.
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
                />
              </MuiPickersUtilsProvider>

              <Button
                variant="contained"
                autoFocus
                onClick={handleClose}
                color="secondary"
                style={{ marginRight: "30px" }}
                disabled={!state.checked}
              >
                Borrow
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      ))}
    </div>
  );
}
