import { Layout, Row, Col, Card, Rate } from 'antd';
import React, { useState } from 'react'
import '../AvailableShifts/AvailableShiftsTab/AvailableShiftsTab.scss'
import EuroIcon from '../../../assets/icons/ShiftDetails/EuroIcon.svg'
import LocationIcon from '../../../assets/icons/ShiftDetails/LocationIcon.svg'
import TimeIcon from '../../../assets/icons/ShiftDetails/TimeIcon.svg'
import DateIcon from '../../..//assets/icons/ShiftDetails/DateIcon.svg'
import ShiftTypeIcon from '../../../assets/icons/ShiftDetails/ShiftTypeIcon.svg'
import HomeIcon from "../../../assets/icons/ShiftDetails/HomeIcon.svg";
import { useGetRequestUpComingShiftQuery, useUpdateCancelUpcomingRequestMutation } from '../../../store/Slices/ShiftDetails'
import CancelShiftModal from '../../ShiftManager/ShiftBooking/ShiftsModals/CancelShiftModal/CancelShiftModal';
import dayjs from 'dayjs';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';


const UpcomingShifts = () => {
  const { data: requestShift, isLoading, isSuccess, isError, } = useGetRequestUpComingShiftQuery({ refetchOnMountOrArgChange: true })
  let upcomingShift: any;
  if (isLoading) {
    upcomingShift = <p>Loading...</p>
  }
  else if (isSuccess) {
    upcomingShift = requestShift
  }
  else if (isError) {
    upcomingShift = <p>Error...</p>
  }
  const [IsOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const [shiftId, setShiftId] = useState<string>('');
  const [createUpcomingShift]= useUpdateCancelUpcomingRequestMutation();

  const handleCancelShift = async (values: any) => {
    const payload = {
      cancelReason: values?.reason,
      staffShiftId:shiftId
    };
    await createUpcomingShift(payload)
   setIsOpenCancelModal(false);

  }; 
  const upcomingShiftData = [
    { cardImg: LocationIcon, text: (item: any) => `${item?.careHome?.address?.city}` },
    { cardImg: DateIcon, text: (item: any) => `${dayjs(item?.shift?.shiftDate).format('MMM DD , dddd')}` },
    { cardImg: TimeIcon, text: (item: any) => `${dayjs(item?.shift?.startTime).format('h:mm A')} TO ${dayjs(item?.shift?.endTime).format('h:mm A')}` },
    { cardImg: ShiftTypeIcon, text: (item: any) => `${item?.shift?.shiftType}` },
    { cardImg: EuroIcon, text: (item: any) => `Shift Rate: £${item?.rate}` },

  ]
   //BreadCrumb Items
 const breadCrumbItems = [
  {
    title: "Upcoming Shifts",
    path: "",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
  },
];
  return (
    <> <BreadCrumb breadCrumbItems={breadCrumbItems} />
    <Layout className='wrap-shift-details-card '>
      <div className='wrap-upcoming-shift-cards'>
        <Row gutter={[23, 23]} style={{ paddingTop: "15px" }}>
          {upcomingShift?.data?.shifts.map((shiftData: any) => {
            return (
              <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={shiftData.id} >
                  <Card
                  className='border-radius-10 shift-details-card-style'>
                  <div className='d-flex align-center ' style={{ gap: '3px' }}>
                    <div><img src={HomeIcon} alt="HomeIcon" width={32} height={32} className="shift-img" /></div>
                    <span className='fw-500 fs-20 shift-title'>{shiftData?.careHome?.clientName} </span></div>
                  <span className='rating-star'><Rate disabled defaultValue={shiftData?.careHome?.clientRating[0]?.average} style={{ fontSize: "15px" }} /></span>

                    <div className='wrap-shift-card-info '>
                    {upcomingShiftData?.map((data: any) => (
                      <div className=' d-flex shift-card-content align-items-center' >
                        <img src={data.cardImg} alt="LocationIcon" width={24} height={24} />
                        <span className='fw-500 fs-16 line-height-24 '>{data.text(shiftData)}</span>
                      </div>
                    ))}
                      <div className='wrap-shift-card-btn'>
                        <button className='fw-600 fs-16 white-color cursor-pointer shift-details-card-cancel-btn' onClick={() => {setIsOpenCancelModal(true); setShiftId(shiftData._id)}}>Cancel Shift</button>

                      </div>
                    </div>
                  </Card>
              </Col>
            )
          })}

        </Row>
      </div>
       <CancelShiftModal placeholder={'Staff are not Avaliable'} label={<span className='fw-500 fs-15 line-height-28'>Specify reason for Cancelling Shift</span>} open={IsOpenCancelModal} onCancel={() => setIsOpenCancelModal(false)}  onFinish={(e:any) => {handleCancelShift(e); setIsOpenCancelModal(false)}}  />
     
    </Layout>
    </>
  )
}

export default UpcomingShifts