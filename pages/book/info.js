import React from "react";
import Layout from "../../components/Layout";
import Book from "../../components/Book";

export default function info({ user, collections, notification }) {
  return (
    <Layout {...user} collections={collections} notification={notification}>
      <Book />
    </Layout>
  );
}
