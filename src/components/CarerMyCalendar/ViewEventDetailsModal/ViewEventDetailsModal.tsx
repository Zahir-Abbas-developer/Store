import { Fragment } from "react"
import { Modal, } from "antd"
import HomeIcon from '../../../assets/icons/home-pink.svg'
import '../../CarerMyCalendar/CarerMyCalendar.scss';
import dayjs from "dayjs"

const ViewEventDetailsModal = ({ isViewModalOpen, setIsViewModalOpen, eventClicked }: any) => {
  const eventView = eventClicked?.event?._def?.extendedProps;

  const viewModal = [
    { heading: "Address:", text: (item: any) => `${item?.carer?.address?.city}, ${item?.carer?.address?.county}, ${item?.carer?.address?.country} ` },
    { heading: "Total Shift Hours:", text: (item: any) => `${item.totalHours} Hrs.` },
    { heading: "Date:", text: (item: any) => `${dayjs(item?.shift?.shiftDate).format('MMM DD,ddd - YYYY')}` },
    { heading: "Shift Timing:", text: (item: any) => `${dayjs(item?.shift?.startTime).format('hh:mm')} - ${dayjs(item?.shift?.endTime).format('hh:mm')}` },
    { heading: "Total Shift Pay:", text: (item: any) => `£${item?.totalAmount}` },
    { heading: "Department:", text: (item: any) => `${item?.shift?.department}` },
    { heading: "Distance from you:", text: (item: any) => `` },
  ]

  return (
    <Fragment>
      <Modal title="More Information" className="carer-my-calendar-event-details" width={780} open={isViewModalOpen} centered footer={false} onOk={() => setIsViewModalOpen(false)} onCancel={() => setIsViewModalOpen(false)} >
        <div className="calendar-event-details-wrapper">
          <div className="d-flex align-center">
            <img src={HomeIcon} alt="" />
            <span className="fs-24 fw-600" style={{ marginLeft: "15px", color: "#14142B" }}>Tall Tree Care Home</span>
          </div>
          <div style={{ paddingTop: "30px", paddingBottom: "10px" }}>
            {viewModal.map((item: any) => (
              <div className="d-flex align-center" style={{ paddingBottom: "15px" }}>
                <span className="fs-16 fw-600" style={{ width: "160px", color: "#14142B" }}>{item.heading}</span>
                <span className="fs-16" style={{ color: "#4E4B66" }}>{item.text(eventView)}</span>
              </div>
            ))}
          </div>
          <span className="fs-12">About: Care homes provide accommodation and personal care for people who need extra support in their daily lives. Personal care might include help with eating, washing, dressing, going to the toilet or taking medication</span>
        </div>
      </Modal >
    </Fragment>
  )
}

export default ViewEventDetailsModal