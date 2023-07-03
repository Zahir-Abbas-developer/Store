// import "../../../../sass/common.scss";
import { Button, Table, Space } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
import { useState } from "react";
import "./VisaManagement.scss";
import AddModal from "./AddModal";
import { ColumnsType } from "antd/es/table";
import editIcon from "../../../../assets/icons/edit-blue.svg";
import SwitchWrapper from "../../../../shared/SwitchWrapper/SwitchWrapper";
import { DataType } from "../../../../mock/VisaManagement";
import { useGetVisaManagementQuery, useUpdateVisaManagementMutation } from "../../../../store/Slices/Setting/StaffSettings/VisaManagement";
import AppSnackbar from "../../../../utils/AppSnackbar";

function VisaManagement() {
  const [addEditVisa, setAddEditVisa] = useState<string>('');
  const [studentVisaApplicable, setStudentVisaApplicable] = useState<boolean>(false);
  const [switchStates, setSwitchStates] = useState<{ [id: string]: boolean }>({});

  const [pagination, setPagination] = useState({ limit: 999, page: 1 });
  const { data, isLoading, isSuccess, isError } = useGetVisaManagementQuery({ refetchOnMountOrArgChange: true, pagination });
  const [editModalFieldValues, setEditModalFieldValues] = useState({});
  const [updateVisaManagement] = useUpdateVisaManagementMutation();


  let visaManagementData: any;
  if (isLoading) {
    visaManagementData = <p>Loading...</p>
  }
  else if (isSuccess) {
    visaManagementData = data
  }
  else if (isError) {
    visaManagementData = <p>Error...</p>
  }

  const handleSwitchChange = async (record: any, checked: any) => {

    setSwitchStates((prevSwitchStates: any) => ({
      ...prevSwitchStates,
      [record._id]: checked,
    }));


    const newPaylaod = {
      studentVisaApplicable: studentVisaApplicable,
      title: record?.title,
      enable: checked,
      id: record?._id
    }
    try {
      await updateVisaManagement({ payload: newPaylaod }).unwrap();
      AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information Updated successfully" });

    } catch (error: any) {

      // If the API call fails, roll back the switch state
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


  const CareHomeColumns: ColumnsType<DataType> = [
    {
      title: 'Sr. No.',
      dataIndex: '_id',
      key: '_id',
      render: (value: any, record: any, index: any) => {
        return <span>{(index + pagination?.limit * pagination?.page) - pagination?.limit + 1}</span>;
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
      render: (_: any, record: any) => (
        <SwitchWrapper
          name="Enable"
          checked={switchStates[record._id]}
          defaultChecked={!!record.enable}
          onChange={(checked: any) => handleSwitchChange(record, checked)}
          disable={isLoading} // disable the switch while the API call is in progress

        />),
    },
    {
      title: 'Action',
      dataIndex: 'edit',
      key: 'edit',
      render: (_: any, text: any) => (
        <Space
          onClick={() => { setAddEditVisa('Edit'); setEditModalFieldValues(text) }}
        >
          <img src={editIcon} alt="edit" className="d-flex align-center cursor-pointer" height={24} width={24} />
        </Space>),
    }
  ];

  return (
    <div className='visa-management'>
      <div className="heading">
        <h1 className="fs-20 fw-600 m-0 ">Student Visa </h1>
        <div className="d-flex align-items-center">
          <p className="fs-16 fw-600 m-0">Is student visa applicable </p>
          <SwitchWrapper
            name="studentvisaapplicable"
            checked={studentVisaApplicable}
            onChange={(checked: any) => setStudentVisaApplicable(checked)}
          />
        </div>
        <h1 className="fs-16 fw-600 m-0">Vista Type Manager</h1>
      </div>
      <Button className="add-visa-type-btn fs-14 fw-600 border-radius-10  d-flex justify-between align-items-center" onClick={() => setAddEditVisa('Add')}>
        <span className="fs-14 fw-600">Add Visa Type</span>
        <PlusCircleOutlined />
      </Button>

      <div>
        <Table
          className="common-setting-table"
          scroll={{ x: 768 }}
          columns={CareHomeColumns}
          dataSource={visaManagementData?.data?.visaTypes}
          locale={{ emptyText: !isLoading ? "No Data" : " " }}
          loading={isLoading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: visaManagementData?.data?.metadata?.total,
            onChange: (page, limit) => setPagination({ page, limit }),
          }}
        />
      </div>

      <AddModal addEditVisa={addEditVisa} setAddEditVisa={setAddEditVisa} editModalFieldValues={editModalFieldValues} setEditModalFieldValues={setEditModalFieldValues} />
    </div>

  );
}

export default VisaManagement;
