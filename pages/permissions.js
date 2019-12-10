import Layout from "../components/Layout";
import Permissions from "../components/Permissions";

function permissions({ user, collections, notification, users }) {
  return (
    <Layout {...user} collections={collections} notification={notification}>
      <Permissions users={users} />
    </Layout>
  );
}

export default permissions;
