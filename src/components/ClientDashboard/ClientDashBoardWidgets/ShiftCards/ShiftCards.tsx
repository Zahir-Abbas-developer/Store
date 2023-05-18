import React, { useRef } from "react";
import { renderClientCard } from "../../../../mock/ClientDashboardData";
import { Button, Carousel, Spin } from "antd";
import { LeftOutlined, LoadingOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const ShiftCards = ({ title, checkStatus, buttonName, btnFunc, details, isLoading }: any) => {
  let slider: any = useRef(null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
  };

  return (
    <>
      <div className="client-shift-card bg-white">
        <h1
          className="title fs-20 fw-500 white-color m-0"
          style={{
            backgroundColor: title === "Upcoming Shifts" ? "#65CDF0" : title === "Available Shifts" ? "#8D6AB1" : title === "Last Shift Details" ? "#2BC155" : title === "Cancelled Shifts" ? "#EE2E7E" : "",
          }}
        >
          {title}
        </h1>{isLoading ? <div style={{ textAlign: "center", paddingTop: "30px" }}><Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} /></div> : 
        <div className="card-content text-center">
          <div className="card-details">
            <RightOutlined style={{ fontSize: "18px", color: "#A0A3BD" }} className="carousel-right-icon" onClick={() => slider.current.next()} />
            <Carousel {...settings} ref={slider}>
              {details?.map((detail: any) => (
                <>
                  <h2 className="card-heading fs-20 fw-500 align-center" style={{ color: "#4E4B66" }}>
                    {detail?.userName}
                  </h2>
                  <div className="item d-flex align-center">
                    <img src={renderClientCard[title]?.booking} />
                    <p>{dayjs(detail?.shiftDate).format("MMMM DD, ddd - hh:mm a")}</p>
                  </div>
                  <div className="item d-flex align-center">
                    <img src={renderClientCard[title]?.sun} />
                    <p>{detail?.shiftType}</p>
                  </div>
                  <div className="item d-flex align-center" style={{ marginBlock: "10px" }}>
                    <img src={renderClientCard[title]?.rate} />
                    <p style={{ marginBlock: "0", fontWeight: "600" }}>{detail?.shiftRate}</p>
                  </div>
                  {detail?.timeTracked && (
                    <div className="check-status d-flex justify-between">
                      <div>
                        <p>Check-In</p>
                        <h2 className="check-in fs-20 fw-500 m-0">{dayjs(detail?.timeTracked?.checkIn).format("hh:mm a")}</h2>
                      </div>
                      <div>
                        <p>Check-Out</p>
                        <h2 className="check-out fs-20 fw-500 m-0">{dayjs(detail?.timeTracked?.checkOut).format("hh:mm a")}</h2>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </Carousel>
            <LeftOutlined style={{ fontSize: "18px", color: "#A0A3BD" }} className="carousel-left-icon" onClick={() => slider.current.prev()} />
            {!checkStatus && (
              <button className="btn white-color" onClick={btnFunc}>
                {buttonName}
              </button>
            )}
          </div>
        </div>}
      </div>
    </>
  );
};

export default ShiftCards;
