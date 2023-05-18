import { Button, Dropdown, MenuProps, Space, Table, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import actionImg from "../../../assets/icons/Setting/actionImg.svg";
import editIcon from "../../../assets/icons/edit-blue.svg";
import deleteIcon from "../../../assets/icons/delete-icon-outlined.svg";
import "./SettingDbsConfiguration.scss";
import "../../../sass/common.scss";
import { DataType } from "../../../mock/DbsConfiguration";
import AddModal from "./AddModal";
import searchIcon from "../../../assets/icons/search.svg";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import {
  useDeleteDbsConfigurationMutation,
  useGetDbsConfigurationQuery,
} from "../../../store/Slices/Setting/DbsConfiguration";
import { debouncedSearch } from "../../../utils/utils";
import AppSnackbar from "../../../utils/AppSnackbar";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import { renderDashboard } from "../../../utils/useRenderDashboard";

const SettingDbsConfiguration = () => {
  const [openDbsConfigurationModal, setOpenDbsConfigurationModal] =
    useState<string>("");
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });

  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>("");
  const [deleteDbsConfiguration] = useDeleteDbsConfigurationMutation();
  const [editModalFieldValues, setEditModalFieldValues] = useState({});
  const [dbsConfiguration, setDbsConfiguration] = useState<string>("");
  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");


  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchName) paramsObj["websiteName"] = searchName;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  // Integration
  const { data, isLoading, isSuccess } = useGetDbsConfigurationQuery({
    refetchOnMountOrArgChange: true,
    query,
    pagination,
  });


  let dbsConfigurationData: any;
  if (isSuccess) {
    dbsConfigurationData = data;
  }

  const handleDeleteSubmit = async () => {
    try {
      await deleteDbsConfiguration(dbsConfiguration).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Successfully Deleted!",
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
  const handleCancelSubmit = () => {
    setIsDeleteModal(false);
  };


  
  const handleResetFormValues = () => {
    setIsDeleteModal(false);
    setEditModalFieldValues({})
  }

  const items: MenuProps["items"] = [
    {
      label: (
        <Space onClick={() => setOpenDbsConfigurationModal("Edit")}>
          <img
            src={editIcon}
            alt="edit"
            className="d-flex align-center"
            height={18}
            width={16}
          />
          <span className="m-0">Edit Details</span>
        </Space>
      ),
      key: "1",
    },
    {
      label: (
        <Space onClick={() => setIsDeleteModal(true)}>
          <img
            src={deleteIcon}
            className="d-flex align-center"
            alt="delete"
            height={18}
            width={16}
          />
          <span>Delete</span>
        </Space>
      ),
      key: "3",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Sr. No.",
      dataIndex: "_id",
      key: "_id",
      render: (value: any, record: any, index: any) => {
        return <span>{(index + pagination?.limit * pagination?.page) - pagination?.limit + 1}</span>;
      },
    },
    {
      title: "Website Name",
      dataIndex: "websiteName",
      align: "center",
    },
    {
      title: "Website Link",
      dataIndex: "websiteLink",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_: any, text: any) => (
        <div>
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            trigger={["click"]}
            overlayClassName="actionDropDownBlocking my-dropdown-blocking"
            overlayStyle={{ borderRadius: "4px" }}
            onOpenChange={(visible) => {
              if (!visible) {
                // Do something when the dropdown is closed
                handleResetFormValues()
              }
            }}
          >
            <Space>
              <div
                className="border-color cursor-pointer"
                onClick={() => {
                  setDbsConfiguration(text._id);
                  setEditModalFieldValues(text);
                }}
              >
                <img
                  src={actionImg}
                  alt="ElpiseIcon"
                  style={{ marginLeft: "14px" }}
                />
              </div>
            </Space>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={[
        {
          title: "DBS Configuration",
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

      <div className="setting-dbs-configuration">
        <div className="record-table  border-radius-10">
          <h1 className="fs-16 fw-600"> Add DBS Configuration Links </h1>
          <div className="header">
            <Button
              className="add-job-role-btn fs-14 fw-600 border-radius-10  d-flex justify-center align-items-center"
              onClick={() => { setEditModalFieldValues({}); setOpenDbsConfigurationModal("Add") }}
            >
              Add DBS Configuration Links
              <PlusCircleOutlined />
            </Button>
          </div>
          <div className="filter-bar input-search-wrapper">
            <Space className="input-export-icons" size={[30, 10]}>
              <Input
                className="search-input"
                placeholder="Search by website name"
                onChange={(event: any) =>
                  debouncedSearch(event.target.value, setSearchName)
                }
                prefix={
                  <img
                    src={searchIcon}
                    alt="searchIcon"
                    width={24}
                    height={24}
                    style={{ marginRight: "0.623rem" }}
                  />
                }
              />
            </Space>
          </div>
          <Table
            scroll={{ x: 768 }}
            columns={columns}
            dataSource={dbsConfigurationData?.data?.result}
            locale={{ emptyText: !isLoading ? "No Data" : " " }}
            loading={isLoading}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: dbsConfigurationData?.data?.metadata?.total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }}
            className="common-setting-table"
          />
        </div>
      </div>
      <AddModal
        openDbsConfigurationModal={openDbsConfigurationModal}
        setOpenDbsConfigurationModal={setOpenDbsConfigurationModal}
        editModalFieldValues={editModalFieldValues}
        setEditModalFieldValues={setEditModalFieldValues}
      />
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle="Yes"
        cancelTitle="No"
        title="Do you want to discard this ?"
        onSubmit={handleDeleteSubmit}
        onCancel={handleCancelSubmit}
      />
    </>
  );
};

export default SettingDbsConfiguration;
