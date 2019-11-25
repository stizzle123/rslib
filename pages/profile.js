import Layout from "../components/Layout";
import Profile from "../components/Profile";

export default function profile({ user }) {
  return (
    <Layout {...user}>
      <Profile {...user} />
    </Layout>
  );
}
