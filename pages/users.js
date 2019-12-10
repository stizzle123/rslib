import Layout from "../components/Layout";
import UsersCollection from "../components/UsersCollection";

function users({ user, collections, notification, users }) {
  return (
    <Layout {...user} collections={collections} notification={notification}>
      <UsersCollection users={users} />
    </Layout>
  );
}

export default users;
