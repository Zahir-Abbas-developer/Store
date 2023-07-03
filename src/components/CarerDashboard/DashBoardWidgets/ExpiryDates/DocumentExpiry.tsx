import dayjs from "dayjs";
import { useGetUserOtherInfoRequestQuery } from "../../../../store/Slices/UserOtherInformation";

const DocumentExpiry = () => {
  const { id }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");
  const { data: certificationData, isSuccess: certificationIsSuccess } = useGetUserOtherInfoRequestQuery({
    refetchOnMountOrArgChange: true,
    userId: id,
    detail: "TRAININGWORK", 
  });
  
  const { data: DBSData, isSuccess: DBSIsSuccess } = useGetUserOtherInfoRequestQuery({
    refetchOnMountOrArgChange: true,
    userId: id,
    detail: "BACKGROUND",
  });

  let certificationsData: any;
  let DbsData: any;
  if (certificationIsSuccess) {
    certificationsData = certificationData;
  }
  if (DBSIsSuccess) {
    DbsData = DBSData;
  } 

  return (
    <div className="expiry-card">
      <h2 className="title">Document Expiry Dates</h2>
      <div className="card-content">
        <div className="item">
          <h2 className="title">Certifications</h2>
          <p className="date red fs-14 fw-500">{dayjs(certificationsData?.data?.userprofile[0]?.tDetails[0]?.certificateExpiryDate).format('DD-MM-YYYY')}</p>
        </div>
        <div className="item">
          <h2 className="title">Work visa</h2>
          <p className="date yellow fs-14 fw-500">{dayjs(DbsData?.data?.userprofile[0]?.rightToWork?.expiryDate).format('DD-MM-YYYY')}</p>
        </div>
        <div className="item">
          <h2 className="title">DBS</h2>
          <p className="date green fs-14 fw-500">{dayjs(DbsData?.data?.userprofile[0]?.dbsCheck?.issueDate).format('DD-MM-YYYY')}</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentExpiry;
