import { Row, Col, Button, Avatar, Rate } from "antd";
import { useState } from "react";
// import { openShiftsData } from "../../../mock/StaffManagerMock";
import HomeImg from "../../../assets/images/staffManager/home.png";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import "./UpComingShift.scss";
import { useLocation } from "react-router-dom";
import { useGetUpComingShiftQuery, usePutCancelShiftMutation } from "../../../store/Slices/StaffBooking";
import { upComingShiftDetails } from "../../../mock/StaffManagerMock";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import AppSnackbar from "../../../utils/AppSnackbar";

const UpComingShift = () => {
  const { state: staffBookingData } = useLocation();
  const [isCancelShift, setIsCancelShift] = useState({ isToggle: false, id: '' });

  const { data: confirmedShiftData } = useGetUpComingShiftQuery({
    staffId: staffBookingData?._id,
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
      title: "Upcoming Shifts",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Staff Booking",
      path: "/staff-booking",
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="open-shift-wrapper-main">
        <div>
          <Avatar style={{ backgroundColor: "#4E132C", color: "#FFFFFF" }} size="large">
            {`${staffBookingData?.firstName?.charAt(0)?.toUpperCase()}${staffBookingData?.lastName?.charAt(0)?.toUpperCase()}`}
          </Avatar>
          <span className="fs-14 fw-600 line-height-17" style={{ marginLeft: "10px" }}>
            {`${staffBookingData?.firstName} ${staffBookingData?.lastName}
               `}
          </span>
        </div>

        <div className="confirmed-shift-wrapper-main">
          <div className="open-shift-wrapper">
            <Row gutter={[20, 20]}>
              {confirmedShiftData?.data?.shifts.map((item: any) => (
                <Col xl={6} lg={12} md={12} xs={24} sm={24}>
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
                    {upComingShiftDetails.map((data: any) => (
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
              ))}
            </Row>
          </div>
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
export default UpComingShift;
