import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
  DatePicker,
  Select,
} from "antd";
import "./SettingFestivalDayGreeting.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import arrowDown from "../../../assets/icons/arrow-down-icon.svg"
import dateIcon from "../../../assets/icons/Setting/dateIcon.svg"
import dayjs from "dayjs";
import AppSnackbar from "../../../utils/AppSnackbar";
import { usePostFestivalMutation, useUpdateFestivalMutation } from "../../../store/Slices/Setting/Festival";
import { useGetEmailTemplateQuery } from "../../../store/Slices/Setting/EmailTemplate";
// import "../../../../sass/common.scss";

function AddModal(props: any) {
  const [form] = Form.useForm();
  const { openFestivalDay, setOpenFestivalDay, editModalFieldValues, setEditModalFieldValues } = props;
  // const [errorUsers, setErrorUsers] = useState("");
  const [value, setValue] = useState<string>('');
  const [postEmailTemplate] = usePostFestivalMutation();
  const [updateEmailTemplate] = useUpdateFestivalMutation();
  const { data } = useGetEmailTemplateQuery({ refetchOnMountOrArgChange: true });


  // ------------ Set initial value for date picker ------------
  // const editFormattedDate = editModalFieldValues?.festivalDate !== undefined ? dayjs(editModalFieldValues?.festivalDate).format('DD/MM/YYYY') : null;
  const editFormattedDate = editModalFieldValues?.festivalDate ? dayjs(editModalFieldValues?.festivalDate) : undefined;
  // const initialDate = dayjs(editFormattedDate, 'DD/MM/YYYY');

  // ------------ Edit Form Initial Values ------------
  // if (editModalFieldValues !== undefined) {
  const formValues = {
    festivalName: editModalFieldValues?.festivalName,
    festivalDate: editFormattedDate,
    template: editModalFieldValues?.template,
    discription: editModalFieldValues?.discription,
    enable: editModalFieldValues?.enable
  }
  // form.setFieldsValue(formValues);
  // }


  let emailTemplateData: any = data;

  // ------------ Failed form fields ------------
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  // ------------ On Finish used to reset form fields in form ------------
  const onFinish = async (values: any) => {

    let newFormattedDate = dayjs(values?.festivalDate?.$d).format('YYYY-MM-DD');

    const newPayload = {
      festivalName: values?.festivalName,
      festivalDate: newFormattedDate,
      template: values?.template,
      discription: value
    }

    try {
      if (openFestivalDay === "Add") {
        await postEmailTemplate({ payload: newPayload }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
      }
      else {
        await updateEmailTemplate({ id: editModalFieldValues._id, payload: newPayload }).unwrap();
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

  const handleClearForm = () => {
    form.resetFields();
    setValue('');
    setOpenFestivalDay('');
    setEditModalFieldValues({});
  }

  const handleQuillDescriptionChange = (content: any, delta: any, source: any, editor: any) => {
    setValue(editor.getText())
  }

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline',],
      [{ 'align': [] }],
      [{ 'list': 'ordered' }],
      ['link', 'image'],
    ]
  };



  useEffect(() => {
    if (editModalFieldValues !== "Add") {

      form.setFieldsValue(formValues)
    }
  }, [editModalFieldValues])

  return (
    <Modal
      title={`${editModalFieldValues === "Add" ? "Create" : "Edit"} Template`}
      open={!!openFestivalDay}
      onOk={() => handleClearForm()}
      onCancel={() => handleClearForm()}
      centered
      className="add-festival"
      footer={false}
      width="888px"
      maskClosable={false}
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}  style={{ marginTop: "20px" }}>
        <Row gutter={20}>
          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Festival Name</label>
            <Form.Item
              name="festivalName"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Input
                placeholder="Enter festival name"
                id="festivalName"
                style={{ marginTop: "2px" }}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Festival Date</label>
            <Form.Item
              name="festivalDate"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <DatePicker format={['DD/MM/YYYY']} placeholder="dd/mm/yyyy" suffixIcon={<img src={dateIcon} alt="date" />} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>

          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Template</label>
            <Form.Item
              name="template"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Select
                suffixIcon={<img src={arrowDown} alt="arrow down" />}
                options={emailTemplateData?.data?.map((item: any) => ({ value: item?._id, label: item?.title }))}
                // value={}
                placeholder="Select Template"
              />
            </Form.Item>
          </Col>

        </Row>

        <div className="template-editor">
          <Form.Item
            name="discription"
            rules={[{ required: true, message: "Required field " }]}
            style={{ marginBottom: "8px" }}
          >
            <ReactQuill theme="snow" onChange={handleQuillDescriptionChange} placeholder="Enter description here" modules={modules} />
          </Form.Item>
        </div>



        <Form.Item style={{ marginTop: "20px" }}>


          <Button
            className="btn-cancel"
            onClick={() => handleClearForm()}
          >
            Cancel
          </Button>
          <Button
            className="btn-secondary"
            htmlType="submit"
          >
            {openFestivalDay === "Add" ? "Save" : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>

  );
}

export default AddModal;
