import Layout from "../components/Layout";
import { Typography } from "@material-ui/core";

export default function dashboard({ user }) {
  return (
    <Layout {...user}>
      <Typography variant="h2" component="h5">
        Dashboard
      </Typography>
    </Layout>
  );
}
