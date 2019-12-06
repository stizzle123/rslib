import React from "react";
import { Typography } from "@material-ui/core";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

export default function collection({ user, collections }) {
  const router = useRouter();
  return (
    <Layout {...user} collections={collections}>
      <Typography variant="h3">
        Collection by Genre: {router.query.genre}
      </Typography>
    </Layout>
  );
}
