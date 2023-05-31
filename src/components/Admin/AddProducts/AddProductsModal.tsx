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
import { useState } from 'react';
import { usePostJobRequestMutation, useUpdateJobRequestMutation } from "../../../store/Slices/Setting/JobRole";
import AppSnackbar from "../../../utils/AppSnackbar";
import { ROLES } from "../../../constants/Roles";
import { useGetClientsQuery } from "../../../store/Slices/Setting/StaffSettings/RegisterationConfiguration";
import { handleInputTrimSpaces, handleInputTrimStart } from "../../../utils/useInputTrim";
import { useGetAllCategoriessQuery, useGetAllColorsQuery,  useGetAllMaterialsQuery, useGetAllProductsQuery, usePostProductsMutation, useUpdateProductsMutation } from "../../../store/Slices/Products";
import UploadImage from "../../Setting/SettingKeyInfo/UploadImage/UploadImage";



function AddProductsModal(props: any) {
  const [form] = Form.useForm();
  const [certificateUrl ,setCertificateUrl]=useState("")
  const { addEditJobRole, setAddEditJobRole, modalType, getTableRowValues, setGetFieldValues, role } = props;
  const { data: clientData, isSuccess: isClientDataSuccess, } = useGetClientsQuery({ refetchOnMountOrArgChange: true });
  const [postProducts, { isLoading: isPostJobRequestMutation }] = usePostProductsMutation();
  const [updateProducts, { isLoading: isUpdateJobRequestMutation }] = useUpdateProductsMutation();

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

  const uploadCertificateId=(url:any)=>{
    setCertificateUrl(url)
}

console.log(getTableRowValues)

  if (modalType !== "Add") {
    const formValues = {
      name: getTableRowValues.name,
      category: getTableRowValues.category,
      color: getTableRowValues.color,
      material: getTableRowValues?.material,
      description:getTableRowValues?.description,
      price:getTableRowValues?.price,
      sku:getTableRowValues?.sku,
      // eu:getTableRowValues?.shoeSizes[0]?.eu,
      // quantity:getTableRowValues?.shoeSizes[0]?.quantity
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
    const addProductValues={...values,price:parseInt(values?.price),  thumbnail:certificateUrl,"tags": [
      "Running",
      "Sportswear"
    ],shoeSizes:[{"eu":parseInt(values?.eu),"quantity":parseInt(values?.quantity),"us":8}]}

delete addProductValues?.eu;
delete addProductValues?.quantity;

    const newValues = handleInputTrimSpaces(values);

    try {
      if (modalType === 'Edit') {
        await updateProducts({ id: getTableRowValues._id, payload: addProductValues }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
        // apiErrorMessage = '';
      }
      else {
        await postProducts({ payload: addProductValues }).unwrap();
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
          <Col xs={24} lg={24}>
                        <UploadImage  uploadCertificateId={uploadCertificateId} />
                    </Col>
                    <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Product Quantity</label>
            <Form.Item
              name="quantity"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter product quantity"
                id="quantity"
                style={{ marginTop: "2px", height: "40px", }}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Select Shoe Size</label>
            <Form.Item
              name="eu"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Select
                suffixIcon={<img src={arrowDown} alt='arrow down' />}
                className="d-flex"
                placeholder="Select Product Size"
                options={[
                  {
                    value: '42',
                    label: '42',
                  },
                  {
                    value: '43',
                    label: '43',
                  },
                  {
                    value: '44',
                    label: '44',
                  },
                  {
                    value: '45',
                    label: '45',
                  },
                  {
                    value: '46',
                    label: '46',
                  },
                  {
                    value: '47',
                    label: '47',
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Product Sku</label>
            <Form.Item
              name="sku"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
              normalize={(value: any) => handleInputTrimStart(value)}
            >
              <Input
                placeholder="Enter product sku"
                id="sku"
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
