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
  MenuItem,
  Fab
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import EditOutlined from "@material-ui/icons/EditOutlined";
import { darken } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";
import Tooltip from "@material-ui/core/Tooltip";
import { genres } from "../utils/genres";
import { useRouter } from "next/router";

const useStyles = makeStyles(theme => ({
  base: {
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(135deg, transparent 0%, transparent 6%,rgba(71, 71, 71,0.04) 6%, rgba(71, 71, 71,0.04) 22%,transparent 22%, transparent 100%),linear-gradient(45deg, transparent 0%, transparent 20%,rgba(71, 71, 71,0.04) 20%, rgba(71, 71, 71,0.04) 47%,transparent 47%, transparent 100%),linear-gradient(135deg, transparent 0%, transparent 24%,rgba(71, 71, 71,0.04) 24%, rgba(71, 71, 71,0.04) 62%,transparent 62%, transparent 100%),linear-gradient(45deg, transparent 0%, transparent 73%,rgba(71, 71, 71,0.04) 73%, rgba(71, 71, 71,0.04) 75%,transparent 75%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))",
    backgroundAttachment: "fixed",
    padding: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2)
    }
  },
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1)
    }
  },
  imageUrl: {
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
  summary: "",
  quantity: "",
  totalQty: "",
  id: ""
};

export default function EditBook({ _id }) {
  const classes = useStyles();
  const URL = `${baseUrl}/api/book`;
  const router = useRouter();
  const [state, setState] = useState(INIT_STATE);
  const [mediaPreview, setMediaPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    Transition: Fade,
    openError: false,
    error: "",
    success: false,
    message: ""
  });

  useEffect(() => {
    const abortController = new AbortController();
    const payload = {
      params: { id: router.query.id }
    };
    axios
      .get(URL, payload)
      .then(res => {
        setState({
          authorName: res.data.authorName,
          title: res.data.title,
          genre: res.data.genre,
          imageUrl: res.data.imageUrl,
          summary: res.data.summary,
          quantity: res.data.quantity,
          summary: res.data.summary,
          id: res.data._id
        });
      })
      .catch(err => {
        console.error(err);
      });

    return () => {
      abortController.abort();
    };
  }, [URL]);

  const showError = err => {
    const error = (err.response && err.response.data) || err.message;
    setSnack({ error, openError: true });
    setLoading(false);
  };

  const showSuccess = msg => {
    setSnack({ success: true, message: msg });
  };

  const handleCloseSuccess = () => {
    setSnack({ success: false });
  };

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
      setLoadingImage(true);
      const url = `${baseUrl}/api/book`;
      const { imageUrl } = state;
      userData.append("file", imageUrl);
      userData.append("upload_preset", "image_url");
      userData.append("cloud_name", "stizzle");
      const res = await axios.post(process.env.CLOUDINARY_URL, userData);

      setState({ imageUrl: res.data.secure_url });
    } catch (error) {
      console.error(error);
      setLoadingImage(false);
      setError(error);
      setOpenError(true);
      catchErrors(error, setError);
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);

      const {
        authorName,
        title,
        genre,
        summary,
        imageUrl,
        quantity,
        id
      } = state;

      const payload = { authorName, title, genre, summary, quantity, id };
      if (imageUrl) {
        payload.imageUrl = imageUrl;
      }
      payload.totalQty = quantity;

      const response = await axios.patch(URL, payload);

      showSuccess(`${response.data.title} was updated successfully`);
      setTimeout(() => {
        router.push("/books");
      }, 1000);
    } catch (error) {
      setOpenError(true);
      catchErrors(error, setError);
      showError(error);
    } finally {
      //   setState(INIT_STATE);
      setLoading(false);
      //   setMediaPreview("");
    }
  };

  return (
    <div className={classes.base}>
      {snack.error && (
        <Snackbar
          open={snack.openError}
          onClose={handleClose}
          TransitionComponent={snack.Transition}
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
          message={<span id="message-id-2">{snack.message}</span>}
        />
      )}
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Avatar className={classes.imageUrl}>
            <EditOutlined />
          </Avatar>
          <Typography variant="h5" component="h1">
            Edit Book
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
                <Tooltip
                  title="Click to Upload Book Cover Image"
                  placement="right"
                >
                  <Avatar
                    src={mediaPreview || state.imageUrl}
                    className={classes.bigAvatar}
                  />
                </Tooltip>
              </label>

              <Fab
                size="small"
                color="primary"
                disabled={!state.imageUrl || !mediaPreview}
                onClick={handleImageUpload}
                variant="extended"
              >
                {loadingImage ? (
                  <span>
                    Uploading...{" "}
                    <CircularProgress size="1rem" color="primary" />
                  </span>
                ) : (
                  <>
                    <CloudUploadIcon style={{ marginRight: ".5rem" }} /> Upload
                    Image
                  </>
                )}
              </Fab>
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
              <InputLabel htmlFor="title">Book Title</InputLabel>
              <Input
                type="text"
                name="title"
                value={state.title}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl margin="normal" fullWidth required>
              <InputLabel htmlFor="authorName">Author</InputLabel>
              <Input
                type="text"
                name="authorName"
                value={state.authorName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth required className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Genre
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                value={state.genre}
                onChange={handleChange}
                inputProps={{
                  name: "genre",
                  id: "genre"
                }}
              >
                {genres.map((genre, i) => (
                  <MenuItem key={i} value={genre.value}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" fullWidth required>
              <InputLabel htmlFor="quantity">Quantity</InputLabel>
              <Input
                type="number"
                name="quantity"
                value={state.quantity}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="outlined-textarea"
                label="Summary"
                placeholder="Summary"
                multiline
                margin="normal"
                variant="outlined"
                name="summary"
                value={state.summary}
                onChange={handleChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              disabled={
                !(state.authorName && state.genre && state.title) ||
                loading ||
                loadingImage
              }
              variant="contained"
              color="secondary"
              //   className={classes.submit}
            >
              {loading ? (
                <span>
                  Loading...
                  <CircularProgress size="1rem" color="primary" />
                </span>
              ) : (
                <span>Update</span>
              )}
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
}
