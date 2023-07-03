import React, { useState } from "react";
import { Row, Col, Avatar, Dropdown, Space, Progress, Pagination } from "antd";
import EmailIcon from "../../../assets/images/staffManager/emailIcon.png";
import { StaffManagerData } from "../../../mock/StaffManagerMock";
import type { MenuProps } from "antd";
import ViewProfileIcon from "../../../assets/images/staffManager/viewProfileImg.png";
import SendIcon from "../../../assets/images/staffManager/sendEmailIcon.png";
import AllocateStaffIcon from "../../../assets/images/staffManager/allocateStaffIcon.png";
import StaffSummaryImg from "../../../assets/images/staffManager/staffSummaryImg.png";
import DeleteIcon from "../../../assets/images/staffManager/DeleteIcon.png";
import ActionImg from "../../../assets/images/staffManager/actionImg.png";
import CallImg from "../../../assets/images/staffManager/callImg.png";
import { useNavigate } from "react-router-dom";
import AllocateStaffModal from "../Modals/AllocateStaffModal/AllocateStaffModal";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import SendResendModal from "../Modals/SendResendModal/SendResendModal";
import SendEmailModal from "../Modals/SendEmailModal/SendEmailModal";
import ViewProfile from "../../OnBoarding/Carer/ViewProfile/ViewProfile";
import PostCodeImg from "../../../assets/images/staffManager/postCodeImg.png";
import { useDeleteProfileMutation } from "../../../store/Slices/StaffManager";
import AppSnackbar from "../../../utils/AppSnackbar";

