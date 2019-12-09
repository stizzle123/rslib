import Layout from "../../components/Layout";
import AddBook from "../../components/AddBook";

export default function add({ user, collections, notification }) {
  return (
    <Layout {...user} collections={collections} notification={notification}>
      <AddBook />
    </Layout>
  );
}
