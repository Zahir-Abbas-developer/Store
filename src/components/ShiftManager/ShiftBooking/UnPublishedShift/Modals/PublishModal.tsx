import { Modal } from "antd";
import PublishIcon from "../../../../../assets/icons/unpublishedShift/warning-icon.png";
import "./Modal.scss";

const PublishModal = ({ isPublishModal, setIsPublishModal,onSubmit }: any) => {
  return (
      <Modal
        width={500}
        centered
        className="publish-modal-wrapper"
        footer={false}
        onCancel={() => setIsPublishModal(false)}
        open={isPublishModal}
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
