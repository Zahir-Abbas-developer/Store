import { useState } from "react";
import { Dropdown, MenuProps, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import "./PaymentDetailsTable.scss";
import { ClientsData, IClientsPaymentsTableData, IStaffPaymentsTableData, StaffData } from "../../../mock/PaymentDetailsTableData";
import { DownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useUpdateClientPaymentStatusMutation } from "../../../store/Slices/PaymentDetails/ClientPaymentDetails";
import { useUpdateStaffPaymentStatusMutation } from "../../../store/Slices/PaymentDetails/StaffPaymentDetails";

const PaymentDetailsTable = (props: any) => {
  const { selectedRowKeys, setSelectedRowKeys, PaymentDetailsType, PaymentHistory, clientsData, isLoading, timeFrameFilterValues } = props;
  const [clientPaymentId, setClientPaymentId] = useState("");
  const [staffPaymentId, setStaffPaymentId] = useState("");

  const [updateClientPaymentStatus] = useUpdateClientPaymentStatusMutation({});
  const [updateStaffPaymentStatus] = useUpdateStaffPaymentStatusMutation({});

  const handleStatusChange = async () => {
    if (PaymentDetailsType === "Client") {
      const { error }: any = await updateClientPaymentStatus({
        id: clientPaymentId,
        payload: {
          startDate: timeFrameFilterValues?.startDate
            ? timeFrameFilterValues?.startDate
            : dayjs().subtract(1, "week").startOf("week").format("YYYY-MM-DD"),
          endDate: timeFrameFilterValues?.endDate ? timeFrameFilterValues?.endDate : dayjs().subtract(1, "week").endOf("week").format("YYYY-MM-DD"),
        },
      });
      if (error) {
        console.log(error);
      } else {
        console.log("success");
      }
    } else {
      const { error }: any = await updateStaffPaymentStatus({
        id: staffPaymentId,
        payload: {
          startDate: timeFrameFilterValues?.startDate
            ? timeFrameFilterValues?.startDate
            : dayjs().subtract(1, "week").startOf("week").format("YYYY-MM-DD"),
          endDate: timeFrameFilterValues?.endDate ? timeFrameFilterValues?.endDate : dayjs().subtract(1, "week").endOf("week").format("YYYY-MM-DD"),
        },
      });
      if (error) {
        console.log(error);
      } else {
        console.log("success");
      }
    }
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span style={{ display: "block", padding: "5px 0" }} onClick={handleStatusChange}>
          Paid
        </span>
      ),
    },
  ];

  const ClientColumns: ColumnsType<IClientsPaymentsTableData> = [
    {
      title: "Sr #",
      dataIndex: "key",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Client Name",
      dataIndex: "username",
    },
    {
      title: "Date",
      dataIndex: "shiftDate",
      render: (_, data: any) => dayjs(data?.shiftDate).format("DD/MM/YYYY"),
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
    },
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      render: (_, data: any) => dayjs(data?.shiftDate).format("DD/MM/YYYY"),
    },
    {
      title: "Payment Status",
      dataIndex: "Pending",
      render: (_: any, data: any) => (
        <div className="payment-status-dropdown">
          {!PaymentHistory ? (
            <Dropdown overlayClassName="payment-status-dropdown" menu={{ items }} trigger={["click"]}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setClientPaymentId(data?._id);
                }}
              >
                <Space>
                  {data?.paymentStatus}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <span style={{ background: "#52C41A26", color: "#52C41A", padding: "7px 35px", borderRadius: "3px", fontWeight: "600" }}>Paid</span>
          )}
        </div>
      ),
    },
  ];
  const StaffColumns: ColumnsType<any> | any = [
    {
      title: "Sr #",
      dataIndex: "key",
      fixed: "left",
      render: (_: any, __: any, index: any) => index + 1,
    },
    {
      title: "Staff Name",
      dataIndex: "username",
      fixed: "left",
      render: (_: any, data: any) => (
        <div>
          <span>{data?.username}</span>
          <br />
          <span style={{ fontSize: "10px", color: "#6E7191" }}>{dayjs(data?.userType?.createdAt).format("DD-MM-YYYY")}</span>
        </div>
      ),
    },
    {
      title: "Staff Type",
      dataIndex: "userType",
      fixed: "left",
      render: (_: any, data: any) => <div>{data?.userType?.shortForm}</div>,
    },
    {
      title: "Staff Category",
      dataIndex: "category",
    },
    {
      title: "No of Clients",
      dataIndex: "totalClients",
    },
    {
      title: "Client Rate",
      dataIndex: "clientRate",
    },
    {
      title: "Staff Hours",
      dataIndex: "staffHours",
    },
    {
      title: "No of Shifts",
      dataIndex: "totalShifts",
    },
    {
      title: "Salary Hours",
      dataIndex: "staffHours",
    },
    // {
    //   title: "NI Hours",
    //   dataIndex: "salary_hours",
    // },
    // {
    //   title: "Non-NI Hours",
    //   dataIndex: "salary_hours",
    // },
    // {
    //   title: "Millage Allowance Hours",
    //   dataIndex: "salary_hours",
    // },
    {
      title: "Pay Rate",
      dataIndex: "payRate",
    },
    // {
    //   title: "NI Payable",
    //   dataIndex: "salary_hours",
    // },
    // {
    //   title: "Non-NI Payable",
    //   dataIndex: "salary_hours",
    // },
    {
      title: "Total Payable",
      dataIndex: "totalPayable",
    },
    {
      title: "Payment Status",
      dataIndex: "Penging",
      render: (_: any, data: any) => (
        <div className="payment-status-dropdown">
          {data?.paymentStatus === "PENDING" ? (
            <Dropdown overlayClassName="payment-status-dropdown" menu={{ items }} trigger={["click"]}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setStaffPaymentId(data?._id);
                }}
              >
                <Space>
                  Pending
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <span style={{ background: "#52C41A26", color: "#52C41A", padding: "7px 35px", borderRadius: "3px", fontWeight: "600" }}>Paid</span>
          )}
        </div>
      ),
    },
  ];
  const renderTableData: any = {
    Client: { columns: ClientColumns, data: clientsData },
    Staff: { columns: StaffColumns, data: clientsData },
  };

  return (
    <>
      <Table
        className="payment-details-table-wrapper"
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
        scroll={{ x: "max-content" }}
        columns={renderTableData[PaymentDetailsType]?.columns}
        dataSource={renderTableData[PaymentDetailsType]?.data}
        pagination={false}
        loading={isLoading}
      />
    </>
  );
};

export default PaymentDetailsTable;
