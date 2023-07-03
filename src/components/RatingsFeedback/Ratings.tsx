import { useState } from "react";
import { Card, Col, Progress, Rate, Row } from "antd";
import { v4 as uuidv4 } from "uuid";
import Excellent from "../../assets/images/Rating&Feedback/smile1.png";
import Good from "../../assets/images/Rating&Feedback/smile2.png";
import Fair from "../../assets/images/Rating&Feedback/smile3.png";
import Poor from "../../assets/images/Rating&Feedback/smile4.png";
import UserImg from "../../assets/images/MockImages/girl-sm-1.png";
import DailyReviewersGraph from "./DailyReviewsGraph";
import "./RatingsFeedback.scss";
import RatingsCircleProgress from "./RatingsCircleProgress";

const Ratings = () => {
  const [activeReviewTab, setActiveReviewTab] = useState("All Reviews");
  const RatingTypes = [
    { title: "Excellent", icon: Excellent, background: "#09AF42" },
    { title: "Good", icon: Good, background: "#F7B923" },
    { title: "Fair", icon: Fair, background: "#F98A3A" },
    { title: "Poor", icon: Poor, background: "#FF1515" },
  ];
  const ReviewsTabs = [
    {
      title: "All Reviews",
      total: "5k +",
      rating: "25",
      reviews: [
        {
          img: UserImg,
          specialFor: "Weekend",
          rating: 4.5,
          name: "Azeem Aslam",
          reviewed: "Fnac",
          date: "26.08.2022",
          decription:
            "lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a glley of type and scrambled it to make a type specimen book.It has survived not only five centuries",
        },
        {
          img: UserImg,
          specialFor: "Weekend",
          rating: 4.5,
          name: "Azeem Aslam",
          reviewed: "Fnac",
          date: "26.08.2022",
          decription:
            "lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a glley of type and scrambled it to make a type specimen book.It has survived not only five centuries",
        },
        {
          img: UserImg,
          specialFor: "Weekend",
          rating: 4.5,
          name: "Azeem Aslam",
          reviewed: "Fnac",
          date: "26.08.2022",
          decription:
            "lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a glley of type and scrambled it to make a type specimen book.It has survived not only five centuries",
        },
      ],
    },
    {
      title: "Latest Reviews",
      total: "20k +",
      rating: "50",
      // reviews: [
      //     {
      //         img: '', rating: 4.5, name: 'Azeem Aslam', reviewed: 'Fnac', date: '26.08.2022',
      //         decription: "lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a glley of type and scrambled it to make a type specimen book.It has survived not only five centuries",
      //     },
      //     {
      //         img: '', rating: 4.5, name: 'Azeem Aslam', reviewed: 'Fnac', date: '26.08.2022',
      //         decription: "lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a glley of type and scrambled it to make a type specimen book.It has survived not only five centuries",
      //     },
      //     {
      //         img: '', rating: 4.5, name: 'Azeem Aslam', reviewed: 'Fnac', date: '26.08.2022',
      //         decription: "lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a glley of type and scrambled it to make a type specimen book.It has survived not only five centuries",
      //     },
      // ]
    },
    {
      title: "Older Reviews",
      total: "35k +",
      rating: "25",
      // reviews: [
      //     {
      //         img: '', rating: 4.5, name: 'Azeem Aslam', reviewed: 'Fnac', date: '26.08.2022',
      //         decription: "lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a glley of type and scrambled it to make a type specimen book.It has survived not only five centuries",
      //     },
      //     {
      //         img: '', rating: 4.5, name: 'Azeem Aslam', reviewed: 'Fnac', date: '26.08.2022',
      //         decription: "lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a glley of type and scrambled it to make a type specimen book.It has survived not only five centuries",
      //     },
      //     {
      //         img: '', rating: 4.5, name: 'Azeem Aslam', reviewed: 'Fnac', date: '26.08.2022',
      //         decription: "lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a glley of type and scrambled it to make a type specimen book.It has survived not only five centuries",
      //     },
      // ]
    },
  ];

  return (
    <div className="main-rating-wrapper">
      <Row gutter={[30, 30]}>
        <Col xs={24} xl={13}>
          <Row gutter={[30, 15]}>
            <Col xs={24} md={11} xxl={10}>
              <Card className="progressCard">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RatingsCircleProgress />
                </div>
                <div className="card-content">
                  <h3 className="fw-500 fs-16 title-color line-height-24">
                    Rating
                  </h3>
                  <div className="rating-types">
                    {RatingTypes.map((item: any) => (
                      <div className="type" key={uuidv4()}>
                        <div
                          className="icon-hold"
                          style={{ backgroundColor: item.background }}
                        >
                          <img src={item.icon} alt={item.title} />
                        </div>
                        <p className="fw-500 fs-12 line-height-18 title-color">
                          {item.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={13} xxl={14}>
              <div className="ratingsReviews">
                <h3 className="fw-500 fs-20 line-height-30 title-color m-0">
                  Relevance
                </h3>
                <div className="reviewsTabs">
                  <Row gutter={[20, 20]}>
                    {ReviewsTabs?.map((item: any) => (
                      <Col xs={24} key={uuidv4()}>
                        <Card
                          key={item.title}
                          className={`${
                            activeReviewTab === item.title
                              ? "active"
                              : "inactive"
                          }`}
                          onClick={() => setActiveReviewTab(item.title)}
                        >
                          <Row gutter={[20, 20]} className='justify-center'>
                            <Col xs={16} className="ratingTitle" style={{padding:0}}>
                              <h3 className="fs-20 fw-600 title-color line-height-30 m-0">
                                {item.title}
                              </h3>
                              <h3 className="fs-18 fw-500 title-color line-height-26 m-0">
                                {item.total}
                              </h3>
                            </Col>
                            <Col xs={6} className="ratingPercent">
                              <Progress
                                type="circle"
                                strokeColor="#EE2E7E"
                                percent={item.rating}
                                size={65}
                              />
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </Col>
            <Col xs={24}>
              <Card>
                <div className="card-title" style={{ marginBottom: "30px" }}>
                  <h3 className="fs-12 fw-600 line-height-20 title-color">
                    Daily Reviews
                  </h3>
                </div>
                <DailyReviewersGraph />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} xl={11} className="ratingdDetails">
          {ReviewsTabs.map((items: any) => {
            return (
              <Row gutter={[10, 20]} key={uuidv4()}>
                {items.reviews &&
                  items.reviews?.map((item: any) => {
                    return (
                      <Col xs={24} key={uuidv4()}>
                        <Card>
                          <div className="card-header">
                            <img src={UserImg} alt="user-img" />
                            <div className="ratings">
                              <div className="rate">
                                <Rate
                                  allowHalf
                                  defaultValue={item.rating}
                                  disabled
                                />
                                <span className="rate-text fs-10 fw-400 line-height-18 label-color">
                                  {item.rating}0/5.00
                                </span>
                              </div>
                              <p className="m-0 fs-12 line-height-18 fw-500 label-color">
                                {item.specialFor} Special
                              </p>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="details">
                              <p
                                className="fs-12 line-height-18 fw-500"
                                style={{ color: "#6C757D" }}
                              >
                                <span
                                  className="fw-600"
                                  style={{ color: "#3C3C3C" }}
                                >
                                  {item.name}
                                </span>{" "}
                                reviewd{" "}
                                <span style={{ color: "#EE2E7E" }}>Finac</span>
                              </p>
                              <p className="fs-12 line-height-16 fw-400 label-color">
                                {item.decription}
                              </p>
                            </div>
                            <div className="published">
                              <p
                                className="fs-12 fw-400 line-height-18"
                                style={{ color: "#6C757D" }}
                              >
                                Published: {item.date}
                              </p>
                              <p
                                className="fs-12 fw-400 line-height-18 cursor-pointer"
                                style={{ color: "#6C757D" }}
                              >
                                See More
                              </p>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default Ratings;
