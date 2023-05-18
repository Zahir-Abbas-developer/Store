import { Layout, Row, Col, Card, Rate, Space } from 'antd';
import React, { useState } from 'react'
import '../AvailableShiftsTab/AvailableShiftsTab.scss'
import EuroIcon from '../../../../assets/icons/ShiftDetails/EuroIcon.svg'
import LocationIcon from '../../../../assets/icons/ShiftDetails/LocationIcon.svg'
import TimeIcon from '../../../../assets/icons/ShiftDetails/TimeIcon.svg'
import DateIcon from '../../../../assets/icons/ShiftDetails/DateIcon.svg'
import ShiftTypeIcon from '../../../../assets/icons/ShiftDetails/ShiftTypeIcon.svg'
import HomeIcon from "../../../../assets/icons/ShiftDetails/HomeIcon.svg";
import { useGetRequestConfirmationShiftQuery, useUpdateCancelUpcomingRequestMutation, useUpdateAcceptShiftRequestMutation } from '../../../../store/Slices/ShiftDetails';
import AppSnackbar from '../../../../utils/AppSnackbar';
import dayjs from 'dayjs';

const ConfirmationTab = () => {
  const { data, isLoading, isSuccess, isError, } = useGetRequestConfirmationShiftQuery({ refetchOnMountOrArgChange: true })
  let confirmation: any;
  if (isLoading) {
    confirmation = <p>Loading...</p>
  }
  else if (isSuccess) {
    confirmation = data
  }
  else if (isError) {
    confirmation = <p>Error...</p>
  }

  const [shiftId, setShiftId] = useState<string>('');


  //  Remove function
  const [createUpcomingShift] = useUpdateCancelUpcomingRequestMutation();
  const onCancelShiftHandler = async (values: any) => {
    const payload = {
      cancelReason: values?.reason,
      staffShiftId: shiftId
    };
    await createUpcomingShift(payload)
  };
  const [updateAcceptShiftRequest] = useUpdateAcceptShiftRequestMutation();
  const onAcceptShiftHandler = async (id: any) => {
    const payload = {
      staffShiftId: id,
      shiftStatus: "ACCEPTED",

    };

    await updateAcceptShiftRequest(payload)
    AppSnackbar({ type: "success", messageHeading: "Success!", message: "Shift Accepted" });

  };
  const comnfirmationShiftData = [
    { cardImg: LocationIcon, text: (item: any) => `${item?.careHome?.address?.city}` },
    { cardImg: DateIcon, text: (item: any) => `${dayjs(item?.shift?.shiftDate).format('MMM DD , dddd')}` },
    { cardImg: TimeIcon, text: (item: any) => `${dayjs(item?.shift?.startTime).format('h:mm A')} TO ${dayjs(item?.shift?.endTime).format('h:mm A')}` },
    { cardImg: ShiftTypeIcon, text: (item: any) => `${item?.shift?.shiftType}` },
    { cardImg: EuroIcon, text: (item: any) => `Shift Rate: £${item?.rate}` },

  ]
  return (
    <Layout className='wrap-shift-details-card'>
      <Row gutter={[23, 23]} style={{ paddingTop: "4px" }}>
        {confirmation?.data?.shifts.map((shiftData: any) => {
          return (
            <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={8} xxl={6} key={shiftData.id} >
              
                <Card
                  className='border-radius-10 shift-details-card-style'>
                     <div className='d-flex align-center ' style={{ gap: '3px' }}>
                    <div><img src={HomeIcon} alt="HomeIcon" width={32} height={32} className="shift-img" /></div>
                    <span className='fw-500 fs-20 shift-title'>{shiftData?.careHome?.clientName} </span></div>
                  <span className='rating-star'><Rate disabled defaultValue={shiftData?.careHome?.clientRating[0]?.average} style={{ fontSize: "15px" }} /></span>
                  
                  <div className='wrap-shift-card-info '>
                  {comnfirmationShiftData?.map((data: any) => (
                      <div className=' d-flex shift-card-content align-items-center' >
                        <img src={data.cardImg} alt="LocationIcon" width={24} height={24} />
                        <span className='fw-500 fs-16 line-height-24 '>{data.text(shiftData)}</span>
                      </div>
                    ))}
                   
                    
                    <Space className='wrap-shift-card-btn'>
                      <button className='fw-600 fs-16 white-color cursor-pointer shift-details-card-cancel-btn' onClick={() => { onCancelShiftHandler(shiftData.id); setShiftId(shiftData._id) }}>Cancel</button>
                      <button className='fw-600 fs-16 white-color cursor-pointer shift-details-card-accept-btn' onClick={() => onAcceptShiftHandler(shiftData._id)} >Accept</button>
                    </Space>
                  </div>
                </Card>
            </Col>
          )
        })}

      </Row>
    </Layout>
  )
}

export default ConfirmationTab
