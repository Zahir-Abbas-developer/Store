import { Dropdown, Space, MenuProps, Table } from "antd";

import dots from "../../../assets/icons/dots.png";
import editIcon from "../../../assets/icons/OnBoarding/edit.svg";
import deleteIcon from "../../../assets/icons/training/delete-icon.png";
import { MyNotesTableData } from "../../../mock/TrainingData/MyNotesTableData";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import { useState } from "react";
import AddEditModal from "./AddEditModal";
import { useDeleteNoteMutation, useGetMyNotesDataQuery } from "../../../store/Slices/Training";
import AppSnackbar from "../../../utils/AppSnackbar";
import dayjs from "dayjs";

type PropsType = {
  showAddModal: boolean;
  setShowAddModal: (value: boolean) => void;
  searchNotes:any;
  setsearchNotes:any;
  query:any;
};

const NotesTable = ({ showAddModal, setShowAddModal, searchNotes, setsearchNotes, query }: PropsType) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [activeRecord, setActiveRecord] = useState();

  const [isEditMode, setIsEditMode] = useState(false)

  

  // console.log("activeRecord =>", activeRecord)

  const handleDeleteSubmit = () => {
    setIsDeleteModal(false);
  };
  const handleCancelSubmit = () => {
    setIsDeleteModal(false);
  };




  const { data, isLoading, isError, isSuccess } = useGetMyNotesDataQuery({query:query})
  let getMyNotesData: any;
  if (isLoading) {
    getMyNotesData = <p>Loading...</p>
  }
  else if (isSuccess) {
    getMyNotesData = data
  }
  else if (isError) {
    getMyNotesData = <p>Error...</p>
  }
  // console.log("getMyNotesData =>>", getMyNotesData?.data?.result)
  const [deleteNote] = useDeleteNoteMutation()

  const handeleRecord = async() => {
    try {
      await deleteNote({  id:activeRecord }).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Sucessfull",
        message: "Note deleted successfully"
      });
      setIsDeleteModal(false);
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }
  }


  const items: MenuProps["items"] = [
    {
      label: (
        <div
          className="dropdown-items"
          onClick={() => {
            setShowAddModal(true);
            setIsEditMode(true)
          }}
        >
          <img src={editIcon} alt="edit" width={18} height={18} /><p className="title">Edit</p>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          className="dropdown-items"
          onClick={() => {
            setIsDeleteModal(true);
          }}
        >
          <img src={deleteIcon} alt="delete" width={16} height={18} />{" "}
          <p className="title">Delete</p>
        </div>
      ),
      key: "2",
    },
  ];
  const columns: any = [
    {
      title: "Sr.No",
      dataIndex: "_id",
      key:"_id",
      render: (value: any, record: any, index: any) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render:(_:any, text:any) => {
        return <span> {dayjs(text.date).format('DD-MM-YYYY')} </span>
      }
    },
    {
      title: "Actions",
      key: "action",
      render: (_:any, text:any) => (
        <span className="fs-12 fw-400 line-height-18 title-color">
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
            overlayClassName="unpublished-dropdown"
            className="actionDropDown"
          >
            <Space onClick={()=> setActiveRecord(text._id)}>
              <div className="border-color cursor-pointer">
                <img src={dots} alt="menu" />
              </div>
            </Space>
          </Dropdown>
        </span>
      ),
    },
  ];
  return (
    <>
      <Table
        dataSource={getMyNotesData?.data?.result}
        columns={columns}
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 7 }} 
      />
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle="Delete"
        cancelTitle="Cancel"
        title="Do you want to delete this Note"
        onSubmit={handeleRecord}
        onCancel={handleCancelSubmit}
      />
      <AddEditModal activeRecord={activeRecord} isEditMode={isEditMode} showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
    </>
  );
};

export default NotesTable;
