import React, { useState, useEffect } from "react";
import { Typography, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import { useRouter } from "next/router";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { handleVerify } from "../utils/auth";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    minHeight: "100vh",
    // padding: theme.spacing(8),
    backgroundImage:
      "repeating-linear-gradient(199deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px,transparent 1px, transparent 31px,rgba(0,0,0,0.03) 31px, rgba(0,0,0,0.03) 32px,transparent 32px, transparent 92px),repeating-linear-gradient(78deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px,transparent 1px, transparent 31px,rgba(0,0,0,0.03) 31px, rgba(0,0,0,0.03) 32px,transparent 32px, transparent 92px),repeating-linear-gradient(277deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px,transparent 1px, transparent 31px,rgba(0,0,0,0.03) 31px, rgba(0,0,0,0.03) 32px,transparent 32px, transparent 92px),repeating-linear-gradient(18deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px,transparent 1px, transparent 31px,rgba(0,0,0,0.03) 31px, rgba(0,0,0,0.03) 32px,transparent 32px, transparent 92px),repeating-linear-gradient(91deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px,transparent 1px, transparent 31px,rgba(0,0,0,0.03) 31px, rgba(0,0,0,0.03) 32px,transparent 32px, transparent 92px),repeating-linear-gradient(348deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px,transparent 1px, transparent 31px,rgba(0,0,0,0.03) 31px, rgba(0,0,0,0.03) 32px,transparent 32px, transparent 92px),repeating-linear-gradient(334deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px,transparent 1px, transparent 31px,rgba(0,0,0,0.03) 31px, rgba(0,0,0,0.03) 32px,transparent 32px, transparent 92px),repeating-linear-gradient(261deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px,transparent 1px, transparent 31px,rgba(0,0,0,0.03) 31px, rgba(0,0,0,0.03) 32px,transparent 32px, transparent 92px),repeating-linear-gradient(21deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px,transparent 1px, transparent 31px,rgba(0,0,0,0.03) 31px, rgba(0,0,0,0.03) 32px,transparent 32px, transparent 92px),linear-gradient(90deg, hsl(83,0%,100%),hsl(83,0%,100%))"
  },
  paper: {
    padding: "10px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      width: 300
    }
  },
  center: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  divider: {
    height: 28,
    margin: 4
  },
  timer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  text: {
    color: "#aaa"
  },
  value: {
    fontSize: 40
  }
}));

export default function Verify() {
  const classes = useStyles();
  const router = useRouter();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [showChild, setShowChild] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    Transition: Fade,
    openError: false,
    error: ""
  });

  const showError = err => {
    const error = (err.response && err.response.data.message) || err.message;
    setSnack({ error, openError: true });
    setLoading(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        params: { id: router.query.id }
      };
      setSnack({ error: "" });
      const data = {
        token
      };
      const res = await axios.post(`${baseUrl}/api/verify`, data, payload);
      setLoading(false);
      setToken("");
      handleVerify(res.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
      showError(error);
    }
  };

  const handleChange = e => {
    setToken(e.target.value);
  };

  const handleClose = () => {
    setSnack({
      ...snack,
      openError: false
    });
  };

  const renderTime = value => {
    if (value === 0) {
      return <div className={classes.timer}>Too late...</div>;
    }

    return (
      <div className={classes.timer}>
        <div className={classes.text}>Remaining</div>
        <div className={classes.value}>{value}</div>
        <div className={classes.text}>seconds</div>
      </div>
    );
  };

  function showTimer() {
    useEffect(() => {
      setShowChild(true);
    }, []);
    if (!showChild) {
      // You can show some kind of placeholder UI here
      return null;
    }
    return (
      <CountdownCircleTimer
        isPlaying
        durationSeconds={20}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        renderTime={renderTime}
        onComplete={() => [true, 1000]}
      />
    );
  }

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
      <div className={classes.center}>
        {showTimer()}
        <Paper
          component="form"
          className={classes.paper}
          onSubmit={handleSubmit}
        >
          <InputBase
            className={classes.input}
            placeholder="Enter token"
            inputProps={{ "aria-label": "enter token" }}
            name="token"
            value={token}
            onChange={handleChange}
          />

          <Divider className={classes.divider} orientation="vertical" />
          <Button
            color="secondary"
            variant="contained"
            type="submit"
            disabled={loading || !token}
          >
            {loading ? (
              <span>
                Verifying...
                <CircularProgress size="1rem" />
              </span>
            ) : (
              <span>Verify</span>
            )}
          </Button>
        </Paper>
      </div>
    </div>
  );
}
