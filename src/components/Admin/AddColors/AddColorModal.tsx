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
import {  usePostColorsMutation, useUpdateColorsMutation,  } from "../../../store/Slices/Products";

function AddColorModal(props: any) {
  const [form] = Form.useForm();
  const { addEditJobRole, setAddEditJobRole, modalType, getTableRowValues, setGetFieldValues, role ,jobID} = props;
  const { data: clientData, isSuccess: isClientDataSuccess, } = useGetClientsQuery({ refetchOnMountOrArgChange: true });
  const [postColors, { isLoading: isPostJobRequestMutation }] = usePostColorsMutation();
  const [updateColors, { isLoading: isUpdateJobRequestMutation }] = useUpdateColorsMutation();



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
      description: getTableRowValues.description,
    }
    form.setFieldsValue(formValues)
  }


  // ---------------- Failed Form Fields ---------------- 
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  // ---------------- On Finish used to reset form fields in form ----------------
  const onFinish = async (values: any) => {
   


    try {
      if (modalType !== 'Edit') {
        await  postColors({payload:values}).unwrap();
        setAddEditJobRole(false)
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
        // apiErrorMessage = '';
      }
      else {
        await updateColors({ payload: values ,id:jobID  }).unwrap();
        setAddEditJobRole(false)
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
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
      title="Add Category"
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
            <label className="fs-14 fw-600">Color Name</label>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter position name"
                id="name"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
        
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Color Description</label>
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter position short form"
                id="description"
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

export default AddColorModal;
