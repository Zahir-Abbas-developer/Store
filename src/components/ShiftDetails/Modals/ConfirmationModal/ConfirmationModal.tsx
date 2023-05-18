import React from 'react'
import ExclamationIcon from '../../../../assets/icons/ShiftDetails/ExclamationIcon.svg'
import {Space, Modal } from 'antd';

const ConfirmationModal = (props:any) => {
  const { openConfirmationModal, onCancelConfirmationModal, handleOkAcceptModal} = props;
  return (
    <Modal centered className='wrap-shift-details-accept-modal'
    open={openConfirmationModal}
    onCancel={onCancelConfirmationModal}
    width={500}
    footer={false}
  >
    <div className='wrap-shift-detail-accept-modal-content d-flex justify-between flex-column m-auto'>
      <div className='m-auto shift-detail-accept-modal-img'> <img src={ExclamationIcon} alt="ExclamationIcon" width="99px" height="100px" /></div>
      <span className='fw-500 fs-30 line-height-40 m-auto shift-detail-accept-modal-text'>
        Do you want to accept <br /> this  shift with transport?
      </span>
      <Space className='m-auto wrap-shift-accept-btn'>
        <button  className='fw-600 fs-14 btn-secondary white-color' onClick={handleOkAcceptModal}>Yes</button>
        <button className='fw-600 fs-14 shift-detail-accept-btn-no white-color cursor-pointer' onClick={onCancelConfirmationModal}>No</button>
      </Space>
    </div>
  </Modal>
  )
}

export default ConfirmationModal