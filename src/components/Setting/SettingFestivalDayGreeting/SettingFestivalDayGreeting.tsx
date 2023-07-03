import { useState } from "react";
import { Button, Space, Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import "./SettingFestivalDayGreeting.scss";
import SwitchWrapper from "../../../shared/SwitchWrapper/SwitchWrapper";
import "../../../sass/common.scss";
import editIcon from "../../../assets/icons/edit-blue.svg";
import AddModal from "./AddModal";
import { DataType } from "../../../mock/FestivalDayGreeting";
import { useGetFestivalQuery, useUpdateFestivalMutation } from "../../../store/Slices/Setting/Festival";
import dayjs from "dayjs";
import AppSnackbar from "../../../utils/AppSnackbar";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import { renderDashboard } from "../../../utils/useRenderDashboard";
import { render } from "react-dom";


const SettingFestivalDayGreeting = () => {
  const [openFestivalDay, setOpenFestivalDay] = useState<string>('');
  const [switchStates, setSwitchStates] = useState<{ [id: string]: boolean }>({});
  const [editModalFieldValues, setEditModalFieldValues] = useState({});
  const { data, isLoading, isSuccess } = useGetFestivalQuery({ refetchOnMountOrArgChange: true });
  const [updateFestival] = useUpdateFestivalMutation();
  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

  let festivalData: any;
  if (isSuccess) {
    festivalData = data
  }

  const handleSwitchChange = async (record: any, checked: any) => {


    setSwitchStates((prevSwitchStates:any) => ({
      ...prevSwitchStates,
      [record._id]: checked,
    }));

    const newPaylaod = {
      festivalName: record?.festivalName,
      festivalDate: record?.festivalDate,
      template: record?.template,
      discription: record?.discription,
      enable: checked,
    }
    try {
      await updateFestival({ id: record._id, payload: newPaylaod }).unwrap();
      AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information Updated successfully" });

    } catch (error: any) { 
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });

      // If the API call fails, roll back the switch state
      setSwitchStates((prevSwitchStates:any) => ({
        ...prevSwitchStates,
        [record._id]: !checked,
      }));

    }

  }


  const FestivalDayColumns: ColumnsType<DataType> = [
    {
      title: 'Sr. No.',
      dataIndex: '_id',
      key: '_id',
      render: (value: any, record: any, index: any) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: 'Festival Name',
      dataIndex: 'festivalName',
      key: 'festivalName',
    },
    {
      title: 'Date',
      dataIndex: 'festivalDate',
      key: 'festivalDate',
      render: (festivalDate: string) =>
        <div>
          {dayjs(festivalDate).format('DD/MM/YYYY')}
        </div>
    },
    {
      title: 'Enable/Disable',
      dataIndex: 'enable',
      key: 'enable',
      render: (_: any, record: any) => (
        <SwitchWrapper
          name="Disable"
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
          onClick={() => { setOpenFestivalDay('Edit'); setEditModalFieldValues(text) }}
        >
          <img src={editIcon} alt="edit" className="d-flex align-center cursor-pointer" height={24} width={24} />
        </Space>),
    }
  ];

  return (

    <>
      <BreadCrumb breadCrumbItems={[
        {
          title: "Festival Days",
          path: "",
        },
        {
          title: "Dashboard",
          path: renderDashboard(role),
        },
        {
          title: "Settings",
          path: "/settings",
        }
      ]} />
    
    <div className='festival-day-reeting border-radius-8'>
      <div className="heading">
        <h1 className="fs-16 fw-600 m-0">Festival Day Greetings </h1>
      </div>
      <Button className="add-visa-type-btn fs-14 fw-600 border-radius-10 d-flex justify-between align-items-center" onClick={() => setOpenFestivalDay('Add')}>
        <span className=" fs-14 fw-600 border-radius-10 ">Add Festival</span>
        <PlusCircleOutlined />
      </Button>
      <div>
        <Table
          className="common-setting-table"
          scroll={{ x: 768 }}
          columns={FestivalDayColumns.filter((item: any) => item?.isDeleted !== true)}
          dataSource={festivalData?.data}
          locale={{ emptyText: !isLoading ? "No Data" : " " }}
          loading={isLoading}
          pagination={false}
        />
      </div>

      <AddModal openFestivalDay={openFestivalDay} setOpenFestivalDay={setOpenFestivalDay} editModalFieldValues={editModalFieldValues} setEditModalFieldValues={setEditModalFieldValues} />
    </div>
    </>
  )
}

export default SettingFestivalDayGreeting