import { Rate, Spin } from "antd";
import RatingGraph from "./RatingGraph/RatingGraph";
import { LoadingOutlined } from "@ant-design/icons";

const OverAllRating = ({ data, isLoading }: any) => {
  return (
    <>
      <div className="client-graph-rating-wrapper bg-white">
        <h2 className="fs-20 fw-500 m-0 title-color">Overall Rating</h2>
        {isLoading && <div style={{ textAlign: "center", paddingTop: "40px" }}><Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} /></div>}
        {!isLoading && <RatingGraph graphData={data?.data} />}
        {!isLoading && <div className="client-graph-rating text-center">
          <Rate allowHalf value={Number(data?.data?.averageData[0]?.average)} style={{ color: "#FABF35" }} />
        </div>}
      </div>
    </>
  );
};

export default OverAllRating;
