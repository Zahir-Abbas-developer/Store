import { Pie } from "@ant-design/plots";
// import "./ClientCard.scss";
export const StaffGraph = ({ staffStats }: any) => {
  const data = [
    { type: "Certificate Due", value: staffStats?.certificatesDue },
    { type: "Certificate Expired", value: staffStats?.certificatesExpired },
    { type: "Inactive Staff", value: staffStats?.totalInactiveStaff },
    { type: "Active", value: staffStats?.totalActiveStaff },
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
    color: ["#65CDF0", "#F7B923", "#4E132C", "#4E132C"],
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
          value: "Certificate Due",
          name: "Certificate Due",
          marker: {
            symbol: "square",
            style: {
              fill: "#65CDF0",
              r: 7,
            },
          },
        },
        // {
        //   value: "Certificate Expired",
        //   name: "Certificate Expired",
        //   marker: {
        //     symbol: "square",
        //     style: {
        //       fill: "#F7B923",
        //       r: 7,
        //     },
        //   },
        // },
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
          value: "Inactive Staff",
          name: "Inactive Staff",
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
