import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { Typography } from "@material-ui/core";

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

export default function DataChart() {
  return (
    <div>
      {/* <Typography variant="h6" color="textSecondary">
        Data Count
      </Typography> */}
      <Pie
        data={state}
        options={{
          title: {
            display: true,
            text: "Total Data count",
            fontSize: 20
          },
          legend: {
            display: true,
            position: "right"
          }
        }}
      />
    </div>
  );
}
