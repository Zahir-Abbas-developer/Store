import { useState } from "react";
import { Button, Dropdown, Input, MenuProps, Table } from "antd";
import SelectWrapper from "../../shared/SelectWrapper/SelectWrapper";
import ActionIcon from "../../assets/icons/ShiftManger/action-icon.svg";
import SearchIcon from "../../assets/images/OnBoarding/Search.svg";
import ViewIcon from "../../assets/icons/view-icon.svg";
import DeleteIcon from "../../assets/icons/delete-icon-outlined.svg";
import EditIcon from "../../assets/icons/edit-blue.svg";
import { ColumnsType } from "antd/es/table";
import DeleteModal from "../../shared/DeleteModal/DeleteModal";
import AddAdminUserModal from "./AddAdminUser/AddAdminUserModal";
import ViewUserDetailsModal from "./ViewUserDetails/ViewUserDetailsModal";
import { useDeleteClientUserMutation, useGetClientUserQuery } from "../../store/Slices/UserManagement";
import { useGetShiftDepartmentQuery } from "../../store/Slices/ClientShiftManage";
import "./ClientUserManagement.scss";
import { debouncedSearch } from "../../utils/utils";
import dayjs from "dayjs";
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";
import AppSnackbar from "../../utils/AppSnackbar";

const ClientUserManagement = () => {
  const [userData, setUserData] = useState<any>({});
  const [actionType, setActionType] = useState("add");
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState<boolean>(false);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [viewUserDetailsModal, setViewUserDetailsModal] = useState<boolean>(false);
  const [userSearch, setUserSearch] = useState<string>("");
  const [userDepartmentFilter, setUserDepartmentFilter] = useState("");
  const { data: getDepartmentValue } = useGetShiftDepartmentQuery({});
  const [deleteUser] = useDeleteClientUserMutation({});
  const { data: getUsers, isLoading } = useGetClientUserQuery({ department: userDepartmentFilter, search: userSearch, page: pagination });
  const departmentListOptions = getDepartmentValue?.data?.map((userTypeDetails: any) => {
    return { value: userTypeDetails?._id, label: userTypeDetails?.name };
  });

  const handleUserSubmit = async () => {
    try {
      await deleteUser(userData?._id).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Deleted!",
        message: "Information deleted successfully",
      });
      setIsDeleteModal(false);
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }
  };

  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setUserSearch);
  };

  const breadCrumbItems = [
    {
      title: "User Management",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/client-dashboard",
    },
  ];

  const items: MenuProps["items"] | undefined = [
    {
      label: (
        <div
          className="d-flex align-center"
          style={{ gap: "18px", padding: "12px" }}
          onClick={() => {
            setAddUserModalOpen(true);
            setActionType("edit");
          }}
        >
          <img width={24} src={EditIcon} alt="editStaff" />
          <span className="fs-14 fw-400 line-height-22 title-color">Edit</span>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div className="d-flex align-center" style={{ gap: "18px", padding: "0 12px 12px 12px" }} onClick={() => setViewUserDetailsModal(true)}>
          <img width={24} src={ViewIcon} alt="AllocateStaff" />
          <span className="fs-14 fw-400 line-height-22 title-color">View Detail</span>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div className="d-flex align-center" style={{ gap: "18px", padding: "0 12px 12px 12px" }} onClick={() => setIsDeleteModal(true)}>
          <img width={24} src={DeleteIcon} alt="ModifyStaff" />
          <span className="fs-14 fw-400 line-height-22 title-color">Delete</span>
        </div>
      ),
      key: "3",
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: "Sr #",
      dataIndex: "no",
      key: "no",
      render: (_: any, data: any, index: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{index < 9 ? `0${index + 1}` : index + 1}</span>,
    },
    {
      title: "Name",
      dataIndex: "",
      key: "",
      render: (text: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{`${text?.firstName} ${text?.lastName}`}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{text}</span>,
    },
    {
      title: "User Type",
      dataIndex: "type",
      key: "type",
      render: (text: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{text}</span>,
    },
    {
      title: "Date of joining",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{dayjs(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, data: any) => (
        <div>
          <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]} overlayClassName="distraction-alerts-dropdown" className="actionDropDown">
            <div className="border-color cursor-pointer" onClick={() => setUserData(data)}>
              <img src={ActionIcon} alt="" />
            </div>
          </Dropdown>
        </div>
      ),
    },
  ];


  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="client-user-management-wrapper">
        <div className="client-user-wrap bg-white">
          <Button
            type="primary"
            onClick={() => {
              setAddUserModalOpen(true);
              setActionType("add");
              setUserData({});
            }}
          >
            Add Admin User
          </Button>
          <div className="client-user-select">
            <SelectWrapper name="department" options={departmentListOptions} label="Department" required={false} onChange={(e: any) => setUserDepartmentFilter(e)} placeHolder="All" />
          </div>
        </div>
        <div className="input-search-wrapper">
          <Input
            style={{ margin: "30px 0 10px 0", maxWidth: "350px", float: "right" }}
            placeholder="search"
            prefix={<img src={SearchIcon} alt="search icon" className="icon" />}
            onChange={debouncedResults}
          />
        </div>
        <div className="client-user-manangement-table">
          <Table
            columns={columns}
            dataSource={getUsers?.data?.result}
            loading={isLoading}
            className="client-user-manangement-table-content"
            scroll={{ x: "max-content" }}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: getUsers?.data?.metadata?.total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }}
          />
        </div>
        <DeleteModal
          setDeleteModal={setIsDeleteModal}
          deleteModal={isDeleteModal}
          submitTitle="Delete"
          cancelTitle="Cancel"
          title="Do you want to delete this user"
          onSubmit={handleUserSubmit}
          onCancel={() => setIsDeleteModal(false)}
        />
        <AddAdminUserModal setAddUserModalOpen={setAddUserModalOpen} addUserModalOpen={addUserModalOpen} userData={userData} actionType={actionType} setActionType={setActionType} setUserData={setUserData} />
        <ViewUserDetailsModal setViewUserDetailsModal={setViewUserDetailsModal} viewUserDetailsModal={viewUserDetailsModal} userData={userData} />
      </div>
    </>
  );
};

export default ClientUserManagement;
