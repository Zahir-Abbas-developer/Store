import { Col, Divider, Input, Modal, Rate, Row, Select, Space } from 'antd';
import Arrow from '../../../../assets/images/OnBoarding/SelectArrow.svg';
import Close from '../../../../assets/images/OnBoarding/Close.svg'
import Profile from '../../../../assets/images/MockImages/user-lg-1.png';
import Location from '../../../../assets/images/OnBoarding/Location.svg';
import Email from '../../../../assets/images/OnBoarding/Email.svg';



import './ViewProfile.scss';
import { useEffect, useState } from 'react';
import About from './About';
import Refrences from './Refrences';
import TrainingWorkHistory from './Training&WorkHistory';
import BackgroundChecks from './BackgroundChecks';
import OtherInformation from './OtherInformation';
import { isNullOrEmpty } from '../../../../utils/utils';
import { useGetRequestByIdQuery } from '../../../../store/Slices/OnBoarding';

const ViewProfile = ({ IsProfileModal, setIsProfileModal, selectedTableData, selectProfileData }: any) => {
  const [IsProfileDetails, setIsProfileDetails] = useState<number>(1);
  const [profileView, setProfileView] = useState<any>(null);
  
  const {data,isSuccess}=useGetRequestByIdQuery({id:selectedTableData,detail:"ABOUT"})
let profileViewData:any;
 if(isSuccess){
  profileViewData=data
}
const handleOk = () => {
    setIsProfileModal(false);
  };
  const handleCancel = () => {
    setIsProfileModal(false);
  };
 
  
  const ProfileDetails = [
    {
      id: 1,
      component: <About selectedTableData={selectProfileData?._id ?? selectedTableData} />,
      title: 'About'
    },
    {
      id: 2,
      component: <Refrences selectedTableData={selectProfileData?._id ?? selectedTableData} />,
      title: 'References'
    },
    {
      id: 3,
      component: <TrainingWorkHistory selectedTableData={selectProfileData?._id ?? selectedTableData} />,
      title: 'Training & Work History'
    },
    {
      id: 4,
      component: <BackgroundChecks selectedTableData={selectProfileData?._id ?? selectedTableData} />,
      title: 'Background Checks'
    },
    {
      id: 5,
      component: <OtherInformation selectedTableData={selectProfileData?._id ?? selectedTableData} />,
      title: 'Other Information'
    }
  ]


  useEffect(() => {
    const profile = ProfileDetails.find((list) => list.id === IsProfileDetails);
    setProfileView(profile?.component);
  }, [IsProfileDetails, selectedTableData, selectProfileData?._id]);

  return (
    <Modal title={< span className='fw-500 fs-24 form-heading-color' > Profile Preview</span>} centered open={IsProfileModal} onOk={handleOk} onCancel={handleCancel} width={1394} className='view-profile-wrapper' footer={false} closeIcon={< img src={Close} alt="" />}>
      <Row gutter={[30, 30]}  >

        <Col md={7} xs={24}  >
          <div className='card-view' >
            <div className='d-flex  flex-column align-center' style={{ paddingTop: "50px" }} >
              <span>
                <img src={profileViewData?.data?.userprofile?.profilePhoto  ?  `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${profileViewData?.data?.userprofile?.profilePhoto?.mediaId}.${ profileViewData?.data?.userprofile?.profilePhoto?.mediaMeta?.extension}`:`https://ui-avatars.com/api/?rounded=true&name=${profileViewData?.data?.userprofile?.firstName}.${profileViewData?.data?.userprofile?.lastName}` } height={100} width={100} style={{ borderRadius: "50%" }} alt="profile" />
              </span>
              <Space direction='vertical' className='d-flex align-center' size={1}>
                <span className='fw-600 fs-14'>{ profileViewData?.data?.userprofile?.firstName + " " + profileViewData?.data?.userprofile?.lastName}</span>
                <span className='fw-400 fs-14'>{selectProfileData?.userTypename ?? "Carer"}</span>
         {profileViewData?.data?.ratings[0]?.total?     <Rate value={profileViewData?.data?.ratings[0]?.total ?? 0} defaultValue={profileViewData?.data?.ratings[0]?.total ?? 0} style={{ color: '#FABF35', marginBottom: "24px" }} />:"No Ratings"}
              </Space>
              <Space direction='vertical' size={15}>
                {selectProfileData?.phone && (
                  <div className='d-flex align-center'>
                    <span className='icon-body d-flex align-center'> <img src={Location} width={10} height={12} alt="location" /></span>
                    <span className='fw-400 fs-14'>{selectProfileData?.phone}</span>
                  </div>
                )
                }

                {selectProfileData?.email && (
                  <div className='d-flex align-center'>
                    <span className='icon-body d-flex align-center'> <img src={Email} width={10} height={12} alt="location" /></span>
                    <span className='fw-400 fs-14'>{selectProfileData?.email}</span>
                  </div>
                )}
                
              </Space>
            </div>
            <div style={{ padding: '40px 10px 40px 10px' }}>
              <Divider type="horizontal" dashed style={{
                borderColor: " #D9DBE9"
              }} />
            </div>

            <div style={{ paddingBottom: "50px" }}>
              {ProfileDetails.map((item) => (
                <div key={item.id} onClick={() => { setIsProfileDetails(item.id) }} className={` fw-600 fs-14 details-view cursor-pointer ${IsProfileDetails === item.id && " card-title"}`}>
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </Col>

        <Col md={17} xs={24}    >
          <Row className='card-view component-card '>
            <Col xs={24}>
              <div className='user-card' >
                {profileView}
              </div>
            </Col>
          </Row>

        </Col>

      </Row>
    </Modal >
  )
}

export default ViewProfile