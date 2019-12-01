import Layout from "../components/Layout";
import Profile from "../components/Profile";

export default function profile({ user, collections }) {
  return (
    <Layout {...user} collections={collections}>
      <Profile {...user} collections={collections} />
    </Layout>
  );
}
