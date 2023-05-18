import { Col, Row } from "antd";
import React, { FC } from "react";
interface ISingleCard {
  icon:string,
  count:string,
  text:string,
  background?:string,
}
const SingleCard:FC<ISingleCard> = (props) => {
  const {icon,count,text,background} = props;
  return (
    <Row className="single-card">
      <Col>
        <div className="img-wrapper" style={{background:background}}>
          <img src={icon} alt={""} />
        </div>
      </Col>
      <Col>
        <p className="card-count">{count}</p>
        <p className="card-text">{text}</p>
      </Col>
    </Row>
  );
};

export default SingleCard;
