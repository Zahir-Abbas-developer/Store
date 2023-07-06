import dayjs from "dayjs";
import { useState } from "react";
import { Button, Input, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import CloseIcon from "../../../assets/icons/close-icon.svg";
import { CheckboxValueType } from "antd/es/checkbox/Group";

import searchIcon from "../../../assets/icons/search.svg";
import deleteIcon from "../../../assets/icons/delete-rounded.svg";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import {
  useAllocateCarersMutation,
  useDeleteStaffMutation,
  useGetCareHomesQuery,
} from "../../../store/Slices/StaffAllocation";
import AppSnackbar from "../../../utils/AppSnackbar";
import "./ModalsCommonStyles.scss";
import { debouncedSearch } from "../../../utils/utils";

const AllocateCarerModal = (props: any) => {
  const {
    isAllocateCarerModal,
    setIsAllocateCarerModal,
    careHomeOptions,
    selectedRecord,
    defaultId
  } = props;

  const [clientNameCheckedList, setClientNameCheckedList] = useState<any>(null);
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

  //Allocate Carer
  const [allocateCare, { isLoading: loading }] = useAllocateCarersMutation();

  const handleAllocate = async () => {
    const clientNames = clientNameCheckedList.map((item: any) => item.value)
    const payload = {
      clientId: [...clientNames, defaultId],
      staffId: [selectedRecord?._id],
    };
    const { data }: any = await allocateCare(payload);
    if (data) {
      setIsAllocateCarerModal(loading);
      AppSnackbar({ type: "success", message: data?.message });
    }
  };

  //Delete Staff
  const [deleteStaff] = useDeleteStaffMutation();

  const handleDeleteSubmit = async () => {
    const payload: any = {
      staffId: [selectedRecord?._id]
    };
    const { data }: any = await deleteStaff({ id: selectedRow?.clientId, payload });
    if (data) {
      setIsDeleteModal(false);
      AppSnackbar({ type: "success", message: data?.message });
    }
  };

  const AllocateCarerColumnsData: ColumnsType<any> = [
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
            onClick={() => { setIsDeleteModal(true); setSelectedRow(text) }}
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
        title={
          <div style={{ fontSize: "14px", fontWeight: "600" }}>
            Allocate Carer to Care Home
          </div>
        }
        open={isAllocateCarerModal}
        onCancel={() => setIsAllocateCarerModal(false)}
        wrapClassName="allocate-carer-modal"
        footer={false}
        closeIcon={<img src={CloseIcon} alt="" />}
      >
        <div className="overlay-wrapper-modal-content">
          <div className="carer-modal-select-wrapper">
            <div style={{ width: "300px" }}>
              <label className="fs-14 fw-600" >Select Care Home</label>
              <div style={{ marginTop: "8px" }}>
              
              </div>
            </div>
            <div className="bottom-buttons">
              <Button
                type="primary"
                className="inner-bottom-btn bg-orange-color"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAllocate}
                type="primary"
                className="inner-bottom-btn btn-secondary"
              >
                Allocate
              </Button>
            </div>
          </div>

          <div className="modal-search">
            <Input
              className="search-input"
              placeholder="Search "
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
              columns={AllocateCarerColumnsData}
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

export default AllocateCarerModal;
