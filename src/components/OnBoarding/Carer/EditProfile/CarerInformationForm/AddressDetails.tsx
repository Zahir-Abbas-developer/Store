
import { Button, Col, DatePicker, Row, Select, Space, Switch, Form, Input, Tooltip } from 'antd'
import "./FormMain.scss";
import Arrow from '../../../../../assets/images/OnBoarding/SelectArrow.svg'
import { Option } from '../../../CareCordinator/ClientDetails/AllocateNewCareHomeModal';
import DateIcon from '../../../../../assets/images/OnBoarding/datePicker.svg';
import '../../../../../shared/DatePickerWrapper/DatePickerWrapper.scss'
import { useState } from 'react';
import UploadImage from '../../../../Setting/SettingKeyInfo/UploadImage/UploadImage';
import infoIcon from "../../../../../assets/icons/info-icon.svg";
import { useLocation } from 'react-router-dom';
import { useGetRequestByIdQuery, useUpdateRequestMutation } from '../../../../../store/Slices/OnBoarding';
import dayjs from 'dayjs';
import ApiLoader from '../../../../ApiLoader/ApiLoader';
import { data } from '../../../../../mock/SettingJobRole.ts';
import AppSnackbar from '../../../../../utils/AppSnackbar';



const AddressDetails = (props: any) => {
    const { handleSelectedStepValue, auditCheck } = props;
    const [updateRequest]=useUpdateRequestMutation();
    const { state }: any = useLocation();
    const userData: any = localStorage.getItem("careUserData")
    const {token,role,id}: any = JSON.parse(userData);
    const [certificateId ,setCertificateId]=useState("")
    const [isAudited, setIsAudited]=useState(false)
    const [isShowDate, setIsShowDate] = useState(false)
    const {data,isSuccess}=useGetRequestByIdQuery({id:state?.editProfile?._id ??id,detail:"ABOUT"})

    const onChange = (checked: boolean) => {
        setIsShowDate(checked)
    };

    const onFinish = async (values: any) => {
   
      const payload = {
        ...values,
        documents: certificateId ? [certificateId] : [carerProfile?.data?.userprofile?.address?.documents?.[0]?._id] || [],
      };
      try {
        await updateRequest({id:state?.editProfile?._id?? id,payload:{address:{...payload,isAudited}}}).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
        values && handleSelectedStepValue('Photo for ID Badge')
      }
      catch (error: any) { AppSnackbar({ type: "error", messageHeading: "Error", message: error?.data?.message ?? "Something went wrong!", }); }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const uploadCertificateId=(id:any)=>{
      setCertificateId(id)
  }
  let carerProfile: any;

    if (isSuccess) {
      carerProfile=data
      
    }
    
  const carerProfileData={
    line1:carerProfile?.data?.userprofile?.address?.line1,
    line2:carerProfile?.data?.userprofile?.address?.line2,
    city:carerProfile?.data?.userprofile?.address?.city,
    country:carerProfile?.data?.userprofile?.address?.country,
    county:carerProfile?.data?.userprofile?.address?.county,  
    postCode:carerProfile?.data?.userprofile?.address?.postCode,
    addressFromDate: carerProfile?.data?.userprofile?.address?.addressFromDate?dayjs(carerProfile?.data?.userprofile?.address?.addressFromDate):undefined,
    addressToDate:carerProfile?.data?.userprofile?.address?.addressToDate?dayjs(carerProfile?.data?.userprofile?.address?.addressToDate):undefined 
    
  }
    const profileData={
        city:state?.editProfile?.address?.city,
        country:state?.editProfile?.address?.country,
        county:state?.editProfile?.address?.county,
        line1:state?.editProfile?.address?.line1        ,
        postCode:state?.editProfile?.address?.postCode,
        addressFromDate:dayjs(state?.editProfile?.address?.addressFromDate),
        addressToDate:dayjs(state?.editProfile?.address?.addressToDate)   

    }

    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'Please select Date!' }],
    };
    return (
      <>
      { isSuccess?
        <div className='personal-form-wrapper ' >
        
     
        <div className='fw-500 fs-20 form-heading-color' style={{ marginBottom: 10 }}>
                Address Details
            </div>
            <Form
                name="basic"
                initialValues={(role=="carer" || "training_instructor") ? carerProfileData:profileData}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                // autoComplete="off"
                layout="vertical"
            >

                <Row gutter={[35, 5]} align="bottom">
                    <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                        <Form.Item
                            label="Address First Line"
                            name="line1"

                            rules={[{ required: true, message: 'Required field' }]}
                        >
                            <Input placeholder="Type here" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                        <Form.Item
                            label="Address Second Line"
                            name="line2"

                        >
                            <Input placeholder="Type here" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                        <Form.Item
                            label="Country "
                            name="country"
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
                                <Option value="Uk">Uk</Option>
                                <Option value="US">US</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={10}>
                        <Form.Item
                            label="County "
                            name="county"

                            className='allocate-select'
                        >
                              <Select placeholder="Selected option" suffixIcon={<img src={Arrow} />}>
                                <Option value="	Scotland">	Scotland</Option>
                                <Option value="Wales ">Wales </Option>
                                <Option value="	NorthernIreland">	Northern Ireland</Option>
                                <Option value="Alabama">Alabama</Option>
                                <Option value="Alaska">Alaska</Option>
                                <Option value="California">California</Option>
                                <Option value="Connecticut">Connecticut</Option>
                                <Option value="Florida">Florida</Option>
                                <Option value="Wisconsin">	Wisconsin</Option>
                                <Option value="Wyoming">Wyoming</Option>
                                <Option value="Utah">Utah</Option>
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                        <Form.Item
                            label="Town/City "
                            name="city"
                            rules={[{ required: true, message: 'Required field' }]}
                            className='allocate-select'
                        >
                            <Select placeholder="Selected option" suffixIcon={<img src={Arrow} />}>
                                <Option value="London">London</Option>
                                <Option value="Manchester ">Manchester </Option>
                                <Option value="Liverpool ">Liverpool </Option>
                                <Option value="Manchester ">Leeds  </Option>
                                <Option value="Liverpool ">Glasgow  </Option>
                                <Option value="Swansea  ">Swansea  </Option>
                                <Option value="Belfast "> <Option value="Liverpool ">Belfast  </Option></Option>
                                <Option value="Edinburgh  ">Edinburgh   </Option>
                                <Option value="Edinburgh  ">Edinburgh   </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                        <Form.Item
                            label="Post Code "
                            name="postCode"
                            rules={[{ required: true, message: 'Required field' }]}
                            className='allocate-select'
                        >
                            <Select placeholder="Selected option" suffixIcon={<img src={Arrow} />}>
                                <Option value="WC2B4AB">WC2B 4AB</Option>
                                <Option value="CF103NQ">M11AE</Option>
                                <Option value="BT486DQ ">BT486DQ </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} >
                        <span className='fw-600 fs-14 title-color' >How long the candidate lived in this address?</span>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={10} className='date-picker-wrapper'>
                        <Form.Item name="addressFromDate" label="From Date" {...config} style={{ maxWidth: '100%' }}>
                            <DatePicker popupClassName="date-picker-content" suffixIcon={<img src={DateIcon} />} clearIcon={false} />
                        </Form.Item>
                    </Col>

                    {!isShowDate && <Col xs={24} sm={24} md={12} lg={10} className='date-picker-wrapper'>
                        <Form.Item name="addressToDate" label="To Date" {...config} style={{ maxWidth: '100%' }}>
                            <DatePicker popupClassName="date-picker-content" suffixIcon={<img src={DateIcon} />} clearIcon={false} />
                        </Form.Item>

                    </Col>}

                    <Col xs={24} >
                        <Form.Item name="switch" label="" >
                            <Space>

                                <Switch onChange={onChange} />
                                <span className='fw-600 fs-14 label-color'>This is the current address</span>
                            </Space>

                        </Form.Item>
                    </Col>

                    <Col xs={24} >

                        <Space>
                            <span className='fw-500 fs-20 form-heading-color'>
                                Required Docmuent
                            </span>
                            <Tooltip placement="bottomLeft" color="#65CDF0" overlayInnerStyle={{
                                width: "499px",
                            }} title="These are extra documents (that may not be included in any of the above sections). You can customise this from Settings> Staff Settings> Define Required Documents.">
                                <img src={infoIcon} alt="infoIcon" className='d-flex align-center' />
                            </Tooltip>
                        </Space>

                    </Col>
                    <Col xs={24} lg={21}>
                        <UploadImage id={carerProfile?.data?.userprofile?.address?.documents[0]?._id} uploadCertificateId={uploadCertificateId} fileUrl={carerProfile?.data?.userprofile?.address?.documents[0]?.mediaId+carerProfile?.data?.userprofile?.address?.documents[0]?.mediaMeta?.extension} />
                    </Col>

                    <Col xs={24} >
                        <div >
                            <Space className='carer-buttons'>
                                {(auditCheck && role==="admin") && <Tooltip
                                        autoAdjustOverflow={true}
                                        showArrow={false}
                                        placement="bottomLeft" color="#65CDF0"
                                        title='Click to mark as audit'
                                    >

   <Button className='edit-module-button  audit-button  align-center d-flex' onClick={()=>{setIsAudited(true)}} >Audit</Button>
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
  

export default AddressDetails