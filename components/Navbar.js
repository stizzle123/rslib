import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import MoreIcon from "@material-ui/icons/MoreVert";
import {
  Drawer,
  Button,
  Avatar,
  Icon,
  Tooltip,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Grid,
  ListItemAvatar
} from "@material-ui/core";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Fade from "@material-ui/core/Fade";
import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { fade, makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import NProgress from "nprogress";
import SidebarNavList from "./SidebarNavList";
import { handleLogOut } from "../utils/auth";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { capitalize } from "../utils/capitalize";
import { useTheme } from "@material-ui/styles";
import moment from "moment";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  titleNav: {
    textTransform: "uppercase",
    textDecoration: "none",
    color: "#fff",
    fontSize: theme.spacing(2.5),
    fontWeight: "900",
    alignItems: "center",
    // display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
      display: "block"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    },
    [theme.breakpoints.up("lg")]: {
      "&:focus": {
        width: 230
      }
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  list: {
    width: 250,
    height: "100vh",
    position: "relative",
    backgroundImage:
      "linear-gradient(55deg, rgba(208, 208, 208, 0.03) 0%, rgba(208, 208, 208, 0.03) 20%,rgba(55, 55, 55, 0.03) 20%, rgba(55, 55, 55, 0.03) 40%,rgba(81, 81, 81, 0.03) 40%, rgba(81, 81, 81, 0.03) 60%,rgba(208, 208, 208, 0.03) 60%, rgba(208, 208, 208, 0.03) 80%,rgba(191, 191, 191, 0.03) 80%, rgba(191, 191, 191, 0.03) 100%),linear-gradient(291deg, rgba(190, 190, 190, 0.02) 0%, rgba(190, 190, 190, 0.02) 14.286%,rgba(105, 105, 105, 0.02) 14.286%, rgba(105, 105, 105, 0.02) 28.572%,rgba(230, 230, 230, 0.02) 28.572%, rgba(230, 230, 230, 0.02) 42.858%,rgba(216, 216, 216, 0.02) 42.858%, rgba(216, 216, 216, 0.02) 57.144%,rgba(181, 181, 181, 0.02) 57.144%, rgba(181, 181, 181, 0.02) 71.42999999999999%,rgba(129, 129, 129, 0.02) 71.43%, rgba(129, 129, 129, 0.02) 85.71600000000001%,rgba(75, 75, 75, 0.02) 85.716%, rgba(75, 75, 75, 0.02) 100.002%),linear-gradient(32deg, rgba(212, 212, 212, 0.03) 0%, rgba(212, 212, 212, 0.03) 12.5%,rgba(223, 223, 223, 0.03) 12.5%, rgba(223, 223, 223, 0.03) 25%,rgba(11, 11, 11, 0.03) 25%, rgba(11, 11, 11, 0.03) 37.5%,rgba(86, 86, 86, 0.03) 37.5%, rgba(86, 86, 86, 0.03) 50%,rgba(106, 106, 106, 0.03) 50%, rgba(106, 106, 106, 0.03) 62.5%,rgba(220, 220, 220, 0.03) 62.5%, rgba(220, 220, 220, 0.03) 75%,rgba(91, 91, 91, 0.03) 75%, rgba(91, 91, 91, 0.03) 87.5%,rgba(216, 216, 216, 0.03) 87.5%, rgba(216, 216, 216, 0.03) 100%),linear-gradient(312deg, rgba(113, 113, 113, 0.01) 0%, rgba(113, 113, 113, 0.01) 14.286%,rgba(54, 54, 54, 0.01) 14.286%, rgba(54, 54, 54, 0.01) 28.572%,rgba(166, 166, 166, 0.01) 28.572%, rgba(166, 166, 166, 0.01) 42.858%,rgba(226, 226, 226, 0.01) 42.858%, rgba(226, 226, 226, 0.01) 57.144%,rgba(109, 109, 109, 0.01) 57.144%, rgba(109, 109, 109, 0.01) 71.42999999999999%,rgba(239, 239, 239, 0.01) 71.43%, rgba(239, 239, 239, 0.01) 85.71600000000001%,rgba(54, 54, 54, 0.01) 85.716%, rgba(54, 54, 54, 0.01) 100.002%),linear-gradient(22deg, rgba(77, 77, 77, 0.03) 0%, rgba(77, 77, 77, 0.03) 20%,rgba(235, 235, 235, 0.03) 20%, rgba(235, 235, 235, 0.03) 40%,rgba(215, 215, 215, 0.03) 40%, rgba(215, 215, 215, 0.03) 60%,rgba(181, 181, 181, 0.03) 60%, rgba(181, 181, 181, 0.03) 80%,rgba(193, 193, 193, 0.03) 80%, rgba(193, 193, 193, 0.03) 100%),linear-gradient(80deg, rgba(139, 139, 139, 0.02) 0%, rgba(139, 139, 139, 0.02) 14.286%,rgba(114, 114, 114, 0.02) 14.286%, rgba(114, 114, 114, 0.02) 28.572%,rgba(240, 240, 240, 0.02) 28.572%, rgba(240, 240, 240, 0.02) 42.858%,rgba(221, 221, 221, 0.02) 42.858%, rgba(221, 221, 221, 0.02) 57.144%,rgba(74, 74, 74, 0.02) 57.144%, rgba(74, 74, 74, 0.02) 71.42999999999999%,rgba(201, 201, 201, 0.02) 71.43%, rgba(201, 201, 201, 0.02) 85.71600000000001%,rgba(187, 187, 187, 0.02) 85.716%, rgba(187, 187, 187, 0.02) 100.002%),linear-gradient(257deg, rgba(72, 72, 72, 0.03) 0%, rgba(72, 72, 72, 0.03) 16.667%,rgba(138, 138, 138, 0.03) 16.667%, rgba(138, 138, 138, 0.03) 33.334%,rgba(54, 54, 54, 0.03) 33.334%, rgba(54, 54, 54, 0.03) 50.001000000000005%,rgba(161, 161, 161, 0.03) 50.001%, rgba(161, 161, 161, 0.03) 66.668%,rgba(17, 17, 17, 0.03) 66.668%, rgba(17, 17, 17, 0.03) 83.33500000000001%,rgba(230, 230, 230, 0.03) 83.335%, rgba(230, 230, 230, 0.03) 100.002%),linear-gradient(47deg, rgba(191, 191, 191, 0.01) 0%, rgba(191, 191, 191, 0.01) 16.667%,rgba(27, 27, 27, 0.01) 16.667%, rgba(27, 27, 27, 0.01) 33.334%,rgba(66, 66, 66, 0.01) 33.334%, rgba(66, 66, 66, 0.01) 50.001000000000005%,rgba(36, 36, 36, 0.01) 50.001%, rgba(36, 36, 36, 0.01) 66.668%,rgba(230, 230, 230, 0.01) 66.668%, rgba(230, 230, 230, 0.01) 83.33500000000001%,rgba(93, 93, 93, 0.01) 83.335%, rgba(93, 93, 93, 0.01) 100.002%),linear-gradient(90deg, #FFF,#FFF)"
  },
  fullList: {
    width: "auto"
  },
  avatar: {
    margin: 10
  },
  smallAvatar: {
    width: "20px",
    height: "20px"
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 40px"
  },
  searchContainer: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    minHeight: "70%",
    height: "40%",
    overflowY: "auto",
    zIndex: 99999999,
    padding: theme.spacing(4),
    backgroundImage:
      "repeating-linear-gradient(135deg, rgba(236, 236, 236,0.02) 0px, rgba(236, 236, 236,0.02) 26px,rgba(210, 210, 210,0.02) 26px, rgba(210, 210, 210,0.02) 52px,rgba(184, 184, 184,0.02) 52px, rgba(184, 184, 184,0.02) 78px,rgba(158, 158, 158,0.02) 78px, rgba(158, 158, 158,0.02) 104px,rgba(131, 131, 131,0.02) 104px, rgba(131, 131, 131,0.02) 130px,rgba(105, 105, 105,0.02) 130px, rgba(105, 105, 105,0.02) 156px,rgba(79, 79, 79,0.02) 156px, rgba(79, 79, 79,0.02) 182px,rgba(53, 53, 53,0.02) 182px, rgba(53, 53, 53,0.02) 208px),repeating-linear-gradient(45deg, rgba(213, 213, 213,0.02) 0px, rgba(213, 213, 213,0.02) 26px,rgba(192, 192, 192,0.02) 26px, rgba(192, 192, 192,0.02) 52px,rgba(171, 171, 171,0.02) 52px, rgba(171, 171, 171,0.02) 78px,rgba(150, 150, 150,0.02) 78px, rgba(150, 150, 150,0.02) 104px,rgba(129, 129, 129,0.02) 104px, rgba(129, 129, 129,0.02) 130px,rgba(108, 108, 108,0.02) 130px, rgba(108, 108, 108,0.02) 156px,rgba(87, 87, 87,0.02) 156px, rgba(87, 87, 87,0.02) 182px,rgba(66, 66, 66,0.02) 182px, rgba(66, 66, 66,0.02) 208px),linear-gradient(90deg, #FFF,#FFF)"
  },
  card: {
    display: "flex",
    margin: "10px auto",

    // transition: theme.transitions.create("background-position", {
    //   duration: theme.transitions.duration.leavingScreen,
    //   easing: theme.transitions.easing.sharp
    // }),
    background:
      "linear-gradient(74deg, rgba(236, 236, 236,0.02) 0%, rgba(236, 236, 236,0.02) 13%,transparent 13%, transparent 64%,rgba(55, 55, 55,0.02) 64%, rgba(55, 55, 55,0.02) 71%,rgba(239, 239, 239,0.02) 71%, rgba(239, 239, 239,0.02) 100%),linear-gradient(170deg, rgba(8, 8, 8,0.02) 0%, rgba(8, 8, 8,0.02) 1%,transparent 1%, transparent 60%,rgba(9, 9, 9,0.02) 60%, rgba(9, 9, 9,0.02) 80%,rgba(198, 198, 198,0.02) 80%, rgba(198, 198, 198,0.02) 100%),linear-gradient(118deg, rgba(134, 134, 134,0.02) 0%, rgba(134, 134, 134,0.02) 30%,transparent 30%, transparent 43%,rgba(85, 85, 85,0.02) 43%, rgba(85, 85, 85,0.02) 47%,rgba(103, 103, 103,0.02) 47%, rgba(103, 103, 103,0.02) 100%),linear-gradient(249deg, rgba(178, 178, 178,0.02) 0%, rgba(178, 178, 178,0.02) 8%,transparent 8%, transparent 47%,rgba(161, 161, 161,0.02) 47%, rgba(161, 161, 161,0.02) 61%,rgba(19, 19, 19,0.02) 61%, rgba(19, 19, 19,0.02) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))",

    "&:hover": {
      cursor: "pointer",
      background:
        "linear-gradient(90deg, rgba(0, 0, 0,0.03) 0%, rgba(0, 0, 0,0.03) 61%,rgba(232, 232, 232,0.03) 61%, rgba(232, 232, 232,0.03) 75%,rgba(57, 57, 57,0.03) 75%, rgba(57, 57, 57,0.03) 100%),linear-gradient(0deg, rgba(234, 234, 234,0.03) 0%, rgba(234, 234, 234,0.03) 53%,rgba(23, 23, 23,0.03) 53%, rgba(23, 23, 23,0.03) 78%,rgba(226, 226, 226,0.03) 78%, rgba(226, 226, 226,0.03) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))"
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  cardMedia: {
    width: 159,
    height: 250,
    objectFit: "cover",
    objectPosition: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: 550
    }
  },
  cardContent: {
    width: "100%",
    textAlign: "center",

    "& > *": {
      margin: "10px 0"
    }
  },
  notificationHeader: {
    height: 100,
    color: theme.palette.common.white,
    display: "flex",
    // justifyContent: "center",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundImage:
      "linear-gradient(90deg, rgba(125, 125, 125, 0) 0%, rgba(125, 125, 125, 0) 7%,rgba(194, 194, 194, 0) 7%, rgba(194, 194, 194, 0) 29%,rgba(124, 124, 124, 0) 29%, rgba(124, 124, 124, 0) 57%,rgba(237, 237, 237, 0) 57%, rgba(237, 237, 237, 0) 59%,rgba(110, 110, 110, 0) 59%, rgba(110, 110, 110, 0) 100%),linear-gradient(90deg, rgba(6, 6, 6, 0.01) 0%, rgba(6, 6, 6, 0.01) 20%,rgba(210, 210, 210, 0.01) 20%, rgba(210, 210, 210, 0.01) 64%,rgba(10, 10, 10, 0.01) 64%, rgba(10, 10, 10, 0.01) 82%,rgba(72, 72, 72, 0.01) 82%, rgba(72, 72, 72, 0.01) 88%,rgba(127, 127, 127, 0.01) 88%, rgba(127, 127, 127, 0.01) 100%),linear-gradient(90deg, rgba(4, 4, 4, 0.06) 0%, rgba(4, 4, 4, 0.06) 56%,rgba(6, 6, 6, 0.06) 56%, rgba(6, 6, 6, 0.06) 65%,rgba(110, 110, 110, 0.06) 65%, rgba(110, 110, 110, 0.06) 83%,rgba(136, 136, 136, 0.06) 83%, rgba(136, 136, 136, 0.06) 100%),linear-gradient(349deg, rgba(137, 137, 137, 0.02) 0%, rgba(137, 137, 137, 0.02) 43%,rgba(112, 112, 112, 0.02) 43%, rgba(112, 112, 112, 0.02) 100%),linear-gradient(47deg, rgba(184, 184, 184, 0.06) 0%, rgba(184, 184, 184, 0.06) 36%,rgba(32, 32, 32, 0.06) 36%, rgba(32, 32, 32, 0.06) 100%),linear-gradient(83deg, rgba(222, 222, 222, 0.07) 0%, rgba(222, 222, 222, 0.07) 98%,rgba(143, 143, 143, 0.07) 98%, rgba(143, 143, 143, 0.07) 100%),repeating-linear-gradient(0deg, rgba(244, 244, 244, 0.08) 0px, rgba(244, 244, 244, 0.08) 72px,rgba(155, 155, 155, 0.08) 72px, rgba(155, 155, 155, 0.08) 179px,rgba(102, 102, 102, 0.08) 179px, rgba(102, 102, 102, 0.08) 477px,rgba(133, 133, 133, 0.08) 477px, rgba(133, 133, 133, 0.08) 580px,rgba(83, 83, 83, 0.08) 580px, rgba(83, 83, 83, 0.08) 614px),repeating-linear-gradient(135deg, rgba(115, 115, 115, 0.03) 0px, rgba(115, 115, 115, 0.03) 266px,rgba(99, 99, 99, 0.03) 266px, rgba(99, 99, 99, 0.03) 273px,rgba(115, 115, 115, 0.03) 273px, rgba(115, 115, 115, 0.03) 351px,rgba(229, 229, 229, 0.03) 351px, rgba(229, 229, 229, 0.03) 439px),repeating-linear-gradient(45deg, rgba(72, 72, 72, 0.01) 0px, rgba(72, 72, 72, 0.01) 232px,rgba(65, 65, 65, 0.01) 232px, rgba(65, 65, 65, 0.01) 345px,rgba(140, 140, 140, 0.01) 345px, rgba(140, 140, 140, 0.01) 348px,rgba(26, 26, 26, 0.01) 348px, rgba(26, 26, 26, 0.01) 547px),repeating-linear-gradient(45deg, rgba(68, 68, 68, 0.05) 0px, rgba(68, 68, 68, 0.05) 115px,rgba(182, 182, 182, 0.05) 115px, rgba(182, 182, 182, 0.05) 246px,rgba(14, 14, 14, 0.05) 246px, rgba(14, 14, 14, 0.05) 272px,rgba(80, 80, 80, 0.05) 272px, rgba(80, 80, 80, 0.05) 298px,rgba(37, 37, 37, 0.05) 298px, rgba(37, 37, 37, 0.05) 434px),repeating-linear-gradient(135deg, rgba(46, 46, 46, 0.03) 0px, rgba(46, 46, 46, 0.03) 107px,rgba(169, 169, 169, 0.03) 107px, rgba(169, 169, 169, 0.03) 182px,rgba(71, 71, 71, 0.03) 182px, rgba(71, 71, 71, 0.03) 321px,rgba(182, 182, 182, 0.03) 321px, rgba(182, 182, 182, 0.03) 359px),linear-gradient(90deg, #084da4 0%,#01aeb6 100%)"
  }
}));

