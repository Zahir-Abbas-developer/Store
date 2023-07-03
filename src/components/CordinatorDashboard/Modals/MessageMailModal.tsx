// Ant Components
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';

// RTK Hooks
import { usePostStaffSendEmailMutation } from '../../../store/Slices/CoordinatorDashboard';

// Utils and Packages
import AppSnackbar from '../../../utils/AppSnackbar';
import { handleInputTrimStart } from '../../../utils/useInputTrim';

// Assets
import Close from '../../../assets/images/OnBoarding/Close.svg';

// Interfaces
interface Props {
  isShowMailModalOpen: any;
  setIsShowMailModalOpen: any;
  selectProfileData: any;
}



const MessageMailModal = (props: Props) => {
  const [form] = Form.useForm();
  const { isShowMailModalOpen, setIsShowMailModalOpen } = props;

  // ============================== RTK Hooks ==============================
  const [postStaffSendEmail] = usePostStaffSendEmailMutation();


  // ============================== Email Send Form Handlers ==============================
  const onFinish = (value: any) => {

    // =========================== Callback Function ===========================
    async function callSendEmailAPI(payload: any) {
      const query = "?" + new URLSearchParams(payload).toString();
      try {
        await postStaffSendEmail({ query: query }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Success!", message: "Email has been sent successfully" });
        handleEmailSendFormClear();
      } catch (error: any) {
        AppSnackbar({
          type: "error",
          messageHeading: "Error",
          message: error?.data?.message ?? "Something went wrong!"
        });
      }
    }

    // ================================== Create params for send email ==================================
    if (value) {
      const newParamsObj = {
        emailId: value?.emailId,
        subject: value?.subject,
        message: value?.message
      }
      if (newParamsObj) callSendEmailAPI(newParamsObj);
    }
  }

  const onEmailSendFinishFailed = (value: any) => {
    console.log("Email Send Finish Failed ========== >", value);
  }

  const handleEmailSendFormClear = () => {
    form.resetFields();
    setIsShowMailModalOpen(false);
  }

  // ======================================================================================


  return (
    <>
      <Modal centered className='mailModal' title={false} open={isShowMailModalOpen} onCancel={handleEmailSendFormClear} footer={false} closeIcon={<img src={Close} alt="" />}>
        <div className="content">
          <Form name="emailSendForm" form={form} onFinish={onFinish} onFinishFailed={onEmailSendFinishFailed} autoComplete="off">
            <Row gutter={20} style={{ marginTop: "20px" }}>
              <Col xs={24}>
                <Form.Item
                  name="emailId"
                  rules={[{ required: true, message: "Required field " }]}
                  style={{ marginBottom: "8px" }}
                  normalize={(value: any) => handleInputTrimStart(value)}
                >
                  <Input placeholder="Write email here" bordered={false} style={{ marginTop: "2px", height: "40px", }} />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  name="subject"
                  rules={[{ required: true, message: "Required field" }]}
                  normalize={(value: any) => handleInputTrimStart(value)}
                  style={{ width: "100%", border: "none" }}
                >
                  <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #D9DBE9" }}>
                    <label htmlFor="" className='fs-14 fw-600'>Subject:</label>
                    <Input bordered={false} className='no-border' style={{ paddingTop: '5px', border: "none" }} />
                  </div>
                </Form.Item>

              </Col>

              <Col xs={24}>
                <Form.Item
                  name="message"
                  rules={[{ required: true, message: "Required field" }]}
                  style={{ marginBottom: "8px" }}
                >
                  <TextArea rows={10} bordered={false} placeholder='Write something here ...' />
                </Form.Item>
              </Col>


              <Col xs={24} style={{ marginTop: "20px" }}>
                <Form.Item>
                  <Button className='send-btn' type="primary" htmlType='submit'>
                    Send Email
                  </Button>
                </Form.Item>
              </Col>


            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default MessageMailModal;