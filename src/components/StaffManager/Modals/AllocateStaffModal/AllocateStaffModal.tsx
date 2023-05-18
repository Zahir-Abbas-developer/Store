import { Modal, Table, Input, Button, Row, Col, Select } from "antd";
import { allocateStaffData } from "../../../../mock/StaffManagerMock";
import searchIcon from "../../../../assets/icons/search.svg";
import CloseIcon from "../../../../assets/icons/close-icon.svg";
import CrossImg from "../../../../assets/images/staffManager/crossImg.png";
import { useState } from "react";
import { useGetAllClientListQuery, useGetStaffViewCarerQuery, useStaffAllocateCarersMutation, useStaffDeleteAllocateMutation } from "../../../../store/Slices/StaffManager";
import DeleteModal from "../../../../shared/DeleteModal/DeleteModal";
import "./AllocateStaffModal.scss";
import dayjs from "dayjs";
import { debouncedSearch } from "../../../../utils/utils";
import AppSnackbar from "../../../../utils/AppSnackbar";

const AllocateStaffModal = (props: any) => {
  const { allocateStaff, setAllocateStaff, staffId } = props;
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });
  const [searchValue, setSearchValue] = useState("");
  const [allClientsList, setAllClientsList] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);


  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  const { data: allocatedStaff } = useGetAllClientListQuery({ staffId });

  const [createAllocateStaff] = useStaffAllocateCarersMutation();

  const { data, isLoading, isSuccess, isError } = useGetStaffViewCarerQuery({
    search: searchValue,
    userId: staffId,
  });

  let viewCarerHomes: any;
  let totalRecords: any = 0;
  if (isSuccess) {
    viewCarerHomes = data;
  } 

  const total = totalRecords?.data?.metadata?.total;

  const [deleteProfile] = useStaffDeleteAllocateMutation({ staffId:staffId });

  const clientsListOptions = allocatedStaff?.data?.result?.map((userTypeDetails: any) => {
    return { value: userTypeDetails?._id, label: userTypeDetails?.clientName };
  });

  const handleAllocateStaff = async() => {
    if(!allClientsList.length){
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: "Please Select CareHome" ?? "Something went wrong!",
      });
      
      return 
    }
    try {
      await  createAllocateStaff({ clientId: allClientsList, staffId: [staffId] }).unwrap();
      
      AppSnackbar({
        type: "success",
        messageHeading: "Congratulations",
        message: "Allocated successfully!",
      });
      setAllocateStaff(false)
    }
    catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
   
  };
  }
  const handleDeleteModalSubmit = async () => {
    setDeleteModal(false);
    deleteProfile({ staffId: [staffId] });
  };

  const columns = [
    {
      title: "Sr #",
      dataIndex: "sr",
      key: "sr",
      render: (_: any, text: any, index: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{index < 9 ? `0${index + 1}` : index + 1}</span>,
    },
    {
      title: "Care Home",
      dataIndex: "carerName",
      key: "carerName",
    },
    {
      title: "Allocated ON",
      dataIndex: "allocatedOn",
      key: "allocatedOn",
      render: (_: any, text: any, index: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{dayjs(text.allocatedOn).format("dddd, MMM D, YYYY h:mm A")}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text: any) => (
        <div onClick={() => setDeleteModal(true)}>
          <img src={CrossImg} alt="" />
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Allocate Carer to Care Home"
        centered
        open={allocateStaff}
        footer={false}
        width={1180}
        wrapClassName="allocate-carer-modal"
        onCancel={() => setAllocateStaff(false)}
        className="allocate-staff-modal-wrapper"
        closeIcon={<img src={CloseIcon} alt="" />}
      >
        <div className="overlay-wrapper-modal-content">
          <div className="allocate-staff-modal-wrapper">
            <Row className="staff-availability-sheet-common-filter-wrapper " justify="space-between">
              <Col xs={24} md={16} xl={14} xxl={12}>
                <Row gutter={[0, 20]} className="filter-wrapper">
                  <Col xs={24} sm={8}>
                    <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                      Select Care Home
                    </p>
                    <div className="filter-column">
                      <Select 
                        size="large"
                        placeholder="Choose by job Role"
                        optionFilterProp="children"
                        value={allClientsList}
                        className="app-select-wrap-class"
                        popupClassName="app-select-popup-wrap-class"
                        onChange={(e: any) => setAllClientsList([...allClientsList, e])}
                        options={clientsListOptions}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="bottom-buttons">
              <Button type="primary" className="inner-bottom-btn bg-orange-color" onClick={()=>{setAllClientsList([])}}>
                Cancel
              </Button>
              <Button type="primary" className="inner-bottom-btn btn-secondary" onClick={handleAllocateStaff}>
                Allocate
              </Button>
            </div>
          </div>
        </div>

        <Row className="total-staff-count-main d-flex align-center justify-end" style={{ paddingTop: "20px", marginInline: "1.5rem" }}>
          <Col lg={10} md={10} xs={24} sm={24}>
            <Input className="search-input" placeholder="Search" prefix={<img src={searchIcon} onChange={debouncedResults} alt="searchIcon" width={24} height={24} />} />
          </Col>
        </Row>
        <div className="allocate-staff-table">
          <Table dataSource={viewCarerHomes?.data?.result} columns={columns} loading={isLoading} scroll={{ x: "max-content" }} pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: total,
            onChange: (page, limit) => setPagination({ page, limit }),
          }} />
        </div>
      </Modal>

      <DeleteModal
        deleteModal={deleteModal}
        title={"Are you sure you want to Delete this ?"}
        submitTitle={"Yes, Delete"}
        cancelTitle={"Cancel"}
        setDeleteModal={() => setDeleteModal(false)}
        onSubmit={handleDeleteModalSubmit}
        onCancel={() => setDeleteModal(false)}
      />
    </>
  );
};
export default AllocateStaffModal