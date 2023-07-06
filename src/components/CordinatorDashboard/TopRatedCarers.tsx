import { useState } from "react";

// Ant Components
import { Rate } from "antd";

// Components
import CallModal from "./Modals/CallModal";
import MessageMailModal from "./Modals/MessageMailModal";

// RTK Hooks
import { useGetCoordinatorDashboardCarersQuery } from "../../store/Slices/CoordinatorDashboard";

// Utils and Packages
import { isNullOrEmpty } from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";

// Assets
import User5 from "../../assets/images/MockImages/user-sm-5.png";
import Message from "../../assets/images/CordinatorDashboard/msg.png";
import Call from "../../assets/images/CordinatorDashboard/call.png";
import LoadingSvg from "../../assets/Login/loader-icon.gif";

// SCSS
import "./CordinatorDashboard.scss";


const TopRatedCarers = () => {
  const [isShowCallModalOpen, setIsShowCallModalOpen] = useState<boolean>(false);
  const [isShowMailModalOpen, setIsShowMailModalOpen] = useState<boolean>(false);
  const [IsProfileModal, setIsProfileModal] = useState<boolean>(false);
  const [isProfileModalData, setIsProfileModalData] = useState<{} | undefined>({});
  const [isShowAllTopRatedCarers, setIsShowAllTopRatedCarers] = useState<boolean>(false);

  // ================================== RTK Hook ==================================
  const { data: apiData, isLoading, isSuccess } = useGetCoordinatorDashboardCarersQuery({ refetchOnMountOrArgChange: true });
  let coordinatorDashboardData: any;
  if (isSuccess) {
    coordinatorDashboardData = apiData;
  }

  // ================= if show all then show all array else only 2 =================
  const shownTopRatedCarers = isShowAllTopRatedCarers ? coordinatorDashboardData?.data?.topRatedCareres_CC : coordinatorDashboardData?.data?.topRatedCareres_CC.slice(0, 2);



  return (
    <>
      <div className="ratings d-flex">
        <h3 className="fs-20 m-0 fw-500 title-color">
          Top Rated Carers
        </h3>
        <p className="fs-16 m-0 fw-500 title-color cursor-pointer" onClick={() => setIsShowAllTopRatedCarers(!isShowAllTopRatedCarers)}>
          {!isShowAllTopRatedCarers ? "See all" : "Hide more"}
        </p>
      </div>
      <div className="w-100">
        {(shownTopRatedCarers && !isLoading) ? shownTopRatedCarers?.map((item: any) => {
          return (
            <div className="rating d-flex" key={uuidv4()} >
              <div className="d-flex" style={{ gap: "14px" }}>
                <img src={isNullOrEmpty(item?.profilePhoto) ? `https://ui-avatars.com/api/?rounded=true&name=${item?.fullName}` : `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.profilePhoto?.mediaId}.${item?.profilePhoto?.mediaMeta?.extension}`} alt="user" height={40} width={40} style={{ borderRadius: "50%" }} />
                <div>
                  <p className="fs-14 m-0 fw-600 title-color" style={{ textTransform: "capitalize" }}>{item?.fullName}</p>
                  <p className="m-0 fs-12 label-color">{item?.userTypename}</p>
                  <Rate disabled allowHalf defaultValue={item?.avgRating} />
                </div>
              </div>
              <div className="icons d-flex">
                <img
                  src={User5}
                  alt="userimg"
                  width={28}
                  height={28}
                  className="cursor-pointer"
                  onClick={() => { setIsProfileModalData(item); setIsProfileModal(true) }}
                />
                <img
                  src={Message}
                  alt="msgimg"
                  width={28}
                  height={28}
                  className="cursor-pointer"
                  onClick={() => { setIsProfileModalData(item); setIsShowMailModalOpen(true) }}
                />
                <img
                  src={Call}
                  alt="callimg"
                  width={28}
                  height={28}
                  className="cursor-pointer"
                  onClick={() => { setIsProfileModalData(item); setIsShowCallModalOpen(true) }}
                />
              </div>
            </div>
          )
        }) : (!shownTopRatedCarers && !isLoading) ? (
          <div className="text-center">
            <p>No Data</p>
          </div>
        ) : (
          <div className="text-center">
            <img src={LoadingSvg} height={130} width={130} alt="LoadingSvg" />
          </div>
        )}
        <CallModal
          isShowCallModalOpen={isShowCallModalOpen}
          setIsShowCallModalOpen={setIsShowCallModalOpen}
          selectProfileData={isShowCallModalOpen && isProfileModalData ? isProfileModalData : undefined}
        />
        <MessageMailModal
          isShowMailModalOpen={isShowMailModalOpen}
          setIsShowMailModalOpen={setIsShowMailModalOpen}
          selectProfileData={isShowMailModalOpen && isProfileModalData ? isProfileModalData : undefined}

        />
    
      </div></>

  );
};

export default TopRatedCarers;
