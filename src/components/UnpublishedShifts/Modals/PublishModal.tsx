import { Modal } from "antd";

import PublishIcon from "../../../assets/icons/unpublishedShift/warning-icon.png";

type PropsType = {
  publishModal: boolean;
  onSubmit: () => void;
  setPublishModal: (value: boolean) => void;
};

const PublishModal = ({ publishModal, setPublishModal,onSubmit }: PropsType) => {
  return (
    <Modal
      width={500}
      className="publish-modal"
      centered
      footer={false}
      onCancel={() => setPublishModal(false)}
      open={publishModal}
    >
      <div className="modal-content">
        <img src={PublishIcon} alt="publish icon" />
        <p>Are you sure you want to publish this shift?</p>
        <button className="publish-btn" onClick={onSubmit}>
          Yes
        </button>
      </div>
    </Modal>
  );
};

export default PublishModal;
