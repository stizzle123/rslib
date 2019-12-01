import Layout from "../components/Layout";
import HeroContent from "../components/HeroContent";
import Tile from "../components/Tile";
import SectionContent from "../components/SectionContent";
import { Snackbar, Button, makeStyles } from "@material-ui/core";
import Link from "next/link";
import { withStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles";

const useStyles = theme => ({
  centeredDiv: {
    textAlign: "center"
  },
  btn: {
    marginTop: 10,
    backgroundColor: "#f44336",
    "&:hover": {
      backgroundColor: fade("#f44336", 0.8)
    }
  },
  link: {
    color: "#fff",
    display: "inline-block"
  }
});

class Index extends React.Component {
  state = {
    open: false
  };

  componentDidMount() {
    if (!window.navigator.cookieEnabled) {
      setTimeout(() => {
        this.setState({
          open: !this.state.open
        });
      }, 2000);
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { user, classes, collections } = this.props;
    const { open } = this.state;
    return (
      <Layout {...user} collections={collections}>
        <HeroContent {...user} />
        <Tile {...user} />
        {user && <SectionContent {...user} />}

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={open}
          message={
            <>
              <span id="message-id">
                This Website uses cookies to ensure you get the best experience.
                <br />
                Please kindly enable cookies on your device.{" "}
                <Link href="/privacy">
                  <a className={classes.link}>Learn More</a>
                </Link>
              </span>
              <div className={classes.centeredDiv}>
                <Button
                  color="inherit"
                  className={classes.btn}
                  onClick={this.handleClose}
                >
                  Got it!
                </Button>
              </div>
            </>
          }
        />
      </Layout>
    );
  }
}

export default withStyles(useStyles)(Index);
