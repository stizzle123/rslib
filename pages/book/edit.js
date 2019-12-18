import React from "react";
import Layout from "../../components/Layout";
import EditBook from "../../components/EditBook";

export default function edit({ user, collections, notification }) {
  return (
    <Layout {...user} collections={collections} notification={notification}>
      <EditBook {...user} />
    </Layout>
  );
}
