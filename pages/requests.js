import Layout from "../components/Layout";
import Requests from "../components/Requests";

export default function requests({ user, collections, notification }) {
  return (
    <Layout {...user} collections={collections} notification={notification}>
      <Requests {...user} />
    </Layout>
  );
}
