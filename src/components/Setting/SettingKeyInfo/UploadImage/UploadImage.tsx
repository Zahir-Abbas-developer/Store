import { useState } from "react";
import { CloudUploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import "./UploadImage.scss";
import ArrowUpIcon from "../../../../assets/icons/Setting/ArrowUpIcon.svg";
import Copyicon from "../../../../assets/icons/Setting/Copyicon.svg";
import Dottedicon from "../../../../assets/icons/Setting/Dottedicon.svg";
import Bookicon from "../../../../assets/icons/Setting/Bookicon.svg";
import SimpleBookicon from "../../../../assets/icons/Setting/SimpleBookicon.svg";
import CloudIcon from "../../../../assets/icons/Setting/CloudIcon.svg";
import ApiLoader from "../../../ApiLoader/ApiLoader";
import { useLocation } from "react-router-dom";


const { Dragger } = Upload;

const UploadImage = ({ uploadCertificateId, fileUrl, disabled}: any) => {

  const [showText, setShowText] = useState(true);
  const userData: any = JSON.parse(
    localStorage.getItem("careUserData") || "{}"
  );
  const location=useLocation()

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://gateway.dev.carelibrary.developersorcalo.com/media/upload",
    headers: { Authorization: `Bearer ${userData?.token}` },
    onChange(info) {
      if (info.fileList.length > 0) {
        setShowText(false);
      } else {
        setShowText(true);
      }
      const { status } = info.file;
      if (status !== "uploading") {
        uploadCertificateId(info.file?.response?.data?._id);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      {userData?.token ? (
        <div className="upload-image">
          {fileUrl ? (
            <Dragger disabled={disabled} {...props} accept=".pdf,.svg,.png">
              {fileUrl}

              <img
                src={ArrowUpIcon}
                alt="ArrowUpIcon"
                className="ArrowUpIcon"
              />
              <img src={Copyicon} alt="Copyicon" className="Copyicon" />
              <img src={Dottedicon} alt="Dottedicon" className="Dottedicon" />
              <img src={Bookicon} alt="Bookicon" className="Bookicon" />
              <img
                src={SimpleBookicon}
                alt="SimpleBookicon"
                className="SimpleBookicon"
              />
              <img src={CloudIcon} alt="CloudIcon" className="CloudIcon" />
            </Dragger>
          ) : (
            <Dragger {...props} disabled={disabled} accept=".pdf,.svg,.png,.mp4">
              {showText && (
                <>
                  <p className="ant-upload-drag-icon">
                    <CloudUploadOutlined />
                  </p>
                {location.pathname==="/client-profile" ? <p className="ant-upload-text fs-14 fw-600 m-0">
                    Drag and drop, or <span>Browse</span> your Logo
                  </p> :  <p className="ant-upload-text fs-14 fw-600 m-0">
                    Drag and drop, or <span>Browse</span> your files
                  </p>
}
                </>
              )}
              <img
                src={ArrowUpIcon}
                alt="ArrowUpIcon"
                className="ArrowUpIcon"
              />
              <img src={Copyicon} alt="Copyicon" className="Copyicon" />
              <img src={Dottedicon} alt="Dottedicon" className="Dottedicon" />
              <img src={Bookicon} alt="Bookicon" className="Bookicon" />
              <img
                src={SimpleBookicon}
                alt="SimpleBookicon"
                className="SimpleBookicon"
              />
              <img src={CloudIcon} alt="CloudIcon" className="CloudIcon" />
            </Dragger>
          )}
        </div>
      ) : (
        <ApiLoader />
      )}
    </>
  );
};

export default UploadImage;
