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
import { usePostJobRequestMutation, useUpdateJobRequestMutation } from "../../../store/Slices/Setting/JobRole";
import AppSnackbar from "../../../utils/AppSnackbar";
import { ROLES } from "../../../constants/Roles";
import { useGetClientsQuery } from "../../../store/Slices/Setting/StaffSettings/RegisterationConfiguration";
import { handleInputTrimSpaces, handleInputTrimStart } from "../../../utils/useInputTrim";

function AddModal(props: any) {
  const [form] = Form.useForm();
  const { addEditJobRole, setAddEditJobRole, modalType, getTableRowValues, setGetFieldValues, role } = props;
  const { data: clientData, isSuccess: isClientDataSuccess, } = useGetClientsQuery({ refetchOnMountOrArgChange: true });
  const [postJobRequest, { isLoading: isPostJobRequestMutation }] = usePostJobRequestMutation();
  const [updateJobRequest, { isLoading: isUpdateJobRequestMutation }] = useUpdateJobRequestMutation();


  // ------------------ Error cases Variable ------------------
  let userRoleDropdown: any;
  let clientAPIData: any;


  if (isClientDataSuccess) {
    clientAPIData = clientData;
    // Making new array for dropdown from data
    userRoleDropdown = clientAPIData?.data?.result?.map((item: any) => ({
      value: item?._id,
      label: item?.clientName,
    }));
  }

  
  if (modalType !== "Add") {
    const formValues = {
      name: getTableRowValues.name,
      shortForm: getTableRowValues.shortForm,
      userRole: getTableRowValues.userRole,
      careHomeId: getTableRowValues?.careHomeData?._id
    }
    form.setFieldsValue(formValues)
  }


  // ---------------- Failed Form Fields ---------------- 
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  // ---------------- On Finish used to reset form fields in form ----------------
  const onFinish = async (values: any) => {
    // -------- for error cases --------
    // const valuessss = { mneee: values?.name, ...values };

    const newValues = handleInputTrimSpaces(values);

    console.log("newValues ============> ", newValues);
    

    try {
      if (modalType === 'Edit') {
        await updateJobRequest({ id: getTableRowValues._id, payload: newValues }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
        // apiErrorMessage = '';
      }
      else {
        await postJobRequest({ payload: newValues }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
        // apiErrorMessage = '';
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
    setAddEditJobRole(false);
    form.resetFields();
    setGetFieldValues({});
  }




  return (
    <Modal
      title="Manage Job Role"
      open={addEditJobRole}
      onOk={() => handleFormClear()}
      onCancel={() => handleFormClear()}
      centered
      className="add-Manage-Job-Role"
      footer={false}
      width="888px"
      maskClosable={false}
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={20} style={{ marginTop: "20px" }}>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Position Name</label>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter position name"
                id="PositionName"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Select User Role</label>
            <Form.Item
              name="userRole"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Select
                suffixIcon={<img src={arrowDown} alt='arrow down' />}
                className="d-flex"
                placeholder="Select user role"
                options={[
                  { value: 'Medical', label: 'Medical' },
                  { value: 'Medical Staff', label: 'Medical Staff' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Position Short Form</label>
            <Form.Item
              name="shortForm"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter position short form"
                id="PositionShortForm"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
          {role === ROLES.coordinator && (
            <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
              <label className="fs-14 fw-600">Select Care Home</label>
              <Form.Item
                name="careHomeId"
                rules={[{ required: true, message: "Required field " }]}
                style={{ marginBottom: "8px" }}
              >
                <Select
                  suffixIcon={<img src={arrowDown} alt='arrow down' />}
                  className="d-flex"
                  placeholder="Select care home"
                  options={userRoleDropdown}
                  defaultValue={getTableRowValues?.careHomeData?.clientName}
                />
              </Form.Item>
            </Col>
          )}

        </Row>

        <Form.Item>

          {/* {apiErrorMessage !== undefined && <p className="fs-14 fw-400 line-height-18 error-color  m-0" style={{ marginBottom: "1rem" }}>{apiErrorMessage?.status === 400 ? 'Request not fulfilled! Try again after some time.' : 'Something went wrong.'}</p>} */}
          <Button type="primary" htmlType="submit" loading={isPostJobRequestMutation || isUpdateJobRequestMutation}>
            {modalType === 'Edit' ? 'Update' : "Save"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>

  );
}

export default AddModal;
