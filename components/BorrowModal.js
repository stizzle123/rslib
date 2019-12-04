import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Avatar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100% !important",
    padding: 40,
    position: "absolute"
  },
  modal: {
    width: "100%",
    height: "auto"
  }
}));

export default function BorrowModal({ handleClose, open, book }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {book.map(book => (
        <Dialog
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
              <strong>Author:</strong> {book.authorName}
            </DialogContentText>
            <DialogContentText>
              <strong>Genre:</strong> {book.genre}
            </DialogContentText>
            <Avatar
              src={book.imageUrl}
              variant="square"
              style={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
                objectPosition: "center"
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              autoFocus
              onClick={handleClose}
              color="secondary"
              style={{ marginRight: "20px" }}
            >
              Borrow
            </Button>
            {/* <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button> */}
          </DialogActions>
        </Dialog>
      ))}
    </div>
  );
}
