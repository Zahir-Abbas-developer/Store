import { Button, Col, Row, Select, Switch, Tooltip } from 'antd'
import { Form, Input } from 'antd';
import infoIcon from "../../../../assets/icons/info-icon.svg"
import "./ClientManagerForm.scss"
import FormLowerButtons from './FormLowerButtons/FormLowerButtons';
import { useLocation } from 'react-router-dom';
import { useGetClientRequestQuery, useGetRequestUserInforByIdQuery, usePostUpdateEmailPhoneMutation } from '../../../../store/Slices/ClientManager';
import AppSnackbar from '../../../../utils/AppSnackbar';
import { useState } from 'react';



const UpdatePrimaryEmailAndPhone = (props: any) => {
  const [postUpdateEmailPhone] = usePostUpdateEmailPhoneMutation();
  const { state }: any = useLocation()
  const userData: any = localStorage.getItem("careUserData")
  const { username }: any = JSON.parse(userData);
  const { id }: any = JSON.parse(userData);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });


  const { data: isInfoData, isLoading: isloadingInfoData, isError: isErrorInfoData, isSuccess: isSucessInfoData } = useGetClientRequestQuery({ refetchOnMountOrArgChange: true, query:"",pagination:pagination,role:"client" })
  let getClientManagerData: any;
  if (isloadingInfoData) {
    getClientManagerData = <p>Loading...</p>
  }
  else if (isSucessInfoData) {
    getClientManagerData = isInfoData
  }
  else if (isErrorInfoData) {
    getClientManagerData = <p>Error...</p>
  }


  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");
  const { data: isData, isLoading: isloadingData, isSuccess: isSuccessData, isError: iserrorData,} = useGetRequestUserInforByIdQuery({ refetchOnMountOrArgChange: true, id:id, detail: "ABOUT" });
  //  get client name
  let getRecentReviews: any;
  if (isloadingData) {
   getRecentReviews = <p>Loading...</p>;
 } else if (isSuccessData) {
   getRecentReviews = isData;
 } else if (iserrorData) {
   getRecentReviews = <p>Error...</p>;
 }

  const getResUserData = getClientManagerData?.data?.result?.filter((item: any) => item.email === username);
  const filteredData = getClientManagerData?.data?.result?.find((obj: { _id: string; }) => obj._id === state?.editProfile?._id);


  const onFinish = async(values: any) => {

    if(role === "client"){

    }

    console.log('Success:', values);
    const formValues = {
      // newEmail: values.newPrimaryEmail,
      // oldEmail: values.PrimaryEmail,
      newPhone: values.newPrimaryPhone,
      userId: state?.editProfile?._id ? state?.editProfile?._id : id,
    }
    
    const clientFormValues = {
      // newEmail: values.newPrimaryEmail,
      // oldEmail: values.PrimaryEmail,
      newPhone: values.newPrimaryPhone,
      // userId: state?.editProfile?._id ? state?.editProfile?._id : id,
    }


    

    // postUpdateEmailPhone({ payload: role === "client" ? clientFormValues : formValues });
    // AppSnackbar({ type: "success", messageHeading: "Success!", message: "Profile comment edited Successfully" });
    // let stepperChange = () => props.onChildStateChange(props.selectedStepValue + 1);
    // setTimeout(stepperChange, 1000);



    try {
      const { data, error }: any = await postUpdateEmailPhone({ payload: role === "client" ? clientFormValues : formValues });
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
  const emailValidator = (rule: any, value: any, callback: any) => {
    if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      callback();
    } else {
      callback('Please enter a valid email address');
    }
  };


  // INTIAL VALIUES GET
  const payLoadInitialData = {
    // PrimaryEmail: state?.editProfile?.email ? state?.editProfile?.email : getResUserData ? getResUserData[0]?.email : '',
    // PrimaryPhone: state?.editProfile?.phone ? state?.editProfile?.phone : getResUserData ? getResUserData[0]?.phone : '',
    PrimaryPhone: state?.editProfile?.phone ? state?.editProfile?.phone : (getResUserData ? getResUserData[0]?.phone : "") || getRecentReviews?.data?.userprofile?.phone,
  }
  return (
    <>
    {
      isSucessInfoData ? 
      <div className='client-manager-information-form-wrapper'>
      <div className='form-heading heading-flex'>Update Primary Email & Phone
        <Tooltip
          placement="bottomLeft"
          autoAdjustOverflow={true}
          //   arrow={false}
          showArrow={false}
          color="#65CDF0"
          overlayInnerStyle={{
            backgroundColor: "#65CDF0",
            color: "#ffffff",
            width: "499px",
          }}
          title='You can update or reset the primary email and phone of the client.'
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
          {/* <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Primary Email"
              name="PrimaryEmail"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col> */}
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item
              label="Primary Phone"
              name="PrimaryPhone"
              rules={[{ required: false, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
          {/* <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="New Primary Email"
              name="newPrimaryEmail"
              rules={[
                { required: true, message: 'Required field' },
                { validator: emailValidator },]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col> */}
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item
              label="New Primary Phone"
              name="newPrimaryPhone"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
            </Form.Item>
          </Col>
        </Row>
        <FormLowerButtons />
      </Form>
    </div>
      : 
      <span>Loading</span>
    }
    </>
    
  )
}

export default UpdatePrimaryEmailAndPhone