import { Col, Divider, Row, Space } from 'antd'
import Pdf from '../../../../assets/images/OnBoarding/pdf.svg';
import Word from '../../../../assets/images/OnBoarding/word.svg';
import Excel from '../../../../assets/images/OnBoarding/excel.svg';
import { useGetRequestByIdQuery } from '../../../../store/Slices/OnBoarding';
import ApiLoader from '../../../ApiLoader/ApiLoader';
import dayjs from 'dayjs';

const About = ({ selectedTableData }: any) => {
  const { data, isLoading, isSuccess } = useGetRequestByIdQuery({ id: selectedTableData, detail: "ABOUT" })
  let profileViewData: any;
  let fileExtension: any
  if (isSuccess) {
    profileViewData = data
    fileExtension = profileViewData?.data?.userprofile?.address?.documents[0]?.mediaMeta?.extension
  }
  let fileUrl = `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${profileViewData?.data?.userprofile?.address?.documents[0]?.mediaId
    }.${profileViewData?.data?.userprofile?.address?.documents[0]?.mediaMeta?.extension}`

  return (
    <>
      {isSuccess ? <div>
        <p className='fw-500 fs-20'> About</p>
        <Row gutter={[20, 12]}>
          <Col xxl={14} xs={24}>
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-12'>
                Full Name
              </span>
              <span className='fw-400 fs-12'>
                {profileViewData?.data?.userprofile?.firstName + " " + profileViewData?.data?.userprofile?.lastName}
              </span>
            </Space>
          </Col>
          <Col xxl={8} xs={24}>
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-12'>
                Date Of Birth
              </span>
              <span className='fw-400 fs-12'>
                {profileViewData?.data?.userprofile?.personalInformation?.dob ? dayjs(profileViewData?.data?.userprofile?.personalInformation?.dob).format("DD-MM-YYYY") : "--/--/--"}
              </span>
            </Space>
          </Col>
          <Col xxl={8} xs={24}>
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-12'>
                Gender
              </span>
              <span className='fw-400 fs-12'>
                {profileViewData?.data?.userprofile?.personalInformation?.gender}
              </span>
            </Space>
          </Col>
          <Col xxl={8} xs={24}>
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-12'>
                Phone Number
              </span>
              <span className='fw-400 fs-12'>
                {profileViewData?.data?.userprofile?.phone}
              </span>
            </Space>
          </Col>
          <Col xxl={8} xs={24}>
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-12'>
                Email
              </span>
              <span className='fw-400 fs-12'>
                {profileViewData?.data?.userprofile?.email}
              </span>
            </Space>
          </Col>
          <Col xxl={8} xs={24}>
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-12'>
                Nationality
              </span>
              <span className='fw-400 fs-12'>
                {profileViewData?.data?.userprofile?.personalInformation?.nationality}
              </span>
            </Space>
          </Col>
          <Col xxl={8} xs={24}>
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-12'>
                Designation
              </span>
              <span className='fw-400 fs-12'>
                {profileViewData?.data?.userprofile?.personalInformation?.designation
                }
              </span>
            </Space>
          </Col>
          <Col xxl={8} xs={24}>
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-12'>
                LinkedIn ID
              </span>
              <span className='fw-400 fs-12'>
                {profileViewData?.data?.userprofile?.personalInformation?.linkedIn

                }
              </span>
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: "#D9DBE9" }} dashed />

        <p className='fw-500 fs-20'> Address Detail</p>
        <Row gutter={[20, 12]}>
          <Col xxl={8} xs={24}>
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-12'>
                Address First Line
              </span>
              <span className='fw-400 fs-12'>
                {profileViewData?.data?.userprofile?.address?.line1
                }
              </span>
            </Space>
          </Col>
          <Col xxl={8} xs={24}>
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-12'>
                Address Second Line
              </span>
              <span className='fw-400 fs-12'>
                {profileViewData?.data?.userprofile?.address?.line2
                }
              </span>
            </Space>
          </Col>
          <Col xxl={8} xs={24}>
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-12'>
                Country
              </span>
              <span className='fw-400 fs-12'>
                {profileViewData?.data?.userprofile?.address?.country
                }
              </span>
            </Space>
          </Col>
          <Col xxl={8} xs={24}>
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-12'>
                County
              </span>
              <span className='fw-400 fs-12'>
                {profileViewData?.data?.userprofile?.address?.county
                }
              </span>
            </Space>
          </Col>
          <Col xxl={8} xs={24}>
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-12'>
                Town/City
              </span>
              <span className='fw-400 fs-12'>
                {profileViewData?.data?.userprofile?.address?.city
                }
              </span>
            </Space>
          </Col>
          <Col xxl={8} xs={24}>
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-12'>
                Post Code
              </span>
              <span className='fw-400 fs-12'>
                {profileViewData?.data?.userprofile?.address?.postCode
                }
              </span>
            </Space>
          </Col>

        </Row>
        <Row gutter={[10, 10]}>
          <Col xs={24} style={{ marginTop: '10px' }}>
            <span className='fw-600 fs-12'>How long the candidate lived in this address?</span>
          </Col>
          <Col xs={24} >
            <Space direction='vertical' size={0}>
              <span className='fw-600 fs-12'> Date</span>
              <span className='fw-400 fs-12'> {profileViewData?.data?.userprofile?.updatedAt ? dayjs(profileViewData?.data?.userprofile?.updatedAt).format("DD-MM-YYYY") : "--/--/--"}</span>

            </Space>
          </Col>
          <Col xs={24}>
            <span className='fw-600 fs-12'> Document</span>
          </Col>
          {fileExtension ?
            <Col md={8} xs={24} className='d-flex justify-between align-center'>

              {(fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "ocx") && <Space size={3} > <span className='d-flex align-center'><a href={fileUrl}><img src={Pdf} alt="" /></a></span> <span >doc.pdf</span></Space>}
              {(fileExtension === "png" || fileExtension === "jpeg" || fileExtension === "peg") && <Space size={3}>  <a href={fileUrl}><img src={Word} alt="image" className='d-flex align-center' /></a> <span>wrd.doc</span></Space>}
              {fileExtension === "xlsx" && <Space size={3}> <a href={fileUrl}><img src={Excel} alt="image" className='d-flex align-center' /> </a><span>xsl.excel</span></Space>}
            </Col> : "No Attachments"}
        </Row>

        <Divider style={{ borderColor: "#D9DBE9" }} dashed />

        <p className='fw-500 fs-20'> ID Upload (Passport/DL)</p>
        {profileViewData?.data?.userprofile?.idProof ?
          <div>
            <Space size={3} direction='vertical'>
              <span className='fw-600 fs-12'>ID Proof Upload</span>
              <Space size={3} className='d-flex align-center'> <span className='d-flex align-center'><a href={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${profileViewData?.data?.userprofile?.idProof?.mediaId}.${profileViewData?.data?.userprofile?.idProof?.mediaMeta?.extension}`}><img src={Pdf} alt="" /></a></span> <span className='fw-400 fs-12' >{profileViewData?.data?.userprofile?.idProof?.fileName + " " + profileViewData?.data?.userprofile?.idProof?.mediaMeta?.extension}</span></Space>
            </Space>
          </div> : "No Attachments"}



      </div > : <ApiLoader />}
    </>

  )
}

export default About