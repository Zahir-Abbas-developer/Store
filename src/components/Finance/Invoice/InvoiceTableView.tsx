import { Space, Table } from "antd";
import FolderIcon from "../../../assets/icons/finance-setup/folder.png";
import PdfIcon from "../../../assets/icons/finance-setup/pdfIcon.png";
import SheetIcon from "../../../assets/icons/finance-setup/sheetIcon.png";
import "./InvoiceTableView.scss";
import dayjs from "dayjs";

const InvoiceTableView = (props: any) => {
  const { invoiceData, handleFileDownload } = props;

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      width: 200,
      render: (_: any, item: any, index: any) => (
        <Space className="cursor-pointer" onClick={() => handleFileDownload(item._id, index)}>
          <img src={item.type === "File" ? (item.firstName.includes(".Pdf") ? PdfIcon : SheetIcon) : FolderIcon} alt="" height={19} width={15} />
          <span>{item.firstName}{item.clientName}</span>
        </Space>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 200,
      render: (_: any, text: any) => (
        <p>
          {dayjs(text.createdAt).format("DD/MM/YYYY")} - {dayjs(text.updatedAt).format("DD/MM/YYYY")}
        </p>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
      render: (_: any, text: any) => <p>File Folder</p>,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 50,
      render: (_: any, text: any) => <p>600KB</p>,
    },
  ];
  return <Table columns={columns} className="invoice-table-main" dataSource={invoiceData} scroll={{ x: "max-content" }} tableLayout="fixed" pagination={false} />;
};

export default InvoiceTableView;
