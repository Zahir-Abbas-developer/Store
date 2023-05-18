import React, { useState } from "react";
import { Area } from "@ant-design/plots";

const MonthlyJobGraph = ({ shiftData }: any) => {
  const graphData: any = shiftData?.data?.monthlyJobsWidgets?.map((item: any) => {
    return {
      timePeriod: item.month.toString(),
      value: item.count,
    };
  });

  const config: any = {
    data: graphData ? graphData : [{ timePeriod: "", value: 0 }],
    xField: "timePeriod",
    yField: "value",
    color: "#65CDF0",
    smooth: true,
    areaStyle: {
      fill: "#65CDF0",
      cursor: "pointer",
    },
    xAxis: {
      range: [0, 1],
    },
    yAxis: {
      grid: {
        line: {
          style: {
            stroke: "rgba(160, 163, 189, 0.4)",
            lineWidth: 1.5,
            lineDash: [4, 6],
            cursor: "pointer",
          },
        },
      },
    },
  };

  if (!graphData || graphData.length === 0) {
    return <div>No data available</div>;
  }

  return <Area {...config} height={320} />;
};

export default MonthlyJobGraph;