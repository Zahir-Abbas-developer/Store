import dayjs from "dayjs";
import { useState } from "react";
import { Input, Modal, Table } from "antd";
import CloseIcon from "../../../assets/icons/close-icon.svg";
import homeCheck from "../../../assets/icons/StaffAllocation/home-check.svg";
import UserOne from "../../../assets/images/staffAllocation/user-img.svg";
import deleteIcon from "../../../assets/icons/delete-rounded.svg";
import { ColumnsType } from "antd/es/table";
import searchIcon from "../../../assets/icons/search.svg";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import { useDeleteStaffMutation, useGetCareHomesQuery } from "../../../store/Slices/StaffAllocation";
import "./ModalsCommonStyles.scss";
import AppSnackbar from "../../../utils/AppSnackbar";
import { debouncedSearch } from "../../../utils/utils";

const ViewCarerHomeModal = (props: any) => {
  const { isViewCarerHomeModal, setIsViewCarerHomeModal, selectedRecord } =
    props;

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [pagination, setPagination] = useState({ limit: 5, page: 1 });
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleCancelSubmit = () => {
    setIsDeleteModal(false);
  };

  const debouncedResults: any = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchTerm);
  };

  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchTerm) paramsObj["search"] = searchTerm;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  //View Care Homes
  const { data: careHomes, isLoading }: any = useGetCareHomesQuery({
    id: selectedRecord?._id,
    pagination,
    query
  });

  //Delete Staff
  const [deleteStaff] = useDeleteStaffMutation();

  const handleDeleteSubmit = async () => {
    const payload: any = {
      staffId:[selectedRecord?.staffId]
    };
    const { data }: any = await deleteStaff({ id: selectedRow?.clientId, payload });
    if (data) {
      setIsDeleteModal(false);
      AppSnackbar({ type: "success", message: data?.message });
    } 
  };

  const ViewCarerColumnsData: ColumnsType<any> = [
    {
      title: "Sr #",
      dataIndex: "no",
      key: "no",
      render: (_: any, id: any, index: number) => (
        <span className="fs-14 fw-400 m-0 text-left line-height-22 title-color">
          {index < 10 ? `0${index + 1}` : index + 1}
        </span>
      ),
    },
    {
      title: "Care Home",
      dataIndex: "careHomeName",
      key: "careHomeName",
      render: (careHome: any) => (
        <span className="fs-14 fw-400 m-0 text-left line-height-22 title-color">
          {careHome}
        </span>
      ),
    },
    {
      title: "Allocated ON",
      dataIndex: "allocatedOn",
      key: "allocatedOn",
      render: (allocatedOn: any) => (
        <span className="fs-14 fw-400 m-0 text-left line-height-22 title-color">
          {dayjs(allocatedOn).format("DD-MM-YYYY")}
        </span>
      ),
    },
    {
      title: <div>Actions</div>,
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: (_, text) => (
        <div className="cursor-pointer">
          <img
            onClick={() => {setIsDeleteModal(true);setSelectedRow(text)}}
            src={deleteIcon}
            alt="delete"
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        centered
        title={""}
        open={isViewCarerHomeModal}
        onCancel={() => setIsViewCarerHomeModal(false)}
        wrapClassName="view-carer-home-modal"
        footer={false}
        closeIcon={<img src={CloseIcon} alt="" />}
      >
        <div
          className="view-carer-home-details d-flex align-center"
          style={{ gap: "10px" }}
        >
          <div className="carer-profile-thumb">
            <img src={UserOne} alt="user profile" />
          </div>
          <div className="d-flex flex-column">
            <span className="fs-14 fw-600">{selectedRecord?.careerName}</span>
            <div className="d-flex align-center" style={{ gap: "5px" }}>
              <img src={homeCheck} alt="" />
              <span style={{ fontSize: "9px" }}>
                {careHomes?.data?.result?.length} Care homes Allocated
              </span>
            </div>
          </div>
        </div>
        <div className="modal-search">
          <Input
            className="search-input"
            placeholder="Search"
            onChange={debouncedResults}
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
        </div>
        <div className="common-staff-allocation-table-wrapper">
          <Table
            loading={isLoading}
            className="common-staff-allocation-table"
            columns={ViewCarerColumnsData}
            dataSource={careHomes?.data?.result}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: careHomes?.data?.NoofCareHomes,
              onChange: (page: number, limit: number) => setPagination({ page, limit }),
            }}
            scroll={{ x: "max-content", scrollToFirstRowOnChange: true }}
          />
        </div>
      </Modal>
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle="Yes, Remove"
        cancelTitle="Cancel"
        title="Are you sure you want to cancel this record?"
        onSubmit={handleDeleteSubmit}
        onCancel={handleCancelSubmit}
      />
    </>
  );
};

export default ViewCarerHomeModal;
