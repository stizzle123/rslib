import Layout from "../components/Layout";
import Profile from "../components/Profile";

export default function profile({ user, collections, notification }) {
  return (
    <Layout {...user} collections={collections} notification={notification}>
      <Profile
        {...user}
        collections={collections}
        notification={notification}
      />
    </Layout>
  );
}
