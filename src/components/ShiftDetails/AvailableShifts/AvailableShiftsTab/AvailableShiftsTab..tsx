import { Layout, Row, Col, Card, Rate, Space, Modal } from 'antd';
import React, { useState } from 'react'
import './AvailableShiftsTab.scss';
import {  useGetRequestAvailableQuery, usePostAcceptShiftRequestMutation } from '../../../../store/Slices/ShiftDetails';
import EuroIcon from '../../../../assets/icons/ShiftDetails/EuroIcon.svg'
import LocationIcon from '../../../../assets/icons/ShiftDetails/LocationIcon.svg'
import TimeIcon from '../../../../assets/icons/ShiftDetails/TimeIcon.svg'
import DateIcon from '../../../../assets/icons/ShiftDetails/DateIcon.svg'
import ShiftTypeIcon from '../../../../assets/icons/ShiftDetails/ShiftTypeIcon.svg'
import HomeIcon from "../../../../assets/icons/ShiftDetails/HomeIcon.svg";
import dayjs from 'dayjs';
import ConfirmationModal from '../../Modals/ConfirmationModal/ConfirmationModal';


const AvailableShiftsTab = () => {

  const { data, isLoading, isSuccess, isError, } = useGetRequestAvailableQuery({ refetchOnMountOrArgChange: true })

  let shiftDetails: any;
  if (isLoading) {
    shiftDetails = <p>Loading...</p>
  }
  else if (isSuccess) {
    shiftDetails = data
  }
  else if (isError) {
    shiftDetails = <p>Error...</p>
  }

  const [IsOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const userData: any = localStorage.getItem("careUserData");
  const users: any = JSON.parse(userData);
  const [acceptValues, setAcceptValues] = useState<any>({});
  const [IsOpenAcceptModal, setIsOpenAcceptModal] = useState(false);
  const [AcceptShiftId, setAcceptShiftId] = useState<string>('');
  const [postAcceptShiftRequest] = usePostAcceptShiftRequestMutation()

  const shownInfoModal = (id: any) => {
    setIsOpenInfoModal(true);
  };

  const handleOkAcceptModal = async (id: any) => {
    const payload = {
      shiftId: AcceptShiftId,
      staffId: users?.id,
      confirmationReq: false,
    };

    await postAcceptShiftRequest(payload)
    setIsOpenAcceptModal(false);
  }

  const startTime = dayjs(shiftDetails?.data?.startTime); const endTime = dayjs(shiftDetails?.data?.endTime);
  const diffInHours = startTime.diff(endTime, 'hours');

  
  const availableShiftData = [
    { src: LocationIcon, text: (item: any) => `${item?.careHomeName?.address?.city}` },
    { src: DateIcon, text: (item: any) => `${dayjs(item?.shiftDate).format('MMM DD , dddd')}` },
    { src: TimeIcon, text: (item: any) => `${dayjs(item?.startTime).format('h:mm A')} TO ${dayjs(item?.endTime).format('h:mm A')}` },
    { src: ShiftTypeIcon, text: (item: any) => `${item?.shiftType}` },
    { src: EuroIcon, text: (item: any) => `Shift Rate: £${item?.rate}` },

  ]
  const infoModalData = [
    { heading: "Address :", text: `${acceptValues.careHomeName?.address?.city}` },
    { heading: "Total Shift Hours :", text: `${diffInHours} Hrs` },
    { heading: "Date :", text: `${dayjs(acceptValues?.shiftDate).format('MMM DD , ddd - YYYY')}` },
    { heading: "Shift Timing :", text: `${dayjs(acceptValues?.startTime).format('h:mm A')} - ${dayjs(acceptValues?.endTime).format('h:mm A')}` },
    { heading: "Total Shift Pay :", text: `${acceptValues?.rate}` },
    { heading: "Department :", text: `${acceptValues?.department}` },
    { heading: "Distance from you :", text: `${acceptValues?.distance}` },
  ]


  return (
    <Layout className='wrap-shift-details-card'>
      <Row gutter={[28, 28]} style={{ paddingTop: "4px" }}>
        {shiftDetails?.data?.map((shift: any) => {
          return (
            <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={shift.id} >
              <div className='shift-detail-main-wrapper'>
                <Card
                  className='border-radius-10 shift-details-card-style'>
                  <div className='d-flex align-center ' style={{ gap: '3px' }}>
                    <div><img src={HomeIcon} alt="HomeIcon" width={32} height={32} className="shift-img" /></div>
                    <span className='fw-500 fs-20 shift-title'>{shift?.careHomeName?.clientName} </span></div>
                  <span className='rating-star'><Rate disabled defaultValue={shift?.careHomeName?.clientRating[0]?.average} style={{ fontSize: "15px" }} /></span>

                  <div className='wrap-shift-card-info'>
                    {availableShiftData?.map((data: any) => (
                      <div className=' d-flex shift-card-content align-items-center' >
                        <img src={data.src} alt="LocationIcon" width={24} height={24} />
                        <span className='fw-500 fs-16 line-height-24 '>{data.text(shift)}</span>
                      </div>
                    ))}


                    <Space className='wrap-shift-card-btn'>
                      <button className='fw-600 fs-16 white-color cursor-pointer shift-details-card-info-btn' onClick={() => { shownInfoModal(shift._id); setAcceptValues(shift) }}>More Info</button>
                      <button className='fw-600 fs-16 white-color cursor-pointer shift-details-card-accept-btn' onClick={() => {setIsOpenAcceptModal(true);  setAcceptShiftId(shift._id) }}>Accept</button>

                    </Space>
                  </div>
                </Card>
              </div>

            </Col>
          )
        })}
      </Row>
      {/*  */}
      <div className='wrapper-shift-detail-info-modal'>
        <Modal centered className='wrap-shift-detail-info-modal'
          open={IsOpenInfoModal}
          title={<span className='fw-500 fs-24 line-height-32 black-color'> More Information</span>}
          onOk={() => { setIsOpenInfoModal(false) }}
          onCancel={() => { setIsOpenInfoModal(false) }}
          width={784}

          footer={[

          ]}
        >
          {shiftDetails?.data?.slice(0, 1).map((data: any) => (
           
              <div className='d-flex align-center ' style={{ gap: '20px' }}>
                <div><img src={HomeIcon} alt="HomeIcon" width={32} height={32} className="shift-img"  style={{marginLeft:"12px"}}/></div>
                <span className='fw-500 fs-20 shift-title'>{data?.careHomeName?.clientName} </span></div>
          ))}
          <Row gutter={[18, 18]} className="wrap-shift-detail-info-modal-content">
            {infoModalData.map((accept: any) => (
              <>
                <Col xl={6} lg={8} sm={8} xs={12} className='fw-600 fs-16 line-height-22 form-heading-color'>{accept?.heading}</Col>
                <Col xl={18} lg={12} sm={12} xs={12} className='fw-400 title-color fs-14 line-height-22'>{accept?.text}</Col>
              </>
            ))}
            <Col xl={24}>
              <p className='fw-400 fs-12 title-color line-height-22 shift-detail-bottom-paragraph'>About: Care homes provide accommodation and personal care for people who need extra support in their daily lives.
                Personal care might include help with eating, washing, dressing, going to the toilet or taking medication</p>
            </Col>
          </Row>

        </Modal>
        {/* Accept Modal */}
        <ConfirmationModal openConfirmationModal={IsOpenAcceptModal} onCancelConfirmationModal={() => setIsOpenAcceptModal(false)}  handleOkAcceptModal={(id:any) => {handleOkAcceptModal(id); setIsOpenAcceptModal(false);}}/>
       
      </div>
    </Layout>
  )
}

export default AvailableShiftsTab