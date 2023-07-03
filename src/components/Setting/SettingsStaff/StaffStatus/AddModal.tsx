import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
} from "antd";
import "./StaffStatus.scss";
import { usePostStaffStatusMutation, useUpdateStaffStatusMutation } from "../../../../store/Slices/Setting/StaffSettings/StaffStatus";
import AppSnackbar from "../../../../utils/AppSnackbar";
// import "../../../../sass/common.scss";

function AddModal(props: any) {
  const { staffStatus, setStaffStatus, editModalFieldValues, setEditModalFieldValues } = props;
  const [errorUsers, setErrorUsers] = useState("");
  const [form] = Form.useForm();
  const [updateStaffStatus]: any = useUpdateStaffStatusMutation();
  const [postStaffStatus] = usePostStaffStatusMutation();


  if (staffStatus !== "Add") {
    const formValues = {
      title: editModalFieldValues?.title,
    }
    form.setFieldsValue(formValues)
  }



  //Failed form fields
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  //On Finish used to reset form fields in form
  const onFinish = async (values: any) => {
    const newPayload = {
      ...values,
      enable: editModalFieldValues?.enable
    }

    try {
      if (staffStatus === "Add") {
        await postStaffStatus({ payload: newPayload }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
      }

      else {
        await updateStaffStatus({ id: editModalFieldValues._id, payload: newPayload }).unwrap()
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
      }

      handleFormClear();

    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }
  };


  const handleFormClear = () => {
    form.resetFields();
    setStaffStatus('');
    setEditModalFieldValues({})
  }


  return (
    <Modal
      title={`${staffStatus === "Add" ? "Add" : "Edit"} Status`}
      open={!!staffStatus}
      onOk={() => handleFormClear()}
      onCancel={() => handleFormClear()}
      centered
      className="add-status"
      footer={false}
      maskClosable={false}
      width="888px"
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} style={{ marginTop: "20px" }}>
        <Row gutter={20}>
          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Status Title</label>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Input
                placeholder="Enter status title"
                id="titleee"
                style={{ marginTop: "2px" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: "20px" }}>

          <Button
            className="btn-save btn-secondary"
            htmlType="submit"
            onClick={() => {
              setErrorUsers("Required field");
            }}
          >
            {staffStatus === "Add" ? "Save" : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>

  );
}

export default AddModal;
