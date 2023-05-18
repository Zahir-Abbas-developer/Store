import { useState } from "react";

import {
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
  Select,
} from "antd";
import arrowDown from "../../../assets/icons/arrow-down-icon.svg"
import Counter from "../SettingsStaff/ProfileMetrics/Counter/Counter";
import SwitchWrapper from "../../../shared/SwitchWrapper/SwitchWrapper";
import { usePostBreakTimeMutation, useUpdateBreakTimeMutation } from "../../../store/Slices/Setting/BreakTime";
import AppSnackbar from "../../../utils/AppSnackbar";
import { ROLES } from "../../../constants/Roles";
// import "../../../../sass/common.scss";

function AddModal(props: any) {
  const { addEditJobRole, setAddEditJobRole, editModalFieldValues, setEditModalFieldValues, role, id, clientName, optimizedUserRoleDropdown } = props;
  // const [errorUsers, setErrorUsers] = useState<string>("");
  const [form] = Form.useForm();
  const [counts, setCounts] = useState([0, 1]);



  const [postBreakTime, { isLoading: isPostBreakTimeMutationLoading }] = usePostBreakTimeMutation();
  const [updateBreakTime, { isLoading: isUpdateBreakTimeMutationLoading }] = useUpdateBreakTimeMutation();
  let formValues: any;

  //  -------------- Edit Form Initial Values --------------
  if (addEditJobRole !== "Add" && editModalFieldValues) {
    formValues = {
      // careHomeId: editModalFieldValues?.careHomeId,
      careHomeId: role === ROLES.client ? clientName : editModalFieldValues?.careHomeId,
      from: editModalFieldValues?.from,
      to: editModalFieldValues?.to,
      break: editModalFieldValues?.break,
      breakPayment: editModalFieldValues?.breakPayment,
    }
    form.setFieldsValue(formValues);
  }


  // -------------- Failed form fields --------------
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  // -------------- On Finish used to reset form fields in form --------------
  const onFinish = async (values: any) => {
    const newPayload = {
      ...values,
      from: Number(values.from),
      to: Number(values.to),
      break: Number(values.break),
      careHomeId: role === ROLES.client ? id : values.careHomeId
    }


    console.log("newPayload=====> ", newPayload);
    console.log("values ", values);


    try {
      if (addEditJobRole === "Add") {
        await postBreakTime({ payload: newPayload }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
      }

      else {
        await updateBreakTime({ id: editModalFieldValues._id, payload: newPayload }).unwrap();
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
    setAddEditJobRole('');
    setEditModalFieldValues({});
  }

  const handleUpdateCount = (index: number, value: number) => {

    if (editModalFieldValues) {
      if (index === 1) {
        setEditModalFieldValues({ ...editModalFieldValues, to: value })
      }
      else {
        setEditModalFieldValues({ ...editModalFieldValues, from: value })
      }

    }


    // ================ INCASE ADD ================
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[index] = value;
      return newCounts;
    });

    if (index === 1) {
      form.setFieldsValue({ to: value });
    }
    else {
      form.setFieldsValue({ from: value });
    }

  };




  return (
    <Modal
      title={`${addEditJobRole === "Add" ? "Add" : "Edit"} Break Time`}
      open={!!addEditJobRole}
      onOk={() => handleFormClear()}
      onCancel={() => handleFormClear()}
      centered
      className="add-break-time"
      footer={false}
      width="888px"
      maskClosable={false}
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={20}>
          {/* {role !== ROLES.client && ( */}
          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Client Name</label>
            <Form.Item
              name="careHomeId"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Select
                suffixIcon={<img src={arrowDown} alt='arrow down' />}
                className="d-flex"
                placeholder="Select client name"
                popupClassName="app-select-popup-wrap-class"
                // options={userData?.data?.data.map((item:any)=> {
                //   return {
                //     value: item?._id, label: item?.clientName 
                //   }
                // })}
                disabled={role === ROLES.client}
                options={optimizedUserRoleDropdown}
              />
            </Form.Item>
          </Col>
          {/* )} */}

          <Col lg={12} xs={24} className={`d-flex align-items-center ${role !== ROLES.client && "justify-center"}`}>
            <Form.Item
              name="from"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px", }}
            >
              <div className="counter-plus-mins">
                <p className="m-0 fs-14 fw-600 from-text label-color">From</p>
                <Counter countValue={editModalFieldValues ? editModalFieldValues?.from : counts[0]} handleUpdateCount={(value: any) => handleUpdateCount(0, value)} noLimit={false} />
              </div>
            </Form.Item>
            <Form.Item
              name="to"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <div className="counter-plus-mins">
                <p className="m-0 fs-14 fw-600 label-color">To</p>
                <Counter countValue={editModalFieldValues ? editModalFieldValues?.to : counts[1]} handleUpdateCount={(value: any) => handleUpdateCount(1, value)} noLimit={false} />
              </div>

            </Form.Item>
            <p className="m-0 fs-14 fw-600 label-color" style={{ marginLeft: "10px", marginTop: "9px" }}>Hours</p>
          </Col>
          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Break Time</label>
            <Form.Item
              name="break"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Input
                placeholder="Enter break time"
                id="PositionShortForm"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
          {role !== ROLES.client && (
            <Col lg={12} xs={24} className="d-flex align-items-center justify-center" style={{ marginTop: "25px" }}>
              {/* <label className="fs-14 fw-600">Do you Want to pay care for the break time?</label> */}
              <Form.Item
                name="breakPayment"
                rules={[{ required: true, message: "Required field " }]}
                style={{ marginBottom: "8px" }}
              >
                <SwitchWrapper checked={editModalFieldValues?.breakPayment} name="breakPayment" label="Do you Want to pay carer for the break time?" />
              </Form.Item>
            </Col>
          )}

        </Row>

        <Form.Item style={{ marginTop: "20px" }}>

          <Button
            className="btn-cancel"
            onClick={() => handleFormClear()}
          >
            Cancel
          </Button>

          <Button
            className="btn-secondary"
            htmlType="submit"
            loading={isPostBreakTimeMutationLoading || isUpdateBreakTimeMutationLoading}
          >
            {addEditJobRole === "Add" ? "Save" : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>

  );
}

export default AddModal;
