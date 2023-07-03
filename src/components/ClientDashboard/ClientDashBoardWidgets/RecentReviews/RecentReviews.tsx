import React from "react";
import { recentReviewsData } from "../../../../mock/ClientDashboardData";
import dayjs from "dayjs";
import { data } from "../../../../mock/SettingJobRole.ts";
import { Avatar, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const RecentReviews = ({ recentReviewsData, isLoading }: any) => {

  return (
    <>
      <div className="client-recent-reviews-wrappper bg-white">
        <h2 className="fs-20 fw-500 line-height-28 form-heading-color m-0">Recent Reviews</h2>
        {isLoading ? <div style={{ textAlign: "center", paddingTop: "30px" }}><Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} /></div> : 
        <div className="recent-reviews-content">
          {recentReviewsData?.data?.slice(0, 4).map((item: any) => (
            <div className="recent-reviews-items d-flex align-center" key={item?._id}>
              <img width={36} height={36}  src={item?.userInfo?.profilePhoto?`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.userInfo?.profilePhoto}`: `https://ui-avatars.com/api/?name=${item?.userInfo?.firstName}+${item?.userInfo?.lastName}`} alt={"img"} />
              <div className="recent-details">
                <h2 className="m-0 title-color fs-12 fw-400 line-height-18">{item?.feedback}</h2>
                <p className="m-0 fs-10 fw-400 line-height-16 light-grey-color">{dayjs(item?.createdAt).format("MMMM DD, YYYY | hh:mm a")}</p>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </>
  );
};

export default RecentReviews;
