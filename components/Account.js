import React, { useState, useEffect } from "react";
import {
  makeStyles,
  withStyles,
  Paper,
  Avatar,
  Typography,
  IconButton,
  Divider,
  Container,
  Button,
  Box,
  Snackbar,
  Fade,
  CircularProgress
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import CloseOutlined from "@material-ui/icons/CloseOutlined";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useRouter } from "next/router";
import MyReview from "./MyReview";
import ActiveRead from "./ActiveRead";
import { useTheme } from "@material-ui/styles";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import Badge from "@material-ui/core/Badge";
import Cookie from "js-cookie";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    height: "100%",
    minHeight: "100vh",
    backgroundImage:
      "linear-gradient(22.5deg, rgba(242, 242, 242, 0.03) 0%, rgba(242, 242, 242, 0.03) 16%,rgba(81, 81, 81, 0.03) 16%, rgba(81, 81, 81, 0.03) 26%,rgba(99, 99, 99, 0.03) 26%, rgba(99, 99, 99, 0.03) 73%,rgba(43, 43, 43, 0.03) 73%, rgba(43, 43, 43, 0.03) 84%,rgba(213, 213, 213, 0.03) 84%, rgba(213, 213, 213, 0.03) 85%,rgba(125, 125, 125, 0.03) 85%, rgba(125, 125, 125, 0.03) 100%),linear-gradient(22.5deg, rgba(25, 25, 25, 0.03) 0%, rgba(25, 25, 25, 0.03) 54%,rgba(144, 144, 144, 0.03) 54%, rgba(144, 144, 144, 0.03) 60%,rgba(204, 204, 204, 0.03) 60%, rgba(204, 204, 204, 0.03) 76%,rgba(37, 37, 37, 0.03) 76%, rgba(37, 37, 37, 0.03) 78%,rgba(115, 115, 115, 0.03) 78%, rgba(115, 115, 115, 0.03) 91%,rgba(63, 63, 63, 0.03) 91%, rgba(63, 63, 63, 0.03) 100%),linear-gradient(157.5deg, rgba(71, 71, 71, 0.03) 0%, rgba(71, 71, 71, 0.03) 6%,rgba(75, 75, 75, 0.03) 6%, rgba(75, 75, 75, 0.03) 15%,rgba(131, 131, 131, 0.03) 15%, rgba(131, 131, 131, 0.03) 18%,rgba(110, 110, 110, 0.03) 18%, rgba(110, 110, 110, 0.03) 37%,rgba(215, 215, 215, 0.03) 37%, rgba(215, 215, 215, 0.03) 62%,rgba(5, 5, 5, 0.03) 62%, rgba(5, 5, 5, 0.03) 100%),linear-gradient(90deg, #FFF,#FFF)"
  },
  header: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gridGap: 20,
    alignItems: "start",
    marginBottom: 30,
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr)"
    }
  },
  account: {
    padding: theme.spacing(6),
    display: "grid",
    justifyItems: "center",
    alignContent: "center",
    backgroundImage:
      "linear-gradient(23deg, rgba(202, 202, 202,0.02) 0%, rgba(202, 202, 202,0.02) 13%,transparent 13%, transparent 80%,rgba(11, 11, 11,0.02) 80%, rgba(11, 11, 11,0.02) 100%),linear-gradient(42deg, rgba(98, 98, 98,0.02) 0%, rgba(98, 98, 98,0.02) 36%,transparent 36%, transparent 77%,rgba(252, 252, 252,0.02) 77%, rgba(252, 252, 252,0.02) 100%),linear-gradient(286deg, rgba(173, 173, 173,0.02) 0%, rgba(173, 173, 173,0.02) 2%,transparent 2%, transparent 12%,rgba(59, 59, 59,0.02) 12%, rgba(59, 59, 59,0.02) 100%),linear-gradient(77deg, rgba(87, 87, 87,0.02) 0%, rgba(87, 87, 87,0.02) 18%,transparent 18%, transparent 55%,rgba(247, 247, 247,0.02) 55%, rgba(247, 247, 247,0.02) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))"
  },
  passwordBox: {
    padding: theme.spacing(3),
    backgroundImage:
      "linear-gradient(339deg, rgba(47, 47, 47,0.02) 0%, rgba(47, 47, 47,0.02) 42%,transparent 42%, transparent 99%,rgba(17, 17, 17,0.02) 99%, rgba(17, 17, 17,0.02) 100%),linear-gradient(257deg, rgba(65, 65, 65,0.02) 0%, rgba(65, 65, 65,0.02) 11%,transparent 11%, transparent 92%,rgba(53, 53, 53,0.02) 92%, rgba(53, 53, 53,0.02) 100%),linear-gradient(191deg, rgba(5, 5, 5,0.02) 0%, rgba(5, 5, 5,0.02) 1%,transparent 1%, transparent 45%,rgba(19, 19, 19,0.02) 45%, rgba(19, 19, 19,0.02) 100%),linear-gradient(29deg, rgba(28, 28, 28,0.02) 0%, rgba(28, 28, 28,0.02) 33%,transparent 33%, transparent 40%,rgba(220, 220, 220,0.02) 40%, rgba(220, 220, 220,0.02) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))"
  },
  avatar: {
    textAlign: "center",
    width: 80,
    height: 80,
    boxShadow: "0 0 2px rgba(0,0,0,0.3)"
  },
  form: {
    padding: `0 ${theme.spacing(1)}`
  },
  textField: {
    marginBottom: 10,
    marginTop: 10
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "inline-block",
    opacity: 1,
    backgroundColor: theme.palette.secondary.light
  }
}));

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}))(Badge);

