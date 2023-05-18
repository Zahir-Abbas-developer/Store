import { Col, Input, Row } from "antd";
import { cardData, CardDataType, TagsType } from "../../../../../mock/UnpublishedShifts/CardData";
import SearchIcon from "../../../../../assets/icons/Search.png";
import './Modal.scss';

const BookStaff = () => {
    return (
        <>
            <div className="book-staff-wrapper">
                <div className="header">
                    <p className="date">
                        <span>Date :</span> Sunday January 9 2022
                    </p>
                    <div>
                        <Input
                            placeholder="search"
                            size="large"
                            prefix={<img src={SearchIcon} alt="search-icon" />}
                        />
                    </div>
                </div>
                <div className="staff-details">
                    <p className="title fw-500 fs-20 line-height-28">Staff Details</p>
                    <Row gutter={[24, 16]}>
                        {cardData.map((card) => (
                            <Col xs={24} md={12} lg={12} xl={8}>
                                <div className="staff-card">
                                    <div className="card-header">
                                        <div className="user-info">
                                            <img src={card?.userImg} alt="profile" />
                                            <div style={{ marginLeft: "10px" }}>
                                                <h2 className="user-name fw-600 title-color fs-14 line-height-27">{card?.name}</h2>
                                                <p className="user-role  fw-400 title-color fs-10 line-height-22">{card?.role}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="total-shift  fw-600 title-color fs-14 line-height-17">
                                                Total Shifts: <span className=" fw-400 title-color fs-14 line-height-22">{card?.totalShifts}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="tags">
                                        {card?.tags.map((tag: TagsType) => (
                                            <div className="tag" key={tag.title}>
                                                <img src={tag.icon} alt="" />
                                                <p className=" fw-400 title-color fs-14 line-height-22">{tag.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="card-btn">
                                        <button className="btn confirm  fw-600 title-color fs-14 line-height-22">Request Confirmation</button>
                                        <button className="btn allocate  fw-600 title-color fs-14 line-height-22">Allocate</button>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </>

    );
};

export default BookStaff;
