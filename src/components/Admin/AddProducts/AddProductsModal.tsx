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
import { useGetAllCategoriessQuery, useGetAllColorsQuery, useGetAllMaterialsQuery, useGetAllProductsQuery, usePostProductsMutation, useUpdateProductsMutation } from "../../../store/Slices/Products";
import UploadImage from "../../Setting/SettingKeyInfo/UploadImage/UploadImage";
import { PlusCircleOutlined } from "@ant-design/icons";



function AddProductsModal(props: any) {
  const [form] = Form.useForm();
  const [certificateUrl, setCertificateUrl] = useState("")
  const [fieldCount, setFieldCount] = useState(1);
  const [quantities, setQuantities] = useState([""]); // Array to hold quantity values
  const [sizes, setSizes] = useState([""]); // Array to hold size values
  const [fields, setFields] = useState([{ quantity: "", size: "" }]);

  const { addEditJobRole, setAddEditJobRole, modalType, getTableRowValues, setGetFieldValues, role } = props;
  const { data: clientData, isSuccess: isClientDataSuccess, } = useGetClientsQuery({ refetchOnMountOrArgChange: true });
  const [postProducts, { isLoading: isPostJobRequestMutation }] = usePostProductsMutation();
  const [updateProducts, { isLoading: isUpdateJobRequestMutation }] = useUpdateProductsMutation();

  const { data: getMaterials, isSuccess: isSuccessMaterials } = useGetAllMaterialsQuery({})
  const { data: getCategories, isSuccess: isSuccessCategories } = useGetAllCategoriessQuery({})
  const { data: getColors, isSuccess: isSuccessColors } = useGetAllColorsQuery({})
  // ------------------ Error cases Variable ------------------
  let userRoleDropdown: any;
  let selectColor: any;
  let selectCategory: any
  let clientAPIData: any;

  let allMaterials: any
  if (isSuccessCategories) {
    selectCategory = getCategories
    selectCategory = selectCategory?.map((item: any) => ({
      value: item?._id,
      label: item?.name,
    }));
  }
  console.log(fields)
  if (isSuccessColors) {
    selectColor = getColors

    selectColor = selectColor?.map((item: any) => ({
      value: item?._id,
      label: item?.name,
    }));

  }
  if (isSuccessMaterials) {
    allMaterials = getMaterials
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

  const uploadCertificateId = (url: any) => {
    setCertificateUrl(url)
  }
  const handleAddField = () => {
    setFieldCount(fieldCount + 1);

    setFields([...fields, { quantity: "", size: "" }]);
  };


  if (modalType !== "Add") {
    const formValues = {
      name: getTableRowValues.name,
      category: getTableRowValues.category,
      color: getTableRowValues.color,
      material: getTableRowValues?.material,
      description: getTableRowValues?.description,
      price: getTableRowValues?.price,
      sku: getTableRowValues?.sku,
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
    const shoeSizes = fields.map((field) => {
      let usValue = ""; // Default value for the 'us' field

      if (field.size === "42") {
        usValue = "7";
      } else if (field.size === "43") {
        usValue = "8";
      }
      else if (field.size === "43") {
        usValue = "8";
      }
      else if (field.size === "44") {
        usValue = "9";
      }
      else if (field.size === "45") {
        usValue = "8";
      }
      else if (field.size === "46") {
        usValue = "8";
      }
      else if (field.size === "47") {
        usValue = "8";
      }

      return {
        quantity: parseInt(field.quantity),
        eu: parseInt(field.size),
        us: parseInt(usValue),
      };
    });

    const addProductValues = {
      ...values, price: parseInt(values?.price), thumbnail: certificateUrl,images:[certificateUrl], "tags": [
        "Running",
        "Sportswear"
      ], shoeSizes: shoeSizes
    }

    for (let i = 0; i <= 300; i++) {
      const euProperty = `eu${i}`;
      const quantityProperty = `quantity${i}`;

      if (addProductValues.hasOwnProperty(euProperty)) {
        delete addProductValues[euProperty];
      }

      if (addProductValues.hasOwnProperty(quantityProperty)) {
        delete addProductValues[quantityProperty];
      }
    }





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
                options={userRoleDropdown}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
            <label className="fs-14 fw-600">Select Product</label>
            <Form.Item
              name="productType"
              rules={[{ required: true, message: "Required field " }]}
              style={{ marginBottom: "8px" }}
            >
              <Select
                suffixIcon={<img src={arrowDown} alt='arrow down' />}
                className="d-flex"
                placeholder="Select product"

                options={[
                  {
                    value: 'SHOES',
                    label: 'Shoes',
                  },
                  {
                    value: 'JACKETS',
                    label: 'Jackets',
                  },



                ]}
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
            <UploadImage uploadCertificateId={uploadCertificateId} />
          </Col>
          <Col xs={24} lg={24} style={{ textAlign: "end" }}>
            <PlusCircleOutlined style={{ marginLeft: "20px", cursor: "pointer" }} onClick={handleAddField} /> Click to  Add More Shoe Sizes and Quantity
          </Col>
          {fields.map((field: any, index: any) => (
            <>  <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
              <label className="fs-14 fw-600">Product Quantity</label>
              <Form.Item
                name={`quantity${index}`}
                rules={[{ required: true, message: "Required field " }]}
                style={{ marginBottom: "8px" }}
                normalize={(value: any) => handleInputTrimStart(value)}
              >
                <Input
                  placeholder="Enter product quantity"
                  id={`quantity${index}`}
                  style={{ marginTop: "2px", height: "40px" }}
                  value={field.quantity}
                  onChange={(e) => {
                    const newFields = [...fields];
                    newFields[index].quantity = e.target.value;
                    setFields(newFields);
                  }}
                />
              </Form.Item>

            </Col>
              <Col lg={12} xs={24} style={{ marginBottom: "20px" }}>
                <label className="fs-14 fw-600">Select Shoe Size</label>
                <Form.Item
                  name={`eu${index}`}
                  rules={[{ required: true, message: "Required field " }]}
                  style={{ marginBottom: "8px" }}
                >
                  <Select
                    suffixIcon={<img src={arrowDown} alt='arrow down' />}
                    className="d-flex"
                    placeholder="Select Product Size"

                    value={field.size}
                    onChange={(value) => {
                      const newFields = [...fields];
                      newFields[index].size = value;
                      setFields(newFields);
                    }}
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
              </Col>    </>
          ))}
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
