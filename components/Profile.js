import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  IconButton,
  Input,
  InputLabel,
  Avatar,
  TextField,
  Button,
  FormControl,
  Snackbar,
  Dialog
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import EditSharp from "@material-ui/icons/EditSharp";
import CloudUpload from "@material-ui/icons/CloudUpload";
import { darken } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";
import Tooltip from "@material-ui/core/Tooltip";

const INITIAL_STATE = {
  avatar: "",
  name: "",
  about: "",
  openError: false
};

export default function Profile({ avatar, name, about, _id }) {
  const classes = useStyles();
  const [state, setState] = useState(INITIAL_STATE);
  const [mediaPreview, setMediaPreview] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // if (name) {
    //   setState(prevState => ({ ...prevState, name }));
    // }

    const user = {
      name: state.name || name,
      about: state.about || about
    };

    const isUser = Object.values(user).every(el => Boolean(el));

    isUser ? setDisabled(false) : setDisabled(true);
  }, [state.about, name]);

  const handleClose = () => setState({ openError: false });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setState(prevState => ({ ...prevState, avatar: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setState(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleAvatarUpload = async e => {
    const userData = new FormData();
    try {
      e.preventDefault();
      setLoading(true);
      const url = `${baseUrl}/api/account`;
      const { avatar } = state;

      userData.set("avatar", avatar);
      userData.set("name", name);
      userData.set("_id", _id);

      const response = await axios.patch(url, userData);
      setLoading(false);
    } catch (error) {
      setState({ openError: true });
      catchErrors(error, setError);
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      const url = `${baseUrl}/api/user`;

      const { name, about } = state;
      const payload = { name, about, _id };
      // console.log(payload);
      const response = await axios.patch(url, payload);

      setLoading(false);
      setState(INITIAL_STATE);
    } catch (error) {
      setState({ openError: true });
      catchErrors(error, setError);
      setLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditSharp />
        </Avatar>
        <Typography variant="h5" component="h1">
          Edit Profile
        </Typography>

        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <label htmlFor="avatar" className={classes.uploadButton}>
              <Tooltip title="Upload Avatar" placement="right">
                <Avatar
                  src={mediaPreview || avatar}
                  className={classes.bigAvatar}
                />
              </Tooltip>
            </label>
            <IconButton
              onClick={handleAvatarUpload}
              disabled={!avatar || !mediaPreview}
            >
              <AddAPhotoIcon color="secondary" fontSize="large" />
            </IconButton>
          </div>
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            className={classes.input}
            onChange={handleChange}
          />

          <span className={classes.filename}>
            {state.avatar && state.avatar.name}
          </span>
          <FormControl margin="normal" fullWidth required>
            <InputLabel htmlFor="name">{name}</InputLabel>
            <Input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
            />
          </FormControl>
          <TextField
            id="outlined-textarea"
            label="Write something about yourself"
            placeholder="Write something about yourself"
            multiline
            className={classes.textField}
            margin="normal"
            variant="outlined"
            name="about"
            value={state.about}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            disabled={disabled || loading}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading ? (
              <span>
                Saving...
                <CircularProgress size={0.5} />
              </span>
            ) : (
              <span>Save</span>
            )}
          </Button>
        </form>

        {error && (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            open={state.openError}
            onClose={handleClose}
            autoHideDuration={6000}
            message={<span className={classes.snack}>{error}</span>}
          />
        )}
      </Paper>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
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
    backgroundColor: theme.palette.secondary.light
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto",
    "&:hover": {
      cursor: "pointer"
    }
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  submit: {
    marginTop: theme.spacing(2)
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  forgotPass: {
    float: "right",
    display: "inline-block",
    marginTop: "7px"
  },
  gridIt: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 20
  },
  input: {
    display: "none"
  },
  uploadButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0.25em"
  },
  textField: {
    width: "100%"
  },
  submit: {
    backgroundColor: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: darken(theme.palette.secondary.light, 0.1)
    }
  }
}));
