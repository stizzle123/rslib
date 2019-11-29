import Layout from "../components/Layout";
import { Typography } from "@material-ui/core";
import Chart from "../components/Chart";

export default function dashboard({ user }) {
  return (
    <Layout {...user}>
      <Chart {...user} />
    </Layout>
  );
}
