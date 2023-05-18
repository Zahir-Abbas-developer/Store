import React from "react";
import { Pie, measureTextWidth } from "@ant-design/plots";

const RatingGraph = ({ graphData }: any) => {
  function renderStatistic(containerWidth: any, text: any, style: any) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : "inherit"};">${text}</div>`;
  }

  const data = [
    {
      type: "4",
      value: 27,
    },

    {
      type: "5",
      value: 18,
    },
    {
      type: "6",
      value: 15,
    },
    {
      type: "7",
      value: 10,
    },
    {
      type: "8",
      value: 5,
    },
  ];
  const config: any = {
    appendPadding: 10,
    data,
    autoFit: true,
    angleField: "value",
    colorField: "type",
    legend: false,
    radius: 0.6,
    innerRadius: 0.6,
    color: ["#F7B923", "#FF4D4F", "#52C41A", "#65CDF0", "#EE2E7E"],
    meta: {
      value: {
        formatter: (v: any) => `${v} ¥`,
      },
    },
    label: {
      type: "inner",
      offset: "-50%",
      style: {
        textAlign: "center",
      },
      autoRotate: false,
      content: "{value}",
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container: any, view: any, datum: any) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = `${(graphData?.averageData[0]?.average?.toFixed(1, 0))}/5`;
          return renderStatistic(d, text, {
            fontSize: 24,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: "12px",
        },
        customHtml: (container: any, view: any, datum: any, data: any) => {
          const { width } = container.getBoundingClientRect();
          // const text = datum ? `(${datum.value} reviews)` : `(${data.reduce((r: any, d: any) => r + d.value, 0)} reviews)`;
          const text = `(${graphData?.totalReviewd} reviews)`;
          return renderStatistic(width, text, {
            fontSize: 12,
          });
        },
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
      {
        type: "pie-statistic-active",
      },
    ],
  };
  return <Pie {...config} label={false} style={{ height: "250px" }} />;
};
export default RatingGraph;
