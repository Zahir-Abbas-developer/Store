import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';

import Pending from "../../../assets/images/CordinatorDashboard/pending.png";
import Requests from "../../../assets/images/CordinatorDashboard/requests.png";
import Open from "../../../assets/images/CordinatorDashboard/open.png";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import DateTime from "../../../assets/images/CordinatorDashboard/date.png";
import Location from "../../../assets/images/CordinatorDashboard/location.png";
import User from "../../../assets/images/CordinatorDashboard/user.png";
import dayjs from 'dayjs';
import LoadingSvg from "../../../assets/Login/loader-icon.gif";


const CustomCarousel: React.FC<any> = ({ isShiftsDataLoading, items, type }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();


  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? items?.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === items?.length - 1 ? 0 : prevIndex + 1));
  };

  // if (autoplay) {
  //   setTimeout(() => {
  //     handleNextClick();
  //   }, interval);
  // }

  let activeItem: any;
  if (items && items?.length) activeItem = items[activeIndex];


  if (isShiftsDataLoading) {
    return <div className="text-center">
      <img src={LoadingSvg} height={200} width={200} alt="LoadingSvg" />
    </div>
  }
  

  return (
    <div className="card-body text-center">
      <p className="title-color fs-20 fw-500 line-height-28">
        {activeItem?.careHome?.clientName ?? <span>&nbsp;</span>}
      </p>
      <div className="details">
        <LeftOutlined onClick={handlePrevClick} />

        <div className="card-details">

          <div className="d-flex">
            <img
              src={type === "shift_request" ? DateTime : Requests}
              alt="DateTimeImg"
              width={18}
              height={22}
            />
            {type === "shift_request" ? (
              <span className="title-color fs-14 fw-400 line-height-22">
                {/* {dayjs("")} activeItem?.shiftDate ddd, MMM D, YYYY h:mm Addd, MMM D, YYYY h:mm A  */}
                {dayjs(activeItem?.shiftDate).format("MMM D, ddd - h:mm A")}
              </span>
            ) : (
              <span className="title-color fs-14 fw-400 line-height-22">
                  Total Request: {activeItem?.requested ?? activeItem?.total ?? 0}
              </span>
            )}
          </div>

          <div className="d-flex">
            <img
              src={type === "shift_request" ? Location : Open}
              alt="DateTimeImg"
              width={18}
              height={22}
            />
            <span className="title-color fs-14 fw-400 line-height-22" style={{ textTransform: "capitalize" }}>
              {type === "shift_request" ? (
                (activeItem?.careHome?.address?.country ?? " ") + " " + (activeItem?.careHome?.address?.city ?? " ") + " " + (activeItem?.careHome?.address?.line1 ?? " ")
              ) :
                <span className="title-color fs-14 fw-400 line-height-22">
                  {type !== "whistle_blowing" ? "Booked Shifts:" : "Open Requests"} {activeItem?.booked ?? activeItem?.resolved ?? 0}
                </span>}
            </span>
          </div>

          <div className="d-flex">
            <img
              src={type === "shift_request" ? User : Pending}
              alt="DateTimeImg"
              width={18}
              height={22}
            />
            <span className="title-color fs-14 fw-400 line-height-22" style={{ textTransform: "capitalize" }}>
              {type === "shift_request" ? (
                activeItem?.carerType?.name
              ) :
                <span className="title-color fs-14 fw-400 line-height-22">
                  {type !== "whistle_blowing" ? "Pending Shifts:" : "Pending Requests"}  {((activeItem?.requested ?? 0) - (activeItem?.booked ?? 0)) ?? activeItem?.pending}
                </span>}
            </span>
          </div>
        </div>
        <RightOutlined onClick={handleNextClick} />
      </div>


      <div className="btn-more">
        <Button
          className="fs-14 fw-600 line-height-22 cursor-pointer"
          onClick={() => navigate(`/shift-manager/${activeItem?._id}`)}
          type="primary"
        >
          More Details
        </Button>
      </div>
    </div>
  );
};

export default CustomCarousel;
