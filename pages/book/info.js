import React from "react";
import Layout from "../../components/Layout";
import { Typography } from "@material-ui/core";

export default function info({ user, collections }) {
  return (
    <Layout {...user} collections={collections}>
      <Typography variant="h3" component="h1">
        View A Book
      </Typography>
    </Layout>
  );
}
