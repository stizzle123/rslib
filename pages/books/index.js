import Layout from "../../components/Layout";
import { Typography } from "@material-ui/core";
import Books from "../../components/Books";

export default function index({ user, collections, notification }) {
  return (
    <Layout {...user} collections={collections} notification={notification}>
      <Books {...user} />
    </Layout>
  );
}
