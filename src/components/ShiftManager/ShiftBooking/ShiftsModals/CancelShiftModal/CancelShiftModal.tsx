import { Form, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import CloseIcon from "../../../../../assets/icons/ShiftManger/close-icon.svg";
import "./CancelShiftModal.scss";

const CancelShiftModal = (props: any) => {
  const { open, onCancel, onFinish, label, placeholder } = props;
  const [form] = Form.useForm();


  const handleFormClear = () => {
    onCancel();
    form.resetFields();
  }

  return (
    <>
      <Modal
        title="Cancellation Reason"
        open={open}
        onCancel={handleFormClear}
        footer={false}
        className="cancel-shift-modal-wrapper"
        width={890}
        centered
        closeIcon={<img src={CloseIcon} alt="close" />}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <div className="cancel-shift-modal-content">
            <Form.Item
              label={label}
              name={["reason"]}
              rules={[{ message: "Required Field", required: true }]}
            >
              <TextArea rows={6.7} placeholder={placeholder} />
            </Form.Item>
            <div className="cancel-shift-modal-btn d-flex align-center">
              <button
                type="button"
                className="cancel-btn cursor-pointer fs-16 line-height-22 white-color fw-600"
                onClick={handleFormClear}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="save-btn cursor-pointer fs-16 line-height-22 white-color fw-600"
              >
                Cancel Shift
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CancelShiftModal;
