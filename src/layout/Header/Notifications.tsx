import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Notifications from "../../assets/icons/sidebar/notifications.png";
import User1 from "../../assets/images/notifications/img1.png";
import User2 from "../../assets/images/notifications/img2.png";
import User3 from "../../assets/images/notifications/img3.png";
import { Popover } from "antd";
import "./Header.scss";
import { useGetOverAllNotificationsQuery } from "../../store/Slices/Notifications";
import { isNullOrEmpty } from "../../utils/utils";
import dayjs from "dayjs";

const NotificationsPopup = () => {
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const {data ,isSuccess}=useGetOverAllNotificationsQuery({})
  let notificationsData:any
  if(isSuccess){
    notificationsData=data
  }
  const handleOpenChange = (newisOpenNotification: boolean) => {
    setIsOpenNotification(newisOpenNotification);
  };
 
  const content = (
    <div className="notification">
      {notificationsData?.data?.map((item: any) => (
        <div key={uuidv4()}>
          <div className="card-title d-flex">
            <span className="fs-14 fw-500" style={{ color: "#14142B" }}>
              {item?.day}
            </span>
            <span className="fs-14 fw-500" style={{ color: "#65CDF0" }}>
              ({item?.total})
            </span>
          </div>
          <div className="detailed-notifications">
            {item.notifications.map((val: any) => (
              <div className="card" key={uuidv4()}>
                <div className="d-flex">
                  <img
                  src={
                    isNullOrEmpty(val?.profilePhoto)
                      ? `https://ui-avatars.com/api/?rounded=true&name=${val.firstName} ${val.lastName}`
                      : `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${val?.profilePhoto?.mediaId}.${val?.profilePhoto?.mediaMeta?.extension}`
                  }
                    alt="notificationImg"
                    width={40}
                    height={40}
                  />
                  <div className="description">
                    <p
                      className="m-0 fw-400 fs-12"
                      style={{ color: "#4E4B66" }}
                    >
                      {val?.notification?.description}
                    </p>
                    <p
                      className="m-0 fw-400 label-color"
                      style={{ fontSize: "8px" }}
                    >
                      {dayjs(val?.notification?.createdAt).format("DD-MM-YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <Popover
      content={content}
      title={false}
      arrow={false}
      trigger="click"
      open={isOpenNotification}
      onOpenChange={handleOpenChange}
      rootClassName="notifications-popup"
    >
      <img
        src={Notifications}
        alt="notifications"
        height={22}
        width={18}
        className="cursor-pointer"
      />
    </Popover>
  );
};

export default NotificationsPopup;
