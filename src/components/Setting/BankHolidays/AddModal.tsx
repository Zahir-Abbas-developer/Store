// Ant Components
import { Button, Modal, Form, Row, Col, Select, DatePicker } from "antd";

// RTK Hooks
import { usePostBankHolidayMutation, useUpdateBankHolidayMutation } from "../../../store/Slices/Setting/BankHoliday";

// Utils and Packages
import AppSnackbar from "../../../utils/AppSnackbar";
import dayjs from "dayjs";

// Assets
import arrowDown from "../../../assets/icons/arrow-down-icon.svg"
import dateIcon from "../../../assets/icons/Setting/dateIcon.svg"

// SCSS
import "./SettingBankHolidays.scss";

function AddModal(props: any) {
  const [form] = Form.useForm();
  const { openBankHolidayModal, setOpenBankHolidayModal, editModalFieldValues, setEditModalFieldValues } = props;


  // ==================== RTK Hooks ====================
  const [postBankHoliday]: any = usePostBankHolidayMutation();
  const [updateBankHoliday]: any = useUpdateBankHolidayMutation();



  // ==================== Set initial value for date picker ====================
  const editFormattedDate = dayjs(editModalFieldValues?.date).format('DD/MM/YYYY');
  const initialDate = dayjs(editFormattedDate, 'DD/MM/YYYY');



  // ==================== Update the form fields for edit modal ====================
  if (openBankHolidayModal === "Edit" && editModalFieldValues) {
    const formValues = {
      date: initialDate,
      name: editModalFieldValues?.name,
    }
    form.setFieldsValue(formValues);
  }



  // ==================== Failed form fields ====================
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };



  // ==================== On Finish used to reset form fields in form ====================
  const onFinish = async (values: any) => {
    const { name, date } = values;
    let newFormattedDate = dayjs(date?.$d).format('YYYY-MM-DD');
    const payload = {
      date: newFormattedDate,
      name
    }

    try {
      if (openBankHolidayModal === "Add") {
        await postBankHoliday({ payload: payload });
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
      }
      else {
        await updateBankHoliday({ id: editModalFieldValues?._id, payload: payload })
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


  // ==================== Clear Bank Holiday Add or Edit Form and Resetting States and Values ====================
  const handleClearForm = () => {
    form.resetFields();
    setOpenBankHolidayModal('');
    setEditModalFieldValues({});
  }


  return (
    <Modal
      title={`${openBankHolidayModal === "Add" ? "Add" : 'Edit'} Bank Holiday `}
      open={!!openBankHolidayModal}
      onOk={() => handleClearForm()} onCancel={() => handleClearForm()}
      centered
      className="add-bank-holiday"
      footer={false}
      width="888px"
      maskClosable={false}
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={20} style={{ marginTop: "20px" }}>

          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Select Date</label>
            <Form.Item name="date" rules={[{ required: true, message: "Required field " }]} style={{ marginBottom: "8px" }}>
              <DatePicker format={['DD/MM/YYYY']} placeholder="Select date" suffixIcon={<img src={dateIcon} alt="delete" />} />
            </Form.Item>
          </Col>
          
          <Col lg={12} xs={24}>
            <label className="fs-14 fw-600">Select Holiday Type</label>
            <Form.Item name="name" rules={[{ required: true, message: "Required field " }]} style={{ marginBottom: "8px" }} >
              <Select
                suffixIcon={<img src={arrowDown} alt="arrow down" />}
                className="d-flex"
                placeholder="Select holiday type"
                options={[
                  { value: 'Holiday Type', label: 'Holiday Type' },
                  { value: 'Holiday Type 2', label: 'Holiday Type 2' },
                ]}
              />
            </Form.Item>
          </Col>

        </Row>

        {/* ==================== BANK HOLIDAY ACTION BUTTONS ==================== */}

        <Form.Item style={{ marginTop: "20px" }}>
          <Button className="btn-cancel" onClick={() => handleClearForm()}>
            Cancel
          </Button>
          <Button className="btn-secondary" type="primary" htmlType="submit">
            {openBankHolidayModal === "Add" ? "Save" : 'Update'}
          </Button>
        </Form.Item>
        
      </Form>
    </Modal>

  );
}

export default AddModal;
