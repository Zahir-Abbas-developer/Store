import { Space, Table } from "antd";
import FolderIcon from "../../../assets/icons/finance-setup/folder.png";
import PdfIcon from "../../../assets/icons/finance-setup/pdfIcon.png";
import SheetIcon from "../../../assets/icons/finance-setup/sheetIcon.png";
import "./FinanceTableView.scss";

const InvoiceTableView = (props: any) => {
  const { invoiceData, handleFileDownload } = props;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (_: any, item: any, index: any) => (
        <Space className="cursor-pointer" onClick={() => handleFileDownload(item, index)}>
          <img src={item.type === "File" ? (item.name.includes(".Pdf") ? PdfIcon : SheetIcon) : FolderIcon} alt="" height={19} width={15} />
          <span>{item.name}</span>
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
          {text.dateCreated} - {text.dateModified}
        </p>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
      render: (_: any, text: any) => <p>{text.type}</p>,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 50,
      render: (_: any, text: any) => <p>{text.size}</p>,
    },
  ];
  return <Table columns={columns} className="invoice-table-main" dataSource={invoiceData} scroll={{ x: "max-content" }} tableLayout="fixed" pagination={false} />;
};

export default InvoiceTableView;
