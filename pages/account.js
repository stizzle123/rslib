import Layout from "../components/Layout";
import { Typography } from "@material-ui/core";

export default function account({ user, collections }) {
  return (
    <Layout {...user} collections={collections}>
      <Typography variant="h2" component="h3">
        My Account {collections.books.length}
      </Typography>
    </Layout>
  );
}
