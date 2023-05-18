import { Avatar, Space, Table } from "antd";
import { StaffCodeTableData } from "../../../../mock/FinanceSetupData";
import AvatarImg from "../../../../assets/images/finance-setup/avatar.png";
import "./StaffCodeTable.scss";

const StaffCodeTable = () => {
  const columns = [
    {
      title: () => (
        <p className="fs-16 fw-500 m-0" style={{color:'#212529'}}>Staff Name</p>
      ),
      dataIndex: "staffName",
      key: "staffName",
      width: 200,
      render: (_: any, text: any) => (
        <Space style={{ paddingLeft: "10px", border: "1px solid #D9DBE9", borderLeft: "5px solid #65CDF0", width: "333px", height: "47px" }}>
          <Avatar size="small" style={{height:'29.27px', width:"29.27px" }} icon={<img src={AvatarImg} alt="avatar-img" />} />
          <span className="fs-16 fw-400 title-color" style={{ paddingLeft: ".5rem" }}>
            {text.staffCategory}
          </span>
        </Space>
      ),
    },
    {
      title: () => (
        <p className="fs-16 fw-500 m-0" style={{color:'#212529'}}>Staff Code</p>
      ),
      dataIndex: "staffCode",
      key: "staffCode",
      width: 200,
      render: (_: any, text: any) => (
        <input className="fs-16 fw-400" value={text.weekDay} style={{ width: "333px", border: "1px solid #D9DBE9", paddingLeft: "10px", height: "47px" }} />
      ),
    },
    {
      title: () => (
        <p className="fs-16 fw-500 m-0" style={{color:'#212529'}}>Staff Type</p>
      ),
      dataIndex: "staffType",
      key: "staffType",
      width: 200,
      render: (_: any, text: any) => (
        <input className="fs-16 fw-400" value={text.saturday} style={{ width: "333px", border: "1px solid #D9DBE9", paddingLeft: "10px", height: "47px" }} />
      ),
    },
    {
      title: () => (
        <p className="fs-16 fw-500 m-0" style={{color:'#212529'}}>Staff Category</p>
      ),
      dataIndex: "staffCategory",
      key: "staffCategory",
      width: 200,
      render: (_: any, text: any) => (
        <input className="fs-16 fw-400" value={text.sunday} style={{ width: "333px", border: "1px solid #D9DBE9", paddingLeft: "10px", height: "47px" }} />
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        className="staff-code-wrapper-table"
        dataSource={StaffCodeTableData}
        scroll={{ x: "max-content" }}
        tableLayout="fixed"
        pagination={false}
      />
    </div>
  );
};

export default StaffCodeTable;
