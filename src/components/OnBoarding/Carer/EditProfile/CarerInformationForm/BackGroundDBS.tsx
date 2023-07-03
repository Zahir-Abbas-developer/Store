import { Button, Col, DatePicker, Form, Input, Row, Select, Space,  Tooltip } from 'antd'
import infoIcon from "../../../../../assets/icons/info-icon.svg";
import { useLocation } from 'react-router-dom';
import { Option } from '../../../CareCordinator/ClientDetails/AllocateNewCareHomeModal';
import Arrow from '../../../../../assets/images/OnBoarding/SelectArrow.svg';
import DateIcon from '../../../../../assets/images/OnBoarding/datePicker.svg';
import UploadImage from '../../../../Setting/SettingKeyInfo/UploadImage/UploadImage';
import { useGetRequestByIdQuery, usePostBckgroundChecksRequestMutation } from '../../../../../store/Slices/OnBoarding';
import '../../../../../shared/DatePickerWrapper/DatePickerWrapper.scss'
import './FormMain.scss';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ApiLoader from '../../../../ApiLoader/ApiLoader';
import AppSnackbar from '../../../../../utils/AppSnackbar';



const BackGroundDBS = (props: any) => {
  const { state }: any = useLocation()
  const userData: any = localStorage.getItem("careUserData")
  const {id,role}: any = JSON.parse(userData);
  const [postBckgroundChecksRequest]=usePostBckgroundChecksRequestMutation()
  const {data,isSuccess}=useGetRequestByIdQuery({  id: state?.editProfile?._id ?? id,detail:"BACKGROUND"})
  let profileViewData:any;
 
   if(isSuccess){
    profileViewData=data
  }
    const { handleSelectedStepValue, auditCheck } = props;
    const [validCandidate, setValidCandidate] = useState<Boolean>(true);
    const [certificateId ,setCertificateId]=useState("")  
  
    const carerProfileDataDbs={
      certificateNumber:profileViewData?.data?.userprofile[0]?.dbsCheck?.certificateNumber ,
      dbsOnline:profileViewData?.data?.userprofile[0]?.dbsCheck?.dbsOnline?true:false ,
      enhancedDBS:profileViewData?.data?.userprofile[0]?.dbsCheck?.enhancedDBS?true:false ,
      serviceNumber:profileViewData?.data?.userprofile[0]?.dbsCheck?.serviceNumber ,
      visaType:profileViewData?.data?.userprofile[0]?.dbsCheck?.visaType , 
      issueDate:profileViewData?.data?.userprofile[0]?.dbsCheck?.issueDate?dayjs(profileViewData?.data?.userprofile[0]?.dbsCheck?.issueDate
        ):undefined,
    }

    const onFinish = async (values: any) => {
        const payloadDbChecks={...values , certificates: certificateId? certificateId:profileViewData?.data?.userprofile[0]?.dbsCheck?.certificates?._id}
        if(!validCandidate){
          delete payloadDbChecks?.certificates
        }
   
        try {
        await   postBckgroundChecksRequest({payload:{dbsCheck:payloadDbChecks},id:state?.editProfile?._id ??id }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
        values && handleSelectedStepValue('Right to Work')
        }
        catch (error: any) {
          AppSnackbar({
            type: "error",
            messageHeading: "Error",
            message: error?.data?.message ?? "Something went wrong!",
          });
        }
    };
    useEffect(()=>{
      setValidCandidate(profileViewData?.data?.userprofile[0]?.dbsCheck?.enhancedDBS)
      },[])

    const handleSelectChange = (value: any) => {
        setValidCandidate(value);
    };

    const uploadCerticateId=(id:any)=>{
        setCertificateId(id)
    }

    return (
      <>
      {isSuccess ?   <div className='personal-form-wrapper'>

<Space>
    <span className='fw-600 fs-20' > DBS</span>
    <Tooltip placement="bottomLeft" color="#65CDF0" overlayInnerStyle={{
        width: "399px",
    }} title="The candidate is requested to provide an Enhanced DBS Certificate">
        <img src={infoIcon} alt="infoIcon" className='d-flex align-center' />
    </Tooltip>
</Space>

<Form
    name="basic"
    initialValues={carerProfileDataDbs}
    onFinish={onFinish}
    layout="vertical"
>
    <Row gutter={[20, 15]}>

        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
            <div className='allocate-select' >
                <Form.Item name="enhancedDBS" label="Does the candidate have a valid Enhanced DBS?" style={{ maxWidth: '100%' }}>
                    <Select style={{ width: '100%' }} placeholder="Selected option" suffixIcon={<img src={Arrow} />} value={validCandidate} onChange={handleSelectChange}>
                        <Option value={true}>Yes</Option>
                        <Option value={false}> No</Option>
                    </Select>
                </Form.Item>
            </div>
        </Col>
        {validCandidate && <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
            <Form.Item
                label="DBS (PVG) Certificate Number "
                name="certificateNumber"  >
                <Input placeholder="Type here" />
            </Form.Item>
        </Col>}
        {validCandidate  && <Col xs={24} sm={24} md={12} lg={10} className='date-picker-wrapper'>
            <Form.Item name="issueDate" label="DBS (PVG) Issue Date" style={{ maxWidth: '100%' }}>
                <DatePicker popupClassName="date-picker-content" suffixIcon={<img src={DateIcon} />} clearIcon={false} />
            </Form.Item>
        </Col>}
        {validCandidate && <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
            <Form.Item
                label="Is DBS (PVG) online ?  "
                name="dbsOnline"
                className='allocate-select' >
                <Select placeholder="Selected option" suffixIcon={<img src={Arrow} />}>
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                </Select>
            </Form.Item>
        </Col>}
        {validCandidate && <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
            <Form.Item
                label="DBS (PVG) Update Service No. "
                name="serviceNumber">
                <Input placeholder="Type here" />
            </Form.Item>
        </Col>}

        {!validCandidate  && <Col xs={24} className='carer-form-input '>
            <Space direction='vertical' size={5}>
                <span className=' title-color fw-400 fs-14'>Please follow the following link to initiate for DBS Application process:</span>
                <span className='secondary-color fw-400 fs-14'> https://checkmydbs.co.uk</span>

            </Space>
        </Col>}
        {validCandidate  && <Col xs={21}>
            <span className='fw-600 fs-20' > Upload Certificate</span>
        </Col>}

        {validCandidate  && <Col xs={21}>
            <UploadImage uploadCertificateId={uploadCerticateId} fileUrl={profileViewData?.data?.userprofile[0]?.dbsCheck?.certificates?.mediaId } />
        </Col>}

        <Col xs={24} >
            <div >
                <Space className='carer-buttons'>
                    {(validCandidate && auditCheck && role==="admin") && <Tooltip
                        autoAdjustOverflow={true}
                        showArrow={false}
                        placement="bottomLeft" color="#65CDF0"
                        title='Click to mark as audit'
                    >

                        <Button className='edit-module-button  audit-button  align-center d-flex' >Audit</Button>
                    </Tooltip>}
                    {validCandidate && <Button className='edit-module-button bg-orange-color  align-center d-flex ' htmlType='submit'>Save</Button>}
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

export default BackGroundDBS