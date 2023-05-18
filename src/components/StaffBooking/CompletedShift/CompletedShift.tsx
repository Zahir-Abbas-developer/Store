import { Avatar, Col, Row, Select } from "antd";
import { CompletedShiftModification, CompletedShiftProfile, staffBookingCalculation } from "../../StaffManager/StaffManager.utils";
import "./CompletedShift.scss";
import { useGetCompletedShiftQuery } from "../../../store/Slices/StaffManager";
import HomeImg from "../../../assets/images/staffManager/home.png";
import CompletedShiftModal from "./Modal/CompletedShiftModal";
import '../../Reports/StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss'
import { useState } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";

const ClientCompletedShift = () => {
  const { state: staffBookingData } = useLocation();
  const [signOFFStatus, setSignOFFStatus] = useState('');
  const [signedOffDetails, setSignedOffDetails] = useState<any>({})
  const [isCompletedConfirmModal, setIsCompletedConfirmModal] = useState(false)
  const { data: completedShift } = useGetCompletedShiftQuery({
    staffId: staffBookingData?._id,
    filter:signOFFStatus,
  });
  
  const shiftStatusFilter = completedShift?.data?.shifts?.map((shiftStatus: any, i: number) => {
    return { key: `${i}`, value: shiftStatus?._id, label: shiftStatus?.shiftStatus, }
  })
  
  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Completed Shifts",
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
      <div className="client-completed-shift-wrapper bg-white">
        <Row className="staff-availability-sheet-common-filter-wrapper" justify="space-between">
          <Col xs={24} md={12} xl={6} className="gutter-row">
            <div>
              <Avatar style={{ backgroundColor: "#4E132C", color: "#FFFFFF" }} size="large">
                {`${staffBookingData?.firstName?.charAt(0)?.toUpperCase()}${staffBookingData?.lastName?.charAt(0)?.toUpperCase()}`}
              </Avatar>
              <span className="fs-14 fw-600 line-height-17" style={{ marginLeft: "10px" }}>
                {`${staffBookingData?.firstName} ${staffBookingData?.lastName}
               `}
              </span>
            </div>
          </Col>
          <Col xs={24} md={12} xl={14} xxl={18}>
            <Row gutter={[15, 15]} className="filter-wrapper">
              <>
                <Col xs={24} sm={24} md={8}>
                  <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                    Sign off Status
                  </p>
                  <div className="filter-column">
                    <Select
                      size="large"
                      placeholder=""
                      defaultValue="All"
                      optionFilterProp="children"
                      className="app-select-wrap-class"
                      popupClassName="app-select-popup-wrap-class"
                    onChange={(e: any) => { setSignOFFStatus(e) }}
                    options={shiftStatusFilter}
                    />
                  </div>
                </Col>
              </>
            </Row>
          </Col>
        </Row>
        <div className="client-completed-select w-100"></div>
        {completedShift?.data?.shifts.length > 0 ? (
          completedShift?.data?.shifts?.map((item: any) => (
            <>
              <div className="client-item-completed bg-white" style={{ marginBottom: "20px" }} key={item.id}>
                <Row gutter={[20, 20]}>
                  <Col lg={5} md={24} sm={24} xs={24}>
                    <div className="d-flex align-center" style={{ gap: "13px", paddingBottom: "25px" }}>
                      <div>
                        <img src={HomeImg} alt="homeIcon" />
                      </div>
                      <span className="fs-20 fw-500 line-height-28">{item?.careHome?.clientName}</span>
                    </div>
                    <div className="client-content-wrapper d-flex flex-column">
                      {CompletedShiftProfile.map((icon, index) => (
                        <div className="d-flex align-center" style={{ gap: "13px" }} key={index}>
                          <img src={icon.src} alt="" width={24} height={24} />
                          <p className="fs-14 fw-400 title-color line-height-20 m-0">{icon.text(item)}</p>
                        </div>
                      ))}
                    </div>
                  </Col>
                  <Col lg={19}>
                    <div className="client-calculation bg-white">
                      <h2 className="fs-16 fw-500 m-0 title-color pb-18">Shift Calculation</h2>
                      <Row gutter={[10, 10]}>
                        {staffBookingCalculation.map((calculation, index) => (
                          <Col xl={6} lg={12} md={12} sm={12} xs={24} key={index}>
                            <div className="calculation d-flex align-center">
                              <p className="d-flex fs-14 fw-400 m-0 title-color">{calculation.heading}</p>
                              <h2 className="d-flex fs-14 fw-600 title-color m-0">{calculation.text(item)}</h2>
                            </div>
                          </Col>
                        ))}
                        {item.shiftStatus === 'SIGNEDOFF' ?
                          <h3 className="fs-14 fw-400 line-height-22" style={{ color: '#52C41A' }}>Signed Off</h3> :
                          <button className="shift-sign-off-btn cursor-pointer" onClick={() => {setIsCompletedConfirmModal(true); setSignedOffDetails(item)}}>Shift Sign Off</button>
                        }
                      </Row>
                    </div>
                    <div className="signed-off bg-white">
                      <div className="signed-inner-off d-flex justify-between align-center">
                        {CompletedShiftModification.map((modifiy: any, index: any) => (
                          <Col xl={12} lg={12} md={24} sm={24} xs={24} key={index} style={{ paddingLeft: "0" }}>
                            <div className="d-flex justify-between align-center" style={{ gap: " 10px", flexWrap: "wrap" }}>
                              <h2 className="fs-14 fw-600 title-color m-0">{`${modifiy.heading}:`}</h2>
                              <span className="fs-14 fw-400 line-height-22 title-color">{modifiy.name(item)}</span>
                              <p className="fs-14 fw-400 m-0 title-color">{modifiy.text(item)}</p>
                            </div>
                          </Col>
                        ))}
                      </div>
                      <div className="signed-desc d-flex align-center">
                        <h2 className="fs-16 fw-600 line-height-18 title-color m-0">Modification Reason:</h2>
                        <p className="fs-14 fw-400 m-0 title-color line-height-22">{item?.signOff?.modificationReason}</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          ))
        ) : (
          <span className="fs-16 fw-600 text-center w-100 d-flex justify-center">No data found</span>
        )}
      </div>
      <CompletedShiftModal
        isCompletedConfirmModal={isCompletedConfirmModal}
        setIsCompletedConfirmModal={setIsCompletedConfirmModal}
        signedOffDetails={signedOffDetails}
      />
    </>
  );
};
export default ClientCompletedShift;