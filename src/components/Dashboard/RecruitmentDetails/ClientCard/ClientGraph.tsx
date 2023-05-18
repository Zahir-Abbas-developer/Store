import { Pie } from "@ant-design/plots";
import "./ClientCard.scss";
export const ClientCardGraph = ({ recruitmentStats }: any) => {
  const data = [
    { type: "Registrations(This Week)", value: recruitmentStats?.staffRegistedThisWeek },
    { type: "Registrations(This Month)", value: recruitmentStats?.staffRegistedThisMonth },
    { type: "Active Staff", value: recruitmentStats?.totalActiveStaff },
    { type: "Active", value: recruitmentStats?.totalActiveStaff },
  ];

  const config: any = {
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    autoFit: true,
    pieStyle: {
      lineWidth: 1,
      strokeStyle: "#fff",
    },
    color: ["#D9DBE9", "#65CDF0", "#F7B923", "#4E132C"],
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{value}",
    },

    legend: {
      custom: true,
      position: "bottom",
      items: [
        {
          value: "Registrations(This Week)",
          name: "Registrations(This Week)",
          marker: {
            symbol: "square",
            style: {
              fill: "#D9DBE9",
              r: 7,
            },
          },
        },
        {
          value: "Registrations(This Month)",
          name: "Registrations(This Month)",
          marker: {
            symbol: "square",
            style: {
              fill: "#65CDF0",
              r: 7,
            },
          },
        },
        {
          value: "Active Staff",
          name: "Active Staff",
          marker: {
            symbol: "square",
            style: {
              fill: "#F7B923",
              r: 7,
            },
          },
        },
        {
          value: "Active Staffs",
          name: "Active Staffs",
          marker: {
            symbol: "square",
            style: {
              fill: "#4E132C",
              r: 7,
            },
          },
        },
      ],
    },
  };

  return <Pie {...config} className="staff-status-graph" style={{ height: "300px" }} />;
};
