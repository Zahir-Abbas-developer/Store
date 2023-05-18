import { Pie } from "@ant-design/plots";
// import "./ClientCard.scss";
export const ClientGraph = ({ clientsStats}: any) => {

  const data = [
    { type: "Active(This Week)", value: clientsStats?.weeklyActiveClients },
    { type: "Inactive(This Week)", value: clientsStats?.weeklyInactiveClients },
    { type: "Cancelled Shifts", value: clientsStats?.weeklyCanceledShifts },
    { type: "Total", value: clientsStats?.totalClients },
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
    color: ["#65CDF0", "#F7B923", "#4E132C","#D9DBE9"],
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
          value: "Active(This Week)",
          name: "Active(This Week)",
          marker: {
            symbol: "square",
            style: {
              fill: "#65CDF0",
              r: 7,
            },
          },
        },
        {
          value: "Inactive(This Week)",
          name: "Inactive(This Week)",
          marker: {
            symbol: "square",
            style: {
              fill: "#F7B923",
              r: 7,
            },
          },
        },
        {
          value: "Cancelled Shifts",
          name: "Cancelled Shifts",
          marker: {
            symbol: "square",
            style: {
              fill: "#4E132C",
              r: 7,
            },
          },
        },
        {
          value: "Total",
          name: "Total",
          marker: {
            symbol: "square",
            style: {
              fill: "#D9DBE9",
              r: 7,
            },
          },
        },
      ],
    },
  };

  return <Pie {...config} className="staff-status-graph" style={{ height: "300px" }} />;
};
