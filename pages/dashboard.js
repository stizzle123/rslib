import Layout from "../components/Layout";
import { Typography } from "@material-ui/core";
import Dashboard from "../components/Dashboard";

export default function dashboard({ user, collections }) {
  return (
    <Layout {...user} collections={collections}>
      {/* <Chart {...user} collections={collections} /> */}
      <Dashboard {...user} collections={collections} />
    </Layout>
  );
}
