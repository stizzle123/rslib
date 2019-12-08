import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import {
  Divider,
  Grid,
  makeStyles,
  Avatar,
  DialogContent,
  DialogContentText,
  Typography
} from "@material-ui/core";
import { capitalize } from "../utils/capitalize";
import { darken } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";

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
  const theme = useTheme();
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
            <span
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              Delete <DeleteForeverIcon />
            </span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are You sure you want to delete{" "}
              <span style={{ color: theme.palette.secondary.grey }}>
                "{book.title}"
              </span>{" "}
              by{" "}
              <span style={{ color: theme.palette.secondary.grey }}>
                {capitalize(book.authorName)}
              </span>
              ?
            </DialogContentText>
          </DialogContent>
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
