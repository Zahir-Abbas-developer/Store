import { useState } from "react";

// Ant Components
import { ColumnsType } from "antd/es/table";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Table, Input } from "antd";

// RTK Hooks
import { useGetBankHolidayQuery } from "../../../store/Slices/Setting/BankHoliday";
import { useDeleteBankHolidayMutation } from "../../../store/Slices/Setting/BankHoliday";

// Components
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import AddModal from "./AddModal";

// Utils and Pakages
import dayjs from "dayjs";
import AppSnackbar from "../../../utils/AppSnackbar";
import { debouncedSearch } from "../../../utils/utils";
import { renderDashboard } from "../../../utils/useRenderDashboard";

// Mock Data
import { DataType } from "../../../mock/BankHolidays";

// Assets
import searchIcon from "../../../assets/icons/search.svg";
import editIcon from "../../../assets/icons/edit-blue.svg";
import actionImg from "../../../assets/icons/Setting/actionImg.svg";
import deleteIcon from "../../../assets/icons/delete-icon-outlined.svg";
import coloredCopyIcon from "../../../assets/icons/Report/colored-copy.png";
import coloredCsvIcon from "../../../assets/icons/Report/colored-csv.png";
import coloredXlsIcon from "../../../assets/icons/Report/colored-xls.png";

// SCSS
import "./SettingBankHolidays.scss";


const SettingBankHolidays = () => {

  const [searchName, setSearchName] = useState<string>("");
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [bankHolidayId, setBankHolidayId] = useState<string>("");
  const [editModalFieldValues, setEditModalFieldValues] = useState({});
  const [openBankHolidayModal, setOpenBankHolidayModal] = useState<string>("");

  // ==================== RTK Hooks ====================
  const [deleteBankHoliday] = useDeleteBankHolidayMutation();


  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");


  // ==================== query parameters of search and filter ====================
  const paramsObj: any = {};
  if (searchName) paramsObj["name"] = searchName;
  const query = "&" + new URLSearchParams(paramsObj).toString();


  // ==================== Integration ====================
  const { data, isLoading, isSuccess } = useGetBankHolidayQuery({ refetchOnMountOrArgChange: true, query, pagination });

  let bankHolidayData: any;
  if (isSuccess) {
    bankHolidayData = data;
  }


  // ==================== Bank Holiday Single Record Deletion ====================
  const handleDeleteSubmit = async () => {
    try {
      await deleteBankHoliday(bankHolidayId).unwrap();
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


  // ==================== Bank Holiday Table Action Items ====================
  const items: MenuProps["items"] = [
    {
      label: (
        <Space onClick={() => setOpenBankHolidayModal("Edit")}>
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


  // ==================== Bank Holiday Table Columns ====================
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
      title: "Holiday Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Holiday Date",
      dataIndex: "date",
      align: "center",
      render: (date: any) => <div>{dayjs(date).format("DD/MM/YYYY")}</div>,
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, text: any) => (
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
                  setBankHolidayId(text._id);
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


  const handleResetFormValues = () => {
    setIsDeleteModal(false);
    setEditModalFieldValues({})
  }



  return (
    <>
      <BreadCrumb breadCrumbItems={[
        {
          title: "Bank Holidays",
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

      <div className="setting-Bank-Holiday">
        <div className="record-table  border-radius-10">
          
          <div className="header">
            <Button
              className="add-job-role-btn fs-14 fw-600 border-radius-10 d-flex justify-center align-items-center"
              onClick={() => {
                setEditModalFieldValues({});
                setOpenBankHolidayModal("Add");
              }}>
              
              Add Bank Holiday
              <PlusCircleOutlined />
            </Button>
          </div>

          <div className="filter-bar">
            <Space className="input-export-icons input-search-wrapper" size={[30, 10]}>
              <Input className="search-input" placeholder="Search by holiday name" onChange={(event: any) =>
                debouncedSearch(event.target.value, setSearchName)
              }
                prefix={
                  <img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: "0.623rem" }} />
                }
              />
              <Space size={[25, 0]}>
                <img src={coloredCopyIcon} alt="csv" className="img-hover" />
                <img src={coloredCsvIcon} alt="csv" className="img-hover" />
                <img src={coloredXlsIcon} alt="csv" className="img-hover" />
              </Space>
            </Space>
          </div>

          
          {/* ================ Bank Holiday Table ================ */}
          <Table
            scroll={{ x: 768 }}
            columns={columns}
            dataSource={bankHolidayData?.data?.result}
            locale={{ emptyText: !isLoading ? "No Data" : " " }}
            loading={isLoading}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: bankHolidayData?.data?.metadata?.total,
              onChange: (page, limit) => setPagination({ limit, page }),
            }}
            className="common-setting-table"
          />

        </div>
      </div>

      {/* ================ Add Bank Holiday Modal ================ */}
      <AddModal
        openBankHolidayModal={openBankHolidayModal}
        setOpenBankHolidayModal={setOpenBankHolidayModal}
        editModalFieldValues={editModalFieldValues}
        setEditModalFieldValues={setEditModalFieldValues}
      />

      {/* ================ Bank Holiday Delete Modal ================ */}
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle="Yes"
        cancelTitle="No"
        title="Do you want to discard this Details?"
        onSubmit={handleDeleteSubmit}
        onCancel={() => setIsDeleteModal(false)}
      />

    </>
  );
};

export default SettingBankHolidays;
