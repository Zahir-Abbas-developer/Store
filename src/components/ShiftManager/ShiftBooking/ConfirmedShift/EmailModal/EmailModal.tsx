import { Form, Input, Modal } from "antd";

import { useState } from "react";
import CloseIcon from "../../../../../assets/icons/ShiftManger/close-icon.svg";
import "./EmailModal.scss";
import TextArea from "antd/es/input/TextArea";
import { useSendEmailMutation } from "../../../../../store/Slices/StaffManager";
import AppSnackbar from "../../../../../utils/AppSnackbar";

const EmailModal = (props: any) => {
  const { isOpen, onCancel } = props;

  const [sendEmail, setSendEmail] = useState({
    emailId: "",
    subject: "",
    message: "",
  });

  const [staffEmail] = useSendEmailMutation();

  const handleSendEmail = (value: any, type: string) => {
    setSendEmail({ ...sendEmail, [type]: value });
  };

  const handleSendEmailSubmit = async () => {
    const {data} = await staffEmail({
      emailId: sendEmail.emailId,
      message: sendEmail.message,
      subject: sendEmail.subject,
    });
    if (data) {
      onCancel();
      AppSnackbar({ type: "success", message: data?.message });
      setSendEmail({
        emailId: '',
        subject: '',
        message: ''
      })
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      footer={false}
      className="staff-email-send-modal"
      width={733}
      centered
      closeIcon={<img src={CloseIcon} alt="close" />}
    >
      <div className="staff-email-send-content d-flex flex-column">
        <div className="input-field">
          <Input
            onChange={(e: any) => handleSendEmail(e.target.value, "emailId")}
            placeholder="david@email.com"
            type="email"
            size="large"
            className="fs-14 fw-400 title-color line-heigth-22 email"
          />
        </div>
        <div className="input-field d-flex align-center subject-field">
          <p className="m-0 fs-14 fw-400">Subject:</p>
          <Input
            onChange={(e: any) => handleSendEmail(e.target.value, "subject")}
            type="text"
            size="large"
            className="fs-14 fw-400 title-color line-heigth-22 "
          />
        </div>
        <div className="input-field-text-area">
          <TextArea
            onChange={(e: any) => handleSendEmail(e.target.value, "message")}
            rows={10}
            placeholder="Write something here ...."
            className="fs-14 fw-400 line-height-22"
          />
        </div>
        <div className="send-email-btn">
          <button
            type="button"
            className="cursor-pointer fs-16 line-height-22 white-color fw-600"
            onClick={handleSendEmailSubmit}
          >
            Send Email
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmailModal;
