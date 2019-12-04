import Layout from "../components/Layout";
import { Typography } from "@material-ui/core";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import MyCollections from "../components/MyCollections";

function bookcollections({ user, collections }) {
  return (
    <Layout {...user} collections={collections}>
      <MyCollections {...collections} {...user} />
    </Layout>
  );
}

export default bookcollections;
