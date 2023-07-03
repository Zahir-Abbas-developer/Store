import type { ColumnsType } from "antd/es/table";

interface DataType {
  no: string;
  name: string;
  eventName: string;
  eventTime: string;
  ipAddress: any;
  accountType: any;
  status: any;
}

export const LogsData: DataType[] = [
  {
    no: '01',
  name: 'Azeem Aslam',
  eventName: 'Change Password',
  eventTime:'02/04/2022',
  ipAddress: '17.172.168.10',
  accountType: 'Admin',
  status: 'Active',
  },
  {
    no: '02',
    name: 'Azeem Aslam',
    eventName: 'Change Password',
    eventTime:'02/04/2022',
    ipAddress: '17.172.168.10',
    accountType: 'System Admin',
    status: 'Active',
  },
  {
    no: '03',
    name: 'Azeem Aslam',
    eventName: 'Change Password',
    eventTime:'02/04/2022',
    ipAddress: '17.172.168.10',
    accountType: 'Carer',
    status: 'Active',
  },
];

export const ColumnsData: ColumnsType<DataType> = [
  {
    title: "Sr #",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Event Name",
    dataIndex: "eventName",
    key: "eventName",
  },
  {
    title: "Event Time",
    dataIndex: "eventTime",
    key: "eventTime",
  },
  {
    title: "IP Address",
    dataIndex: "ipAddress",
    key: "ipAddress",
  },
  {
    title: "Account Type",
    dataIndex: "accountType",
    key: "accountType",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];