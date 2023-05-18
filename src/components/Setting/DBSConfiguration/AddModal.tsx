// Ant Components
import { Button, Modal, Form, Row, Col } from "antd";

// RTK Hooks
import { usePostDbsConfigurationMutation, useUpdateDbsConfigurationMutation } from "../../../store/Slices/Setting/DbsConfiguration";

// Components
import AppInput from "../../../shared/AppInput/AppInput";

// Utils
import AppSnackbar from "../../../utils/AppSnackbar";
import InputWrapper from "../../../shared/InputWrapper/InputWrapper";

function AddModal(props: any) {
  const [form] = Form.useForm();
  const { openDbsConfigurationModal, setOpenDbsConfigurationModal, editModalFieldValues, setEditModalFieldValues } = props;

  // ================== RTK Hooks ==================
  const [postDbsConfiguration] = usePostDbsConfigurationMutation();
  const [updateDbsConfiguration] = useUpdateDbsConfigurationMutation();


  // ================== Set initial Values for Form ==================
  if (openDbsConfigurationModal !== "Add") {
    const formValues = {
      websiteName: editModalFieldValues?.websiteName,
      websiteLink: editModalFieldValues?.websiteLink,
    }

    form.setFieldsValue(formValues)
  }


  // ================== Failed form fields ==================
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  // ================== On Finish used to reset form fields in form ==================
  const onFinish = async (values: any) => {

    try {
      if (openDbsConfigurationModal === "Add") {
        await postDbsConfiguration({ payload: values }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
      }
      else {
        await updateDbsConfiguration({ payload: values, id: editModalFieldValues?._id }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
      }

      handleClearForm();

    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }
  };


  // ================== Clear Form and States ==================
  const handleClearForm = () => {
    form.resetFields();
    setOpenDbsConfigurationModal('');
    setEditModalFieldValues({});
  }


  return (
    <Modal
      title={`${openDbsConfigurationModal === "Add" ? "Add" : 'Edit'} DBS Check Link`}
      open={!!openDbsConfigurationModal}
      onOk={() => handleClearForm()}
      onCancel={() => handleClearForm()}
      centered
      className="add-dbs-check"
      footer={false}
      width="888px"
      maskClosable={false}
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={20} style={{ marginTop: "20px" }}>

          <Col lg={12} xs={24}>
            <AppInput label="Website Name" name="websiteName" placeholder="Enter website name" />
          </Col>

          <Col lg={12} xs={24}>
            <AppInput label="Website URL" name="websiteLink" placeholder="Enter website url" />
          </Col>
        </Row>

        {/* ======================= FORM ACTION BUTTONS ======================= */}
        <Form.Item style={{ marginTop: "20px" }}>
          <Button className="btn-cancel" onClick={() => handleClearForm()}>
            Cancel
          </Button>
          <Button className="btn-secondary" htmlType="submit">
            {openDbsConfigurationModal === "Add" ? "Save" : 'Update'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>

  );
}

export default AddModal;
