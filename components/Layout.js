import Container from "@material-ui/core/Container";
import Navbar from "./Navbar";

const Layout = ({ children, _id, name, avatar, collections, notification }) => {
  return (
    <>
      <Navbar
        id={_id}
        name={name}
        avatar={avatar}
        collections={collections}
        notification={notification}
      />
      {children}
    </>
  );
};

export default Layout;
