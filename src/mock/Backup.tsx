import type { ColumnsType } from "antd/es/table";
const renderColor: any = {
  Complete: {
    color: "#09AF42",
    backgroundColor: "#E4FFF6",
  },
  Interrupted: {
    color: "#F21162",
    backgroundColor: "#FFF2F8",
  },
  "In Progress": {
    color: "#F2AC03",
    backgroundColor: "#FFF7E4",
  },
};

interface DataType {
  no: string;
  backupFile: string;
  backupType: string;
  dateTime: string;
  path: any;
  status?: any;
  tickets: any;
  notifications: any;
}

export const BackupData: DataType[] = [
  {
    no: "01",
    backupFile: "SystemBackup_3826",
    backupType: "Monthly",
    dateTime: "30.12.2021; 3:00 am",
    path: "/opt/backkup/system",
    tickets: "Backup-54786",
    notifications: "Active",
    status: "Complete",
  },
  {
    no: "02",
    backupFile: "SystemBackup_3826",
    backupType: "Monthly",
    dateTime: "30.12.2021; 3:00 am",
    path: "/opt/backkup/system",
    tickets: "Backup-54786",
    notifications: "Active",
    status: "Interrupted",
  },
  {
    no: "03",
    backupFile: "SystemBackup_3826",
    backupType: "Monthly",
    dateTime: "30.12.2021; 3:00 am",
    path: "/opt/backkup/system",
    tickets: "Backup-54786",
    notifications: "Active",
    status: "In Progress",
  },
];

export const ColumnsData: ColumnsType<DataType> = [
  {
    title: "Sr #",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "Backup file",
    dataIndex: "backupFile",
    key: "backupFile",
  },
  {
    title: "Backup Type",
    dataIndex: "backupType",
    key: "backupType",
  },
  {
    title: "Created Date & Time",
    dataIndex: "dateTime",
    key: "dateTime",
  },
  {
    title: "Full Path",
    dataIndex: "path",
    key: "path",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <button
        style={{
          color: renderColor[status].color,
          backgroundColor: renderColor[status].backgroundColor,
        }}
      >
        {status}
      </button>
    ),
  },
  {
    title: "Support Tickets",
    dataIndex: "tickets",
    key: "tickets",
  },
  {
    title: "Notifications",
    dataIndex: "notifications",
    key: "notifications",
  },
];