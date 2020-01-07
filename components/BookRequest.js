import React, { useState } from "react";
import {
  Typography,
  TextField,
  Paper,
  Button,
  Icon,
  CircularProgress,
  Snackbar,
  IconButton
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import baseUrl from "../utils/baseUrl";
import Fade from "@material-ui/core/Fade";

import Cookie from "js-cookie";
import axios from "axios";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    padding: `0 ${theme.spacing(6)}`
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    color: "#fff"
  },
  form: {
    padding: theme.spacing(3),
    backgroundImage:
      "linear-gradient(101deg, rgba(10, 10, 10,0.03) 0%, rgba(10, 10, 10,0.03) 22%,rgba(227, 227, 227,0.03) 22%, rgba(227, 227, 227,0.03) 65%,rgba(80, 80, 80,0.03) 65%, rgba(80, 80, 80,0.03) 100%),linear-gradient(204deg, rgba(185, 185, 185,0.03) 0%, rgba(185, 185, 185,0.03) 5%,rgba(9, 9, 9,0.03) 5%, rgba(9, 9, 9,0.03) 20%,rgba(247, 247, 247,0.03) 20%, rgba(247, 247, 247,0.03) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))",
    borderRadius: 5,
    boxShadow: "0px 1px 2px rgba(0,0,0,0.4)"
  },
  success: {
    backgroundColor: green[600],
    color: "#fff"
  }
}));

const INIT_STATE = {
  title: "",
  author: "",
  justification: ""
};

export default function BookRequest() {
  const classes = useStyles();
  const theme = useTheme();
  const URL = `${baseUrl}/api/requestbook`;
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(INIT_STATE);
  const [snack, setSnack] = useState({
    success: false,
    msg: "",
    Transition: Fade
  });

  const showSuccess = msg => {
    setSnack({ success: true, msg });
  };

  const handleCloseSuccess = () => {
    setSnack({ success: false });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = Cookie.get("token");
    setLoading(true);
    try {
      const payload = { headers: { Authorization: token } };
      const { title, author, justification } = state;
      const data = {
        title,
        author,
        justification
      };
      await axios.post(URL, data, payload);
      setLoading(false);
      setState(INIT_STATE);
      showSuccess("Your Request has been submitted successfully");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleChange = e => {
    const { target } = e;
    setState(prevState => ({ ...prevState, [target.id]: target.value }));
  };

  return (
    <div className={classes.root}>
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
          action={
            <IconButton color="secondary" onClick={handleCloseSuccess}>
              <CloseIcon color="secondary" />
            </IconButton>
          }
          message={<span id="message-id-3">{snack.msg}</span>}
        />
      )}
      <Typography
        variant="h6"
        component="h1"
        gutterBottom
        align="left"
        style={{ color: "#fff", display: "flex", alignItems: "center" }}
      >
        Request A Book{" "}
        <Icon className="fas fa-paper-plane" style={{ marginLeft: 10 }} />
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          id="title"
          label="Book Title"
          placeholder="Book Title"
          multiline
          variant="outlined"
          fullWidth
          className={classes.input}
          color="secondary"
          value={state.title}
          onChange={handleChange}
        />
        <TextField
          id="author"
          label="Author"
          placeholder="Book Title"
          multiline
          variant="outlined"
          fullWidth
          className={classes.input}
          color="secondary"
          value={state.author}
          onChange={handleChange}
        />
        <TextField
          id="justification"
          label="Justification"
          placeholder="Justification"
          multiline
          variant="outlined"
          fullWidth
          rows="4"
          className={classes.input}
          color="secondary"
          value={state.justification}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={
            !(state.title && state.author && state.justification) || loading
          }
        >
          {loading ? (
            <span>
              Sending... <CircularProgress size="1rem" />
            </span>
          ) : (
            <span>Send</span>
          )}
        </Button>
      </form>
    </div>
  );
}
