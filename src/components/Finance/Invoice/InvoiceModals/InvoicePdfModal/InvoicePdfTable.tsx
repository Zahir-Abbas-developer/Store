import {Table} from 'antd';
import { invoiceTableDataSource } from '../../../../../mock/InvoiceData';

function InvoicePdfTable() {
      const columns = [
        {
          title: 'Activity',
          dataIndex: 'activity',
          key: 'activity',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'QTY',
          dataIndex:'quantity',
          key: 'quantity',
        },
        {
          title: 'Rate',
          dataIndex: 'rate',
          key: 'rate',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
      ];
  return (
    <Table scroll={{x:"max-content"}} pagination={false} dataSource={invoiceTableDataSource} columns={columns} />
  )
}

export default InvoicePdfTable
