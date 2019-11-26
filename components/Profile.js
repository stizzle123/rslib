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

export default function Profile({ _id }) {
  const classes = useStyles();
  const [state, setState] = useState(INITIAL_STATE);
  const [mediaPreview, setMediaPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const userUrl = `${baseUrl}/api/user?id=${_id}`;

  useEffect(() => {
    let abort = new AbortController();

    axios
      .get(userUrl)
      .then(res => {
        setState(prevState => ({
          ...prevState,
          name: res.data.name,
          about: res.data.about,
          avatar: res.data.avatar,
          openError: false
        }));
      })
      .catch(err => {
        setState({ openError: true });
        console.error(err);
      });

    return () => {
      return abort.abort();
    };
  }, [userUrl]);

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
      userData.append("file", avatar);
      userData.append("upload_preset", "rslibrary");
      userData.append("cloud_name", "stizzle");

      const res = await axios.post(process.env.CLOUDINARY_URL, userData);
      let payload = {};
      payload._id = _id;
      payload.avatar = res.data.secure_url;
      const response = await axios.patch(url, payload);
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
      const response = await axios.patch(url, payload);

      setLoading(false);
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
                  src={mediaPreview || state.avatar}
                  className={classes.bigAvatar}
                />
              </Tooltip>
            </label>
            <IconButton
              onClick={handleAvatarUpload}
              disabled={!state.avatar || !mediaPreview}
            >
              <Tooltip title="Click to upload" placement="right">
                <AddAPhotoIcon color="secondary" fontSize="large" />
              </Tooltip>
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
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
            />
          </FormControl>
          <TextField
            id="outlined-textarea"
            label={`Write something about yourself, ${state.name}`}
            placeholder={`Write something about yourself, ${state.name}`}
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
            disabled={!(state.name && state.about) || loading}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading ? (
              <span>
                Saving...
                <CircularProgress size="1rem" color="secondary" />
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
