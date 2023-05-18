import React from 'react';
import { Col, Modal, Row } from 'antd';
import './ShiftDetailsViewModal.scss';
import { clientViewShiftDetailsData } from '../../../mock/ClientBookingCalendarData';
import ProfileImg from "../../../assets/images/MockImages/user-profile.png";

const ShiftDetailsViewModal = (props: any) => {
  const { isShiftInformationModal, setIsShiftInformationModal, shiftDetailsData } = props;
  console.log("shiftDetailsData", shiftDetailsData)

  const getBackgroundColor = (itemId: any) => {
    if (itemId === '1') {
      return '#E7CEE7';
    } else if (itemId === '2') {
      return '#AAFFDA';
    } else if (itemId === '3') {
      return '#FFD0D1';
    } else if (itemId === '4') {
      return '#FFE7AE';
    } else if (itemId === '5') {
      return '#FCC7D3';
    } else if (itemId === '6') {
      return '#DAEFFF';
    } else {
      return '';
    }
  }
  return (
    <>
      <Modal title="Shift Information" open={isShiftInformationModal} onCancel={() => setIsShiftInformationModal(false)} footer={false} className="shift-details-view-wrapper" width={800}>
        <div className='shift-details-view-modal'>
          <Row gutter={[20, 20]} justify="center">
            <Col xl={8} lg={8} md={24} sm={24} xs={24}>
              <div className='profile-information text-center'>
                <img src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${shiftDetailsData?.carer?.profilePhoto?.mediaId}.${shiftDetailsData?.carer?.profilePhoto?.mediaMeta?.extension}`} alt="" className='shift-detail-profile-photo' />
                <h2 className='fs-16 fw-500 m-0 title-color'>{`${shiftDetailsData?.carer?.firstName} ${shiftDetailsData?.carer?.lastName}`}</h2>
                <p className='fs-14 fw-400 m-0 light-grey-color'>{shiftDetailsData?.shift?.department}</p>
              </div>
            </Col>
            <Col xl={16} lg={16} md={16} sm={24} xs={24}>
              {clientViewShiftDetailsData.map((item) => (
                <div className='shift-info d-flex justify-between'>
                  <div className='shift-icon-wrap d-flex align-center'>
                    <div className='shift-item-img d-flex align-center justify-center' style={{ background: getBackgroundColor(item.id) }}><img src={item.icon} alt="" /></div>
                    <h2 className='fs-14 fw-600 line-height-18 form-heading-color m-0'>{item.label}</h2>
                  </div>
                  <div className='shifts-title'>
                    <p className='fs-14 fw-400 title-color m-0'>{item.value(shiftDetailsData)}</p>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  )
}

export default ShiftDetailsViewModal