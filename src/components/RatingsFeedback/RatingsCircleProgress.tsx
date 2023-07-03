import { Progress, Rate } from "antd";
import StarImg from "../../assets/images/Rating&Feedback/star.png";
import "./RatingsFeedback.scss";

const RatingsCircleProgress = () => {
  const ratings = 4.3;
  return (
    <Progress
      type="circle"
      strokeColor={{ "0%": "#B52BCC", "100%": "#4750EF" }}
      strokeWidth={6}
      trailColor="#e9eff6"
      percent={(ratings * 100) / 5}
      size={150}
      format={() => (
        <>
          <img src={StarImg} alt="starImg" width={10} height={14} />
          <p className="fs-26 fw-700 pink-color m-0">{ratings}%</p>
          <p className="fs-12 m-0 fw-400">out of 5</p>
          <Rate
            disabled
            allowHalf
            defaultValue={4.5}
            style={{ fontSize: "10px" }}
          />
        </>
      )}
    />
  );
};

export default RatingsCircleProgress;
