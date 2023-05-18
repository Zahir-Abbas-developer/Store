import { Layout, Card, Row, Col, Divider, Select, Form } from "antd";
import React, { useState } from "react";
import { useGetRequestCompletedShiftQuery } from "../../../store/Slices/ShiftDetails";
import "./CompletedShifts.scss";
import days from "dayjs";
import EuroIcon from "../../../assets/icons/ShiftDetails/EuroIcon.svg";
import DateIcon from "../../../assets/icons/ShiftDetails/DateIcon.svg";
import ShiftTypeIcon from "../../../assets/icons/ShiftDetails/ShiftTypeIcon.svg";
import HomeIcon from "../../../assets/icons/ShiftDetails/HomeIcon.svg";
import DepartmentIcon from "../../../assets/icons/ShiftDetails/DepartmentIcon.svg";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";

const CompletedShifts = () => {
  const [SelectFilterValue, setSelectFilterValue] = useState('All');
  const paramsObj: any = {};
  paramsObj["shiftStatus"] = SelectFilterValue;
  const query = "&" + new URLSearchParams(paramsObj).toString();
  const { data, isLoading, isSuccess, isError } =
    useGetRequestCompletedShiftQuery({ query });

  let completedShift: any;
  if (isLoading) {
    completedShift = <p>Loading...</p>;
  } else if (isSuccess) {
    completedShift = data;
  } else if (isError) {
    completedShift = <p>Error...</p>;
  }
  const handleChange = (value: any) => {
    setSelectFilterValue(value);
  };

  const startTime = days(completedShift?.data?.shifts?.shift?.startTime).format("h:mm A");
  const endTime = days(completedShift?.data?.shifts?.shift?.endTime).format("h:mm A");
  const signedOffDate = days(completedShift?.data?.shifts?.shift?.signedOffDate).format("MMM, DD ddd YY - h:mm A");
  const modifiedDate = days(completedShift?.data?.shifts?.shift?.modifiedDate).format("MMM, DD ddd YY - h:mm A");
  const careHomeDate = days(completedShift?.data?.shifts?.shift?.shiftDate).format("MMM DD, ddd ");
  const careHomeStartTime = days(completedShift?.data?.shifts?.shift?.startTime).format("h:mm A");
  const careHomeEndTime = days(completedShift?.data?.shifts?.shift?.startTime).format("h:mm A");
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
  ];


  console.log("completedShift =========> ", completedShift?.data?.shifts);



  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <Layout className="wrap-shifts-details-completed-shift">
        <Card className="shifts-details-completed-shift border-radius-10">
          <Form
            layout="vertical"
            style={{ paddingTop: "3px", paddingBottom: "1px" }}
          >
            <Form.Item
              name="options"
              label={
                <span className="fs-14 fw-600 line-height-17 title-color">
                  Sign off Status
                </span>
              }
            >
              <Select
                className="completed-shift-select-input border-radius-4"
                defaultValue="All"
                onChange={handleChange}
                options={[
                  { value: "All", label: "All" },
                  { value: "SIGNEDOFF", label: "Signed Off" },
                  { value: "COMPLETED", label: "Pending Signed Off" },
                ]}
              />
            </Form.Item>
          </Form>
          <Row gutter={[23, 23]} className="wrap-main-completed-shift">
            {completedShift?.data?.shifts.map((shift: any) => {
              return (
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} key={shift.id} className="gutter-row ">
                  <Card className="wrap-completed-shift-card-content  border-radius-10">
                    <div className="d-flex justify-between main-cancelled-shift-detail-content">
                      <Col xxl={6} xl={6} lg={8} md={24} sm={24} xs={24} className="shift-details-cancel-left-content">
                        <div className="d-flex align-center cancel-shift-img-text">
                          <img src={HomeIcon} alt="HomeIcon" width="32px" height="32px" className="shift-img" />
                          <span className="fw-500 fs-20 shift-title title-color cancel-shift-title">
                            {shift?.careHome?.clientName}
                          </span>
                        </div>
                        <div className="shift-cancel-bottom-content">
                          <Row gutter={[18, 18]} className=" d-flex  align-items-center shift-cancel-card-content">
                            <Col xl={3}>
                              <img src={ShiftTypeIcon} alt="ShiftTypeIcon" width={24} height={24} className="carer-home-shift-type-icon" />
                            </Col>
                            <Col xl={10}>
                              <span className="fw-400 fs-14 line-height-22  title-color text-left">
                                {shift?.shift?.shiftType}
                              </span>
                            </Col>
                          </Row>
                          <Row gutter={[18, 18]} className=" d-flex align-items-center shift-cancel-card-content">
                            <Col xl={3}>
                              <img src={DateIcon} alt="DateIcon" width={24} height={24} />
                            </Col>
                            <Col xl={20}>
                              <span className="fw-400 fs-14 line-height-22 title-color">{`${careHomeDate} -${careHomeStartTime} TO ${careHomeEndTime}`}</span>
                            </Col>
                          </Row>
                          <Row gutter={[18, 18]} className=" d-flex align-items-center shift-cancel-card-content">
                            <Col xl={3}>
                              <img src={EuroIcon} alt="EuroIcon" width={15.32} height={21} />
                            </Col>
                            <Col xl={18}>
                              <span className="fw-400 fs-14 line-height-22 title-color">
                                Shift Rate:
                              </span>
                              <span className="fw-500 fs-16 line-height-24 title-color" dangerouslySetInnerHTML={{ __html: shift?.shiftRate, }}></span>
                            </Col>
                          </Row>
                          <Row gutter={[18, 18]} className=" d-flex  align-items-center shift-cancel-card-content"  >
                            <Col xl={3}>
                              <img src={DepartmentIcon} alt="HomeIcon" width={29.76} height={24} className="card-department-icon" />
                            </Col>
                            <Col xl={18}>
                              <span className="fw-400 fs-14 line-height-22 title-color">
                                Department:
                              </span>
                              <span className="fw-500 fs-16 line-height-24 title-color text-capitalize" dangerouslySetInnerHTML={{ __html: shift?.shift?.department ? " " + shift?.shift?.department?.name : " No Department" }}></span>
                            </Col>
                          </Row>
                        </div>
                      </Col>

                      <span className="shift-line">
                        <Divider type="vertical" className="verical-line" style={{ height: "250px", border: "1px solid  #D9DBE9", marginLeft: "0px", }} />
                      </span>
                      <Col xxl={18} xl={18} lg={15} md={24} sm={24} xs={24}>
                        <div className="m-auto wrapper-left-card-shift-completed-content">
                          <Card className="completed-shift-details-left-content">
                            <p className="fw-500 fs-16 line-height-24 title-color " style={{ paddingBottom: "0px", marginTop: "0px" }} >
                              Shift Calculation
                            </p>
                            <Row gutter={[8, 8]} style={{ paddingBottom: "6px" }}>
                              <Col xl={3}>
                                <span className="fw-400 fs-14 line-height-22 title-color ">
                                  Total Shift Hours
                                </span>
                              </Col>
                              <Col xl={4}>
                                <span className="fw-600 fs-14 line-height-17 title-color">
                                  {Math.round(shift?.totalHours * 100) / 100}&nbsp;Hrs
                                </span>
                              </Col>

                              <Col xl={4}>
                                <span className="fw-400 fs-14 line-height-22 title-color ">
                                  Shift Rate
                                </span>
                              </Col>
                              <Col xl={3}>
                                <span className="fw-600 fs-14 line-height-17 title-color">
                                  £ {shift?.perHour}
                                </span>
                              </Col>
                              <Col xl={4}>
                                <span className="fw-400 fs-14 line-height-22 title-color ">
                                  Shift Type
                                </span>
                              </Col>
                              <Col xl={4}>
                                <span className="fw-600 fs-14 line-height-17 title-color">
                                  {shift?.shift?.shiftType}
                                </span>
                              </Col>

                              <Col xl={2}>
                                <span className="fw-600 fs-14 line-height-17 title-color">
                                  {shift?.endShiftRate}
                                </span>
                              </Col>
                            </Row>

                            <Row gutter={[12, 12]}>
                              <Col xl={3}>
                                <span className="fw-400 fs-14 line-height-22 title-color ">
                                  Shift Time
                                </span>
                              </Col>
                              <Col xl={4}>
                                <span className="fw-600 fs-14 line-height-17 title-color">
                                  {`${startTime} - ${endTime}`}
                                </span>
                              </Col>

                              <Col xl={4}>
                                <span className="fw-400 fs-14 line-height-22 title-color ">
                                  Total Shift Amount:
                                </span>
                              </Col>
                              <Col xl={3}>
                                <span className="fw-600 fs-14 line-height-17 title-color">
                                  £ {shift?.totalAmount}
                                </span>
                              </Col>

                              <Col xl={4}>
                                <span className="fw-400 fs-14 line-height-22 title-color ">
                                  Extra Hours Worked:
                                </span>
                              </Col>
                              <Col xl={3}>
                                <span className="fw-600 fs-14 line-height-17 title-color">
                                  0 Hrs
                                </span>
                              </Col>

                              <Col xl={2}>
                                <span className="fw-400 fs-14 line-height-22 title-color completed-shift-signed-off-title">
                                  {shift?.shiftStatus}
                                </span>
                              </Col>
                            </Row>
                          </Card>

                          <Card className="completed-shift-signed-off-left-content">
                            <Row gutter={[8, 8]} style={{ paddingBottom: "12px" }} >
                              <Col xl={5}>
                                <span className="fw-600 fs-14 line-height-17 title-color ">
                                  Signed-off by:
                                </span>
                              </Col>
                              <Col xl={3}>
                                <span className="fw-400 fs-14 line-height-22 title-color">
                                  {`${shift?.signedOffBy?.firstName ? (shift?.signedOffBy?.firstName + " " + shift?.signedOffBy?.lastName) : "Not Available"}`}
                                </span>
                              </Col>

                              <Col xl={5}>
                                <span className="fw-400 fs-14 line-height-22 title-color">
                                  {signedOffDate}
                                </span>
                              </Col>
                              <Col xl={3}>
                                <span className="fw-600 fs-14 line-height-17 title-color ">
                                  Modified By:
                                </span>
                              </Col>
                              <Col xl={3}>
                                <span className="fw-400 fs-14 line-height-22 title-color">
                                  {`${shift?.modifiedBy?.firstName}  ${shift?.modifiedBy?.lastName} `}
                                </span>
                              </Col>
                              <Col xl={5}>
                                <span className="fw-400 fs-14 line-height-22 title-color">
                                  {modifiedDate}
                                </span>
                              </Col>

                            </Row>
                            <Row gutter={[10, 10]}>
                              <Col xl={5}>
                                <span className="fw-600 fs-14 line-height-17 title-color ">
                                  Modification Reason:
                                </span>
                              </Col>
                              <Col xl={19}>
                                <span className="fw-400 fs-14 line-height-22 title-color text-capitalize">
                                  {shift?.modifyReason || "Not Available"}
                                </span>
                              </Col>
                            </Row>
                          </Card>
                        </div>
                      </Col>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Card>
      </Layout>
    </>
  );
};

export default CompletedShifts;
