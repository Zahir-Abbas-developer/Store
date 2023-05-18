// Ant Components
import { Badge, Card, Col, Row } from 'antd';

// Assets
import ProfileImg from "../../../../assets/images/MockImages/child-avatar.png"
import LocationIcon from "../../../../assets/images/manageShift/locationIcon.png";
import GmailIcon from "../../../../assets/images/manageShift/gmailIcon.png";
import PhoneIcon from "../../../../assets/images/manageShift/phoneIcon.png";

const AdvanceStaffCard = ({ staffData }: any) => {
  return (
    <div className="advance-staff-card-wrapper">
    <Row gutter={[30, 30]}>
      {staffData?.map((item: any) => {

        const totalObj: any = Object.keys(item?.profileCompletion).length;
        const trueValues: any = Object.values(item?.profileCompletion).reduce(
          (a: any, item: any) => a + item,
          0
        );
        const profileCompletion = Math.round((trueValues / totalObj) * 100);

        return (
          <Col key={item?._id} xxl={12} xs={24}>
            <Card className="staff-card bg-white">
              <div className="staff-card-img text-center">
                <Badge
                  count={`${profileCompletion}%`}
                  color={
                    item?.isAudited
                      ? "#EF6327"
                      : "#0BB783"
                  }
                >
                  <img src={ProfileImg} alt="" />
                </Badge>
              </div>
              <h2 className="fs-14 fw-600 m-0 black-color text-center">
                {`${item?.firstName} ${item?.lastName}`}
              </h2>
              <div className="staff-card-btn text-center">
                <p className="fs-12 fw-600 m-0 white-color text-upercase w-100 bg-orange-color">
                  {item?.staffType?.shortForm}
                </p>
              </div>
              <div className="staff-card-data d-flex flex-column">
                <div className="staff-card-insert d-flex align-center">
                  <img src={LocationIcon} alt="" />
                  CB21 4XN(static)
                </div>
                <div className="staff-card-insert d-flex align-center">
                  <img src={GmailIcon} alt="" />
                  {item?.email}
                </div>
                <div className="staff-card-insert d-flex align-center">
                  <img src={PhoneIcon} alt="" />
                  {item?.phone}
                </div>
              </div>
            </Card>
          </Col>
        )
      })}
    </Row>
  </div>
  )
}

export default AdvanceStaffCard