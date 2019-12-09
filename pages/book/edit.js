import React from "react";
import Layout from "../../components/Layout";
import { Typography } from "@material-ui/core";

export default function edit({ user, collections, notification }) {
  return (
    <Layout {...user} collections={collections} notification={notification}>
      <Typography variant="h3" component="h1">
        Edit A Book
      </Typography>
    </Layout>
  );
}
