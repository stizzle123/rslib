import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import clsx from "clsx";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardHeader,
  Paper,
  Divider,
  Button
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Collapse from "@material-ui/core/Collapse";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import Cookie from "js-cookie";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    minHeight: "100vh",
    padding: theme.spacing(3),
    backgroundImage:
      "linear-gradient(22.5deg, rgba(242, 242, 242, 0.03) 0%, rgba(242, 242, 242, 0.03) 16%,rgba(81, 81, 81, 0.03) 16%, rgba(81, 81, 81, 0.03) 26%,rgba(99, 99, 99, 0.03) 26%, rgba(99, 99, 99, 0.03) 73%,rgba(43, 43, 43, 0.03) 73%, rgba(43, 43, 43, 0.03) 84%,rgba(213, 213, 213, 0.03) 84%, rgba(213, 213, 213, 0.03) 85%,rgba(125, 125, 125, 0.03) 85%, rgba(125, 125, 125, 0.03) 100%),linear-gradient(22.5deg, rgba(25, 25, 25, 0.03) 0%, rgba(25, 25, 25, 0.03) 54%,rgba(144, 144, 144, 0.03) 54%, rgba(144, 144, 144, 0.03) 60%,rgba(204, 204, 204, 0.03) 60%, rgba(204, 204, 204, 0.03) 76%,rgba(37, 37, 37, 0.03) 76%, rgba(37, 37, 37, 0.03) 78%,rgba(115, 115, 115, 0.03) 78%, rgba(115, 115, 115, 0.03) 91%,rgba(63, 63, 63, 0.03) 91%, rgba(63, 63, 63, 0.03) 100%),linear-gradient(157.5deg, rgba(71, 71, 71, 0.03) 0%, rgba(71, 71, 71, 0.03) 6%,rgba(75, 75, 75, 0.03) 6%, rgba(75, 75, 75, 0.03) 15%,rgba(131, 131, 131, 0.03) 15%, rgba(131, 131, 131, 0.03) 18%,rgba(110, 110, 110, 0.03) 18%, rgba(110, 110, 110, 0.03) 37%,rgba(215, 215, 215, 0.03) 37%, rgba(215, 215, 215, 0.03) 62%,rgba(5, 5, 5, 0.03) 62%, rgba(5, 5, 5, 0.03) 100%),linear-gradient(90deg, #FFF,#FFF)"
  },
  container: {
    display: "grid",
    padding: theme.spacing(8),
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gridGap: 10,
    [theme.breakpoints.down("md")]: {
      justifyItems: "center",
      gridTemplateColumns: "repeat(1,1fr)"
    },
    "& > *": {
      grid: "1"
    }
  },
  media: {
    height: 0,
    backgroundSize: "contain",
    paddingTop: "56.25%" // 16:9
  },
  card: {
    maxWidth: 545,
    width: "80%",
    margin: "auto"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  paper: {
    padding: theme.spacing(8),
    textAlign: "center"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MyCollections({ books, createdAt, _id }) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const [getId, setGetId] = useState("");
  const [getBooks, setGetBooks] = useState([]);
  const [book, setBook] = useState([]);
  const [open, setOpen] = useState(false);
  const URL = `${baseUrl}/api/collections`;

  useEffect(() => {
    const abortController = new AbortController();
    setGetBooks(books);
    return () => {
      abortController.abort();
    };
  }, [books]);

  const handleClickOpen = id => {
    setBook(books.filter(book => book._id === id));
    setOpen(true);
    setGetId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const token = Cookie.get("token");
      const payload = {
        params: { bookId: getId },
        headers: { Authorization: token }
      };
      await axios.delete(URL, payload);

      setGetBooks(prevState => prevState.filter(book => book._id !== getId));

      handleClose();

      setTimeout(() => {
        router.reload();
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h6" align="center" gutterBottom>
        My Book Collections
      </Typography>
      <div className={classes.container}>
        {getBooks.length !== 0 ? (
          getBooks.map(book => (
            <Card className={classes.card} key={book._id}>
              <CardHeader
                title={book.title}
                subheader={moment(createdAt).format("MMMM Do, YYYY")}
                action={
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleClickOpen(book._id)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                }
              />
              <Divider variant="middle" light style={{ marginBottom: 20 }} />
              <CardMedia
                image={book.imageUrl}
                title={book.title}
                className={classes.media}
              />
              <CardContent>
                {book.summary > 1
                  ? book.summary
                  : "No Summary yet for this Book"}
              </CardContent>
              <CardActions disableSpacing>
                <Typography>Write a Review</Typography>

                <IconButton
                  className={classes.expand}
                  color="secondary"
                  aria-label="Write a review"
                >
                  <EditIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))
        ) : (
          <>
            <Paper className={classes.paper}>
              <Typography
                variant="h3"
                component="h1"
                align="center"
                gutterBottom
              >
                You currently have no books in your collection{" "}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => router.push("/books")}
              >
                Borrow a book
              </Button>
            </Paper>
          </>
        )}
      </div>
      <DeleteModal
        book={book}
        handleClose={handleClose}
        handleDelete={handleDelete}
        Transition={Transition}
        open={open}
        theme={theme}
      />
    </div>
  );
}

function DeleteModal({
  book,
  open,
  Transition,
  handleClose,
  handleDelete,
  theme
}) {
  return (
    <>
      {book.map(book => (
        <Dialog
          key={book._id}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {`Are you sure you want to delete ${book.title}?`}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              style={{
                background: theme.palette.secondary.red,
                color: "#fff"
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      ))}
    </>
  );
}
