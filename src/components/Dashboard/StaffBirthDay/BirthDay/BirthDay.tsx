import { useState } from "react";
import { Card, Col, Divider, Layout, Row, Button, Spin } from "antd";
import { v4 as uuidv4 } from "uuid";
import { StaffBirthDayData } from "../../../../mock/Dashboard";
import BirthDayModal from "../../../../shared/BirthDayModal/BirthDayModal";
import BirthdayCake from "../../../../assets/images/AdminDashboard/birthday-cake.png";
import "./BirthDay.scss";
import { LoadingOutlined } from "@ant-design/icons";

export const StaffBirthDay = ({ birthDaysData, isLoading }: any) => {
  //state
  const [isModalOpen, setIsOpenModal] = useState(false);

  //Main
  return (
    <Layout className="dashboard bg-unset">
      {
        <Card className=" overallscroe-card birthday-card border-radius-10 card-bg-color" bordered={false} style={{ minHeight: "400px" }}>
          <div className="attendance-summary d-flex justify-between">
            <p
              className="fw-500 fs-20"
              style={{
                color: "#4E4B66",
                marginTop: "0px",
                paddingLeft: "10px",
                marginBottom: "18px",
              }}
            >
              Today's Birthday
            </p>
          </div>
          {isLoading ? <div style={{ textAlign: "center", paddingTop: "30px" }}><Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} /></div> : <Row gutter={[13, 0]} className="birthday-card-details">
            {birthDaysData?.length > 0 ? birthDaysData?.slice(0, 4)?.map((card: any, index: number) => {
              return (
                <Col lg={{ span: 23, offset: 1 }} xl={{ span: 23, offset: 1 }} sm={{ span: 23, offset: 1 }} xs={{ span: 23, offset: 1 }} md={{ span: 23, offset: 1 }} key={uuidv4()}>
                  <div className="border-radius-10" key={index} style={{ border: "none" }}>
                    <div className="d-flex align-center justify-between">
                      <div className="d-flex align-center todays-birthday-details">
                        <img
                          src={card?.profilePhoto?.mediaId ? `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${card?.profilePhoto?.mediaId}.${card?.profilePhoto?.mediaMeta?.extension}` : `https://ui-avatars.com/api/?name=${card?.firstName}+${card?.lastName}`}
                          height={37}
                          width={37}
                          style={{ background: "#F7B923", borderRadius: "50%" }}
                          alt={`Image for ${card.text}`}
                        />
                        <span className="fw-600 fs-14" style={{ paddingLeft: "10px" }}>
                          {`${card?.firstName} ${card?.lastName}`}
                        </span>
                      </div>
                      <Button
                        type="primary"
                        className="fw-500 fs-16 cursor-pointer border-radius-4"
                        style={{
                          padding: "2px 11px",
                        }}
                        onClick={() => {
                          setIsOpenModal(true);
                        }}
                      >
                        Wish Him
                      </Button>
                    </div>
                    <Divider style={{ padding: "0px", margin: "13px" }} />
                  </div>
                </Col>
              );
            }) : <Col span={24} style={{ textAlign: "center",marginTop:"20px",fontSize:"16px" }}>There is no Birthday today !!</Col>}
          </Row>}
          <BirthDayModal
            iconImage={BirthdayCake}
            isModalOpen={isModalOpen}
            setIsOpenModal={setIsOpenModal}
            birthDayMessage="Are you sure you want to Send Birthday Notification ?"
            wishButtonText="Wish Birthday"
            backgroundColor="#65CDF0"
          />
        </Card>
      }
    </Layout>
  );
};
