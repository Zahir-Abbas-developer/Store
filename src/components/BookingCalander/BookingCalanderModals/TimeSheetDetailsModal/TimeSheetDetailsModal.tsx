import { Fragment } from "react";
import { Col, Divider, Modal, Row, Form, Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import TextArea from "antd/es/input/TextArea";
import MockUser from "../../../../assets/BookingCalander/images/mock-user.png";
import Profile from "../../../../assets/BookingCalander/images/profile-user.png";
import DateIcon from "../../../../assets/BookingCalander/images/date.png";
import ImageIcon from "../../../../assets/BookingCalander/images/img-icon.png";
import Signature from "../../../../assets/BookingCalander/images/signature.png";
import Close from '../../../../assets/images/OnBoarding/Close.svg';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import "./TimeSheetDetails.scss";


function TimeSheetDetailsModal(props: any) {
  const { isDetailsModalOpen, setIsDetailsModalOpen, eventDetailsData } = props
  const eventDetails = eventDetailsData?.event?._def?.extendedProps;

  dayjs.extend(utc)

  const staffRateMok = [
    { heading: "Shift Date", details: "16/06/2022" },
    { heading: "Shift Type", details: "Night" },
    { heading: "Night Shift Hours", details: "11:00 Hrs" },
    { heading: "Night Shift rate", details: "£ 10.00" },
    { heading: "Total shift amount", details: "£ 10.00" },
  ];
  const clientRateCalculation = [
    { heading: "Shift Date", details: "16/06/2022" },
    { heading: "Shift Type", details: "Night" },
    { heading: "Night Shift Hours", details: "11:00 Hrs" },
    { heading: "Night Shift rate", details: "£ 10.00" },
    { heading: "Total shift amount", details: "£ 10.00" },
  ];

  return (
    <>
      <Modal width={1264} className="time-sheet-details" open={isDetailsModalOpen}
        onOk={() => { setIsDetailsModalOpen(false) }}
        onCancel={() => { setIsDetailsModalOpen(false) }}
        footer={false}
        closeIcon={< img src={Close} alt="close" />}
      >
        <Row gutter={[20, 10]} style={{ padding: "20px 10px" }}>
          <Col xs={24} md={12} className="first-column-content">
            <Row>
              <Col md={24}>
                <img src={MockUser} alt="mock-user" />
                <h3 className="fs-20 fw-500 m-0 color-black" style={{ marginBlock: "5px" }}>{eventDetails?.careHome?.clientName}</h3>
                <div className="detail-wrapper">
                  <img src={Profile} alt="profile" />
                  <p className="fs-12 fw-500 m-0"><span className="fs-14 fw-600 color-black">Staff Name: </span>{eventDetails?.carer?.firstName} {eventDetails?.carer?.lastName}</p>
                </div>
                <div className="detail-wrapper">
                  <img src={DateIcon} alt="date" />
                  <p className="fs-12 fw-500 m-0"><span className="fs-14 fw-600 color-black">Shift Date: </span>{dayjs(eventDetails?.shift?.shiftDate).format('DD/MM/YYYY')}</p>
                </div>
              </Col>
            </Row>
            <Divider dashed />
            <Row>
              <Col xs={24}>
                <h3 className="fs-20 fw-600 m-0">Staff rate Calculation</h3>
              </Col>
              {staffRateMok.map((data) => {
                return (
                  <Fragment key={uuidv4()}>
                    <Col xs={24} sm={12} className="fs-14 fw-600">
                      {data.heading}:
                    </Col>
                    <Col xs={24} sm={12}>
                      {data.details}
                    </Col>
                  </Fragment>
                );
              })}
            </Row>
            <Divider dashed />
            <Row>
              <Col xs={24}>
                <h3 className="fs-20 fw-600 m-0">Client rate Calculation</h3>
              </Col>
              {clientRateCalculation.map((data) => {
                return (
                  <Fragment key={uuidv4()}>
                    <Col xs={24} sm={12} className="fs-14 fw-600">
                      {data.heading}:
                    </Col>
                    <Col xs={24} sm={12}>
                      {data.details}
                    </Col>
                  </Fragment>
                );
              })}
            </Row>
            <Divider dashed />
            <Form layout="vertical">
              <Row gutter={[10, 1]}>
                <Col xs={24} md={12}>
                  <Form.Item label={<span className="label-color">Shift Start Time</span>}>
                    <Input type="text" style={{ border: "1px solid #a0a3bd", borderRadius: "3px" }} size="large" defaultValue={dayjs(eventDetails?.shiftStartTime)?.utc().format(('DD/MM/YYYY, HH:mm'))} disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label={<span className="label-color">Shift End Time</span>}>
                    <Input type="text" style={{ border: "1px solid #a0a3bd", borderRadius: "3px" }} size="large" defaultValue={dayjs(eventDetails?.shiftEndTime)?.utc().format(('DD/MM/YYYY, HH:mm'))} disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label={<span className="label-color">Shift Completed Time</span>}>
                    <Input type="text" style={{ border: "1px solid #a0a3bd", borderRadius: "3px" }} size="large" defaultValue={eventDetails?.timeTrack.length ? dayjs(eventDetails?.timeTrack[eventDetails?.timeTrack.length - 1]?.checkOut)?.utc().format(('DD/MM/YYYY, HH:mm')) : ""} disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label={<span className="label-color">Shift Signed-off Time</span>}>
                    <Input type="text" style={{ border: "1px solid #a0a3bd", borderRadius: "3px" }} size="large" defaultValue={eventDetails?.signedOffDate ? dayjs(eventDetails?.signedOffDate)?.utc().format(('DD/MM/YYYY, HH:mm')) : ""} disabled />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col xs={24} md={12}>
            <Form layout="vertical">
              <Row gutter={[10, 1]}>
                <Col xs={24} md={12}>
                  <Form.Item label={<span className="label-color">Extra Hours</span>} style={{ marginBottom: 0 }}>
                    <Input type="text" style={{ border: "1px solid #a0a3bd", borderRadius: "3px" }} size="large" defaultValue={eventDetails?.extraHours ? Number(eventDetails?.extraHours)?.toFixed(2) : 0} disabled />
                  </Form.Item>
                  <small>Break Time Input: 00:00</small>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label={<span className="label-color">Break Time Deduction (minutes)</span>} style={{ marginBottom: 0 }}>
                    <Input type="text" style={{ border: "1px solid #a0a3bd", borderRadius: "3px" }} size="large" defaultValue={eventDetails?.takenBreak} disabled />
                  </Form.Item>
                  <small>Break Time Deduction Input: 00:00</small>
                </Col>
                <Col xs={24} md={24} style={{ marginTop: "15px" }}>
                  <Form.Item label={<span className="label-color m-0">Work Department</span>}>
                    <Input type="text" style={{ border: "1px solid #a0a3bd", borderRadius: "3px" }} size="large" defaultValue={eventDetails?.careHome?.group} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Divider dashed />
              <Row>
                <Col md={24}>
                  <h3 className="fs-20 fw-600">Time Sheet</h3>
                  <div className="img-extension">
                    <img src={ImageIcon} alt="extension-iocn" />
                    <p className="m-0">Timesheet.png</p>
                  </div>
                </Col>
              </Row>
              <Divider dashed />
              <Row>
                <Col xs={24} md={24} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="fs-14 fw-600">Signed-off by:</span>
                  <span className="fs-14 ">{eventDetails?.signedOffBy?.firstName} {eventDetails?.signedOffBy?.lastName}, {eventDetails?.signedOffDate && dayjs(eventDetails?.signedOffDate)?.utc().format(('DD/MM/YYYY, HH:mm'))}</span>
                </Col>
                <Col xs={24} md={24} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="fs-14 fw-600">Modified by:</span>
                  <span className="fs-14 ">{eventDetails?.modifiedBy?.firstName} {eventDetails?.modifiedBy?.lastName}, {eventDetails?.modifiedDate && dayjs(eventDetails?.modifiedDate)?.utc().format(('DD/MM/YYYY, HH:mm'))}</span>
                </Col>
                <Col xs={24} md={24}>
                  <Form.Item label={<span className="label-color">Modification Reason</span>}>
                    <TextArea
                      style={{ border: "1px solid #a0a3bd", borderRadius: "3px" }}
                      autoSize={{ minRows: 3, maxRows: 6 }}
                      placeholder="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat 
                        sunt nostrud amet."/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={24}>
                  <div className="signature-section">
                    <img src={Signature} alt="signature" />
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Divider dashed />
      </Modal>
    </>
  );
}

export default TimeSheetDetailsModal;
