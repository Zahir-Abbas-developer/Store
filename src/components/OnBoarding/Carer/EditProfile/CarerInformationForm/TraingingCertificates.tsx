import { Button, Col, DatePicker, Row, Space, Switch, Form, Tooltip } from 'antd'
import "./FormMain.scss";
import DateIcon from '../../../../../assets/images/OnBoarding/datePicker.svg';
import '../../../../../shared/DatePickerWrapper/DatePickerWrapper.scss'
import infoIcon from "../../../../../assets/icons/info-icon.svg";
import { useState,useEffect } from 'react';
import UploadImage from '../../../../Setting/SettingKeyInfo/UploadImage/UploadImage';
import dayjs from 'dayjs';
import { usePostTrainingCertificatesRequestMutation } from '../../../../../store/Slices/WorkExperience';
import { useLocation } from 'react-router-dom';
import { useGetRequestByIdQuery } from '../../../../../store/Slices/OnBoarding';
import ApiLoader from '../../../../ApiLoader/ApiLoader';

const TraingingCertificates = (props: any) => {
    const { handleSelectedStepValue, auditCheck } = props;
    const [certificateId ,setCertificateId]=useState("")
    const [isAudited, setIsAudited]=useState(false);
  
    const [urlCertificates ,setUrlCertificates]=useState("");
    const [trainingCertificateSwitchValues ,setTrainingCertificateSwitchValues]=useState({physicalAudited:false,requiredTraining:false,singleCertificate:false,individualCertificate:false})
    const userData: any = localStorage.getItem("careUserData")
    const {id,role}: any = JSON.parse(userData);
    const { state }: any = useLocation()
    const {data,isSuccess}=useGetRequestByIdQuery({id:state?.editProfile?._id ??id,detail:"TRAININGWORK"})
    const [form] = Form.useForm();
    let trainingCertificates:any
     if(isSuccess){   trainingCertificates=data}
    useEffect(() => {
    if (isSuccess){
      trainingCertificates=data
      setTrainingCertificateSwitchValues({
        physicalAudited:trainingCertificates?.data?.userprofile[0]?.tCertificates?.physicalAudited ,
        requiredTraining:trainingCertificates?.data?.userprofile[0]?.tCertificates?.requiredTraining        ,
        singleCertificate:trainingCertificates?.data?.userprofile[0]?.tCertificates?.singleCertificate,
        individualCertificate:trainingCertificates?.data?.userprofile[0]?.tCertificates?.individualCertificate
      });
      setUrlCertificates(trainingCertificates?.data?.userprofile[0]?.tCertificates?.certificates
        ?.mediaId  )
             
    }
    },[isSuccess])
  
   
     
   
     
      const [postTrainingCertificatesRequest]=usePostTrainingCertificatesRequestMutation()


    const handleSwitchChange = (name:any) => (checked:any) => {
        setTrainingCertificateSwitchValues((prevValues) => ({
          ...prevValues,
          [name]: checked
        }));
      };
    const payloadTrainingCertificates={
      certificateIssuedDate:trainingCertificates?.data?.userprofile[0]?.tCertificates?.certificateIssuedDate?dayjs(trainingCertificates?.data?.userprofile[0]?.tCertificates?.certificateIssuedDate):undefined,
      certificateExpiryDate:trainingCertificates?.data?.userprofile[0]?.tCertificates?.certificateExpiryDate?dayjs(trainingCertificates?.data?.userprofile[0]?.tCertificates?.certificateExpiryDate):undefined
    }
  
    const onFinish = (values: any) => {
        values && handleSelectedStepValue('Addtional Training Details')
        const payloadTrainingCertificate={...trainingCertificateSwitchValues,...values,certificates:certificateId ? certificateId  :trainingCertificates?.data?.userprofile[0]?.tCertificates?.certificates?._id    }
        postTrainingCertificatesRequest({payload:payloadTrainingCertificate,id:state?.editProfile?._id??id,isAudited})
    };
 

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const uploadCertificateId=(id:any)=>{
        setCertificateId(id)
    }

    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'Please select Date!' }],
    };
    return (
      <>{isSuccess?
<div className='personal-form-wrapper ' >
            <div style={{ marginBottom: 10 }}>
                <Space>
                    <span className='fw-500 fs-20 form-heading-color'>
                        Training Certificates
                    </span>
                    <Tooltip placement="bottomLeft" color="#65CDF0" overlayInnerStyle={{
                        width: "499px",
                    }} title="The following training list can be customised and changed from Setting> Staff Settings> Define Mendatory Training.">
                        <img src={infoIcon} alt="infoIcon" className='d-flex align-center' />
                    </Tooltip>
                </Space>
            </div>
            <Form
                name="basic"
                initialValues={payloadTrainingCertificates}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
               form={form}
                layout="vertical"
            >

                <Row gutter={[30, 0]} align="bottom">
                    <Col xs={24} >
                        <Form.Item  label="" >
                            <Space>

                                <Switch checked={trainingCertificateSwitchValues.physicalAudited}  onChange={handleSwitchChange('physicalAudited')}  />
                                <span className='fw-400 fs-14 label-color'>Physically Audited And No Document Uploaded</span>
                            </Space>

                        </Form.Item>
                    </Col>
                    <Col xs={24} >
                        <Form.Item  label="" >
                            <span className='fw-600 fs-14 title-color' >Did you require further training (online or in person) ?</span>

                        </Form.Item>
                    </Col>

                    <Col xs={24} >
                        <Form.Item  label="" >
                            <Space>

                                <Switch checked={trainingCertificateSwitchValues.requiredTraining}  onChange={handleSwitchChange('requiredTraining')} />
                                <span className='fw-400 fs-14 label-color'> No / Yes</span>
                            </Space>

                        </Form.Item>
                    </Col>
                    {/* <Col xs={24} >
                        <Form.Item name="switch" label="" >
                            <Space>

                                <Switch checked={trainingCertificateSwitchValues.requiredTraining} onChange={handleSwitchChange('requiredTraining')} />
                                <span className='fw-400 fs-14 label-color'>No</span>
                            </Space>

                        </Form.Item>
                    </Col> */}
                    <Col xs={24} >
                        <Form.Item label="" >
                            <span className='fw-600 fs-14 title-color' >Please choose the following options for :</span>
                        </Form.Item>
                    </Col>


                    <Col xs={24} >
                        <Form.Item label="" >
                            <Space>

                                <Switch checked={trainingCertificateSwitchValues.singleCertificate}  onChange={handleSwitchChange('singleCertificate')}  />
                                <span className='fw-400 fs-14 label-color'>Single certificate covering multiple trainings.</span>
                            </Space>

                        </Form.Item>
                    </Col>

                    <Col xs={24} >
                        <Form.Item  label="" >
                            <Space>

                                <Switch checked={trainingCertificateSwitchValues.individualCertificate}  onChange={handleSwitchChange('individualCertificate')} />
                                <span className='fw-400 fs-14 label-color'>Individual training certificates, as the case may be.</span>
                            </Space>
                        </Form.Item>
                    </Col>
                    <Col xs={24} style={{ marginBottom: "5px" }}>

                        <Space>
                            <span className='fw-500 fs-20 form-heading-color'>
                                Upload Certificate
                            </span>
                            <Tooltip placement="bottomLeft" color="#65CDF0" overlayInnerStyle={{
                                width: "499px",
                            }} title="Please make sure you upload Image or Pdf">
                                <img src={infoIcon} alt="infoIcon" className='d-flex align-center' />
                            </Tooltip>
                        </Space>


                    </Col>
                    <Col xs={21}>
                        <UploadImage uploadCertificateId={uploadCertificateId}  fileUrl={urlCertificates}  />
                    </Col>



                    <Col xs={24} sm={24} md={12} lg={10} className='date-picker-wrapper'>
                        <Form.Item name="certificateIssuedDate" label="When was the certificate Issued" {...config} style={{ maxWidth: '100%' }}>
                            <DatePicker   popupClassName="date-picker-content" suffixIcon={<img src={DateIcon} />} clearIcon={false} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={10} className='date-picker-wrapper'>
                        <Form.Item name="certificateExpiryDate" label="Certificate Expiry Date" {...config} style={{ maxWidth: '100%' }}>
                            <DatePicker  popupClassName="date-picker-content" suffixIcon={<img src={DateIcon} />} clearIcon={false} />
                        </Form.Item>
                    </Col>


                    <Col xs={24} >
                        <div >
                            <Space className='carer-buttons'>

                                {(auditCheck && role==="admin")
                                 && <Tooltip
                                    autoAdjustOverflow={true}
                                    showArrow={false}
                                    placement="bottomLeft" color="#65CDF0"
                                    title='Click to mark as audit'
                                >

                                    <Button className='edit-module-button  audit-button  align-center d-flex' onClick={()=>setIsAudited(true)}>Audit</Button>
                                </Tooltip>}
                                <Button className='edit-module-button bg-orange-color  align-center d-flex ' htmlType='submit'>Save</Button>
                                <Button className='edit-module-button   align-center d-flex btn-secondary' htmlType='submit'>Continue</Button>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>:<ApiLoader/> }
      </>
       
    )
}

export default TraingingCertificates