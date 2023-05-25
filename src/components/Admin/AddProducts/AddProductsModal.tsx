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
import { useGetAllCategoriessQuery, useGetAllColorsQuery,  useGetAllMaterialsQuery } from "../../../store/Slices/Products";


function AddProductsModal(props: any) {
  const [form] = Form.useForm();
  const { addEditJobRole, setAddEditJobRole, modalType, getTableRowValues, setGetFieldValues, role } = props;
  const { data: clientData, isSuccess: isClientDataSuccess, } = useGetClientsQuery({ refetchOnMountOrArgChange: true });
  const [postJobRequest, { isLoading: isPostJobRequestMutation }] = usePostJobRequestMutation();
  const [updateJobRequest, { isLoading: isUpdateJobRequestMutation }] = useUpdateJobRequestMutation();

  const {data:getMaterials ,isSuccess:isSuccessMaterials}=useGetAllMaterialsQuery({})
  const {data:getCategories ,isSuccess:isSuccessCategories}=useGetAllCategoriessQuery({})
  const {data:getColors ,isSuccess:isSuccessColors}=useGetAllColorsQuery({})
  // ------------------ Error cases Variable ------------------
  let userRoleDropdown: any;
  let selectColor:any;
  let selectCategory:any
  let clientAPIData: any;

  let allMaterials:any
  if(isSuccessCategories){
    selectCategory=getCategories
    selectCategory = selectCategory?.map((item: any) => ({
      value: item?._id,
      label: item?.name,
    }));
  }
  if(isSuccessColors){
    selectColor=getColors
   
    selectColor = selectColor?.map((item: any) => ({
      value: item?._id,
      label: item?.name,
    }));
    
  }
  if(isSuccessMaterials){
    allMaterials=getMaterials
    userRoleDropdown = allMaterials?.map((item: any) => ({
      value: item?._id,
      label: item?.name,
    }));
   
  }
  if (isClientDataSuccess) {
    clientAPIData = clientData;
    // Making new array for dropdown from data
    userRoleDropdown = allMaterials?.map((item: any) => ({
      value: item?._id,
      label: item?.name,
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
      title="Add Product"
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
            <label className="fs-14 fw-600">Product Name</label>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter product name"
                id="PositionName"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Select Category</label>
            <Form.Item
              name="category"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Select
                suffixIcon={<img src={arrowDown} alt='arrow down' />}
                className="d-flex"
                placeholder="Select Category"
                options={selectCategory}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Select Color</label>
            <Form.Item
              name="color"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Select
                suffixIcon={<img src={arrowDown} alt='arrow down' />}
                className="d-flex"
                placeholder="Select Color"
                options={selectColor}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Select Material</label>
            <Form.Item
              name="material"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Select
                suffixIcon={<img src={arrowDown} alt='arrow down' />}
                className="d-flex"
                placeholder="Select material"
                options={userRoleDropdown }
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Product Description</label>
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter product description"
                id="description"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Product Price</label>
            <Form.Item
              name="price"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter product price"
                id="price"
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

export default AddProductsModal;
