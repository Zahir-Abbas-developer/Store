import { Col, Divider, Row, Space } from 'antd';
import Pdf from '../../../../assets/images/OnBoarding/pdf.svg';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetRequestByIdQuery } from '../../../../store/Slices/OnBoarding';
import ApiLoader from '../../../ApiLoader/ApiLoader';
import { render } from 'react-dom';

interface IUserInfo {
  accountUsername: string,
  bankName: string,
  sortCode: string,
  accountNumber: string,
  accountType: string,
  image: string

}
interface IAdditionalTraining {
  trainingName: string,
    certificateIssued: string,
    certificateExpiry: string,
    image: string
}

const additionalColumns: ColumnsType<IAdditionalTraining> = [
  {
      title: <span className='fw-600 fs-14'>Training Name</span>,
      dataIndex: 'name',
      key: 'name',

      render: (_, text) =>

          <span className='fs-14 fw-400 title-color'>
              {text.trainingName}
          </span>

  },


  {
      title: <span className='fw-600 fs-14' >Attachment</span>,
      dataIndex: 'status',
      key: 'status',


      render: (_, text:any) => (
        
          <span className='fs-14 fw-400 title-color'>
          {text.attachment?  <a href={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${text.attachment
?.mediaId}.${text.attachment
?.mediaMeta?.extension}`}> <img src={Pdf} alt="image" /></a>  :"No Attachment"}
        
          </span>

 ) },
  


];

const columns: ColumnsType<IUserInfo> = [
  {
    title: <span className='fw-600 fs-14'>Account User Name </span>,
    dataIndex: 'name',
    key: 'name',
    width: 160,
    render: (_, text) =>

      <span className='fs-14 fw-400 title-color'>
        {text.accountUsername}
      </span>

  },
  {
    title: <span className='fw-600 fs-14'>Name of Bank</span>,
    dataIndex: 'bank',
    key: 'bank',
    width: 150,
    render: (_, text) =>

      <span className='fs-14 fw-400 title-color'>
        {text.bankName}
      </span>

  },
  {
    title: <span className='fw-600 fs-14'>Sort Code</span>,
    dataIndex: 'code',
    key: 'code',
    width: 160,

    render: (_, text) =>
      <span className='fs-14 fw-400 title-color'>
        {text.sortCode}
      </span>

  },
  {
    title: <span className='fw-600 fs-14'>Account Number</span>,
    dataIndex: 'account',
    key: 'account',
    width: 160,

    render: (_, text) =>
      <span className='fs-14 fw-400 title-color'>
        {text.accountNumber}
      </span>

  },
  {
    title: <span className='fw-600 fs-14'>Account Type</span>,
    dataIndex: 'status',
    key: 'status',
    width: 140,

    render: (_, text) =>
      <span className='fs-14 fw-400 title-color'>
        {text.accountType}
      </span>

  },

  // {
  //   title: <span className='fw-600 fs-14' >Attachments</span>,
  //   dataIndex: 'status',
  //   key: 'status',
  //   width: 100,

  //   render: (_, text) =>
  //     <span className='fs-14 fw-400 title-color'>
  //       <img src={text.image} alt="image" />
  //     </span>

  // },


];




const OtherInformation = ({selectedTableData}:any) => {
  const {data,isLoading,isSuccess}=useGetRequestByIdQuery({id:selectedTableData,detail:"OTHERINFO"})
  let profileViewInfoData:any;
 
 if(isSuccess){
    profileViewInfoData=data
  }
 console.log(profileViewInfoData)
  return (
    <>
    {isSuccess?<div>
      <p className='fw-500 fs-20'> Employment Status</p>

      <Row gutter={[20, 12]}>
        <Col xs={12}>
          <Space direction='vertical' size={0}>
          <span className='fw-600 fs-14'>
             Pay Tax Code
              </span>
              <Space  size={6}>
                {profileViewInfoData?.data?.userprofile
?.employmentStatus?.empDetails?.payTaxCode ??"No PayTaxCode"}
              </Space>
            </Space>      
        </Col>
        <Col xs={12}>
          <Space direction='vertical' size={0}>
          <span className='fw-600 fs-14'>
          Select Candidate’s employment status
              </span>
              <Space  size={6}>
                {profileViewInfoData?.data?.userprofile
?.employmentStatus?.empType ??"No Status"}
              </Space>
            </Space>      
        </Col>
        <Col xs={12}>
          <Space direction='vertical' size={0}>
          <span className='fw-600 fs-14'>
          Do you have a P45 from a previous employer within the current tax year?
              </span>
              <Space  size={6}>
                {profileViewInfoData?.data?.userprofile
?.employmentStatus?.empDetails?.p45TaxYear ? "Yes" :"No"}
              </Space>
            </Space>      
        </Col>
        <Col xs={12}>
          <Space direction='vertical' size={0}>
          <span className='fw-600 fs-14'>
          National Insurance No
              </span>
              <Space  size={6}>
                {profileViewInfoData?.data?.userprofile
?.employmentStatus?.empDetails?.insuranceNo ??"No insuranceNo"}
              </Space>
            </Space>      
        </Col>
        <Col xs={12}>
          <Space direction='vertical' size={0}>
          <span className='fw-600 fs-14'>
          Do you have one of the student loans?
              </span>
              <Space  size={6}>
                {profileViewInfoData?.data?.userprofile
?.employmentStatus?.empDetails?.studentLoan ? "Yes" :"No StudentLoan"} 
              </Space>
            </Space>      
        </Col>
        <Col xs={12}>
          <Space direction='vertical' size={0}>
          <span className='fw-600 fs-14'>
          Document
              </span>
              <Space  size={6}>
             <img src={Pdf} alt="PDF"/>{profileViewInfoData?.data?.userprofile
?.employmentStatus?.empDetails?.certificates ??"No Certificate"}
              </Space>
            </Space>      
        </Col>
       
        {/* <Col xs={12}>
          <Space direction='vertical' size={0}>
          <span className='fw-600 fs-14'>
          Do you have a post graduate loan which is fully repaid?
              </span>
              <Space  size={6}>
                {profileViewInfoData?.data?.userprofile
?.employmentStatus?.empDetails?.postGraduateLoan ?? "No PostGraduateLoan"}
              </Space>
            </Space>      
        </Col> */}
        {/* {OtherInformationDetails.map((item, index) =>
          <Col xs={index % 2 === 0 ? 16 : 8}>
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-14'>
                {item.title}
              </span>
              <Space size={6}>

                {item.image && <span className='d-flex align-center'> <img src={item.image} alt='pdf' /></span>}
                <span className='fw-400 fs-12'> {item.detail}</span>
              </Space>
            </Space>
          </Col>
        )
        } */}


        <Col xs={24}>
          <Space direction='vertical' size={6}>
            <span className='fw-600 fs-14'>Are you  repaying your student loan directly to the student loan company? </span>
            <span className='fw-400 fs-14'> {profileViewInfoData?.data?.userprofile
?.employmentStatus?.empDetails?.postGraduateLoan?"Yes":"No"}</span>

          </Space>
        </Col>

        <Col xs={24}>
          <Space direction='vertical' size={6}>
            <span className='fw-600 fs-14'>Do you have a post graduate loan which is fully repaid?</span>
            <span className='fw-400 fs-14'> {profileViewInfoData?.data?.userprofile
?.employmentStatus?.empDetails?.postGraduateLoan ?"Yes":"No PostGraduateLoan"}</span>

          </Space>
        </Col>

      </Row>


      <Divider dashed />
      <p className='fw-500 fs-20'>Additional Docs</p>
      <div className='onboading-table-wrapper'>

{profileViewInfoData && <Table loading={isLoading}  columns={additionalColumns} dataSource={profileViewInfoData?.data?.userprofile
?.additionalDocs} scroll={{ x: "max-content" }} pagination={false} />}
</div>
      {/* <Row gutter={[20, 12]} >


        <Col xs={16}>  <Space direction='vertical' size={2}>
          <span className='fw-600 fs-14'> Document Name</span>
          <span className='fw 400 fs-14'> care library</span>
        </Space></Col>
        <Col xs={8}>  <Space direction='vertical' size={2}>
          <span className='fw-600 fs-14'> Document</span>
          <Space size={6}>

            <span className='d-flex align-center'> <img src={Pdf} alt='pdf' /></span>
            <span className='fw-400 fs-12'> {profileViewInfoData?.data?.userprofile?.additionalDocs}</span>
          </Space>
        </Space>
        
        </Col>

      </Row> */}

      <Divider dashed />
      <p className='fw-500 fs-20'>Bank Details</p>
      <div className='onboading-table-wrapper'>

      {profileViewInfoData && <Table loading={isLoading}  columns={columns} dataSource={profileViewInfoData?.data?.userprofile
?.bankDetails} scroll={{ x: "max-content" }} pagination={false} />}
      </div>




    </div>:<ApiLoader/>}
    
    </>
  )
}

export default OtherInformation