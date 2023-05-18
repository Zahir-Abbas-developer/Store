import { Col, Divider, Row, Space } from 'antd'
import Pdf from "../../../../assets/images/OnBoarding/pdf.svg";
import { useGetRequestByIdQuery } from '../../../../store/Slices/OnBoarding'
import { isNullOrEmpty } from '../../../../utils/utils';
import ApiLoader from '../../../ApiLoader/ApiLoader';


const BackgroundChecks = ({selectedTableData}:any) => {

  const {data,isLoading,isSuccess,isError}=useGetRequestByIdQuery({id:selectedTableData,detail:"BACKGROUND"})
  let profileViewData:any;
  if(isSuccess){
    profileViewData=data
  }
 
 const dbsProfileData=profileViewData?.data?.userprofile

  return (
   <>
   {isSuccess ? <div>
      <p className='fw-500 fs-20'>DBS</p>

      { isNullOrEmpty(dbsProfileData)? <p>No Data</p> :
 


      <Row gutter={[20, 12]}>
      
         <Col xs={12}>
              <Space direction='vertical' size={0}>
                <span className='fw-600 fs-12'>
                  Does the candidate have a valid Enhanced DBS?
                </span>
                <Space size={6}>

                  <span className='fw-400 fs-12'> {profileViewData?.data?.userprofile[0]?.dbsCheck?.enhancedDBS ? 
  profileViewData.data.userprofile[0].dbsCheck.enhancedDBS : 
  'N/A'}</span>
                </Space>
              </Space>
            </Col>
            <Col xs={12}>
              <Space direction='vertical' size={0}>
                <span className='fw-600 fs-12'>
                  DBS (PVG) Certificate Number
                </span>
                <Space size={6}>

                  <span className='fw-400 fs-12'> {profileViewData?.data?.userprofile[0]?.dbsCheck?.certificateNumber}</span>
                </Space>
              </Space>
            </Col>
            <Col xs={12}>
              <Space direction='vertical' size={0}>
                <span className='fw-600 fs-12'>
                  DBS (PVG) Issue Date
                </span>
                <Space size={6}>

                  <span className='fw-400 fs-12'> {profileViewData?.data?.userprofile[0]?.dbsCheck?.issueDate}</span>
                </Space>
              </Space>
            </Col>
            <Col xs={12}>
              <Space direction='vertical' size={0}>
                <span className='fw-600 fs-12'>
                 Is DBS (PVG) online?
                </span>
                <Space size={6}>

                  <span className='fw-400 fs-12'> {profileViewData?.data?.userprofile[0]?.dbsCheck?.dbsOnline}</span>
                </Space>
              </Space>
            </Col>
            <Col xs={12}>
              <Space direction='vertical' size={0}>
                <span className='fw-600 fs-12'>
                 DBS (PVG) Update Service No.
                </span>
                <Space size={6}>

                  <span className='fw-400 fs-12'> {profileViewData?.data?.userprofile[0]?.dbsCheck?.serviceNumber}</span>
                </Space>
              </Space>
            </Col>
            <Col xs={12}>
              <Space direction='vertical' size={0}>
                <span className='fw-600 fs-12'>
                 Document
                </span>
                <Space size={6}>

                   <span className='d-flex align-center'> <img src={Pdf} alt='pdf' /></span>
                  {/* <span className='fw-400 fs-12'> {profileViewData?.data?.userprofile[0]?.dbsCheck?. certificates}</span> */}
                </Space>
              </Space>
            </Col>

      </Row>
}
      <Divider style={{ borderColor: "#D9DBE9" }} dashed />
      <p className='fw-500 fs-20'>Right to Work</p>

    
      { isNullOrEmpty(dbsProfileData)? <p>No Data</p> :
      <Row gutter={[20, 12]}>
       
        <Col xs={12}>
              <Space direction='vertical' size={0}>
                <span className='fw-600 fs-12'>
                  Does the candidate have the right to work in UK?
                </span>
                <Space size={6}>

                  <span className='fw-400 fs-12'> {profileViewData?.data?.userprofile[0]?.rightToWork?.rightToWork}</span>
                </Space>
              </Space>
            </Col>
            <Col xs={12}>
              <Space direction='vertical' size={0}>
                <span className='fw-600 fs-12'>
                  Visa RefType
                </span>
                <Space size={6}>

                  <span className='fw-400 fs-12'> {profileViewData?.data?.userprofile[0]?.rightToWork?.visaType}</span>
                </Space>
              </Space>
            </Col>

            <Col xs={12}>
              <Space direction='vertical' size={0}>
                <span className='fw-600 fs-12'>
                 Visa / BRP Number
                </span>
                <Space size={6}>

                  <span className='fw-400 fs-12'> {profileViewData?.data?.userprofile[0]?.rightToWork?.brpNumber}</span>
                </Space>
              </Space>
            </Col>

            <Col xs={12}>
              <Space direction='vertical' size={0}>
                <span className='fw-600 fs-12'>
                  VISA / BRP Expiry Date
                </span>
                <Space size={6}>

                  <span className='fw-400 fs-12'> {profileViewData?.data?.userprofile[0]?.rightToWork?.expiryDate}</span>
                </Space>
              </Space>
            </Col>

            <Col xs={12}>
              <Space direction='vertical' size={0}>
                <span className='fw-600 fs-12'>
                Share Code
                </span>
                <Space size={6}>

                  <span className='fw-400 fs-12'> {profileViewData?.data?.userprofile[0]?.rightToWork?.shareCode}</span>
                </Space>
              </Space>
            </Col>
            <Col xs={12}>
              <Space direction='vertical' size={0}>
                <span className='fw-600 fs-12'>
                 Document
                </span>
                <Space size={6}>

                   <span className='d-flex align-center'> <img src={Pdf} alt='pdf' /></span>
                  {/* <span className='fw-400 fs-12'> {profileViewData?.data?.userprofile[0]?.rightToWork?. certificates}</span> */}
                </Space>
              </Space>
            </Col>


      </Row>
}
    </div>:<ApiLoader/>}
   </>
  )
}

export default BackgroundChecks