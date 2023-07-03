import { Modal, Progress } from "antd";
import UploadImage from "../../../Setting/SettingKeyInfo/UploadImage/UploadImage";
import Close from '../../../../assets/images/OnBoarding/Close.svg';

const ImportStaffCodeModal = (props: any) => {
  const { isImportStaff, setIsImportStaff } = props;
  return (
    <Modal
      title={<span className="fs-20 fw-500">Import Record</span>}
      closeIcon={< img src={Close} alt="close-icon" />}
      open={isImportStaff}
      onOk={() => setIsImportStaff(false)}
      onCancel={() => setIsImportStaff(false)}
      className="add-client-modal-main"
      centered
      footer={false}
      width={500}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ paddingTop: "1rem" }}>
          <UploadImage id="" />
        </div>
        <Progress
          showInfo={false}
          percent={90}
          trailColor="#D9DBE9" 
          strokeColor="#00AF2F"
          size={[300, 20]}
        />
        <button className="fs-14 fw-600 cursor-pointer"
          style={{
            backgroundColor: "#F7B923",
            borderRadius: "2px",
            border: 'none',
            color: "white",
            marginTop: "1rem",
            padding: '8px 28px',
            height: "38px",
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
          }}
        >
          Upload
        </button>
      </div>
    </Modal>
  );
};

export default ImportStaffCodeModal;
