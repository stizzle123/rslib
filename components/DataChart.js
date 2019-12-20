import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import InsertChartIcon from "@material-ui/icons/InsertChart";

const useStyles = makeStyles(theme => ({
  chart: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "auto"
    }
  }
}));

export default function DataChart() {
  const classes = useStyles();
  const state = {
    labels: ["Books", "Users", "Reviews", "Requests"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4"],
        hoverBackgroundColor: ["#501800", "#4B5000", "#175000", "#003350"],
        data: [7, 5, 7, 4]
      }
    ]
  };
  return (
    <div>
      <Doughnut
        data={state}
        options={{
          title: {
            display: true,
            fontSize: 20,
            color: "#fff"
          },
          legend: {
            display: true,
            labels: {
              fontColor: "white"
            }
          }
        }}
        // className={classes.chart}
      />
      <Typography
        variant="h6"
        component="h1"
        color="textSecondary"
        style={{ color: "#fff", display: "flex", alignItems: "center" }}
      >
        Data Analytics <InsertChartIcon />
      </Typography>
    </div>
  );
}
