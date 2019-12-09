import Layout from "../components/Layout";
import { Typography } from "@material-ui/core";
import UsersCollection from "../components/UsersCollection";

export default function users({ user, collections, notification }) {
  return (
    <Layout {...user} collections={collections} notification={notification}>
      <UsersCollection />
    </Layout>
  );
}
