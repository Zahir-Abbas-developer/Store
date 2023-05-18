import { useState } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { Button, Col, Dropdown, Input, Row, Space, Switch, Table } from "antd";

import AddNewUser from "../AddNewUserModal/AddNewUserModal";
import EditNewUserModal from "../EditNewUserModal/EditNewUserModal";
import BirthDayModal from "../../../shared/BirthDayModal/BirthDayModal";
import { useManageUserResetPasswordMutation, } from "../../../store/Slices/ManageUser";

import SearchIcon from "../../../assets/images/OnBoarding/Search.svg";
import ActionIcon from "../../../assets/icons/ShiftManger/action-icon.svg";
import Edit from "../../../assets/icons/ManageUser/edit-icon.svg";
import ResetPassword from "../../../assets/icons/ManageUser/reset-password.svg";
import Reset from "../../../assets/icons/ManageUser/reset-modal-icon.svg";
import "./ManageUsersTable.scss";
import "../AddNewUserModal/AddNewModal.scss";

const ManageUsersTable = (props: any) => {
  const {
    name,
    ManageUser,
    isLoading,
    searchName,
    setSearchName,
    pagination,
    setPagination,
  } = props;
  //states
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddNewUserModalOpen, setIsAddNewUserModalOpen] = useState(false);
  const [selectedTableData, setSelectedRowData] = useState<any>("");
  const [manageUsersTableData, setManageUsersTableData] = useState([]);

  const handleResetModal = () => setIsOpenModal(true);
  const handleEditModal = () => setIsEditModalOpen(true);
  const handleItemClick = (record: any) => setSelectedRowData(record);


  function isNotEmpty(obj: any): boolean {
    return Object.keys(obj).length > 0;
  }
  const handleModalFormSubmit = (formData: any) => {
    const RolesAndRightsData: any = [...manageUsersTableData, formData];
    setManageUsersTableData(RolesAndRightsData);
  };


  const items = [
    {
      label: (
        <div
          className="d-flex align-center"
          style={{ gap: "18px", paddingBottom: "12px", paddingTop: "12px" }}
        >
          <img src={ResetPassword} height={20} width={20} alt="ResetPassword" />
          <span
            className="fs-14 fw-400 line-height-22 title-color"
            onClick={handleResetModal}
          >
            Reset Password
          </span>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          className="d-flex align-center"
          style={{ gap: "18px", paddingBottom: "12px" }}
        >
          <img height={20} width={20} src={Edit} alt="Edit" />
          <span
            className="fs-14 fw-400 line-height-22 title-color"
            onClick={handleEditModal}
          >
            Edit
          </span>
        </div>
      ),
      key: "2",
    },
  ];

  const columns: any = [
    // {
    //   title: "Sr #",
    //   dataIndex: "_id",
    //   key: "_id",
    //   render: (_: any, text: any) => (
    //     <span className="fs-14 fw-400 m-0 line-height-22 title-color">
    //       {text?._id}
    //     </span>
    //   ),
    // },
    {
      title: "Sr #",
      dataIndex: "sNo",
      key: "sNo",
      render: (text: any, record: any, index: any) => index + 1,
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {text?.firstName &&
            text?.lastName &&
            text?.firstName + " " + text?.lastName}
          {text?.clientName && text?.clientName}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_: any, text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {text?.email}
        </span>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (_: any, text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {dayjs(text?.createdAt).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "Reset Password",
      dataIndex: "resetPassword",
      key: "resetPassword",
      render: () => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          Reset
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, text: any) => (
        <Switch
          checked={text?.status === "active"}
          className="switch-manage-user"
        />
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: any) => (
        <div>
          {isNotEmpty(ManageUser?.data?.result) && (
            <Dropdown
              menu={{
                items: items.map((item: any) => ({
                  ...item,
                  onClick: () => handleItemClick(record),
                })),
              }}
              placement="bottomRight"
              trigger={["click"]}
              overlayClassName="distraction-alerts-dropdown"
              className="actionDropDown "
            >
              <Space key={uuidv4()}>
                <div className="border-color cursor-pointer">
                  <img src={ActionIcon} alt="" />
                </div>
              </Space>
            </Dropdown>
          )}
        </div>
      ),
    },
  ];

  const [ManageUserResetPassword] = useManageUserResetPasswordMutation();

  const handleResetPassword = () => {
    const email = { email: selectedTableData?.email };
    ManageUserResetPassword({ email: email });
    // setIsOpenModal(false)
    setTimeout(function () {
      setIsOpenModal(false)
    }, 200);

  };

  return (
    <>
      <AddNewUser
        manageUsersTableData={manageUsersTableData}
        onSubmit={handleModalFormSubmit}
        isAddNewUserModalOpen={isAddNewUserModalOpen}
        setIsAddNewUserModalOpen={setIsAddNewUserModalOpen}
        roleType={name}
      />
      <EditNewUserModal
        isEditModalOpen={isEditModalOpen}
        selectedTableData={selectedTableData}
        setIsEditModalOpen={setIsEditModalOpen}
        roleType={name}
      />
      <BirthDayModal
        iconImage={Reset}
        isModalOpen={isModalOpen}
        handleSubmit={handleResetPassword}
        setIsOpenModal={setIsOpenModal}
        birthDayMessage="Are you sure you want to reset the password of account?"
        wishButtonText="Reset"
        backgroundColor="#F7B923"
      />

      <div className="manager-users-wrapper w-100">
        <div className="manager-confirmed-shift-filters bg-white border-radius-10 add-new-user-wrapper">

          <Row style={{ paddingBottom: "30px" }} className="d-flex align-center">
            <Col
              xxl={{ span: 6 }}
              xl={{ span: 6 }}
              md={12}
              sm={12}
              xs={24}
              lg={24}

            >
              <Button
                type="primary"
                onClick={() => {
                  setIsAddNewUserModalOpen(true);
                }}
              >
                Add User
              </Button>
            </Col>
            <Col
              xxl={{ span: 6, offset: 12 }}
              xl={{ span: 6, offset: 12 }}
              md={12}
              xs={24}
              sm={12}
              lg={24}
            >
              <div className="input-search-wrapper">
                <Input
                  placeholder="search"
                  prefix={
                    <img src={SearchIcon} alt="search icon" className="icon" />
                  }
                  value={searchName}
                  onChange={(value) => setSearchName(value.target.value)}
                />
              </div>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={ManageUser?.data?.result}
            rowKey={(record: any) => record.key}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: ManageUser?.data?.metadata?.total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }}
            loading={isLoading}
            scroll={{ x: "max-content" }}
            className="booking-table-content"
          />
        </div>
      </div>
    </>
  );
};
export default ManageUsersTable;
