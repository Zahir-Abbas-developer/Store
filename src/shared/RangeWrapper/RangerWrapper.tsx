import { Col, Row, Slider } from 'antd'
import React from 'react';
import './RangerWrapper.scss';

const handleStyling: any = {
  color: "blue",
  border: "7px solid white",
  borderRadius: 5,
  height: 29,
  width: 16,
  position: "absolute",
  top: -4,
  boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
};

const RangerWrapper = (props: any) => {
  const { onChange, label, value, text, defaultValue } = props;
  return (
    <>
      <Row style={{ flexWrap: "nowrap" }} align="middle" className="sliderbar-wrapper" gutter={[10, 10]}>
        <div className="slider-text">{label}</div>
        <div className="slider-text fs-12 fw-400 title-color line-height-20">0</div>
        <Col style={{ width: "100%", maxWidth: "294px", marginTop: -10 }}>
          <Slider
            className="slider-bar "
            handleStyle={handleStyling}
            trackStyle={{ background: "linear-gradient(90deg, #6BCAFF 0%, #426BFF 100%)", height: 12, borderRadius: 6 }}
            railStyle={{ background: "linear-gradient(90deg, #FFFFFF 0%, #EAEAEA 100%)", height: 12, borderRadius: 6 }}
            min={0}
            max={100}
            defaultValue={defaultValue}
            onChange={onChange}
            value={typeof value === "number" ? value : 0}
          />
        </Col>
        <Col>
          <p className="slider-text fs-12 fw-400 title-color line-height-20">{text}</p>
        </Col>
      </Row>
    </>
  )
}

export default RangerWrapper