import React, { useState } from 'react';
import { CloudUploadOutlined } from "@ant-design/icons";
import "./UploadImage.scss";
import ArrowUpIcon from "../../../../assets/icons/Setting/ArrowUpIcon.svg";
import Copyicon from "../../../../assets/icons/Setting/Copyicon.svg";
import Dottedicon from "../../../../assets/icons/Setting/Dottedicon.svg";
import Bookicon from "../../../../assets/icons/Setting/Bookicon.svg";
import SimpleBookicon from "../../../../assets/icons/Setting/SimpleBookicon.svg";
import CloudIcon from "../../../../assets/icons/Setting/CloudIcon.svg";
import ApiLoader from "../../../ApiLoader/ApiLoader";
import { useLocation } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Dragger } = Upload;

const Thumbnail = ({ uploadCertificateThumbnail, fileUrl, disabled}: any) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [showText, setShowText] = useState(true);
  const userData: any = JSON.parse(
    localStorage.getItem("careUserData") || "{}"
  );
  const location=useLocation()

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://thankful-onesies.cyclic.app/uploads",
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJzdWIiOiI2NDM1NGY4MmUzOWQ3N2JkNTgzZTIwNzIiLCJpYXQiOjE2ODU1MzI4NDksImV4cCI6MTY4NTYxOTI0OX0.Pa6J_v8K8DUxFkCu5Mam5mfNqW9gA9YPPmpdJbtZBmI` },
    onChange(info) {
      console.log(info.file)
      if (info.fileList.length > 0) {
        setShowText(false);
      } else {
        setShowText(true);
      }
      const { status } = info.file;
      if (status !== "uploading") {
       
        uploadCertificateThumbnail(info.file?.response[0]?.url);
        console.log(info.file)
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
      { (
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
            <Dragger {...props} disabled={disabled} accept=".pdf,.svg,.png,.mp4,.jfif,.jpeg">
              {showText && (
                <>
                  <p className="ant-upload-drag-icon">
                    <CloudUploadOutlined />
                  </p>
                {location.pathname==="/client-profile" ? <p className="ant-upload-text fs-14 fw-600 m-0">
                    Drag and drop, or <span>Browse</span> your Product files
                  </p> :  <p className="ant-upload-text fs-14 fw-600 m-0">
                    Drag and drop, or <span>Browse</span> your Product files
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
      ) }
    </>
  );

}




export default Thumbnail;
