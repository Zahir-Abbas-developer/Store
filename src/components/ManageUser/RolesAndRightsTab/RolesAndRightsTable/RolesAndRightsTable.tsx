import { Col, Dropdown, Input, Row, Button, Space, Table } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SearchIcon from "../../../../assets/images/OnBoarding/Search.svg";
import ActionIcon from "../../../../assets/icons/ShiftManger/action-icon.svg";
import Edit from "../../../../assets/icons/ManageUser/edit-icon.svg";
import ResetPassword from "../../../../assets/icons/ManageUser/reset-password.svg";
import "./RolesAndRightsTable.scss";
import EditRolesAndRights from "../EditRolesAndRights";
import {
  useGetUserRightsQuery,
  useUserRightsResetPasswordQuery,
} from "../../../../store/Slices/ManageUser";
import dayjs from "dayjs";

const RolesAndRights = (props: any) => {
  const { permissions, id, name, ManageUser } = props;
  console.log(id, "mjgEcyn12jXwchqJKVg9dAgrD49YBPS711vYUuBepFA=");

  const [skip, setSkip] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [isEditRole, setIsEditRole] = useState(false);
  const [tableRowRecord, setTableRowRecord] = useState<any>(null);
  const [type, setType] = useState("edit");

  const [rolesAndRightsTableData, setRolesAndRightsTableData] = useState([]);

  const handleAddRole = () => {
    setIsEditRole(true);
    setType("add");
  };
  const handleEditModal = () => {
    setIsEditRole(true);
    setType("edit");
  };
  const { isSuccess: resetToDefaultSuccess, data: firstApiData } = useUserRightsResetPasswordQuery(
    tableRowRecord?._id,
    { skip }
  );

  const paramsObj: any = {};
  if (searchName) paramsObj["search"] = searchName;
  const query = "&" + new URLSearchParams(paramsObj).toString();
  const { isError, isSuccess, isLoading, data, refetch } =
    useGetUserRightsQuery({ roleId: id, query },
    );
  if (firstApiData !== undefined && !skip) {
    refetch();
    setSkip(true);
  }

  function isNotEmpty(obj: any): boolean {
    return Object.keys(obj).length > 0;
  }

  const handleEditRolesAndRights = (formData: any) => {
    const RolesAndRightsData: any = [...rolesAndRightsTableData, formData];
    setRolesAndRightsTableData(RolesAndRightsData);
  };

  const ResetToDefaultSuccessHandler = () => {
    setSkip((prev) => !prev);
  };

  let UserRights: any;
  if (isSuccess) {
    UserRights = data;
  }

  const items = [
    {
      label: (
        <div
          className="d-flex align-center"
          style={{ gap: "18px", paddingBottom: "12px", paddingTop: "12px" }}
          onClick={ResetToDefaultSuccessHandler}
        >
          <img height={20} width={20} src={ResetPassword} alt="ResetPassword" />
          <span className="fs-14 fw-400 line-height-22 title-color">
            Reset To Default Settings
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
    {
      title: "Role Title",
      dataIndex: "name",
      key: "name",
      render: (_: any, text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {text.name}
        </span>
      ),
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (_: any, text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {text?.assignedUser?.firstName &&
            text?.assignedUser?.lastName &&
            text?.assignedUser?.firstName + " " + text?.assignedUser?.lastName}
          {text.assignedUser.clientName && text?.assignedUser?.clientName}
        </span>
      ),
    },
    {
      title: "Role Assigned By",
      dataIndex: "roleAssignedBy",
      key: "roleAssignedBy",
      render: (_: any, text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {text?.createdBy?.firstName + " " + text?.createdBy?.lastName}
        </span>
      ),
    },
    {
      title: "Assigned Date",
      dataIndex: "assignedDate",
      key: "assignedDate",
      render: (_: any, text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {dayjs(text?.createdAt).format("YYYY-MM-DD")}
        </span>
      ),
    },

    {
      title: "Actions",
      key: "action",
      render: (_: any, record: any) => (
        <div>
          {isNotEmpty(UserRights?.data?.result) && (
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
              trigger={["click"]}
              overlayClassName="distraction-alerts-dropdown"
              className="actionDropDown "
            >
              <Space key={uuidv4()} onClick={() => setTableRowRecord(record)}>
                <div className="border-color cursor-pointer">
                  <img
                    src={ActionIcon}
                    alt=""
                    onClick={() => setTableRowRecord(record)}
                  />
                </div>
              </Space>
            </Dropdown>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      {isEditRole && (
        <EditRolesAndRights
          handleEditRolesAndRights={handleEditRolesAndRights}
          setIsEditRole={setIsEditRole}
          isEditRole={isEditRole}
          tableRowRecord={tableRowRecord}
          rolesAndRightsTableData={rolesAndRightsTableData}
          permissions={permissions}
          id={id}
          ResetToDefaultSuccessHandler={ResetToDefaultSuccessHandler}
          name={name}
          ManageUser={ManageUser}
          setType={setType}
          type={type}
        />
      )}
      {!isEditRole && (
        <div className="manager-users-wrapper w-100">
          <div className="manager-confirmed-shift-filters bg-white border-radius-10 add-new-user-wrapper">
            <Row style={{ paddingBottom: "30px" }}>
              <Col
                xxl={{ span: 6 }}
                xl={{ span: 6 }}
                md={12}
                sm={12}
                xs={24}
                lg={24}
              >
                <Button type="primary" onClick={handleAddRole}>
                  Add Role
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
                      <img
                        src={SearchIcon}
                        alt="search icon"
                        className="icon"
                      />
                    }
                    value={searchName}
                    onChange={(value) => setSearchName(value.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Table
              columns={columns}
              dataSource={UserRights?.data?.result}
              loading={isLoading}
              scroll={{ x: "max-content" }}
              rowKey={(record: any) => record.key}
              className="booking-table-content"
            />
          </div>
        </div>
      )}
    </>
  );
};
export default RolesAndRights;
