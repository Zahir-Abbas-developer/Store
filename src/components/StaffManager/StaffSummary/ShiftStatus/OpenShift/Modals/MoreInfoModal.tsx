import { Col, Modal, Row } from "antd";
import HomeImg from "../../../../../../assets/images/staffManager/home.png";
import CloseIcon from "../../../../../../assets/icons/close-icon.svg";
import "./MoreInfoModal.scss";
import dayjs from "dayjs";

const MoreInfoModal = (props: any) => {
  const { isMoreInfo, setIsMoreInfo } = props;
  console.log(isMoreInfo?.data);

  return (
    <>
      <Modal
        title="More Information "
        centered
        width={784}
        open={isMoreInfo.isToggle}
        onOk={() => setIsMoreInfo({ isToggle: false, data: {} })}
        onCancel={() => setIsMoreInfo({ isToggle: false, data: {} })}
        footer={false}
        className="staff-more-information-modal"
        closeIcon={<img src={CloseIcon} alt="" />}
      >
        <div className="more-info-modal-wrapper">
          <div className="more-info-heading d-flex align-center">
            <img src={HomeImg} alt="homeIcon" />
            <span className="fs-24 fw-600 line-height-32">
              Tall Tree Care Home
            </span>
          </div>

          <div className="more-information-data d-flex flex-column">
            <Row gutter={[18, 18]} className=" more-information-content" >
              <Col xl={6} lg={8} sm={8} xs={12}>
                <span className="fs-16 fw-600 line-height-22">Address:</span>
              </Col>
              <Col xl={18} lg={12} sm={12} xs={12}>
                <span className="fs-16 fw-400 line-height-22">
                  {isMoreInfo?.data?.careHomeName?.address?.city} , {isMoreInfo?.data?.careHomeName?.address?.country}
                </span>
              </Col>
            </Row>
            <Row gutter={[18, 18]} className=" more-information-content" >
              <Col xl={6} lg={8} sm={8} xs={12}>
                <span className="fs-16 fw-600 line-height-22">
                  Total Shift Hours:
                </span>
              </Col>
              <Col xl={18} lg={12} sm={12} xs={12}>
                <span className="fs-16 fw-400 line-height-22">{isMoreInfo?.data?.totalHours}</span>
              </Col>
            </Row>
            <Row gutter={[18, 18]} className=" more-information-content" >
              <Col xl={6} lg={8} sm={8} xs={12}>
                <span className="fs-16 fw-600 line-height-22">Date:</span>
              </Col>
              <Col xl={18} lg={12} sm={12} xs={12}>
                <span className="fs-16 fw-400 line-height-22">
                  {dayjs(isMoreInfo?.data?.shift?.shiftDate).format("ddd, MMMM DD YYYY")}
                </span>
              </Col>
            </Row>
            <Row gutter={[18, 18]} className=" more-information-content" >
              <Col xl={6} lg={8} sm={8} xs={12}>
                <span className="fs-16 fw-600 line-height-22">Shift Timing:</span>
              </Col>
              <Col xl={18} lg={12} sm={12} xs={12}>
                <span className="fs-16 fw-400 line-height-22">
                  {dayjs(isMoreInfo?.data?.shift?.startTime).format("h:mm A")} TO {dayjs(isMoreInfo?.data?.shift?.endTime).format("h:mm A")}
                </span>
              </Col>
            </Row>
            <Row gutter={[18, 18]} className=" more-information-content" >
              <Col xl={6} lg={8} sm={8} xs={12}>
                <span className="fs-16 fw-600 line-height-22">
                  Total Shift Pay:
                </span>
              </Col>
              <Col xl={18} lg={12} sm={12} xs={12}>
                <span className="fs-16 fw-400 line-height-22">
                  £{isMoreInfo?.data?.rate}
                </span>
              </Col>
            </Row>
            <Row gutter={[18, 18]} className=" more-information-content" >
              <Col xl={6} lg={8} sm={8} xs={12}>
                <span className="fs-16 fw-600 line-height-22">Department:</span>
              </Col>
              <Col xl={18} lg={12} sm={12} xs={12}>
                <span className="fs-16 fw-400 line-height-22">
                  {isMoreInfo?.data?.department}
                </span>
              </Col>
            </Row>
            <Row gutter={[18, 18]} className=" more-information-content" >
              <Col xl={6} lg={8} sm={8} xs={12}>
                <span className="fs-16 fw-600 line-height-22">
                  Distance from you:
                </span>
              </Col>
              <Col xl={18} lg={12} sm={12} xs={12}>
              </Col>
            </Row>
            <span className="fs-16 fw-400 line-height-22">
              About: Care homes provide accommodation and personal care for
              people who need extra support in their daily lives. Personal care
              might include help with eating, washing, dressing, going to the
              toilet or taking medication
            </span>
          </div>


        </div>
        <div className="more-info-modal-btn">
          <button type="button" className="more-info-btn-2">
            Accept With Transport
          </button>
        </div>
      </Modal>
    </>
  );
};
export default MoreInfoModal;
