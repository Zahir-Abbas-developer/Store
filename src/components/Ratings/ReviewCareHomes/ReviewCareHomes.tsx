import { Card, Col, Row } from "antd"
import { OverAllRatingsData, ReviewedCareHomeData } from "../../../mock/Ratings"
import { Rate } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import PhoneIcon from "../../../assets/icons/Ratings/phone-icon.svg"
import Ratings from "../../../assets/icons/Ratings/ratings-icon.svg"
import EmailIcon from "../../../assets/icons/Ratings/email-icon.svg"
import "../../../sass/common.scss"
import "./ReviewCareHomes.scss"

export const ReviewCareHomes = () => {
    return (
        <div className="ratings-reviews">
            <Row gutter={[26, 26]}>
                <Col lg={24} xxl={16} xl={24} md={24} xs={24} sm={24} style={{ maxHeight: "700px", overflow: "auto", }} className="review-ratings">
                    {OverAllRatingsData.map((ratingsData: any) => {
                        return (
                            <Card key={uuidv4()} className="reviewed-ratings-details cursor-pointer" style={{ boxShadow: "0px 0px 18px rgba(0, 0, 0, 0.08)", borderRadius: "10px", marginBottom: "20px" }}>
                                <Row className="reviewed-details">
                                    <Col lg={24} xxl={24} xl={24} md={24} xs={24} sm={24}>
                                        <div className="review-care-homes" style={{ display: "-webkit-box" }}>
                                            <img src={ratingsData.img} alt="review-care-homes" />
                                            <div style={{ marginLeft: "22px" }} className="review-care-homes-details">
                                                <p className="fw-600 fs-14 m-0" style={{ color: "#6E7191" }} >{ratingsData.title}</p>
                                                <Rate allowHalf defaultValue={ratingsData.stars} style={{ color: "#FABF35" }} />
                                                <p className="fw-400 fs-14" style={{ color: "#9DA1A6", marginTop: "8px" }}>{ratingsData.description}</p>

                                            </div>
                                        </div>
                                        <p className="fw-400 fs-14 m-0" style={{ color: "#969BA0", textAlign: "end" }}>{ratingsData?.createdDate}</p>
                                    </Col>
                                </Row>
                            </Card>
                        )
                    })}
                </Col>
                <Col lg={24} xxl={8} xl={24} md={24} xs={24} sm={24} style={{ borderLeft: "1px solid #D9DBE9" }} className="client-average-ratings">
                    <div>
                        <div style={{ textAlign: "center" }}>
                            <Rate allowHalf defaultValue={4} style={{ color: "#FABF35" }} />
                            <p className="fw-600 fs-14" style={{ color: "#969BA0", paddingBottom: "20px", marginTop: "12px" }} >Client Average Rating 4.0</p>
                            <img src={Ratings} height={116} width={116} alt="review-care-homes"/>
                        </div>
                        <span className="fw-600 fs-14" style={{ color: "#A0A3BD" }}>Basic info</span>
                        <div style={{ textAlign: "center" }}>
                            <p className="fw-500 fs-16" style={{ color: "#6E7191", paddingRight: "20px", marginBottom: "20px" }}>Tall Tree Care Home</p>
                            <div className="d-flex align-center justify-center">
                                <img src={EmailIcon}  alt="review-care-homes"/>
                                <p className="fw-500 fs-14 m-0" style={{ color: "#6E7191", paddingLeft: "10px" }} >talltree.care@xyz.com</p>
                            </div>
                            <div className="d-flex align-center justify-center">
                                <img src={PhoneIcon} alt="review-care-homes"/>
                                <p className="fw-500 fs-14" style={{ color: "#6E7191", paddingLeft: "10px" }} >41 333 222 1100</p>
                            </div>
                        </div>
                    </div>
                    <p className="fw-600 fs-14" style={{ color: "#A0A3BD" }}>Shift Details</p>
                    {ReviewedCareHomeData.map((clientData: any) => {
                        return (

                            <Row key={uuidv4()} style={{ marginBottom: "9px" }}>
                                <Col lg={12} xl={12} md={12} xs={24} sm={12}>
                                    <p className="fw-600 fs-12" style={{ color: "#6E7191" }}>Date</p>
                                    <p className="fw-600 fs-12" style={{ color: "#6E7191" }}>Shift Timing</p>
                                    <p className="fw-600 fs-12" style={{ color: "#6E7191" }}>Check In/Check Out Time</p>
                                    <p className="fw-600 fs-12" style={{ color: "#6E7191" }}>Total Shift Hours</p>
                                    <p className="fw-600 fs-12" style={{ color: "#6E7191" }}>Total Shift Pay</p>
                                    <p className="fw-600 fs-12" style={{ color: "#6E7191" }}>Extra Hours Worked</p>
                                    <p className="fw-600 fs-12" style={{ color: "#6E7191" }}>Department</p>
                                </Col>
                                <Col lg={12} xl={12} md={12} xs={24} sm={12}>
                                    <p className="fw-400 fs-12" style={{ color: "#6E7191" }}>   {clientData?.date}</p>
                                    <p className="fw-400 fs-12" style={{ color: "#6E7191" }}>   {clientData?.shiftTiming}</p>
                                    <p className="fw-400 fs-12" style={{ color: "#6E7191" }}>   {clientData?.checkInOut}</p>
                                    <p className="fw-400 fs-12" style={{ color: "#6E7191" }}>   {clientData?.totalShiftHours}</p>
                                    <p className="fw-400 fs-12" style={{ color: "#6E7191" }}>   {clientData?.totalShiftPay}</p>
                                    <p className="fw-400 fs-12" style={{ color: "#6E7191" }}>   {clientData?.extraHoursWorked}</p>
                                    <p className="fw-400 fs-12" style={{ color: "#6E7191" }}>   {clientData?.department}</p>
                                </Col>
                            </Row>
                        )
                    })}
                </Col>
            </Row>
        </div>
    )
}