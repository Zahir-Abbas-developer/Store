import { Progress, Rate, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import { useGetUserOtherInfoRequestQuery } from "../../../../store/Slices/UserOtherInformation";

const Rating = () => {
  const { id }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

  const ratingStatus: string[] = ["1/5", "2/5", "3/5", "4/5", "5/5"];
  const { data, isLoading, isSuccess } = useGetUserOtherInfoRequestQuery({ refetchOnMountOrArgChange: true, userId: id, detail: "ABOUT" });

  let ratingsData: any;
  if (isSuccess) {
    ratingsData = data;
  } 
  

  const ratingValue = ratingsData?.data?.ratings[0]?.averageRatings ?? 0;
  const punctualityValue = ratingsData?.data?.ratings[0]?.averageRatings ?? 0;
  const attitudeValue = ratingsData?.data?.ratings[0]?.averageRatings ?? 0;

  return (
    <div className="rating-card">
      <h1 className="title">Overall Rating</h1>
      {!isLoading ? (
        <div>
          <div className="card-content d-flex align-center">
            <Rate disabled value={ratingValue} />
            <p className="rating-status">
              {ratingStatus[ratingValue - 1]} ({ratingsData?.data?.ratings[0]?.total} reviews)
            </p>
          </div>
          <div className="progress-bars">
            <div className="punctuality-progress">
              <div className="d-flex justify-between align-center">
                <p style={{ color: "#4E4B66" }} className="m-0 fs-12">
                  Punctuality
                </p>
                <p className="fs-12 fw-500 m-0" style={{ color: "#6E7191" }}>
                  {punctualityValue.toFixed()}/5
                </p>
              </div>
              <Progress strokeWidth={6} strokeColor={"#65CDF0"} percent={punctualityValue * 20} showInfo={false} />
            </div>
            <div className="attitude-progress">
              <div className="d-flex justify-between align-center">
                <p style={{ color: "#4E4B66" }} className="m-0 fs-12">
                  Attitude
                </p>
                <p className="fs-12 fw-500 m-0" style={{ color: "#6E7191" }}>
                  {attitudeValue.toFixed()}/5
                </p>
              </div>
              <Progress strokeWidth={6} strokeColor={"#F7B923"} percent={attitudeValue * 20} showInfo={false} />
            </div>
          </div>
        </div>
      ) : (
        <Skeleton loading={isLoading} active>
          <Meta title="Card title" description="This is the description" />
        </Skeleton>
      )}
    </div>
  );
};

export default Rating;
