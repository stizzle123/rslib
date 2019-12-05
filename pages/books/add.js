import Layout from "../../components/Layout";
import AddBook from "../../components/AddBook";

export default function add({ user, collections }) {
  return (
    <Layout {...user} collections={collections}>
      <AddBook />
    </Layout>
  );
}
