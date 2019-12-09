import Layout from "../components/Layout";
import { Typography } from "@material-ui/core";

export default function account({ user, collections, notification }) {
  return (
    <Layout {...user} collections={collections} notification={notification}>
      <Typography variant="h2" component="h3">
        My Account
      </Typography>
    </Layout>
  );
}
