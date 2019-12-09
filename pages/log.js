import Layout from "../components/Layout";
import { Typography } from "@material-ui/core";
import BookLog from "../components/BookLog";

export default function log({ user, collections, notification }) {
  return (
    <Layout {...user} collections={collections} notification={notification}>
      <BookLog />
    </Layout>
  );
}
