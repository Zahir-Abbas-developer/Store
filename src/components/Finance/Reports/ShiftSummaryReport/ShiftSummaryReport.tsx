import { Table } from 'antd';
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import './ShiftSummaryReport.scss';
import BreadCrumb from '../../../../layout/BreadCrumb/BreadCrumb';

const ShiftSummaryReport = () => {

  interface DataType {
    key: string;
    name: string;
    age: number;
    tel: string;
    phone: number;
    address: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: <span className='error-color'>Week 16</span>,
      dataIndex: 'key',
      rowScope: 'row',
    },
    {
      title: 'Monday Day',
      dataIndex: 'name',
      render: (text) => <Link to="/finance/reports/shift-summary/shift-summary-detail" className='title-color fs-16'>{text}</Link>,

    },
    {
      title: 'Monday Night',
      dataIndex: 'name',
      render: (text) => <Link to="/finance/reports/shift-summary/shift-summary-detail" className='title-color fs-16'>{text}</Link>,

    },
    {
      title: 'Tuesday Day ',
      dataIndex: 'name',
      render: (text) => <Link to="/finance/reports/shift-summary/shift-summary-detail" className='title-color fs-16'>{text}</Link>,

    },
    {
      title: 'Tuesday Night',
      dataIndex: 'name',
      render: (text) => <Link to="/finance/reports/shift-summary/shift-summary-detail" className='title-color fs-16'>{text}</Link>,

    },
    {
      title: 'Wednesday Day',
      dataIndex: 'name',
      render: (text) => <Link to="/finance/reports/shift-summary/shift-summary-detail" className='title-color fs-16'>{text}</Link>,

    },
    {
      title: 'Wednesday Night',
      dataIndex: 'name',
      render: (text) => <Link to="/finance/reports/shift-summary/shift-summary-detail" className='title-color fs-16'>{text}</Link>,

    },


  ];

  const data: DataType[] = [
    {
      key: 'Total Shifts',
      name: '76.00',
      age: 32,
      tel: '27.00',
      phone: 18889898989,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: 'Total Hours',
      name: '800.25',
      tel: '296.00',
      phone: 18889898888,
      age: 42,
      address: 'London No. 1 Lake Park',
    },

  ];

  const breadCrumbItems = [
    {
      title: "Shift Summary",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Finance Reports",
      path: "/finance/reports",
    },
  ];
  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />

      <div className='shift-summary-report bg-white border-radius-10'>
        <h2 className='fs-20 fw-500 m-0'> Week wise shift hours summary </h2>

        <Table columns={columns} dataSource={data} bordered style={{ marginBottom: "50px" }} scroll={{ x: "max-content" }} />
        <Table columns={columns} dataSource={data} bordered style={{ marginBottom: "50px" }} scroll={{ x: "max-content" }} />
        <Table columns={columns} dataSource={data} bordered style={{ marginBottom: "50px" }} scroll={{ x: "max-content" }} />
      </div>
    </>
  )
}

export default ShiftSummaryReport