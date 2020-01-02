import Navbar from "./Navbar";

const Layout = ({
  children,
  _id,
  name,
  avatar,
  collections,
  notification,
  role
}) => {
  return (
    <>
      <Navbar
        id={_id}
        name={name}
        avatar={avatar}
        collections={collections}
        notification={notification}
        role={role}
      />
      {children}
    </>
  );
};

export default Layout;
