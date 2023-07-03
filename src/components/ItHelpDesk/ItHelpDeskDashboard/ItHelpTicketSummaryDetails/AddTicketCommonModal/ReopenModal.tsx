import { Modal } from "antd";
import reopenIcon from '../../../../../assets/images/itHelpDesk/reopenModalIcon.svg'
import CrossIcon from "../../../../../assets/icons/ManageUser/cross-icon.svg"

type PropsType = {
  isReopenModal: boolean;
    title: string;
    submitTitle: string;
    cancelTitle: string;
    setIsReopenModal: (value: boolean) => void;
    onSubmit: () => void;
    onCancel: () => void;
  };

const ReopenModal = (props: PropsType) => {
    const { isReopenModal, title, submitTitle, cancelTitle, setIsReopenModal, onSubmit, onCancel } =
    props;

  return (
    <Modal
      width={500}
      className="delete-modal"
      footer={false}
      onCancel={() => setIsReopenModal(false)}
      open={isReopenModal}
      closeIcon={<img src={CrossIcon} alt="CrossIcon" height={16} width={16}/>}
    >
      <div className="modal-content">
        <img src={reopenIcon} alt="publish icon" />
        <p className="fs-30 fw-500">{title}</p>
        <div className="btn-wrapper" style={{gap:"10px"}}>
        <button className="no-btn" onClick={onCancel}>
            {cancelTitle}
          </button>
          <button className="yes-btn" onClick={onSubmit}>
            {submitTitle}
          </button>
          
        </div>
      </div>
    </Modal>
  );
};

export default ReopenModal;
