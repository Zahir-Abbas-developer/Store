import { Button, Modal } from "antd";
import SendEmail from "../../../../assets/images/staffManager/sendEmail.png";
import CloseIcon from "../../../../assets/icons/close-icon.svg";
import { useSendResendEmailMutation } from "../../../../store/Slices/StaffManager";
import "./SendResendModal.scss";
import AppSnackbar from "../../../../utils/AppSnackbar";

const SendResendModal = (props: any) => {
  const { isModalOpen, setIsModalOpen, data } = props;

  const [sendResendEmail] = useSendResendEmailMutation();

  const handleSendEmail = async () => {
    try {
      await sendResendEmail({ email: data?.email }).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Congratulations",
        message: "Email sent successfully!",
      });
      setIsModalOpen(false);
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }
  };

  return (
    <Modal centered open={isModalOpen} footer={false} width={499} closeIcon={<img src={CloseIcon} alt="" />} onCancel={() => setIsModalOpen(false)}>
      <div className="send-resend-modal-wrapper">
        <img src={SendEmail} alt="send-email" />
        <h3 className="fs-28 fw-500 line-height-40" style={{ paddingInline: "68px" }}>
          Are you sure you want to resend welcome email ?
        </h3>
        <Button className="send-email-btn" size="large" onClick={handleSendEmail}>
          Send Email
        </Button>
      </div>
    </Modal>
  );
};
export default SendResendModal;
