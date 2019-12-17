import React from "react";
import { Typography, TextField, Paper, Button, Icon } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";

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
  }
}));

export default function BookRequest() {
  const classes = useStyles();
  const theme = useTheme();

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className={classes.root}>
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
        />
        <Button type="submit" variant="contained" color="secondary">
          Send
        </Button>
      </form>
    </div>
  );
}
