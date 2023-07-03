import { Button, Modal, Spin } from "antd";

import DeleteIcon from "../../assets/icons/unpublishedShift/remove.png";
import "./style.scss";

type PropsType = {
  deleteModal: boolean;
  title: string;
  btnReverse?: string;
  submitTitle: string;
  cancelTitle: string;
  isLoading?: any;
  setDeleteModal: (value: boolean) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
};

const DeleteModal = (props: PropsType) => {
  const { deleteModal, title, submitTitle, cancelTitle, setDeleteModal, onSubmit, onCancel, btnReverse, isLoading } =
    props;

  return (
    <Modal
      width={500}
      centered
      className="delete-modal"
      footer={false}
      onCancel={() => setDeleteModal(false)}
      open={deleteModal}
      maskClosable={false}
    >
      <div className="modal-content" style={{ textAlign: 'center' }}>
        <img src={DeleteIcon} alt="publish icon" />
        <p className="fs-30 fw-500">{title}</p>
        <div className={`btn-wrapper ${btnReverse}`}>
          <button className="no-btn" onClick={onCancel}>
            {cancelTitle}
          </button>
          {/* <button className="yes-btn" onClick={onSubmit}>
            {submitTitle}
          </button> */}
          <Button type="primary" htmlType="submit" className="yes-btn"  loading={isLoading} onClick={onSubmit}>
            {submitTitle}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
