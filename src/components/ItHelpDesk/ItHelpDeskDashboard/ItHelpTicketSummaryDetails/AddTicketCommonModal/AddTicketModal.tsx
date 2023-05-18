import { useState } from "react";
import dayjs from "dayjs";
import { Modal, Button, Form, Input, DatePicker, Row, Col, Select } from "antd";
import UploadImage from "../../../../Setting/SettingKeyInfo/UploadImage/UploadImage";
import dateIcon from "../../../../../assets/icons/ItHelpDesk/dateIcon.svg";
import CrossIcon from "../../../../../assets/icons/ManageUser/cross-icon.svg";
import AppSnackbar from "../../../../../utils/AppSnackbar";
import "./AddTicketModal.scss"; 

const validateMessages = {
  required: "Required field",
};
const { Option } = Select;

const AddTicketModal = ({ addTicketModal, setAddTicketModal, title, type, ticketId, addTicketPostRequest, patchTicketUpdateRequest }: any) => {
  const Icon = () => <img src={dateIcon} alt="dateicon" />;
  const [certificateId, setCertificateId] = useState("");

  const onFinish = async (values: any) => {
    const payload = { ...values, attachment: certificateId, date: dayjs(values.date).format("YYYY-MM-DD") };
    if (type === "Add") {
      const { data: addTicketData, error: addTicketError }: any = await addTicketPostRequest({ payload });
      if (addTicketData) {
        AppSnackbar({ type: "success", message: "Added Successfully" });
      }
      if (addTicketError) {
        AppSnackbar({ type: "error", message: "Not Added Successfully" });
      }
    }
    if (type === "Edit Ticket") {
      const { data: patchTicketData, error: patchTicketError }: any = await patchTicketUpdateRequest({ payload, ticketId });
      if (patchTicketData) {
        AppSnackbar({ type: "success", message: "Update Successfully" });
      }
      if (patchTicketError) {
        AppSnackbar({ type: "error", message: "Not Update Successfully" });
      }
    }
    setAddTicketModal({ isToggle: false, data: {} });
  };

  const uploadCertificateId = (id: any) => {
    setCertificateId(id);
  }; 

  const initialFormVals = {
    date: addTicketModal?.data?.date !== undefined ? dayjs(addTicketModal?.data?.date) : undefined,
    subject: addTicketModal?.data?.subject,
    assignedTo: addTicketModal?.data?.assignedTo,
    priority: addTicketModal?.data?.priority,
    description: addTicketModal?.data?.description,
    attachment: `${addTicketModal?.data?.attachment?.mediaId}.${addTicketModal?.data?.attachment?.mediaMeta?.extension}`,
  }; 
  
  return (
    <div className="wrap-add-ticket">
      <Modal
        title={<span style={{ fontWeight: "600px", fontSize: "18px", color: "#6E7191" }}>{title ? title : type}</span>}
        width={890}
        centered
        footer={null}
        open={addTicketModal?.isToggle}
        onCancel={() => setAddTicketModal({ isToggle: false, data: {} })}
        closeIcon={<img src={CrossIcon} alt="CrossIcon" height={16} width={16} />}
      >
        {/* ******************* add ticket start here */}
        <Form
          initialValues={initialFormVals}
          name="nest-messages"
          layout="vertical"
          onFinish={onFinish}
          validateMessages={validateMessages}
          className="add-new-ticket"
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item
                name="date"
                //   label="Date"
                label={<label style={{ color: "#6E7191", fontSize: "14px", fontWeight: "600" }}>Date</label>}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  suffixIcon={<Icon />}
                  disabled={type === "View Ticket"}
                  style={{ width: "100%", border: "1.5px solid #A0A3BD", borderRadius: "3PX", padding: "10px" }}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <div>
                <Form.Item
                  name="subject"
                  label={<label style={{ color: "#6E7191", fontSize: "14px", fontWeight: "600" }}>Subject</label>}
                  rules={[{ required: true }]}
                >
                  <Input
                    className="subject"
                  disabled={type === "View Ticket"}
                    placeholder="Type here"
                    style={{ border: "1.5px solid #A0A3BD", borderRadius: "3PX", padding: "10px" }}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <div>
                <Form.Item
                  name="priority"
                  label={<label style={{ color: "#6E7191", fontSize: "14px", fontWeight: "600" }}>Priority</label>}
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Select placeholder="select your Priority" size="large" className="pririty-select" popupClassName="pririty-select-popup-wrap-class"
                  disabled={type === "View Ticket"}
                  >
                    <Option value="high">High</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="low">Low</Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <div>
                <Form.Item
                  name="description"
                  label={<label style={{ color: "#6E7191", fontSize: "14px", fontWeight: "600" }}>Description</label>}
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Input.TextArea
                    showCount
                  disabled={type === "View Ticket"}
                    maxLength={150}
                    placeholder="Type here"
                    className="description"
                    style={{ height: "100px", width: "100%" }}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <div>
                <Form.Item label={<label style={{ color: "#6E7191", fontSize: "14px", fontWeight: "600" }}>Attachment</label>}>
                  <UploadImage
                    disabled={type === "View Ticket"}
                    uploadCertificateId={uploadCertificateId} fileUrl={addTicketModal?.data?.attachment ? `${addTicketModal?.data?.attachment?.mediaId}.${addTicketModal?.data?.attachment?.mediaMeta?.extension}` : ''} />
                </Form.Item>
              </div>
            </Col>
          </Row>
          {type !== "View Ticket" && (
            <div className="d-flex" style={{ gap: "10px" }}>
              <Form.Item>
                <Button 
                  className="btn-cancel d-flex justify-center align-center fw-600 fs-16 btn-padding"
                  onClick={() => setAddTicketModal({ isToggle: false, data: {} })}
                >
                  Close
                </Button>
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" className="btn-secondary d-flex justify-center align-center fw-600 fs-16 btn-padding">
                  Save
                </Button>
              </Form.Item>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default AddTicketModal;
