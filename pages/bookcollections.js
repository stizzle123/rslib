import Layout from "../components/Layout";
import { Typography } from "@material-ui/core";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

function bookcollections({ user, collections }) {
  return (
    <Layout {...user} collections={collections}>
      <Typography variant="h2" component="h3">
        My Collections
      </Typography>
    </Layout>
  );
}

export default bookcollections;
