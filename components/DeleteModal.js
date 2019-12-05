import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  Divider,
  Grid,
  makeStyles,
  Avatar,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import { capitalize } from "../utils/capitalize";
import { fade, darken } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  danger: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.red,
    "&:hover": {
      backgroundColor: darken(theme.palette.secondary.red, 0.1)
    }
  },
  title: {
    color: theme.palette.secondary.light
  }
}));

export default function DeleteModal({
  handleDeleteClose,
  deleteOpen,
  onDeleteBook,
  book
}) {
  const classes = useStyles();
  return (
    <div>
      {book.map(book => (
        <Dialog
          key={book._id}
          fullWidth={true}
          maxWidth="sm"
          onClose={handleDeleteClose}
          open={deleteOpen}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle>
            Are You sure you want to delete this Book?{" "}
            <span className={classes.title}>{book.title}</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>By</strong>:{" "}
              <span className={classes.title}>
                {capitalize(book.authorName)}
              </span>
            </DialogContentText>
            <Avatar
              src={book.imageUrl}
              variant="square"
              style={{
                margin: "auto",
                objectFit: "contain",
                objectPosition: "50% 50%",
                width: 150,
                height: 200
              }}
            />
          </DialogContent>
          <Divider variant="middle" />
          <DialogActions>
            <Grid container justify="space-around" alignItems="center">
              <Button
                onClick={handleDeleteClose}
                color="secondary"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className={classes.danger}
                onClick={() => onDeleteBook(book._id)}
              >
                Delete
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      ))}
    </div>
  );
}
