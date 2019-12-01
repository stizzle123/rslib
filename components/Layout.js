import Container from "@material-ui/core/Container";
import Navbar from "./Navbar";

const Layout = ({ children, _id, name, avatar, collections }) => {
  return (
    <>
      <Navbar id={_id} name={name} avatar={avatar} collections={collections} />
      {children}
    </>
  );
};

export default Layout;
