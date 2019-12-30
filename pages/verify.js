import Layout from "../components/Layout";
import Verify from "../components/Verify";

export default function account({ user, collections, notification }) {
  return (
    <Layout>
      <Verify />
    </Layout>
  );
}
