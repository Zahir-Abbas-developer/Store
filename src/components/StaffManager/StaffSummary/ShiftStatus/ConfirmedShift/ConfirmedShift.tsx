import { Row, Col, Button, Rate } from "antd";
import { useState } from "react";
import { confirmedShiftDetails } from "../../../../../mock/StaffManagerMock";
import HomeImg from "../../../../../assets/images/staffManager/home.png";
import DeleteModal from "../../../../../shared/DeleteModal/DeleteModal";
import { usePutCancelShiftMutation, useGetConfirmedShiftQuery } from "../../../../../store/Slices/StaffManager";
import { useLocation, useParams } from "react-router-dom";
import "./ConfirmedShift.scss";
import BreadCrumb from "../../../../../layout/BreadCrumb/BreadCrumb";
import AppSnackbar from "../../../../../utils/AppSnackbar";

const ConfirmedShift = () => {
  const { id } = useParams()
  const [isCancelShift, setIsCancelShift] = useState({ isToggle: false, id: '' });
  const { state: staffSummaryDetails } = useLocation();

  const { data: confirmedShiftData } = useGetConfirmedShiftQuery({
    staffId: staffSummaryDetails?._id,
    refetchOnMountOrArgChange: true,
  });

  const [cancelShift] = usePutCancelShiftMutation();

  const handleDeleteModalSubmit = async () => {
    try {
      await cancelShift({ staffShiftId: isCancelShift?.id, cancelReason: "reason to cancel the shift" }).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Congratulations",
        message: "Shift Cancelled Sucessfully",
      });
      setIsCancelShift({ isToggle: false, id: '' });
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }
  };

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Confirmed Shifts",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Staff Manager",
      path: "/staff-manager",
    },
    {
      title: "Staff Summary",
      path: `/staff-manager/${id}/staff-summary`,
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="confirmed-shift-wrapper-main">
        <div className="open-shift-wrapper">
          <Row gutter={[20, 20]}>
            {confirmedShiftData?.data?.shifts.map((item: any) => {
              // console.log(item);
              return <Col xl={6} lg={12} md={12} xs={24} sm={24}>
                <div className="open-shift-cards-wrapper d-flex flex-column">
                  <div className="d-flex justify-around" style={{ gap: "10px" }}>
                    <div>
                      <img src={HomeImg} alt="homeIcon" />
                    </div>
                    <div>
                      <h2 className="fs-16 fw-500 m-0 form-heading-color">{`${item?.careHome?.clientName}`}</h2>
                      {item?.careHomeName?.clientRating?.length > 0 ? (
                        item.careHomeName.clientRating.map((data: any) => <Rate disabled defaultValue={data.average || 0} allowHalf style={{ color: "#FABF35" }} />)
                      ) : (
                        <Rate disabled defaultValue={0} allowHalf style={{ color: "#FABF35", opacity: 1.5 }} />
                      )}
                    </div>
                  </div>
                  {confirmedShiftDetails.map((data: any) => (
                    <div className="open-shift-content d-flex align-center">
                      <img src={data.src} alt="contacts-img" />
                      <span>{data.text(item)}</span>
                    </div>
                  ))}

                  <div className="staff-cards-btn d-flex align-item-center">
                    <Button className="assign-btn" onClick={() => setIsCancelShift({ isToggle: true, id: item?._id })}>
                      Cancel Shift
                    </Button>
                  </div>
                </div>
              </Col>
            })}
          </Row>
        </div>
      </div>
      <DeleteModal
        deleteModal={isCancelShift.isToggle}
        title={"Are you sure you want to cancel this shift?"}
        submitTitle={"Yes, Discard"}
        cancelTitle={"Cancel"}
        setDeleteModal={() => setIsCancelShift({ isToggle: false, id: '' })}
        onSubmit={handleDeleteModalSubmit}
        onCancel={() => setIsCancelShift({ isToggle: false, id: '' })}
      />
    </>
  );
};
export default ConfirmedShift;
