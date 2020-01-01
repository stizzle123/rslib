import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  makeStyles,
  Avatar,
  Icon
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import CollectionsIcon from "@material-ui/icons/Collections";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import ArchiveIcon from "@material-ui/icons/Archive";
import Router, { useRouter } from "next/router";
import { fade, lighten } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  // flex: {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   flexDirection: "column",
  //   width: "100%"
  // },
  bottomPosition: {
    position: "absolute",
    bottom: "0",
    color: fade(theme.palette.common.black, 0.7),
    display: "inline-block",
    margin: "10px 20px"
  },
  footerColor: {
    color: lighten(theme.palette.common.black, 0.6)
  },
  footerLogo: {
    display: "flex",
    justifyContent: "center"
  }
}));

export default function SidebarNavList({ role }) {
  const router = useRouter();
  const classes = useStyles();

  return (
    <div className={classes.flex}>
      <>
        <List>
          <ListItem button onClick={() => router.replace("/dashboard")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          {role === "admin" && (
            <ListItem button onClick={() => router.push("/books/add")}>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="Add Books" />
            </ListItem>
          )}
          <ListItem button onClick={() => router.push("/books")}>
            <ListItemIcon>
              <CollectionsIcon />
            </ListItemIcon>
            <ListItemText primary="Book Collections" />
          </ListItem>
          {role === "admin" && (
            <ListItem button onClick={() => router.push("/log")}>
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText primary="Book Log" />
            </ListItem>
          )}
          {role === "admin" && (
            <ListItem button onClick={() => router.push("/users")}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="User Management" />
            </ListItem>
          )}
          <Divider light />
          {role === "admin" && (
            <>
              <ListItem button onClick={() => router.push("/permissions")}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Permissions" />
              </ListItem>
              <ListItem
                button
                onClick={() => router.push("/requests")}
                style={{ marginBottom: 70 }}
              >
                <ListItemIcon>
                  <Icon className="fas fa-paper-plane" />
                </ListItemIcon>
                <ListItemText primary="Book Requests" />
              </ListItem>
              <ListItem style={{ display: "grid", justifyContent: "center" }}>
                <Avatar
                  src="/images/logo.png"
                  variant="circle"
                  style={{
                    margin: "auto",
                    width: "60px",
                    height: "60px",
                    display: "block",
                    boxShadow: "0 0 4px rgba(225,225,225,0.9)",
                    border: "3px solid #fefefe"
                  }}
                />
                <ListItemText
                  primary={
                    <span style={{ fontSize: "0.8rem", color: "#9e9e9e" }}>
                      Copyright &copy; RS LIBRARY, {new Date().getFullYear()}
                    </span>
                  }
                />
              </ListItem>
            </>
          )}
        </List>
      </>
    </div>
  );
}
