import { Button } from 'antd'
import React, { useState } from 'react'
import { recentActivityData, RecentActivityDataType } from '../../../mock/InstructorDashboard/RecentActivitiesData'
import arrowDown from "../../../assets/icons/training/arrow-down.png";
import './RecentActivities.scss'
import { useGetIntructorDashboardActivitiesQuery } from '../../../store/Slices/InstructorDashboard';
import dayjs from 'dayjs';
import LoadingSvg from "../../../assets/Login/loader-icon.gif";
import activityClock from "../../../assets/icons/training/activity-clock.png";
import activityNote from "../../../assets/icons/training/activity-note.png";

const RecentActivities = () => {
  const { data, isLoading, isSuccess } = useGetIntructorDashboardActivitiesQuery({ refetchOnMountOrArgChange: true });
  const [isShowAllRecentActivities, setIsShowAllRecentActivities] = useState<boolean>(false);

  let activitiesData: any;
  if (isSuccess) {
    activitiesData = data;
  }

  const shownActivitiesData = isShowAllRecentActivities ? activitiesData?.result : activitiesData?.result?.slice(0, 3);



  return (
    <div className="recent-activity-card">
      <h1 className="title fs-20 fw-500">Recent Activities</h1>
      <div className="recent-activities">
        {(shownActivitiesData && !isLoading) ? shownActivitiesData?.map((item: any, index: number) => {
          return (
            <div key={index} className={`news ${item?.activityType === "Courses" && "bg-blue"} ${item.bgColor}`}>
              <div className="activity-details">
                <img src={item?.activityType === "Courses" ? activityClock :activityNote } alt="" />
                <div style={{ marginLeft: "15px" }}>
                  <h2 className={`title`}>{item?.activityType}</h2>
                  <p>{item?.activityName}</p>
                </div>
              </div>
              <p className="date">{dayjs(item?.createdAt).format('DD-MM-YYYY')}</p>
            </div>
          )
        })
          : (!shownActivitiesData && !isLoading) ? (
            <div className="text-center">
              <p>No Data</p>
            </div>
          ) : (
            <div className="text-center">
              <img src={LoadingSvg} height={130} width={130} alt="LoadingSvg" />
            </div>
          )
        }
      </div>
      <div className='d-flex justify-end'>
        <Button className="fs-12 fw-500 link-btn" type="link" block onClick={() => setIsShowAllRecentActivities(!isShowAllRecentActivities)}>
          {!isShowAllRecentActivities ? "View more" : "Hide more"}
          <img src={arrowDown} alt="view more" />
        </Button>
      </div>
    </div>
  )
}

export default RecentActivities