const StaffManagerInfo = (props: any) => {
  const { data,pagination,setPagination,total } = props;
  const [staffId, setStaffId] = useState("");
  const [staffDetails, setStaffDetails] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allocateStaff, setAllocateStaff] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [isSendEmailModalOpen, setIsSendEmailModalOpen] = useState<boolean>(false);
  const [IsProfileModal, setIsProfileModal] = useState(false);
  const [profileViewData, setProfileViewData] = useState();
  const [selectProfileData, setSelectProfileData] = useState<any>(null);

  const [deleteProfile] = useDeleteProfileMutation({ id: staffDetails?._id });

  console.log(data);
  
  const handleDeleteModalSubmit = async () => {
    try {
      await deleteProfile({ id: staffDetails?._id }).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Successfully Deleted!",
        message: "Information deleted successfully",
      });
      setDeleteModal(false);
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }
  };

  const handleProfileViewById = (record: any) => {
    setProfileViewData(record?._id);
    setSelectProfileData(record);
  };

  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }} onClick={() => setIsProfileModal(true)}>
          <img src={ViewProfileIcon} alt="ViewProfile" />
          <span>View Profile</span>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onClick={() =>
            navigate(`/staff-manager/${staffDetails?._id}/staff-summary`, {
              state: staffDetails,
            })
          }
        >
          <div
            className="d-flex align-center justify-center"
            style={{
              backgroundColor: "#EFF0F7",
              borderRadius: "50%",
              width: "28px",
              height: "28px",
            }}
          >
            <img src={StaffSummaryImg} alt="ViewProfile" />
          </div>
          <span>Staff Summary</span>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }} onClick={() => setIsSendEmailModalOpen(true)}>
          <img src={SendIcon} alt="ViewProfile" width={28} height={28} />
          <span>Send Email</span>
        </div>
      ),
      key: "3",
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <img src={EmailIcon} alt="ViewProfile" width={28} height={28} />
          <span>Send / Resend Invitation</span>
        </div>
      ),
      key: "4",
    },
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }} onClick={() => setAllocateStaff(true)}>
          <img src={AllocateStaffIcon} alt="ViewProfile" width={28} height={28} />
          <span>Allocate Staff</span>
        </div>
      ),
      key: "5",
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onClick={() => setDeleteModal(true)}
        >
          <img src={DeleteIcon} alt="ViewProfile" width={28} height={28} />
          <span>Delete</span>
        </div>
      ),
      key: "6",
    },
  ];
  return (
    <>
      <div className="staff-info-wrapper">
        <div className="scroll-div">
          {data?.result?.length > 0 ? (
            data?.result?.map((item: any) => (
              <Row gutter={[20, 20]} className="staff-mananger-wrapper" style={{ marginBlock: "0.7rem" }} align="middle">
                <Col xs={24} lg={6} xl={4} className="staff-info">
                  <div className="border-right">
                    <Avatar
                      src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.profilePhoto?.mediaId}.${item?.profilePhoto?.mediaMeta?.extension}`}
                      // icon={`${item?.fullName.split(' ')[0].charAt(0)}${item?.fullName.split(' ')[1].charAt(0)}`}
                      className="user-img"
                      style={{
                        height: 100,
                        width: 100,
                      }}
                    />
                    <div className="staff-manager-heading">
                      <h2 style={{textTransform:'capitalize'}}>{item?.fullName}</h2>
                      <p className="fs-14 fw-400 line-height-18 m-0" style={{ color: "#A0A3BD" }}>
                        {item?.userTypeData?.name}
                      </p>
                      {/* <p
                        className="fs-14 fw-400 line-height-18 m-0"
                        style={{ color: "#A0A3BD" }}
                      >
                        {item?.userTypeData?.shortForm}
                      </p> */}
                    </div>
                  </div>
                </Col>
                <Col xs={24} lg={18} xl={20}>
                  <div className="staff-manager-details">
                    <Row gutter={[15, 20]}>
                      <Col xs={24} sm={10} md={12} xxl={5}>
                        <div>
                          <h5 className="staff-manager-contact fs-16 fw-600 line-height-24 m-0" style={{ color: "#6E7191" }}>
                            Contact:
                          </h5>
                          <div
                            className="d-flex align-center contact-content"
                            style={{
                              gap: "5px",
                              marginTop: "4px",
                              paddingLeft: "1.5rem",
                            }}
                          >
                            <img src={EmailIcon} alt="email" />
                            <p className="m-0">{item?.email}</p>
                          </div>
                          <div
                            className="d-flex align-center contact-content"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              marginTop: "6px",
                              paddingLeft: "1.5rem",
                            }}
                          >
                            <div
                              className="d-flex align-center justify-center"
                              style={{
                                backgroundColor: "#EFF0F7",
                                borderRadius: "50%",
                                width: "28px",
                                height: "28px",
                              }}
                            >
                              <img src={CallImg} alt="email" />
                            </div>
                            <p className="m-0" style={{ margin: "0" }}>
                              {item?.phone}
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} sm={14} md={12} xxl={6}>
                        <div className="d-flex align-center justify-between">
                          <div>
                            <h5 className="staff-manager-contact fs-16 fw-600 line-height-24 m-0 status-title" style={{ color: "#6E7191" }}>
                              Status:
                            </h5>
                            <h5 className="staff-manager-contact fs-16 fw-600 line-height-24 m-0 status-title" style={{ color: "#6E7191", marginTop: "8px" }}>
                              Staff Band:
                            </h5>
                            <h5 className="staff-manager-contact fs-16 fw-600 line-height-24 m-0 status-title" style={{ color: "#6E7191", marginTop: "6px" }}>
                              Employment Type:
                            </h5>
                          </div>
                          <div>
                            <h5
                              className="staff-manager-contact fs-16 fw-700 line-height-24 m-0 status-data"
                              style={{
                                color: item.status === "active" ? "#52C41A" : "#f5222d",
                                textTransform: "capitalize",
                              }}
                            >
                              {item?.status}
                            </h5>
                            <h5 className="staff-manager-contact fs-16 fw-700 line-height-24 m-0 status-data" style={{ color: "#4E4B66", marginTop: "8px" }}>
                              {`${item?.userTypeData?.shortForm} Band`}
                            </h5>
                            <h5
                              className="staff-manager-contact fs-16 fw-700 line-height-24 m-0 status-data"
                              style={{
                                color: "#4E4B66",
                                marginTop: "6px",
                                textTransform: "capitalize",
                              }}
                            >
                              {item?.employmentType ? item.employmentType : "No data"}
                            </h5>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={12} xxl={7} className="d-flex justify-center progress-bar">
                        <div>
                          <div className="staff-manager-contact d-flex align-center">
                            <span className="fs-16 fw-600 line-height-24 m-0" style={{ marginRight: "5px" }}>
                              Progress:
                            </span>
                            <p className="fs-16 fw-700 line-height-24 m-0">{`${item?.percentageComplete}%`}</p>
                          </div>
                          <Space direction="vertical">
                            <Progress percent={item?.percentageComplete} strokeColor="#3CCC4A" showInfo={false} size={[192, 15]} />
                          </Space>
                        </div>
                      </Col>
                      <Col xs={16} md={6} lg={8} xxl={3}>
                        <h5 className="staff-manager-contact fs-16 fw-600 line-height-24 m-0" style={{ color: "#6E7191" }}>
                          Post Code:
                        </h5>
                        <div className="d-flex justify-around align-center" style={{ gap: "6px", paddingLeft: "1rem" }}>
                          <h5 className="staff-manager-contact fs-16 fw-700 line-height-24 m-0" style={{ color: "#4E4B66" }}>
                            {item?.postCode ? item.postCode : "No Data"}
                          </h5>
                          <img src={PostCodeImg} alt="" />
                        </div>
                      </Col>
                      <Col xs={8} md={6} lg={4} xxl={3} style={{ display: "flex", justifyContent: "center" }} className="staff-actions">
                        <div>
                          <h5 className="staff-manager-contact fs-16 fw-600 line-height-24 m-0" style={{ color: "#6E7191" }}>
                            Actions
                          </h5>
                          <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]} overlayClassName="distraction-alerts-dropdown" className="actionDropDown ">
                            <Space>
                              <div className="border-color cursor-pointer">
                                <img
                                  src={ActionImg}
                                  alt=""
                                  onClick={() => {
                                    setStaffDetails(item);
                                    setStaffId(item._id);
                                    handleProfileViewById(item);
                                  }}
                                />
                              </div>
                            </Space>
                          </Dropdown>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            ))
          ) : (
            <span className="fs-16 fw-600 text-center w-100 d-flex justify-center">No data found</span>
          )}
        </div>
      </div>

      <Pagination className="staff-pagination"  current={pagination?.page} pageSize={pagination?.limit} total={data?.metadata?.total} onChange={(page,limit)=>setPagination({ page, limit })}/>
      {deleteModal && <DeleteModal
        deleteModal={deleteModal}
        title={"Are you sure you want to Delete this ?"}
        submitTitle={"Yes, Delete"}
        cancelTitle={"Cancel"}
        setDeleteModal={() => setDeleteModal(false)}
        onSubmit={handleDeleteModalSubmit}
        onCancel={() => setDeleteModal(false)}
      />}
      {isModalOpen && <SendResendModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={staffDetails} />}
      {allocateStaff && <AllocateStaffModal staffId={staffId} allocateStaff={allocateStaff} setAllocateStaff={setAllocateStaff} />}
      {isSendEmailModalOpen && <SendEmailModal staffDetails={staffDetails} isSendEmailModalOpen={isSendEmailModalOpen} setIsSendEmailModalOpen={setIsSendEmailModalOpen} />}
      {IsProfileModal && <ViewProfile staffDetails={staffDetails} IsProfileModal={IsProfileModal} setIsProfileModal={setIsProfileModal} selectedTableData={profileViewData} selectProfileData={selectProfileData} />}
    </>
  );
};
export default StaffManagerInfo;