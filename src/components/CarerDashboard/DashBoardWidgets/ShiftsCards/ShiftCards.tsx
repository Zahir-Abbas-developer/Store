import { Fragment, useRef } from "react";
import dayjs from "dayjs";
import { Carousel, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { renderClientCard } from "../../../../mock/ClientDashboardData";

const ShiftCards = ({ title, checkStatus, buttonName, btnFunc, details, loading, setIsModalOpen }: any) => {
  let slider: any = useRef(null);
  const settings = { dots: true, infinite: false, speed: 500 };

  const titleColor: any = {
    "Upcoming Shifts": "#65cdf0",
    "Available Shifts": "#8d6ab1",
    "Last Shift Details": "#2bc155",
  };

  return (
    <div className="shift-card">
      <h1 className="title fs-20 fw-500 white-color m-0" style={{ backgroundColor: titleColor[title] }}>
        {title}
      </h1>
      <>
        {!loading ? (
          <div className="card-content ">
            {details?.length > 0 ? (
              <div className="card-details">
                <RightOutlined style={{ fontSize: "18px", color: "#A0A3BD" }} className="carousel-right-icon" onClick={() => slider.current.next()} />
                <Carousel {...settings} ref={slider}>
                  {details?.map((detail: any, index: number) => (
                    <Fragment key={index}>
                      <h2 className="card-heading fs-20 fw-500 align-center" style={{ color: "#4E4B66" }}>
                        {detail?.userName}
                      </h2>
                      <div className="item d-flex align-center">
                        <img src={renderClientCard[title]?.booking} /> <p>{dayjs(detail?.shiftDate).format("MMMM DD, ddd - hh:mm a")}</p>
                      </div>
                      <div className="item d-flex align-center">
                        <img src={renderClientCard[title]?.sun} /> <p>{detail?.shiftType}</p>
                      </div>
                      <div className="item d-flex align-center" style={{ marginBlock: "10px" }}>
                        <img src={renderClientCard[title]?.rate} />{" "}
                        <p style={{ marginBlock: "0" }} className="fw-400">
                          Shift Rate <span className="fw-600">{detail?.shiftRate}</span>
                        </p>
                      </div>
                      {!checkStatus && (
                        <div onClick={() => setIsModalOpen(true)} className="item d-flex align-center cursor-pointer" style={{ marginBlock: "10px" }}>
                          <img src={renderClientCard[title]?.location} />{" "}
                          <p style={{ marginBlock: "0" }} className="fs-14 fw-400">
                            {detail?.location}
                          </p>
                        </div>
                      )}
                      {detail?.timeTracked && (
                        <div className="check-status d-flex justify-between">
                          <div>
                            <p>Check-In</p> <h2 className="check-in fs-20 fw-500 m-0">{dayjs(detail?.timeTracked?.checkIn).format("hh:mm a")}</h2>
                          </div>
                          <div>
                            <p>Check-Out</p> <h2 className="check-out fs-20 fw-500 m-0">{dayjs(detail?.timeTracked?.checkOut).format("hh:mm a")}</h2>
                          </div>
                        </div>
                      )}
                    </Fragment>
                  ))}
                </Carousel>
                <LeftOutlined style={{ fontSize: "18px", color: "#A0A3BD" }} className="carousel-left-icon" onClick={() => slider.current.prev()} />
                {!checkStatus && (
                  <button className="btn white-color" onClick={btnFunc}>
                    {buttonName}
                  </button>
                )}
              </div>
            ) : (
              <p className="disabled-color fw-700">No Data</p>
            )}
          </div>
        ) : (
          <Skeleton loading={loading} active>
            <Meta 
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        )}
      </>
    </div>
  );
};
export default ShiftCards;
