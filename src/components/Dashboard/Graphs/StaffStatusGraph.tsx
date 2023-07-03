import { Pie } from "@ant-design/plots";
// import "./ClientCard.scss";
export const StaffStatusGraph = ({ staffStatusStats }: any) => {
  const data = [
    { type: "Staff on Holiday (Today)", value: staffStatusStats?.staffOnHolidayToday },
    { type: "Staff on Work (Today)", value: staffStatusStats?.staffOnWorkToday },
    { type: "Terminated Staff", value: staffStatusStats?.terminatedStaff },
    { type: "Total", value: staffStatusStats?.totalStaff },
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
    color: ["#65CDF0", "#F7B923", "#4E132C", "#D9DBE9"],
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
          value: "Staff on Holiday (Today)",
          name: "Staff on Holiday (Today)",
          marker: {
            symbol: "square",
            style: {
              fill: "#65CDF0",
              r: 7,
            },
          },
        },
        {
          value: "Staff on Work (Today)",
          name: "Staff on Work (Today)",
          marker: {
            symbol: "square",
            style: {
              fill: "#F7B923",
              r: 7,
            },
          },
        },
        {
          value: "Terminated Staff",
          name: "Terminated Staff",
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