export default function Account({
  avatar,
  email,
  name,
  department,
  createdAt,
  _id
}) {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const [reads, setReads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [snack, setSnack] = useState({
    success: false,
    msg: "",
    Transition: Fade,
    openError: false,
    error: ""
  });
  const [state, setState] = useState({
    password: "",
    confirmpassword: "",
    loading: false
  });

  const URL = `${baseUrl}/api/borrowed`;
  const REVIEWSURL = `${baseUrl}/api/myreviews`;
  const PASSURL = `${baseUrl}/api/changepass`;

  useEffect(() => {
    const abortController = new AbortController();

    const token = Cookie.get("token");
    const payload = { headers: { Authorization: token } };

    setLoading(true);

    axios
      .get(URL, payload)
      .then(res => {
        setReads(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err.response.data);
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [URL]);

  useEffect(() => {
    const abortController = new AbortController();

    const token = Cookie.get("token");
    const payload = { headers: { Authorization: token } };

    setLoad(true);

    axios
      .get(REVIEWSURL, payload)
      .then(reviews => {
        setReviews(reviews.data);
        setLoad(false);
      })
      .catch(err => {
        console.error(err);
        setLoad(false);
      });

    return () => {
      abortController.abort();
    };
  }, [REVIEWSURL]);

  const showError = err => {
    const error = (err.response && err.response.data) || err.message;
    setSnack({ error, openError: true });
    setState({ loading: false });
  };

  const showSuccess = msg => {
    setSnack({ success: true, msg });
  };

  const handleCloseSuccess = () => {
    setSnack({ success: false });
  };

  const handleChange = e => {
    const { target } = e;
    setState(prevState => ({ ...prevState, [target.id]: target.value }));
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleClose = () => {
    setSnack({ openError: false });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = Cookie.get("token");
    setState({ loading: true });
    try {
      const payload = { headers: { Authorization: token } };
      const { password, confirmpassword } = state;
      const data = { password, confirmpassword };
      const res = await axios.patch(PASSURL, data, payload);
      setState({ loading: false, password: "", confirmpassword: "" });
      showSuccess("Password changed successfully");
    } catch (error) {
      showError(error);
      setState({ loading: false, password: "", confirmpassword: "" });
    }
  };

  return (
    <div className={classes.root}>
      {snack.error && (
        <Snackbar
          open={snack.openError}
          onClose={handleClose}
          TransitionComponent={snack.Transition}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          message={
            <span id="message-id" style={{ color: "red" }}>
              {snack.error}
            </span>
          }
          action={
            <IconButton color="secondary" onClick={handleClose}>
              <CloseOutlined color="secondary" />
            </IconButton>
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
              <CloseOutlined color="secondary" />
            </IconButton>
          }
          message={<span id="message-id-3">{snack.msg}</span>}
        />
      )}
      <Typography
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20
        }}
        align="center"
        variant="h4"
        component="h6"
        gutterBottom
      >
        My Account <AccountCircleIcon fontSize="large" />
      </Typography>
      <Container className={classes.header} maxWidth="lg">
        <Paper className={classes.account} elevation={3}>
          <Avatar src={avatar} variant="circle" className={classes.avatar} />
          <Typography variant="h6" component="h6">
            <strong>EMAIL:</strong> {email}{" "}
            <IconButton
              color="secondary"
              style={{ marginLeft: "auto" }}
              onClick={() => router.push("/profile")}
            >
              <EditIcon color="secondary" />
            </IconButton>
          </Typography>
          <Typography variant="overline">
            <strong>Name:</strong> {name}
          </Typography>
          <Typography variant="overline">
            <strong>Dept:</strong> {department}
          </Typography>
          <Typography variant="overline">
            <strong>Joined:</strong> {moment(createdAt).format("DD/MM/YYYY")}
          </Typography>
        </Paper>
        <Paper className={classes.passwordBox} elevation={3}>
          <Typography
            variant="h6"
            component="p"
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center"
            }}
            color="textPrimary"
          >
            Change Password <BorderColorIcon color="secondary" />
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              color="secondary"
              value={state.password}
              onChange={handleChange}
              className={classes.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              id="confirmpassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              color="secondary"
              className={classes.textField}
              value={state.confirmpassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              disabled={
                !(state.password && state.confirmpassword) || state.loading
              }
              variant="contained"
              color="secondary"
              fullWidth
              style={{ marginTop: 5 }}
            >
              {state.loading ? (
                <span>
                  Saving...
                  <CircularProgress size="1rem" />
                </span>
              ) : (
                <span>Save</span>
              )}
            </Button>
          </form>
        </Paper>
      </Container>
      <Divider variant="middle" style={{ margin: "30px 0" }} light />
      <Container maxWidth="lg">
        <>
          <Typography variant="h6" gutterBottom>
            My Review(s)
          </Typography>
          <MyReview load={load} setLoad={setLoad} reviews={reviews} />
        </>
        <>
          <Typography variant="h6" gutterBottom>
            My Active Read(s){" "}
            {reads.length ? (
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                variant="dot"
                style={{ marginLeft: 5 }}
              />
            ) : (
              <span
                style={{
                  display: "inline-block",
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  backgroundColor: theme.palette.secondary.red,

                  boxShadow: "0 0 2px rgba(0,0,0,0.8)"
                }}
              />
            )}
          </Typography>
          <ActiveRead
            reads={reads}
            setLoading={setLoading}
            loading={loading}
            id={_id}
          />
        </>

        <div style={{ textAlign: "center", margin: "50px 0" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: !reads.length
                ? theme.palette.secondary.red
                : theme.palette.secondary.grey,
              color: "#fff"
            }}
            disabled={reads.length ? true : false}
          >
            Delete Account <DeleteIcon color="inherit" />
          </Button>
        </div>
      </Container>
    </div>
  );
}
