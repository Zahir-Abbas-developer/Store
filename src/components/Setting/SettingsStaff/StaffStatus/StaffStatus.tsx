// import "../../../../sass/common.scss";
import { Button, Table, Space } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
import { useState } from "react";
import "./StaffStatus.scss";
import AddModal from "./AddModal";
import { ColumnsType } from "antd/es/table";
import editIcon from "../../../../assets/icons/edit-blue.svg";
import SwitchWrapper from "../../../../shared/SwitchWrapper/SwitchWrapper";
import { DataType } from "../../../../mock/StaffStatus";
import {  useGetStaffStatusQuery, useUpdateStaffStatusMutation } from "../../../../store/Slices/Setting/StaffSettings/StaffStatus";
import AppSnackbar from "../../../../utils/AppSnackbar";

function StaffStatus() {
  const [staffStatus, setStaffStatus] = useState<string>('');
  const { data, isLoading, isSuccess, isError } = useGetStaffStatusQuery({ refetchOnMountOrArgChange: true });
  const [updateStaffStatus] = useUpdateStaffStatusMutation();
  const [editModalFieldValues, setEditModalFieldValues] = useState({});
  const [switchStates, setSwitchStates] = useState<{ [id: string]: boolean }>({});



  let staffStatusData: any;
  if (isLoading) {
    staffStatusData = <p>Loading...</p>
  }
  else if (isSuccess) {
    staffStatusData = data
  }
  else if (isError) {
    staffStatusData = <p>Error...</p>
  }

  // console.log("staffStatusData =========> ", staffStatusData?.data?.statusTypes);

  const handleSwitchChange = async (record: any, checked: any) => {
    console.log("record checked", record, checked);
    setSwitchStates((prevSwitchStates: any) => ({
      ...prevSwitchStates,
      [record._id]: checked,
    }));

    const newPaylaod = {
      title: record?.title,
      enable: checked,
    }
    try {
      await updateStaffStatus({ id: record._id, payload: newPaylaod }).unwrap();
      AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information Updated successfully" });

    } catch (error: any) {
      
      setSwitchStates((prevSwitchStates: any) => ({
        ...prevSwitchStates,
        [record._id]: !checked,
      }));


      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }
  }


  const StaffStatusColumns: ColumnsType<DataType> = [
    {
      title: 'Sr. No.',
      dataIndex: '_id',
      key: '_id',
      render: (value: any, record: any, index: any) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Enable/Disable',
      dataIndex: 'enable',
      key: 'enable',
      render: (_:any, record:any) => (
        <SwitchWrapper
          name="Enable"
          // checked={record?.enable}
          onChange={(checked: any) => handleSwitchChange(record, checked)}
          checked={switchStates[record?._id]}
          defaultChecked={!!record?.enable}
          // onChange={(checked: any) => handleSwitchToggle(record.property, checked)}
        />),
    },
    {
      title: 'Action',
      dataIndex: 'edit',
      key: 'edit',
      render: (_:any,text:any) => (
        <Space
          onClick={() => { setStaffStatus('Edit'); setEditModalFieldValues(text) }}
        >
          <img src={editIcon} alt="edit" className="d-flex align-center cursor-pointer" height={24} width={24} />
        </Space>),
    }
  ];

  return (
    <div className='staff-status'>
      <div className="heading">
        <h1 className="fs-20 fw-600 m-0">Staff Status  </h1>
      </div>
      <Button className="add-visa-type-btn fs-14 fw-600 border-radius-10  d-flex justify-between align-items-center" onClick={() => {setStaffStatus('Add'); setEditModalFieldValues('')}}>
      <span className="fs-14 fw-600">Add Status</span> 
        <PlusCircleOutlined />
      </Button>
      <div>
        <Table
          className="common-setting-table"
          columns={StaffStatusColumns}
          dataSource={staffStatusData?.data?.statusTypes}
          locale={{ emptyText: !isLoading ? "No Data" : " " }}
          loading={isLoading}
          pagination={false}
          scroll={{ x: 768 }}
        />
      </div>
      <Button
        className="savebtn" type="primary">
        Save
      </Button>
      <AddModal staffStatus={staffStatus} setStaffStatus={setStaffStatus} editModalFieldValues={editModalFieldValues} setEditModalFieldValues={setEditModalFieldValues} />
    </div>

  );
}

export default StaffStatus;
