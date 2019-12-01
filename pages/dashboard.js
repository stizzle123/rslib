import Layout from "../components/Layout";
import { Typography } from "@material-ui/core";
import Chart from "../components/Chart";

export default function dashboard({ user, collections }) {
  return (
    <Layout {...user} collections={collections}>
      <Chart {...user} collections={collections} />
    </Layout>
  );
}
