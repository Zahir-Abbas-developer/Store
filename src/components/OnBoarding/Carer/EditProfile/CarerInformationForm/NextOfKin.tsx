
import { Button, Col, Row, Select, Space, Form, Input, Tooltip } from 'antd'
import "./FormMain.scss";
import Arrow from '../../../../../assets/images/OnBoarding/SelectArrow.svg'
import { Option } from '../../../CareCordinator/ClientDetails/AllocateNewCareHomeModal';
import { useGetRequestByIdQuery, usePostOtherInformationRequestMutation } from '../../../../../store/Slices/OnBoarding';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import ApiLoader from '../../../../ApiLoader/ApiLoader';
import AppSnackbar from '../../../../../utils/AppSnackbar';



const NextOfKin = (props: any) => {
    const { handleSelectedStepValue,auditCheck  } = props;
    const userData: any = localStorage.getItem("careUserData");
    const {id,role}: any = JSON.parse(userData);
    const { state }: any = useLocation()
    const {data,isSuccess}=useGetRequestByIdQuery({id: state?.editProfile?._id ?? id,detail:"OTHERINFO"})
    let profileViewInfoData:any;
    if(isSuccess){
      profileViewInfoData=data
    }
    
    const [postOtherInformationRequest]=usePostOtherInformationRequestMutation()
    const carerProfileData={
      firstName:profileViewInfoData?.data?.userprofile?.nextofKin?.firstName ,
      lastName:profileViewInfoData?.data?.userprofile?.nextofKin?.lastName ,
      phone:profileViewInfoData?.data?.userprofile?.nextofKin?.phone ,
      relation:profileViewInfoData?.data?.userprofile?.nextofKin?.relation , 
      email:profileViewInfoData?.data?.userprofile?.nextofKin?.email ,
    }
    const onFinish = async (values: any) => {
      try {
        await postOtherInformationRequest({payload:{nextofKin:values},id:state?.editProfile?._id??id}).unwrap()
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
      values && handleSelectedStepValue('Contact Prefrence')}
      catch (error: any) { AppSnackbar({ type: "error", messageHeading: "Error", message: error?.data?.message ?? "Something went wrong!", }); }
       
    };
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

    return (
      <>{isSuccess ? <div className='personal-form-wrapper ' >
      <div className='fw-500 fs-20 form-heading-color' style={{ marginBottom: 10 }}>
          Next Of Kin
      </div>
      <Form
          name="basic"
          initialValues={carerProfileData}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // autoComplete="off"
          layout="vertical"
      >

          <Row gutter={[30, 5]} align="bottom">
              <Col xs={24} sm={24} md={12} className='carer-form-input '>
                  <Form.Item
                      label="First Name"
                      name="firstName"
                  >
                      <Input placeholder="Type here" />
                  </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} className='carer-form-input '>
                  <Form.Item
                      label="Last Name"
                      name="lastName"
                  >
                      <Input placeholder="Type here" />
                  </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} className='carer-form-input '>
                  <Form.Item
                      label="Email Address"
                      name="email"
                      rules={[
                          { validator: emailValidator },]}
                  >
                      <Input placeholder="Type here" />
                  </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} className='carer-form-input '>
                  <Form.Item
                      label="Phone Number"
                      name="phone"
                  >
                      <Input placeholder="Type here" />
                  </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} className='carer-form-input '>
                  <Form.Item
                      label="Relationship "
                      name="relation"
                      className='allocate-select'
                  >
                      <Select placeholder="Selected option" suffixIcon={<img src={Arrow} />}>
                          <Option value='none'>None</Option>
                          <Option value='brother'>Brother</Option>
                          <Option value='sister'>Sister</Option>
                          <Option value='father'>Father</Option>
                          <Option value='mother'>Mother</Option>
                          <Option value='son'>Son</Option>
                          <Option value='daughter'>Daughter</Option>
                          <Option value='husband'>Husband</Option>
                          <Option value='wife'>Wife</Option>
                          <Option value='friend'>Friend</Option>
                          <Option value='partner'>Partner</Option>
                          <Option value='uncle'>Uncle</Option>
                          <Option value='other'>Other</Option>

                      </Select>
                  </Form.Item>
              </Col>
              <Col xs={24} >
                  <div >
                      <Space className='carer-buttons'>
                       { (auditCheck && role==="admin") &&  <Tooltip
                                  autoAdjustOverflow={true}
                                  showArrow={false}
                                  placement="bottomLeft" color="#65CDF0"
                                  title='Click to mark as audit'
                              >

                                  <Button className='edit-module-button  audit-button  align-center d-flex' >Audit</Button>
                              </Tooltip>}
                          <Button className='edit-module-button bg-orange-color  align-center d-flex ' htmlType='submit'>Save</Button>
                          <Button className='edit-module-button   align-center d-flex btn-secondary' htmlType='submit'>Continue</Button>
                      </Space>
                  </div>
              </Col>
          </Row>
      </Form>
  </div> :<ApiLoader/>}</>
        
    )
}

export default NextOfKin