import { Col, Row, Space, Tooltip } from 'antd'
import  { useEffect, useState } from 'react'
import infoIcon from "../../../../../assets/icons/info-icon.svg";
import { Button, DatePicker, Select, } from 'antd'
import { Form, Input } from 'antd';
import "./FormMain.scss";
import Arrow from '../../../../../assets/images/OnBoarding/SelectArrow.svg'
import DateIcon from '../../../../../assets/images/OnBoarding/datePicker.svg';
import { Option } from '../../../CareCordinator/ClientDetails/AllocateNewCareHomeModal';
import '../../../../../shared/DatePickerWrapper/DatePickerWrapper.scss'
import { Link, useLocation } from 'react-router-dom';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import UploadImage from '../../../../Setting/SettingKeyInfo/UploadImage/UploadImage';
import { useGetRequestByIdQuery, usePostBckgroundChecksRequestMutation } from '../../../../../store/Slices/OnBoarding';
import ApiLoader from '../../../../ApiLoader/ApiLoader';
import dayjs from 'dayjs';

const RightToWork = (props: any) => {
    const { handleSelectedStepValue, setActivePanelKey, conditionalPath,auditCheck  } = props;
    const [certificateId ,setCertificateId]=useState("") 
    const [postBckgroundChecksRequest]=usePostBckgroundChecksRequestMutation()
    const [value, setValue] = useState("no");
    const userData: any = localStorage.getItem("careUserData")
  const {id,role}: any = JSON.parse(userData);
    const { state }: any = useLocation()


    const {data,isSuccess}=useGetRequestByIdQuery({  id: state?.editProfile?._id ?? id,detail:"BACKGROUND"})
    let profileViewData:any;
    if(isSuccess){
      profileViewData=data
    }
   
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };
    const carerProfileData={
      rightToWork:profileViewData?.data?.userprofile[0]?.rightToWork?.rightToWork ,
      brpNumber:profileViewData?.data?.userprofile[0]?.rightToWork?.brpNumber ,
      shareCode:profileViewData?.data?.userprofile[0]?.rightToWork?.shareCode ,
      visaType:profileViewData?.data?.userprofile[0]?.rightToWork?.visaType , 
      expiryDate:profileViewData?.data?.userprofile[0]?.rightToWork?.expiryDate?dayjs(profileViewData?.data?.userprofile[0]?.rightToWork?.expiryDate ):undefined,
    }

    const onFinish = (values: any) => {
      const payloadRightToWork={...values ,  certificates: certificateId ?certificateId:profileViewData?.data?.userprofile[0]?.rightToWork?.certificates?._id }

         if(values?.rightToWork==="no"){
              delete payloadRightToWork?.certificates
         }
        postBckgroundChecksRequest({payload:{rightToWork:payloadRightToWork},id:state?.editProfile?._id ??id })
        conditionalPath ? handleSelectedStepValue('Employment Status') : handleSelectedStepValue('Next Of Kin')
        setActivePanelKey('Other Information')
    };
   useEffect(()=>{
   setValue(profileViewData?.data?.userprofile[0]?.rightToWork?.rightToWork)
   },[])
  

    const uploadCertificateId=(id:any)=>{
        setCertificateId(id)
    }
    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'Required Field', }],
    };
    return (
      <>
      {isSuccess?  <div >
            <Row>
                <Col xs={24}>
                    <Space>
                        <span className='fw-600 fs-20' > Right to Work</span>
                        <Tooltip placement="bottomLeft" color="#65CDF0" overlayInnerStyle={{
                            width: "499px",
                        }} title="For all candidates with nationalities other than UK, the system will ask to confirm their right to work (RTW) in the UK by collecting the following details so you can perform your checks.">
                            <img src={infoIcon} alt="infoIcon" className='d-flex align-center' />
                        </Tooltip>
                    </Space>
                </Col>

            </Row>

            <Form
                name="basic"
                initialValues={carerProfileData}
                onFinish={onFinish}
              
                layout="vertical"
                className='personal-form-wrapper'
            >
                <Row gutter={[30, 5]} align="bottom">

                    <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                        <Form.Item
                            label="Does the candidate have the right to work in UK?"
                            name="rightToWork"
                        >
                            <Radio.Group onChange={onChange}  value={value} >
                                <Radio value="yes">Yes</Radio>
                                <Radio value="no">No</Radio>

                            </Radio.Group>
                        </Form.Item>

                    </Col>
                    {value==="yes" && <Col xs={24} sm={24} md={12} lg={10}>
                        <Form.Item
                            label="Visa Type "
                            name="visaType"
                            rules={[{ required: true, message: 'Required field' }]}
                            className='allocate-select'
                        >
                            <Select placeholder="Select Visa Type" suffixIcon={<img src={Arrow} />}>
                                <Option value="Biometric">Biometric</Option>
                                <Option value="British Passport ">British Passport</Option>
                                <Option value="EU Citizen ">EU Citizen </Option>
                            </Select>
                        </Form.Item>

                    </Col>}

                    {value==="yes" && <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                        <Form.Item
                            label="Visa / BRP Number"
                            name="brpNumber"
                            rules={[{ required: true, message: 'Required field' }]}
                        >
                            <Input placeholder="Type here" />
                        </Form.Item>
                    </Col>}

                    {value==="yes" && <Col xs={24} sm={24} md={12} lg={10} className='date-picker-wrapper'>

                        <Form.Item name="expiryDate" label="Visa / BRP Expiry Date" {...config} style={{ maxWidth: '100%' }}>
                            <DatePicker popupClassName="date-picker-content" suffixIcon={<img src={DateIcon} />} clearIcon={false} />
                        </Form.Item>
                    </Col>}



                    {value==="yes" && <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                        <Form.Item
                            label="Share Code"
                            name="shareCode"
                            rules={[{ required: true, message: 'Required field' }]}
                        >
                            <Input placeholder="Type here" />
                        </Form.Item>
                    </Col>}
                    {value==="yes" && <Col xs={24} sm={24} md={12} lg={10} className='d-flex align-center' >
                        <Form.Item
                            label=""
                            name=""
                        >
                            <Space >
                                <Link to={'https://www.gov.uk/view-right-to-work'} className='secondary-color'>View Right to Work</Link>
                                <Link to={' https://www.gov.uk/prove-right-to-work'} className='secondary-color'>Prove Right to Work</Link>
                            </Space>
                        </Form.Item>

                    </Col>}
                    {value==="yes" && <Col xs={24} lg={21}  ><span className='fw-500 fs-20'>Upload File</span></Col>}
                    {value==="yes" && <Col xs={24} lg={21}  >

                        <UploadImage uploadCertificateId={uploadCertificateId} fileUrl={profileViewData?.data?.userprofile[0]?.rightToWork?.certificates?.mediaId }/>

                    </Col>}
                    <Col xs={24} >
                        <div >
                            <Space className='carer-buttons'>
                            {  (auditCheck && role==="admin") &&  <Tooltip
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



        </div>:<ApiLoader/>}
      </>
       
    )
}

export default RightToWork