const Navbar = ({ id, name, avatar, collections, notification, role }) => {
  const classes = useStyles();
  const router = useRouter();
  const URL = `${baseUrl}/api/books`;
  const [books, setBooks] = useState([]);
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    auth: false
  });
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (id) {
      setState(prevState => ({ ...prevState, auth: true }));
    } else {
      setState(prevState => ({ ...prevState, auth: false }));
    }
  }, [state.auth]);

  useEffect(() => {
    const abortController = new AbortController();
    setNotifications(notification);
    return () => {
      abortController.abort();
    };
  }, [notification]);

  useEffect(() => {
    const abortController = new AbortController();

    axios
      .get(URL)
      .then(res => {
        setBooks(res.data);
      })
      .catch(err => {
        console.error(err);
      });

    return () => {
      abortController.abort();
    };
  }, [URL]);
  const filteredBook = () =>
    books.filter(book => {
      if (search) {
        return (
          book.authorName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          book.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          book.genre.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          book.status.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
      } else {
        return book;
      }
    });

  const handleSearch = e => {
    setSearch(e.target.value.substr(0, 50));
  };

  const handleCloseSearch = () => {
    setSearch("");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteNotification = async id => {
    const data = { id };
    try {
      const res = await axios.delete(`${baseUrl}/api/notification`, { data });
      setNotifications(prevState => prevState._id !== res.data._id);

      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const isActive = path => {
    return router.pathname === path;
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const signOut = async () => {
    handleLogOut();
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <ListItem>
        <ListItemIcon style={{ minWidth: "12px" }}>
          <Avatar
            alt={name}
            src={avatar}
            className={classes.avatar}
            style={{ left: "-13px" }}
          />
        </ListItemIcon>
        <ListItemText
          primary={name.charAt(0).toUpperCase() + name.substring(1)}
        />
      </ListItem>

      <Divider light />
      <SidebarNavList role={role} />
    </div>
  );

  const notifyList = side => (
    <div className={classes.list} role="presentation">
      <Typography variant="h6" className={classes.notificationHeader}>
        Notifications
        <Tooltip title="close" placement="bottom">
          <IconButton
            edge="end"
            color="inherit"
            onClick={toggleDrawer(side, false)}
          >
            <CloseIcon style={{ color: theme.palette.common.white }} />
          </IconButton>
        </Tooltip>
      </Typography>

      <List style={{ overflowX: "hidden" }}>
        {notifications.length > 0 ? (
          notifications.map(notify => (
            <div key={notify._id}>
              <ListItem dense={false}>
                <ListItemText
                  primary={notify.message}
                  secondary={moment(notify.createdAt).fromNow()}
                  style={{ fontSize: "0.6rem" }}
                />
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteNotification(notify._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </div>
          ))
        ) : (
          <ListItem
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <ListItemText primary="You have 0 Notification" />
            <div>
              <Avatar
                src="/images/mello.svg"
                style={{ width: 400, height: "auto" }}
              />
            </div>
          </ListItem>
        )}
      </List>
    </div>
  );

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <>
      {search && (
        <Paper elevation={10} className={classes.searchContainer}>
          <Avatar
            style={{
              margin: "auto",
              boxShadow: "0 0 10px rgba(225,225,225,0.9)",
              border: "3px solid #fefefe"
            }}
            src="/images/rslibrary-logo.jpg"
            variant="circle"
          />
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="subtitle1" gutterBottom>
              Search Results:{" "}
              <strong style={{ fontSize: "1.8rem" }}>
                {filteredBook().length}
              </strong>
            </Typography>
            <IconButton onClick={handleCloseSearch} color="secondary">
              <ClearIcon color="secondary" />
            </IconButton>
          </Grid>
          <Divider style={{ margin: "10px 0" }} light />
          {filteredBook().length > 0 ? (
            filteredBook().map(book => (
              <div key={book._id}>
                <Card
                  className={classes.card}
                  onClick={() => router.push(`/book/info?id=${book._id}`)}
                >
                  <CardContent className={classes.cardContent}>
                    <Typography variant="subtitle1" component="h1">
                      <span style={{ color: "#ccc" }}>Author Name:</span>{" "}
                      {capitalize(book.authorName)}
                    </Typography>
                    <Typography variant="subtitle2">
                      <span style={{ color: "#ccc" }}>Genre:</span>{" "}
                      {capitalize(book.genre)}
                    </Typography>
                    <Typography variant="subtitle2">
                      <span style={{ color: "#ccc" }}>Title:</span> {book.title}
                    </Typography>
                  </CardContent>
                </Card>
                <Divider light />
              </div>
            ))
          ) : (
            <Typography variant="h3" component="h1">
              No Results found for query "{search}"
            </Typography>
          )}
        </Paper>
      )}
      <AppBar position="static">
        <Toolbar>
          {state.auth && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <div className={classes.sectionDesktop}>
            <Link href="/">
              <a className={classes.titleNav}>
                RS Library
                <Avatar
                  src="/images/rslibrary-logo.jpg"
                  variant="circle"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginLeft: 10,
                    boxShadow: "0 0 4px rgba(225,225,225,0.9)",
                    border: "3px solid #fefefe"
                  }}
                  onClick={() => router.replace("/")}
                />
              </a>
            </Link>
          </div>
          <Avatar
            src="/images/rslibrary-logo.jpg"
            variant="circle"
            style={{
              width: "40px",
              height: "40px",
              marginRight: 15,
              boxShadow: "0 0 4px rgba(225,225,225,0.9)"
            }}
            onClick={() => router.replace("/")}
            className={classes.sectionMobile}
          />

          <div className={classes.grow} />
          <div>
            {state.auth && (
              <>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    inputProps={{ "aria-label": "search" }}
                    value={search}
                    onChange={handleSearch}
                  />
                </div>
              </>
            )}
            {!state.auth && (
              <>
                <Button
                  color={isActive("/signup") ? "secondary" : "inherit"}
                  onClick={() => router.push("/signup")}
                  style={{ fontWeight: "700" }}
                >
                  Signup
                </Button>
                <Button
                  color={isActive("/login") ? "secondary" : "inherit"}
                  onClick={() => router.push("/login")}
                  style={{ fontWeight: "700" }}
                >
                  Login
                </Button>
              </>
            )}
          </div>

          {state.auth && (
            <>
              <div>
                <>
                  <IconButton
                    aria-label="show notifications"
                    color="inherit"
                    onClick={toggleDrawer("right", true)}
                  >
                    <Badge
                      badgeContent={notifications.length}
                      color="secondary"
                    >
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </>

                <IconButton
                  aria-label="show 3 new collections"
                  color="inherit"
                  onClick={() => router.push(`/bookcollections`)}
                >
                  <Badge badgeContent={collections.length} color="secondary">
                    <Icon className="fas fa-shopping-bag" />
                  </Badge>
                </IconButton>
              </div>
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="Avatar" onClick={handleClick}>
                  <Avatar src={avatar} className={classes.avatar} alt={name} />{" "}
                </IconButton>

                <Menu
                  id="fade-menu-desktop"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={() => router.push(`/profile`)}>
                    Profile
                  </MenuItem>

                  <MenuItem onClick={() => router.push(`/account}`)}>
                    My account
                  </MenuItem>
                  <MenuItem onClick={() => router.push(`/bookcollections`)}>
                    My Collections
                  </MenuItem>
                  <MenuItem onClick={signOut}>Logout</MenuItem>
                </Menu>
              </div>

              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-haspopup="true"
                  aria-controls={mobileMenuId}
                  onClick={handleClick}
                >
                  <MoreIcon />
                </IconButton>

                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={() => router.replace(`/profile`)}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => router.replace(`/account`)}>
                    My account
                  </MenuItem>
                  <MenuItem onClick={() => router.replace(`/bookcollections`)}>
                    My Collections{" "}
                  </MenuItem>
                  <MenuItem onClick={signOut}>Logout</MenuItem>
                </Menu>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {state.auth && (
        <>
          <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
            {sideList("left")}
          </Drawer>
          <Drawer open={state.right} anchor="right">
            {notifyList("right")}
          </Drawer>
        </>
      )}
    </>
  );
};

export default Navbar;
