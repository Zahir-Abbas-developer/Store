import { Card, Col, Progress, Row } from "antd";
import ProfileImg from "../../../../../assets/images/MockImages/child-avatar.png";
import LocationIcon from "../../../../../assets/images/manageShift/locationIcon.png";
import GmailIcon from "../../../../../assets/images/manageShift/gmailIcon.png";
import PhoneIcon from "../../../../../assets/images/manageShift/phoneIcon.png";

const AdvanceStaffViewCard = ({ staffData }: any) => {
  return (
    <>
      <div className="advance-search-collapse-card d-flex flex-column">
        {staffData?.map((item: any) => {
          
          const totalObj: any = Object.keys(item?.profileCompletion).length;
          const trueValues: any = Object.values(item?.profileCompletion).reduce(
            (a: any, item: any) => a + item,
            0
          );
          const profileCompletion = Math.round((trueValues / totalObj) * 100);
          
          return (
            <Card key={item._id} className="advance-search-card-item bg-white">
              <Row gutter={[30, 20]}>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <div className="advance-img d-flex w-100">
                    <div>
                      <img src={ProfileImg} alt="" />
                    </div>
                    <div className="advance-content-wrap w-100">
                      <h2 className="fs-14 fw-600 m-0 black-color">
                        {`${item?.firstName} ${item?.lastName}`}
                      </h2>
                      <p className="fs-14 fw-400 m-0 title-color">{`User Type: ${item?.staffType?.shortForm}`}</p>
                      <div className="advance-progress">
                        <p className="fs-12 fw-600 title-color m-0">{`${profileCompletion}%`}</p>
                        <Progress
                          percent={profileCompletion}
                          size="small"
                          strokeColor={item?.isAudited ? "#EF6327" : "#0BB783"}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                  <div className="staff-view-data d-flex flex-column">
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
                </Col>
              </Row>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default AdvanceStaffViewCard;
