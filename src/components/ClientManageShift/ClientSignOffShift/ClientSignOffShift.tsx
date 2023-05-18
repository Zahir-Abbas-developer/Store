import React, { useState } from 'react'
import './ClientSignOffShift.scss';
import { Col, Rate, Row } from 'antd'
import { ClientSignOffShiftData, } from '../ClientManageShift.utils'
import ConfirmModal from './Modals/CompletedConfirmModal'
import ModifyModal from './Modals/CompletedModifyModal'
import { useGetSignOffShiftQuery } from '../../../store/Slices/ClientShiftManage';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';

const ClientSignOffShift = () => {
  const [shiftIdData, setShiftIdData] = useState({});
  const [isCompletedConfirmModal, setIsCompletedConfirmModal] = useState<boolean>(false);
  const [isCompletedModifyModal, setIsCompletedModifyModal] = useState<boolean>(false);
  const { data: signOffShiftData } = useGetSignOffShiftQuery({});

  const breadCrumbItems = [
    {
      title: "Sign off",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/client-dashboard",
    },
  ];

  const handleFormClear = () => {
    setShiftIdData({})
    setIsCompletedConfirmModal(false);
    setIsCompletedModifyModal(false);
  }

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className='client-signoff-shift-wrapper bg-white'>
        <div className='client-checkin-tabs-wrapper bg-white'>
          <Row gutter={[20, 20]}>
            {signOffShiftData?.data?.shifts.length > 0 ? signOffShiftData?.data?.shifts?.map((item: any) => (
              <Col xl={6} lg={8} md={12} sm={12} xs={24} key={item.id}>
                <div className='checkin-shift-wrapper bg-white'>
                  <div className='shift-img d-flex align-center'>
                    <img src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.carer?.profilePhoto?.mediaId}.${item?.carer.profilePhoto?.mediaMeta?.extension}`} alt="" />
                    <div>
                      <h2 className='fs-16 fw-500 m-0 form-heading-color'>{`${item?.carer?.firstName} ${item?.carer?.lastName}`}</h2>
                      <p className='fs-12 fw-400 m-0 title-color'>{item?.careHome?.clientType}</p>
                      {item?.careHome?.clientRating?.map((data: any) => (
                        <Rate defaultValue={data.average || 0} allowHalf style={{ color: "#FABF35" }} />
                      ))}
                    </div>
                  </div>
                  <div className='checkin-content-wrap d-flex flex-column'>
                    {ClientSignOffShiftData.map((icon: any, index: number) => (
                      <div className='d-flex align-center' style={{ gap: "15px" }}>
                        <img src={icon.src} alt="" />
                        <p className="m-0">{icon.text(item)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="checkin-btn d-flex align-center">
                    <button type='button' className='confirm-btn white-color fs-16 fw-600 line-height-20 cursor-pointer' onClick={() => { setIsCompletedConfirmModal(true); setShiftIdData(item) }}>Confirm</button>
                    <button type='button' className='modify-btn white-color fs-16 fw-600 line-height-20 cursor-pointer' onClick={() => { setIsCompletedModifyModal(true); setShiftIdData(item) }}>Modify and Confirm</button>
                  </div>
                </div>
              </Col>
            )) : <span className='fs-16 fw-600 text-center w-100'>No data found</span>}
          </Row>
        </div>
      </div>
      <ConfirmModal isCompletedConfirmModal={isCompletedConfirmModal} setIsCompletedConfirmModal={setIsCompletedConfirmModal} shiftIdData={shiftIdData} onCancel={handleFormClear} />
      <ModifyModal isCompletedModifyModal={isCompletedModifyModal} setIsCompletedModifyModal={setIsCompletedModifyModal} shiftIdData={shiftIdData} onCancel={handleFormClear} />
    </>
  )
}

export default ClientSignOffShift