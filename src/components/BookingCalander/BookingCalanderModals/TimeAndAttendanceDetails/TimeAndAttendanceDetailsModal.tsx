import { Fragment } from "react";
import { Col, Modal, Row } from "antd";
import { v4 as uuidv4 } from "uuid";
import MockUser from "../../../../assets/BookingCalander/images/mock-user.png";
import Ribbon from "../../../../assets/BookingCalander/images/ribbon.png";
import DateIcon from "../../../../assets/BookingCalander/images/date.png";
import Close from '../../../../assets/images/OnBoarding/Close.svg';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';


function TimeAndAttendanceDetailsModal(props: any) {
  const { isAttendanceModalOpen, setIsAttendanceModalOpen, eventDetailsData } = props;

  dayjs.extend(utc)

  const eventDetails = eventDetailsData.event?._def?.extendedProps;

  const shiftInfoMock = [
    { heading: "Shift Duration", detail: dayjs(eventDetails?.shiftDate)?.utc().format('DD/MM/YYYY') },
    { heading: "Start Time", detail: dayjs(eventDetails?.shiftStartTime)?.utc().format('HH:mm a') },
    { heading: "End Time", detail: dayjs(eventDetails?.shiftEndTime)?.utc().format('HH:mm a') },
  ];
  return (
    <Modal
      centered
      width={691}
      closeIcon={< img src={Close} alt="close" />}
      footer={false}
      className="details-modal-wrapper"
      open={isAttendanceModalOpen}
      onOk={() => { setIsAttendanceModalOpen(false) }}
      onCancel={() => { setIsAttendanceModalOpen(false) }}>
      <Row>
        <Col xs={12} sm={12} md={12} style={{ margin: "2rem 0 3rem 0" }}>
          <img src={MockUser} alt="mock_user" />
          <h3 className="fs-20 fw-500 m-0">{eventDetails?.careHome?.clientName}</h3>
          <div className="detail-wrapper d-flex" style={{marginBlock:"10px"}}>
            <img src={Ribbon} alt="ribbon" />
            <span className="fs-12 fw-500" style={{ marginLeft: "10px" }}>{eventDetails?.shift?.shiftType}</span>
          </div>
          <div className="detail-wrapper d-flex">
            <img src={DateIcon} alt="date" />
            <span className="fs-12 fw-500" style={{ marginLeft: "10px" }}>{dayjs(eventDetails?.shiftDate)?.utc().format('DD/MM/YYYY')}</span>
          </div>
        </Col>
        <Col xs={12} sm={12} md={12}>
          <Row style={{ marginTop: "5rem" }}>
            {shiftInfoMock.map((data) => {
              return (
                <Fragment key={uuidv4()}>
                  <Col xs={12} className="fs-14 fw-600">
                    {data.heading}:
                  </Col>
                  <Col xs={12}>{data.detail}</Col>
                </Fragment>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Modal>
  );
}

export default TimeAndAttendanceDetailsModal;
