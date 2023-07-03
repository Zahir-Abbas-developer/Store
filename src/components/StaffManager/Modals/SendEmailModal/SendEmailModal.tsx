import React, { useState } from "react";
import { Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import CloseIcon from "../../../../assets/icons/close-icon.svg";
import { useSendEmailMutation } from "../../../../store/Slices/StaffManager";
import "./SendEmailModal.scss";
import AppSnackbar from "../../../../utils/AppSnackbar";

const SendEmailModal = (props: any) => {
  const { isSendEmailModalOpen, setIsSendEmailModalOpen, staffDetails } = props;
  const [staffEmail] = useSendEmailMutation();
  const [sendEmail, setSendEmail] = useState({
    emailId: "",
    subject: "",
    message: "",
  });

  const handleSendEmail = (value: any, type: string) => {
    setSendEmail({ ...sendEmail, [type]: value });
  };

  const handleSendEmailSubmit = async () => {
    try {
      await staffEmail({
        emailId: staffDetails?.email,
        message: sendEmail.message,
        subject: sendEmail.subject,
      }).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Congratulations",
        message: "Email sent successfully!",
      });
      setIsSendEmailModalOpen(false);
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }
  };

  return (
    <>
      <Modal
        open={isSendEmailModalOpen}
        onCancel={() => setIsSendEmailModalOpen(false)}
        footer={false}
        centered
        className="staff-email-send-modal"
        closeIcon={<img src={CloseIcon} alt="" />}
        width={700}
      >
        <div className="staff-email-send-content d-flex flex-column">
          <div className="input-field">
            <Input onChange={(e: any) => handleSendEmail(e.target.value, "emailId")} value={staffDetails?.email} placeholder="david@email.com" type="email" size="large" className="fs-14 fw-400 title-color line-heigth-22" />
          </div>
          <div className="input-field d-flex align-center subject-field">
            <p className="m-0 fs-14 fw-400">Subject:</p>
            <Input onChange={(e: any) => handleSendEmail(e.target.value, "subject")} type="text" size="large" className="fs-14 fw-400 title-color line-heigth-22 " />
          </div>
          <div className="input-field-text-area">
            <TextArea onChange={(e: any) => handleSendEmail(e.target.value, "message")} rows={10} placeholder="Write something here ...." className="fs-14 fw-400 line-height-22" />
          </div>
          <div className="send-email-btn">
            <button type="button" className="cursor-pointer fs-16 line-height-22 white-color fw-600" onClick={handleSendEmailSubmit}>
              Send Email
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default SendEmailModal;