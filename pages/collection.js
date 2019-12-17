import React from "react";
import Layout from "../components/Layout";
import Collection from "../components/Collection";

export default function collection({ user, collections, notification }) {
  return (
    <Layout {...user} collections={collections} notification={notification}>
      <Collection {...user} />
    </Layout>
  );
}
