import Layout from "../components/Layout";
import Account from "../components/Account";

export default function account({ user, collections, notification }) {
  return (
    <Layout {...user} collections={collections} notification={notification}>
      <Account {...user} />
    </Layout>
  );
}
