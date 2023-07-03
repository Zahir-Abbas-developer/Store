
import { Button, Col, DatePicker, Row, Select, Space,  Tooltip } from 'antd'
import { Form, Input } from 'antd';
import Arrow from '../../../../../assets/images/OnBoarding/SelectArrow.svg'
import DateIcon from '../../../../../assets/images/OnBoarding/datePicker.svg';
import { Option } from '../../../CareCordinator/ClientDetails/AllocateNewCareHomeModal';
import { useGetRequestByIdQuery, useUpdateRequestMutation } from '../../../../../store/Slices/OnBoarding';
import { useForm } from 'antd/es/form/Form';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import ApiLoader from '../../../../ApiLoader/ApiLoader';
import "./FormMain.scss";
import '../../../../../shared/DatePickerWrapper/DatePickerWrapper.scss'
import { useState } from 'react';
import AppSnackbar from '../../../../../utils/AppSnackbar';


const PersonalInfo = (props: any) => {
    const { handleSelectedStepValue, auditCheck } = props;
    const [isAudited ,setIsAudited]=useState(false)
    const userData: any = localStorage.getItem("careUserData")
    const {role,id}: any = JSON.parse(userData);
    const [updateRequest]=useUpdateRequestMutation();
    const { state }: any = useLocation(); 
    
    const {data,isSuccess}=useGetRequestByIdQuery({id:state?.editProfile?._id ??id,detail:"ABOUT"})

    const [form]=useForm()
    let carerProfile: any;
    if (isSuccess) {
      carerProfile=data
    }
    const carerProfileData={
      firstName:carerProfile?.data?.userprofile?.firstName,
      lastName:carerProfile?.data?.userprofile?.lastName,
      dob:carerProfile?.data?.userprofile?.personalInformation?.dob?dayjs(carerProfile?.data?.userprofile?.personalInformation?.dob):undefined,
      gender:carerProfile?.data?.userprofile?.personalInformation?.gender,
      nationality:carerProfile?.data?.userprofile?.personalInformation?.nationality,
      secondaryEmail:carerProfile?.data?.userprofile?.email,
      phone:carerProfile?.data?.userprofile?.phone,
      linkedIn:carerProfile?.data?.userprofile?.personalInformation?.linkedIn,
      drivingLicense:carerProfile?.data?.userprofile?.personalInformation?.drivingLicense,
      designation:carerProfile?.data?.userprofile?.personalInformation?.designation,
    }
   
    const profileData={
        firstName:state?.editProfile?.firstName,
        lastName:state?.editProfile?.lastName,
        dob:dayjs(state?.editProfile?.personalInformation?.dob),
        gender:state?.editProfile?.personalInformation?.gender,
        nationality:state?.editProfile?.personalInformation?.nationality,
        secondaryEmail:state?.editProfile?.email,
        phone:state?.editProfile?.phone,
        linkedIn:state?.editProfile?.personalInformation?.linkedIn,
        drivingLicense:state?.editProfile?.personalInformation?.drivingLicense,
        designation:state?.editProfile?.personalInformation?.designation,

    }
   
    const onFinish = async (values: any) => {
      try{
        await updateRequest({id:state?.editProfile?._id ?? id,payload:{personalInformation:{...values,isAudited}}}).unwrap()
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
        values && handleSelectedStepValue('Address Details')
      }
      catch (error: any) { AppSnackbar({ type: "error", messageHeading: "Error", message: error?.data?.message ?? "Something went wrong!", }); }
 
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const emailValidator = (rule: any, value: any, callback: any) => {
        if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            callback();
        } else {
            callback('Please enter a valid email address');
        }
    };
   
    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'Required Field', }],
    };


    return (
      <>
      { isSuccess?  <div className='personal-form-wrapper'>

<div className='fw-500 fs-20 form-heading-color' style={{ marginBottom: 10 }}>
    Personal Info
</div>
<Form
    name="basic"
    initialValues={(role=="carer" || "training_instructor") ? carerProfileData:profileData}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    layout="vertical"
>
    <Row gutter={[30, 5]} align="bottom">

        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
            <Form.Item
                label=" First Name"
                name="firstName"
                rules={[{ required: true, message: 'Required field' }]}
            >
                <Input placeholder="Type here" />
            </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
            <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Required field' }]}
            >
                <Input placeholder="Type here" />
            </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={10} className='date-picker-wrapper'>

            <Form.Item name="dob" label="Date Of Birth" {...config} style={{ maxWidth: '100%' }}>
                <DatePicker popupClassName="date-picker-content" suffixIcon={<img src={DateIcon} />} clearIcon={false} />
            </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
                label="Gender "
                name="gender"
                rules={[{ required: true, message: 'Required field' }]}
                className='allocate-select'
            >
                <Select placeholder="Selected option" suffixIcon={<img src={Arrow} />}>
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    
                </Select>
            </Form.Item>

        </Col>

        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
            <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: 'Required field' }]}
            >
                <Input placeholder="Type here" />
            </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
            <Form.Item
                label="Email"
                name="secondaryEmail"
                rules={[
                    { required: true, message: 'Required field' },
                    { validator: emailValidator },]}
            >
                <Input placeholder="Type here" />
            </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
                label="Nationality "
                name="nationality"
                rules={[{ required: true, message: 'Required field' }]}
                className='allocate-select'
            >
                <Select placeholder="Selected option" suffixIcon={<img src={Arrow} />}>
                    <Option value="	Afghanistan">	Afghanistan</Option>
                    <Option value="Albania">Albania</Option>
                    <Option value="	Algeria">	Algeria</Option>
                    <Option value="	Argentina">Argentina</Option>
                    <Option value="Armenia">Armenia</Option>
                    <Option value="	Brazil">Brazil</Option>
                    <Option value="	Pakistan">Pakistan</Option>
                    <Option value="China">China</Option>
                    <Option value="	India">	India</Option>
                </Select>
            </Form.Item>

        </Col>
        <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
                label="Job Applying For "
                name="designation"
                rules={[{ required: true, message: 'Required field' }]}
                className='allocate-select'
            >
                <Select placeholder="Selected option" suffixIcon={<img src={Arrow} />}>
                    <Option value="Desingner">Desingner</Option>
                    <Option value="Developer">Developer</Option>
                    <Option value="PhotoGrapher">Photo Grapher</Option>
                </Select>
            </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input ' >
            <Form.Item
                label="Linkdin ID"
                name="linkedIn"
            >
                <Input placeholder="Type here" />
            </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
            <Form.Item
                label="Valid Driving Licence"
                name="drivingLicense"   
            >
                <Input placeholder="Type here" />
            </Form.Item>
        </Col>
        <Col xs={24} >
            <div >
                <Space className='carer-buttons'>
                    {auditCheck && <Tooltip
                        autoAdjustOverflow={true}
                        showArrow={false}
                        placement="bottomLeft" color="#65CDF0"
                        title='Click to mark as audit'
                    >
                     {role==="admin" &&   <Button className='edit-module-button  audit-button  align-center d-flex' onClick={()=>setIsAudited(true)}>Audit</Button>}
                    </Tooltip>}
                    <Button className='edit-module-button bg-orange-color  align-center d-flex ' htmlType='submit'>Save</Button>
                    <Button className='edit-module-button   align-center d-flex btn-secondary' htmlType='submit'>Continue</Button>
                </Space>
            </div>
        </Col>
    </Row>
</Form>


</div >:<ApiLoader/>}
      
      </>
       
    )
}

export default PersonalInfo