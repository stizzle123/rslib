import {
  Typography,
  Paper,
  Avatar,
  FormControl,
  InputLabel,
  Input,
  Button,
  IconButton,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PersonIcon from "@material-ui/icons/Person";
import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import Link from "next/link";
import { handleSignup } from "../utils/auth";
import { departments } from "../utils/departments";
import baseUrl from "../utils/baseUrl";
import { countries } from "../utils/countries";

const INITIAL_STATE = {
  name: "",
  email: "",
  department: "",
  password: "",
  isLoading: false,
  showPassword: false,
  phone: "",
  error: "",
  openError: false,
  Transition: Fade
};

export default function Signup() {
  const [state, setState] = useState(INITIAL_STATE);
  const [code, setCode] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const defaultProps = {
    options: countries,
    getOptionLabel: option => option.phone,
    renderOption: option => (
      <React.Fragment>
        <span>{countryToFlag(option.code)}</span>
        {option.label} ({option.code}) +{option.phone}
      </React.Fragment>
    )
  };

  function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== "undefined"
      ? isoCode
          .toUpperCase()
          .replace(/./g, char =>
            String.fromCodePoint(char.charCodeAt(0) + 127397)
          )
      : isoCode;
  }

  useEffect(() => {
    const user = {
      name: state.name,
      email: state.email,
      password: state.password,
      department: state.department
    };
    let isValid = Object.values(user).every(el => Boolean(el));
    isValid ? setDisabled(false) : setDisabled(true);
  }, [state.name, state.email, state.password, state.department]);

  const handleChange = e => {
    const { target } = e;
    setState(prevState => ({ ...prevState, [target.name]: target.value }));
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const classes = useStyles();

  const showError = err => {
    const error = (err.response && err.response.data) || err.message;
    setState({ error, openError: true, isLoading: false });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setState(prevState => ({ ...prevState, isLoading: true }));
      const payload = {
        name: state.name,
        email: state.email,
        department: state.department,
        phone: state.phone,
        code: code.phone,
        password: state.password
      };
      const res = await axios.post(`${baseUrl}/api/signup`, payload);

      handleSignup(res.data.id);

      setState({
        name: "",
        email: "",
        department: "",
        phone: "",
        password: ""
      });
      setCode(null);
    } catch (err) {
      setState({
        name: "",
        email: "",
        department: "",
        phone: "",
        password: ""
      });
      setCode(null);

      showError(err);
    }
  };

  const handleClose = () => {
    setState({
      ...state,
      openError: false
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h1" align="center">
        SIGN UP
      </Typography>
      <Card className={classes.flex}>
        <CardMedia
          image="/images/library.jpg"
          alt="Tea Cup"
          className={classes.cover}
        />
        <CardContent className={classes.content}>
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h5" component="h1">
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                name="name"
                type="text"
                value={state.name}
                onChange={handleChange}
              />
            </FormControl>

            <Autocomplete
              id="country-code"
              {...defaultProps}
              value={code}
              onChange={(event, newValue) => {
                setCode(newValue);
              }}
              autoComplete
              autoHighlight
              renderInput={params => (
                <TextField
                  {...params}
                  label="Country code"
                  margin="normal"
                  fullWidth
                  required
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "disabled",
                    name: "code"
                  }}
                />
              )}
            />

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <Input
                name="phone"
                type="text"
                value={state.phone}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="department">Department</InputLabel>
              <Select
                value={state.department}
                onChange={handleChange}
                inputProps={{
                  name: "department",
                  id: "department"
                }}
              >
                {departments.map((dept, i) => (
                  <MenuItem key={i} value={dept.name}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              {state.email && !state.email.includes("@russelsmithgroup.com") ? (
                <InputLabel htmlFor="email" className={classes.fadeDown}>
                  <span className={classes.red}>
                    ex., example@russelsmithgroup.com
                  </span>
                </InputLabel>
              ) : (
                <InputLabel htmlFor="email">Email</InputLabel>
              )}
              <Input
                name="email"
                type="email"
                value={state.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type={state.showPassword ? "text" : "password"}
                value={state.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={state.isLoading || disabled}
            >
              {state.isLoading ? (
                <span className={classes.flexBtn}>
                  Signing up... <CircularProgress size="1rem" />
                </span>
              ) : (
                <span>Sign Up</span>
              )}
            </Button>
            <Link href="/login">
              <a className={classes.loginLink}>
                Already have an account? Try Login in
              </a>
            </Link>
          </form>

          {state.error && (
            <Snackbar
              open={state.openError}
              onClose={handleClose}
              TransitionComponent={state.Transition}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={
                <span id="message-id" style={{ color: "red" }}>
                  {state.error}
                </span>
              }
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(8),

    height: "100%",
    minHeight: "100vh",
    backgroundImage:
      "linear-gradient(0deg, transparent 0%, transparent 58%,rgba(104, 104, 104,0.05) 58%, rgba(104, 104, 104,0.05) 92%,transparent 92%, transparent 100%),linear-gradient(45deg, transparent 0%, transparent 34%,rgba(104, 104, 104,0.05) 34%, rgba(104, 104, 104,0.05) 77%,transparent 77%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 33%,rgba(104, 104, 104,0.05) 33%, rgba(104, 104, 104,0.05) 53%,transparent 53%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2)
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.light
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  submit: {
    marginTop: theme.spacing(2)
  },
  loginLink: {
    marginTop: 10,
    display: "block"
  },
  flex: {
    display: "flex",
    marginTop: "30px",
    marginLeft: "auto",
    marginRight: "auto",
    // height: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column"
    }
  },
  cover: {
    width: "100%",
    objectFit: "contain",
    objectPosition: "center"

    // height: 300
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(6),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1)
    }
  },
  flexBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  red: {
    color: theme.palette.secondary.red
  },
  fadeDown: {
    opacity: 1,
    display: "block",
    fontSize: "0.8rem",
    transform: "translate(0,0)",
    animation: "$animate 300ms ease-in-out"
  },
  "@keyframes animate": {
    "0%": {
      opacity: 0,
      transform: "translate(0, -10px)"
    },
    "100%": {
      opacity: 1,
      transform: "translate(0,0)"
    }
  }
}));
