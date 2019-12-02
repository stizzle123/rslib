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
  Dialog,
  Select,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { darken } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";
import Tooltip from "@material-ui/core/Tooltip";
import { genres } from "../utils/genres";

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
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  imageUrl: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.light
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
    margin: "0.25em 1rem"
  },
  textField: {
    width: "100%"
  },
  submit: {
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: darken(theme.palette.primary.light, 0.1)
    }
  },
  formControl: {
    marginTop: 20
  }
}));

const INIT_STATE = {
  authorName: "",
  title: "",
  genre: "",
  imageUrl: "",
  summary: ""
};

export default function AddBook({ _id }) {
  const classes = useStyles();

  const [state, setState] = useState(INIT_STATE);
  const [mediaPreview, setMediaPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "imageUrl") {
      setState(prevState => ({ ...prevState, imageUrl: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setState(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleImageUpload = async e => {
    const userData = new FormData();
    try {
      setLoading(true);
      const url = `${baseUrl}/api/book`;
      const { imageUrl } = state;
      userData.append("file", imageUrl);
      userData.append("upload_preset", "image_url");
      userData.append("cloud_name", "stizzle");
      const res = await axios.post(process.env.CLOUDINARY_URL, userData);

      setState({ imageUrl: res.data.secure_url });
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error);
      setOpenError(true);
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      const url = `${baseUrl}/api/book`;

      const { authorName, title, genre, summary, imageUrl } = state;

      const payload = { authorName, title, genre, summary };
      if (imageUrl) {
        payload.imageUrl = imageUrl;
      }

      const response = await axios.post(url, payload);
    } catch (error) {
      setOpenError(true);
      catchErrors(error, setError);
    } finally {
      setState(INIT_STATE);
      setLoading(false);
      setMediaPreview("");
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.imageUrl}>
          <MenuBookIcon />
        </Avatar>
        <Typography variant="h5" component="h1">
          Add a Book
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <label htmlFor="imageUrl" className={classes.uploadButton}>
              <Tooltip title="Upload Book Cover Image" placement="right">
                <Avatar
                  src={mediaPreview || "/images/no-image.png"}
                  className={classes.bigAvatar}
                />
              </Tooltip>
            </label>
            <IconButton
              onClick={handleImageUpload}
              disabled={!state.imageUrl || !mediaPreview}
            >
              <Tooltip title="Click to upload" placement="right">
                <CloudUploadIcon color="primary" fontSize="large" />
              </Tooltip>
            </IconButton>
          </div>
          <input
            type="file"
            name="imageUrl"
            id="imageUrl"
            accept="image/*"
            className={classes.input}
            onChange={handleChange}
          />

          <span className={classes.filename}>
            {state.imageUrl && state.imageUrl.name}
          </span>
          <FormControl margin="normal" fullWidth required>
            <InputLabel htmlFor="authorName">Author</InputLabel>
            <Input
              type="text"
              name="authorName"
              value={state.authorName}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl margin="normal" fullWidth required>
            <InputLabel htmlFor="title">Book Title</InputLabel>
            <Input
              type="text"
              name="title"
              value={state.title}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth required className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Genre
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              name="genre"
              value={state.genre}
              onChange={handleChange}
            >
              <MenuItem value="select genre" disabled={true}>
                Select Genre
              </MenuItem>
              {genres.map((genre, i) => (
                <MenuItem key={i} value={genre.value}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="outlined-textarea"
              label="Summary"
              placeholder="Summary"
              multiline
              margin="normal"
              variant="outlined"
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            disabled={
              !(state.authorName && state.genre && state.title) || loading
            }
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading ? (
              <span>
                Loading...
                <CircularProgress size="1rem" color="primary" />
              </span>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </form>
      </Paper>
    </div>
  );
}
