import { Modal, Space } from "antd";
import DeleteIcon from "../../../../assets/icons/unpublishedShift/remove.png";
import { useDeleteClientsRequestMutation } from "../../../../store/Slices/OnBoarding";
// import "./style.scss";

type PropsType = {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    onSubmit?: any;
    onCancel?: () => void;
    setIsModalOpen:any

};

const DiscardModal = (props: PropsType) => {
   
    const { openModal, setOpenModal, onSubmit, onCancel,setIsModalOpen } =
        props;
        const handleAssignNewCareHome=()=>{
            setIsModalOpen(true)
            onSubmit()
        }
    return (
        <Modal
            width={500}
            centered
            className="cordinator-discard-modal"
            footer={false}
            onCancel={() => setOpenModal(false)}
            open={openModal}
        >
            <div className="modal-content" style={{ textAlign: 'center' }}>
                <img src={DeleteIcon} alt="publish icon" />
                <p className="fs-30 fw-500">Do you want to Remove this Record?</p>

                <Space direction="vertical">
                    <button className="yes-btn" onClick={handleAssignNewCareHome }>
                        Yes and Assign New Care Home
                    </button>
                    <button className="no-btn" onClick={onSubmit}>
                        Yes, Discard
                    </button>
                </Space>


            </div>
        </Modal>
    );
};

export default DiscardModal;
