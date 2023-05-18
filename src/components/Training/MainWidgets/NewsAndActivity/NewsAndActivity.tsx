import { Button } from "antd";

import arrowDown from "../../../../assets/icons/training/arrow-down.png";
import {
  newsActivityData,
  NewsActivityDataType,
} from "../../../../mock/TrainingData/NewsActivityData";
import { useGetNewsAndActivitiesQuery } from "../../../../store/Slices/Training";

import activityClock from "../../../../assets/icons/training/activity-clock.png";
import activityNote from "../../../../assets/icons/training/activity-note.png";
import dayjs from "dayjs";
import { useState } from "react";




const NewsAndActivity = () => {

  const { data:isNewsData, isLoading:isNewsLoading, isError:isNewsError, isSuccess:isNewsSucess } = useGetNewsAndActivitiesQuery([])
  
  let getNewsandRatingsData: any;
  if (isNewsLoading) {
    getNewsandRatingsData = <p>Loading...</p>
  }
  else if (isNewsSucess) {
    getNewsandRatingsData = isNewsData
  }
  else if (isNewsError) {
    getNewsandRatingsData = <p>Error...</p>
  }
  console.log("getNewsandRatingsData =>>",getNewsandRatingsData?.result)


  const [showAll, setShowAll] = useState(false); 

  const handleViewMore = () => {
    setShowAll(true); 
  };
  const handleShowLess = () => {
    setShowAll(false); 
  };

  return (
    <div className="news-activity-card">
    <h1 className="title">News and Activity</h1>
    <div className="news-activities">
      {getNewsandRatingsData?.result
        ?.slice(0, showAll ? getNewsandRatingsData?.result.length : 3) 
        .map((item: any, index: number) => (
          <div key={index} className={`news ${item.bgColor}`}>
            <div className="news-details">
              <img src={activityNote} alt="" />
              <div style={{ marginLeft: '10px' }}>
                <h2 className={`title yellow`}>{item?.activityType}</h2>
                <p>{item.activityName}</p>
              </div>
            </div>
            <p className="date">{dayjs(item.createdAt).format('DD-MM-YYYY')}</p>
          </div>
        ))}
    </div>
    {!showAll && ( // Render the "View More" button only if showAll is false
      <Button className="fs-12 fw-500 link-btn" type="link" block onClick={handleViewMore}>
        View More
        <img src={arrowDown} alt="view more" />
      </Button>
    )}
    {showAll && 
      <Button className="fs-12 fw-500 link-btn" type="link" block onClick={handleShowLess}>
      Show Less
      <img style={{transform:'rotate(180deg)'}} src={arrowDown} alt="view more" />
    </Button>
    }
  </div>
  );
};

export default NewsAndActivity;
