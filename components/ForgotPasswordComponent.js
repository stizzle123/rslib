import { useState, useEffect } from "react";

import {
  TextField,
  Button,
  Paper,
  Divider,
  Typography,
  Card,
  CardContent
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import MoodBadIcon from "@material-ui/icons/MoodBad";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(8),
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    textAlign: "center",
    height: "100vh",
    backgroundImage:
      "linear-gradient(45deg, rgba(14, 14, 14,0.03) 0%, rgba(14, 14, 14,0.03) 38%,rgba(250, 250, 250,0.03) 38%, rgba(250, 250, 250,0.03) 45%,rgba(113, 113, 113,0.03) 45%, rgba(113, 113, 113,0.03) 100%),linear-gradient(135deg, rgba(148, 148, 148,0.03) 0%, rgba(148, 148, 148,0.03) 36%,rgba(219, 219, 219,0.03) 36%, rgba(219, 219, 219,0.03) 63%,rgba(62, 62, 62,0.03) 63%, rgba(62, 62, 62,0.03) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(6)
  },

  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    width: "100%"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  submit: {
    marginTop: theme.spacing(2)
  }
}));

export default function ForgotPasswordComponent() {
  const [state, setState] = useState({
    email: ""
  });

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Boolean(state.email) ? setDisabled(false) : setDisabled(true);
  }, [state.email]);

  const handleChange = e => {
    const { value } = e.target;
    setState(prevState => ({ ...prevState, email: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(state.email);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card>
        <CardContent className={classes.content}>
          <Typography variant="h4" component="h1" align="center">
            Forgot Your Password?
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Well, that sucks
          </Typography>
          <MoodBadIcon />
          <Typography color="textSecondary" align="center">
            Fill out your email address and we will send you instructions to
            reset your password
          </Typography>
          <Divider />
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              required
              placeholder="Enter your Email Address"
              variant="outlined"
              margin="normal"
              label="Email"
              value={state.email}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              className={classes.submit}
              disabled={disabled}
            >
              Email me some help {""}
              <ArrowForwardIcon style={{ marginLeft: "5px" }} />
            </Button>
          </form>
          <Typography
            color="textSecondary"
            component="span"
            style={{ fontSize: "0.8rem", lineHeight: "1.2", marginTop: "15px" }}
          >
            If Issue isn't resolved, kindly reach out to technical support for
            help
          </Typography>
        </CardContent>
      </Card>
      {/* <Paper className={classes.paper}>
        <Typography variant="h4" component="h1" align="center">
          Forgot Your Password?
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Well, that sucks
        </Typography>
        <MoodBadIcon />
        <Typography color="textSecondary" align="center">
          Fill out your email address and we will send you instructions to reset
          your password
        </Typography>
        <Divider />
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            required
            placeholder="Enter your Email Address"
            variant="outlined"
            margin="normal"
            label="Email"
            value={state.email}
            onChange={handleChange}
            fullWidth
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            className={classes.submit}
            disabled={disabled}
          >
            Email me some help {""}
            <ArrowForwardIcon style={{ marginLeft: "5px" }} />
          </Button>
        </form>
        <Typography
          color="textSecondary"
          component="span"
          style={{ fontSize: "0.8rem", lineHeight: "1.2", marginTop: "15px" }}
        >
          If Issue isn't resolved, kindly reach out to technical support for
          help
        </Typography>
      </Paper> */}
    </div>
  );
}
