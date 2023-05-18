import dayjs from "dayjs";
import profile from "../../../../assets/images/MockImages/certificate-profile.png";

const CertificateProfile = ({userData}:any) => {
  return (
    <div className="profile-card">
      <div className="profile-info" >
        <img
        src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${userData?.userProfileImg[0]?.mediaId}.${userData?.userProfileImg[0]?.mediaMeta?.extension}`} 
         alt="" 
         style={{width:'100px', height:"100px", borderRadius:'50%', border:"2px solid #65CDF0"}}
         />
        <div className="details">
          <h2 className="user-name fs-20 fw-500 m-0">{userData?.firstName}&nbsp;{userData?.lastName}</h2>
          <p className="user-grade fs-14 fw-600">
            Grade Achieved : <span className="fw-400">{userData?.gradeAchieved}%</span>
          </p>
          <p className="date fs-14 m-0">{dayjs(userData?.assessmentDate).format('MMMM DD, YYYY')}</p>
          <p className="certificate-desc fs-14 fw-400">
          {userData?.firstName}&nbsp;{userData?.lastName} Account is verified. Care Library certifies their successful completion of{" "}
            <span>{userData?.courseName}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateProfile;
