import certificateLogo from "../../../../assets/images/Training/certificate.png";
import logo from "../../../../assets/brand/Logo.png";
import downloadIcon from "../../../../assets/icons/training/download-icon.png";
import signature from "../../../../assets/icons/training/signature.png";
import { Divider } from "antd";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server"



const CertificateCard = ({ certificate }: any) => {
  const element: any = document.getElementById('element-to-print');
  const createPDF = (clientClaim: any) => {
    const pdf = new jsPDF("portrait", "px", [900, 850]);
    pdf.html(element).then(() => {pdf.save('test.pdf')});

  };
  return (
    <div className="certificate-card" id="element-to-print">
      <div className="certificate-details d-flex justify-between" >
        <div className="content">
          <img src={logo} alt="Logo" />
          <p className="date fs-18 fw-300">
            {dayjs(certificate?.certificateIssueDate).format("MMMM DD, YYYY")}
          </p>
          <div>
            <h4 className="name fw-500">
              {certificate?.firstName}&nbsp;{certificate?.lastName}
            </h4>
            <p className="info fs-18 fw-300 m-0">
              Sucessfully completed course of
            </p>
          </div>
          <div>
            <h2 className="certificate-name fw-500">
              {certificate?.courseName}
            </h2>
            <p className="course-from fs-18 fw-300">
              Online Course from Care Library{" "}
            </p>
          </div>
          <div className="signature">
            <div className="text-center">
              <Divider />
            </div>
            <h2 className="owner fs-20 fw-500">
              {certificate?.authorFirstName}&nbsp;{certificate?.authorLastName}
            </h2>
            <p className="fs-14 fw-300 m-0">IT Instructor At Care Library</p>
          </div>
          <img className="download-icon" src={downloadIcon} alt="" onClick={createPDF} />
        </div>
        <img
          className="certificate-logo"
          src={certificateLogo}
          alt="Certificate"
        />
      </div>
    </div>
  );
};

export default CertificateCard;
