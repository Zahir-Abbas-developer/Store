import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";

import bookingIcon from "../../../assets/icons/training/modal-icon.png";
import InputWrapper from "../../../shared/InputWrapper/InputWrapper";
import { useDeleteNoteMutation, useGetMyNotesByIDQuery, usePatchNotesMutation, usePostNotesMutation } from "../../../store/Slices/Training";
import AppSnackbar from "../../../utils/AppSnackbar";

type PropsType = {
  showAddModal: boolean;
  setShowAddModal: (value: boolean) => void;
  activeRecord: any
  isEditMode:any
};


const AddEditModal = ({ showAddModal, setShowAddModal, activeRecord, isEditMode }: PropsType) => {

console.log("activeRecord",activeRecord)
console.log("isEditMode",isEditMode)
  const { data, isLoading, isError, isSuccess } = useGetMyNotesByIDQuery({id:activeRecord})
  let getMyNotesByid: any;
  if (isLoading) {
    getMyNotesByid = <p>Loading...</p>
  }
  else if (isSuccess) {
    getMyNotesByid = data
  }
  else if (isError) {
    getMyNotesByid = <p>Error...</p>
  }
  // console.log("getMyNotesByid =>>", getMyNotesByid?.data)

  const [postNotes] = usePostNotesMutation()
  const [patchNotes] = usePatchNotesMutation()
  


  const [form] = Form.useForm();

  const currentDate = getCurrentDate();
  const postCurrentDate = new Date();
  const currentTimeAndDate = postCurrentDate.toISOString();

  const onFinish = async (values: any) => {
   
    console.log("values", values)
    

    const payload =
    {
      "title": values.title,
      "details": values.details,
      "date": currentTimeAndDate
    }

    if(isEditMode){
      try {
        await patchNotes({id:activeRecord, payload }).unwrap();
        AppSnackbar({
          type: "success",
          messageHeading: "Sucessfull",
          message: "Note updated successfully"
        });
        setShowAddModal(false)
        form.resetFields();
      } catch (error: any) {
        AppSnackbar({
          type: "error",
          messageHeading: "Error",
          message: error?.data?.message ?? "Something went wrong!"
        });
      }
    }else{
      try {
        await postNotes({  payload }).unwrap();
        AppSnackbar({
          type: "success",
          messageHeading: "Sucessfull",
          message: "Note added successfully"
        });
      } catch (error: any) {
        AppSnackbar({
          type: "error",
          messageHeading: "Error",
          message: error?.data?.message ?? "Something went wrong!"
        });
      }
    }

    

  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };





  console.log("currentTimeAndDate", currentTimeAndDate)

  useEffect(() => {
   
  }, [activeRecord])
  

  return (
    <Modal
      centered
      width={610}
      title={<span className="fs-20 fw-600">My Notes</span>}
      footer={false}
      className="add-edit-modal"
      open={showAddModal}
      onOk={() => {
        setShowAddModal(false);
      }}
      onCancel={() => {
        setShowAddModal(false);
      }}
    >
      <div className="date-wrapper">
        <img src={bookingIcon} alt="" />
        <p className="date fs-14">{currentDate}</p>
      </div>
      <Form
        layout="vertical"
        initialValues={{
          title: getMyNotesByid?.data?.title,
          details: getMyNotesByid?.data?.details
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={[0, 20]} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Col xs={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <InputWrapper
                name="title"
                placeHolder="Type here"
                onChange={(e: any) => console.log(e.target.value)}
              />
            </Form.Item>

          </Col>
          <Col xs={24} md={24}>
            <Row>
              <Col xs={24} md={24}>
                <Form.Item
                  name="details"
                  rules={[{ required: false, message: 'Required field' }]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Type here"
                    style={{ border: "1.5px solid #A0A3BD", borderRadius: "3px" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} className="btn-wrapper">
            <Button className="cancel-btn fs-16 fw-600" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button className="add-btn fs-16 fw-600" htmlType="submit">
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

const getCurrentDate = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = String(currentDate.getFullYear());
  return `${day}-${month}-${year}`;
};

export default AddEditModal;
