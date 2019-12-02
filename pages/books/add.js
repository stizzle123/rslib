import Layout from "../../components/Layout";
import { Typography } from "@material-ui/core";
import AddBook from "../../components/AddBook";

export default function add({ user, collections }) {
  return (
    <Layout {...user} collections={collections}>
      <AddBook />
    </Layout>
  );
}
