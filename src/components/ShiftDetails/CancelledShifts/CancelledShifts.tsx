import { Layout, Card, Row, Col, Divider } from 'antd'
import React from 'react'
import { useGetRequestCancelledShiftQuery } from '../../../store/Slices/ShiftDetails'
import './CancelledShifts.scss'
import days from 'dayjs';
import DateIcon from '../../../assets/icons/ShiftDetails/DateIcon.svg'
import ShiftTypeIcon from '../../../assets/icons/ShiftDetails/ShiftTypeIcon.svg'
import HomeIcon from "../../../assets/icons/ShiftDetails/HomeIcon.svg";
import EuroIcon from "../../../assets/icons/ShiftDetails/EuroIcon.svg";
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';


const CancelledShifts = () => {
  const { data, isLoading, isSuccess, isError, } = useGetRequestCancelledShiftQuery({ refetchOnMountOrArgChange: true })
  let cancelledShift: any;
  if (isLoading) {
    cancelledShift = <p>Loading...</p>
  }
  else if (isSuccess) {
    cancelledShift = data
  }
  else if (isError) {
    cancelledShift = <p>Error...</p>
  }
 //BreadCrumb Items
 const breadCrumbItems = [
  {
    title: "Cancelled Shifts",
    path: "",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
  },
];
  return (
    <>
    <BreadCrumb breadCrumbItems={breadCrumbItems} />
    <Layout className='wrap-shifts-details-canceled-shift'>
      <Card className='shifts-details-canceled-shift border-radius-10'>

        <Row gutter={[23, 23]}>
          {cancelledShift?.data?.shifts.map((shiftData: any) => {
            return (
              <Col xl={24} lg={24} md={24} sm={24} xs={24} className="gutter-row " key={shiftData.id}>
                <Card className='wrap-canceled-shift-card-content  border-radius-10'>

                  <div className='d-flex justify-between main-cancelled-shift-detail-content'>
                    <Col xxl={7} xl={7} lg={7} md={9} sm={24} xs={24} className="shift-details-cancel-left-content">



                      <div className='d-flex align-center cancel-shift-img-text'>
                        <img src={HomeIcon} alt="HomeIcon" width="32px" height="32px" className="shift-img" />
                        <span className='fw-500 fs-20 shift-title title-color cancel-shift-title'>{shiftData?.careHome?.clientName}
                        </span>
                      </div>

                      <div className='shift-cancel-bottom-content'>
                        <Row gutter={[18, 18]} className=' d-flex  align-items-center shift-cancel-card-content' >
                          <Col xl={3}> <img src={ShiftTypeIcon} alt="ShiftTypeIcon" width={24} height={24} /></Col>
                          <Col xl={10} xs={24}>  <span className='fw-400 fs-14 line-height-22 title-color text-left'>{shiftData?.shift?.shiftType}</span></Col>
                        </Row>
                        <Row gutter={[18, 18]} className=' d-flex align-items-center shift-cancel-card-content'>
                          <Col xl={3}>  <img src={DateIcon} alt="DateIcon" width={22} height={24} /></Col>
                          <Col xl={20} xs={24}>  <span className='fw-400 fs-14 line-height-22 title-color text-left'>{`${days(cancelledShift?.data?.shifts?.shift?.shiftDate).format('MMM DD, ddd ')} - ${days(cancelledShift?.data?.shifts?.shift?.startTime).format('h:mm A')} TO ${days(cancelledShift?.data?.shifts?.shift?.startTime).format('h:mm A')}`}</span></Col>
                        </Row>
                        <Row gutter={[18, 18]} className=' d-flex  align-items-center shift-cancel-card-content'>
                          <Col xl={3}>   <img src={EuroIcon} alt="ShiftRate" width={15.32} height={21} /></Col>
                          <Col xl={18} xs={24}>
                            <span className='fw-400 fs-14 line-height-22 '> Shift Rate &nbsp;
                              <span className="className='f5-400 fs-16 line-height-24">

                              </span>
                            </span>
                          </Col>
                        </Row>

                      </div>

                    </Col>
                    <Col className='shift-line' xl={1}> <Divider type="vertical" className='verical-line' style={{ height: "210px", border: "1px solid  #D9DBE9", marginLeft: "20px" }} /></Col>
                    <Col xxl={16} xl={16} lg={14} md={14} sm={24} xs={24}>

                      <div className='m-auto'>
                        <Card className='cancel-shift-details-content'>
                          <p className='fw-500 fs-16 line-height-24 title-color details-shift-cancel-title' style={{ paddingBottom: "4px", marginTop: "0px" }}>Staff  Cancelation Details</p>
                          <Row gutter={[6, 6]}>
                            <Col xl={8}>
                              <span className='fw-600 fs-14 line-height-17 title-color '>
                                Shift Canceled By:
                              </span>
                            </Col>
                            <Col xl={16}>
                              <span className='fw-400 fs-14 line-height-22 title-color'>
                                {`${shiftData?.cancelledBy?.firstName} ${shiftData?.cancelledBy?.lastName}`}
                              </span>
                            </Col>

                            <Col xl={8}>
                              <span className='fw-600 fs-14 line-height-17 title-color'>
                                Date:
                              </span>
                            </Col>

                            <Col xl={16}>
                              <span className='fw-400 fs-14 line-height-22 title-color'>
                                {days(cancelledShift?.data?.shifts?.cancelDate).format('MMM DD, ddd')}
                              </span>
                            </Col>

                            <Col xl={8}>
                              <span className='fw-600 fs-14 line-height-17 title-color'>
                                Time/Date:
                              </span>
                            </Col>
                            <Col xl={16}>
                              <span className='fw-400 fs-14 line-height-22 title-color'>
                                {days(cancelledShift?.data?.shifts?.shift?.startTime).format('h:mm A')}
                              </span>
                            </Col>

                            <Col xl={8}>
                              <span className='fw-600 fs-14 line-height-17 title-color'>
                                Shift Cancelation Reason:
                              </span>
                            </Col>
                            <Col xl={15}>
                              <span className='fw-400 fs-14 line-height-22 title-color'>
                                {shiftData?.cancelReason}
                              </span>
                            </Col>
                          </Row>
                        </Card>
                      </div>
                    </Col>
                  </div>

                  {/* </Row> */}
                </Card>

              </Col>
            )
          })}
        </Row>
      </Card>
    </Layout>
    </>
  )
}

export default CancelledShifts
