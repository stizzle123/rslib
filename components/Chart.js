import React from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import {
  LineChart,
  AreaChart,
  Area,
  CartesianGrid,
  ReferenceLine,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import moment from "moment";
import { Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: "0 10%",
    margin: "auto"
  },
  mobile: {
    width: "100%",
    height: "100%"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2)
  }
}));

function createData(time, amount) {
  return { time, amount };
}

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export default function Chart() {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h6" component="h1" gutterBottom>
          {moment(Date.now()).calendar()}
        </Typography>

        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          width={700}
          height={400}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
          <ReferenceLine
            y={4000}
            label="Max"
            stroke="red"
            strokeDasharray="3 3"
          />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          {/* <Legend verticalAlign="top" height={36} />
        <Line
          name="pv of pages"
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
        />
        <Line
          name="uv of pages"
          type="monotone"
          dataKey="uv"
          stroke="#82ca9d"
        /> */}
        </AreaChart>
      </Paper>
    </div>
  );
}
