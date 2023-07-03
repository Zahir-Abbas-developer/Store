import { Table } from "antd";
import "./ClientRateSetupTable.scss";

const ClientRateSetupTable = ({ tableData }: any) => {
  const columns = [
    {
      title: () => (
        <p className="m-0 fs-16 fw-500" style={{ color: "#212529" }}>
          Staff Category
        </p>
      ),
      dataIndex: "staffCategory",
      key: "staffCategory",
      render: (_: any, text: any) => (
        <div
          style={{
            paddingLeft: "10px",
            border: "1px solid #D9DBE9",
            color: "#4E4B66",
            width: "268px",
            borderLeft: "5px solid #65CDF0",
            height: "47px",
          }}
          className="staff-category-input fs-16 fw-500 d-flex align-center"
        >
          {text?.category?.shortForm}
        </div>
      ),
    },
    {
      title: () => (
        <>
          <p className="m-0 fs-16 fw-500" style={{ color: "#212529" }}>
            Week Day
          </p>
          <span className="fs-14 fw-400" style={{ color: "#6E7191" }}>
            (Rate per hour)
          </span>
        </>
      ),
      dataIndex: "weekDay",
      key: "weekDay",
      render: (_: any, text: any) => (
        <div
          style={{
            paddingLeft: "10px",
            color: "#212529",
            border: "1px solid #D9DBE9",
            width: "268px",
            height: "47px"
          }}
          className="fs-16 fw-500 d-flex align-center"
        >
          {text?.weekDay}
        </div>
      ),
    },
    {
      title: () => (
        <>
          <p className="m-0 fs-16 fw-500" style={{ color: "#212529" }}>
            Saturday
          </p>
          <span className="fs-14 fw-400" style={{ color: "#6E7191" }}>
            (Rate per hour)
          </span>
        </>
      ),
      dataIndex: "saturday",
      key: "saturday",
      render: (_: any, text: any) => (
        <div
          style={{
            paddingLeft: "10px",
            color: "#212529",
            border: "1px solid #D9DBE9",
            width: "268px",
            height: "47px"
          }}
          className="fs-16 fw-500 d-flex align-center"
        >
          {text?.saturday}
        </div>
      ),
    },
    {
      title: () => (
        <>
          <p className="m-0 fs-16 fw-500" style={{ color: "#212529" }}>
            Sunday
          </p>
          <span className="fs-14 fw-400" style={{ color: "#6E7191" }}>
            (Rate per hour)
          </span>
        </>
      ),
      dataIndex: "sunday",
      key: "sunday",
      render: (_: any, text: any) => (
        <div
          style={{
            paddingLeft: "10px",
            color: "#212529",
            border: "1px solid #D9DBE9",
            width: "268px",
            height: "47px"
          }}
          className="fs-16 fw-500 d-flex align-center"
        >
          {text?.sunday}
        </div>
      ),
    },
    {
      title: () => (
        <>
          <p className="m-0 fs-16 fw-500" style={{ color: "#212529" }}>
            Bank Holiday
          </p>
          <span className="fs-14 fw-400" style={{ color: "#6E7191" }}>
            (Rate per hour)
          </span>
        </>
      ),
      dataIndex: "bankHoliday",
      key: "bankHoliday",
      render: (_: any, text: any) => (
        <div
          style={{
            paddingLeft: "10px",
            color: "#212529",
            border: "1px solid #D9DBE9",
            width: "268px",
            height: "47px"
          }}
          className="fs-16 fw-500 d-flex align-center"
        >
          {text?.bankHoliday}
        </div>
      ),
    },
  ];


  return (
    <Table
      columns={columns}
      className="client-rate-wrapper-table"
      dataSource={tableData}
      scroll={{ x: "max-content" }}
      tableLayout="fixed"
      pagination={false}
    />
  );
};

export default ClientRateSetupTable;
