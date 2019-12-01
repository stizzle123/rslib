import Layout from "../../components/Layout";
import { Typography } from "@material-ui/core";

export default function add({ user, collections }) {
  return (
    <Layout {...user} collections={collections}>
      <Typography variant="h2" component="h5">
        Add Books
      </Typography>
    </Layout>
  );
}
