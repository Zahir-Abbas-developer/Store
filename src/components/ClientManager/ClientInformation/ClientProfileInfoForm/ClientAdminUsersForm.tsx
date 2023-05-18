import { Col, Row, Select, Tooltip } from 'antd'
import { Form, Input } from 'antd';
import infoIcon from "../../../../assets/icons/info-icon.svg"
import arrowDown from "../../../../assets/icons/arrow-down-icon.svg"
import "./ClientManagerForm.scss"
import FormLowerButtons from './FormLowerButtons/FormLowerButtons';
import { useLocation } from 'react-router-dom';
import { usePostClientAdminUserMutation } from '../../../../store/Slices/ClientManager';
import AppSnackbar from '../../../../utils/AppSnackbar';
import { useEffect, useState } from 'react';
import { useGetManageDepartmentQuery } from '../../../../store/Slices/ClientManager';

const { Option } = Select;


const ClientAdminUsersForm = (props: any) => {

  const userData: any = localStorage.getItem("careUserData")
  const { username }: any = JSON.parse(userData);
  const { id }: any = JSON.parse(userData);

  const [postClientAdminUser] = usePostClientAdminUserMutation();
  
  const { state }: any = useLocation()

  const { data, isLoading, isSuccess, isError, } = useGetManageDepartmentQuery({ userId: state?.editProfile?._id ? state?.editProfile?._id : id })  // get table data

  //  get create group
  let getManageDepartment: any;
  if (isLoading) {
    getManageDepartment = <p>Loading...</p>;
  } else if (isSuccess) {
    getManageDepartment = data;
  } else if (isError) {
    getManageDepartment = <p>Error...</p>;
  }
  
  
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    let userId = state?.editProfile?._id;
    // postClientAdminUser({ userId: userId ? userId : id, payload: values });
    // AppSnackbar({ type: "success", messageHeading: "Success!", message: "Client Admin Users edited Successfully" });
    // let stepperChange = () => props.onChildStateChange(props.selectedStepValue + 1);
    // setTimeout( stepperChange , 1000);


    try {
      const { data, error }: any = await postClientAdminUser({ userId: userId ? userId : id, payload: values });
      if (error) {
        AppSnackbar({
          type: "error",
          messageHeading: "Error",
          message: error?.data?.message ?? "Something went wrong!"
        });
        return;
      }
      let stepperChange = () => props.onChildStateChange(props.selectedStepValue + 1);
    setTimeout(stepperChange, 1000);
    }
    catch (error) {
      console.log("Unexpected error:", error);
    }
    AppSnackbar({ type: "success", messageHeading: "Success!", message: "Data uploaded sucessfully" });
  };

  const payLoadInitialData = {}


  useEffect(() => {
   
  }, [state])

  return (
    <div className='client-manager-information-form-wrapper'>
      <div className='form-heading heading-flex'>Client Admin Users
        <Tooltip
          placement="bottomLeft"
          autoAdjustOverflow={true}
          showArrow={false}
          color="#65CDF0"
          overlayInnerStyle={{
            backgroundColor: "#65CDF0",
            color: "#ffffff",
            width: "499px",
          }}
          title='If your clients use the client portalor client mobile apps, you can add additional client admins here. They can post and sign off shifts.'
        >
          <img src={infoIcon} alt="infoIcon" />
        </Tooltip>

      </div>
      <Form
        name="basic"
        initialValues={payLoadInitialData}
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={[30, 5]} align="bottom">
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="LastName"
              name="lastName"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Mobile Number"
              name="phone"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Admin Type "
              name="type"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Department"
              name="department"
              rules={[{ required: true, message: 'Required field' }]}

            >
              <Select placeholder="Selected option"  suffixIcon={<img src={arrowDown} />}>
                {/* {state?.editProfile?.departments.map((option: any) => { */}
                {getManageDepartment?.data?.map((option: any) => {
                  return (
                    <Option value={option?._id}>{option?.name}</Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <FormLowerButtons />

      </Form>



    </div>
  )
}

export default ClientAdminUsersForm