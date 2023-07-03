import { useState } from "react";
import { Select } from "antd";
import { Pie } from "@ant-design/plots";
import { useGetMyTicketsRequestQuery } from "../../../store/Slices/ItHelpDesk";

export const MyTicketDetails = () => {
  const [ticketFilter, setTicketFilter] = useState("week");
  const { data, isSuccess } = useGetMyTicketsRequestQuery(ticketFilter);

  let ticketDetailsData: any;
  if (isSuccess) {
    ticketDetailsData = data;
  }

  const ticketDetails = [
    {
      type: "All",
      value: ticketDetailsData?.data?.totalTickets ?? 0,
    },
    {
      type: "Pending Tickets",
      value: ticketDetailsData?.data?.pendingTickets ?? 0,
    },
    {
      type: "Resolved Tickets",
      value: ticketDetailsData?.data?.resolvedTickets ?? 0,
    },
  ];

  const config: any = {
    appendPadding: 10,
    data: ticketDetails,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    innerRadius: 0.64,
    legend: {
      position: window.innerWidth <= 900 ? "center" : "right",
      marker: {
        symbol: "circle",
        size: 30,
        style: {
          lineWidth: 5,
          color: ["#EE2E7E", "#65CDF0", "#F7B923"],
          display: "flex",
        },
      },
      itemFormatter: (value: any, item: any) => {
        const colorIndex = item?.color?.index || 0;
        const color = ["#EE2E7E", "#65CDF0", "#F7B923"][colorIndex];
        return `${value} <span style="display: inline-block; width: 20px; height: 20px; background-color: ${color}; border: 1px solid ${color}; margin-right: 8px;"></span>`;
      },
    },
    label: {
      type: "inner",
      offset: "-50%",
      content: ({ percent }: any) => `${percent}`,
      style: {
        fill: "#fff",
        fontSize: 14,
        textAlign: "center",
      },
    },
    autoFit: true,
    color: ["#EE2E7E", "#65CDF0", "#F7B923"],
    statistic: null,
  };
  return (
    <>
      <div className="d-flex justify-between" style={{ padding: "24px 30px 0 30px" }}>
        <h6 className="fs-20 fw-600 line-height-18 m-0" style={{ color: "#23262F" }}>
          My Ticket Details
        </h6>
        <div
          className="border-radius-10 d-flex justify-center  align-center"
          style={{
            width: "115px",
            height: "25px",
            padding: "10px",
            border: "0.716599px solid #65CDF0",
          }}
        >
          <Select
            defaultValue="week"
            bordered={false}
            style={{ fontSize: "9px" }}
            onChange={(value) => setTicketFilter(value)}
            options={[
              { value: "week", label: "This Week" },
              { value: "month", label: "This Month" },
              { value: "year", label: "This Year" },
            ]}
          />
        </div>
      </div>
      <Pie {...config} style={{ height: "238px", marginTop: "2rem" }} />
    </>
  );
};
