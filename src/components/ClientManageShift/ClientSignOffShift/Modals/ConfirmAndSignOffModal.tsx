import { Button, Modal } from 'antd'
import React from 'react'
import './Modal.scss';

const ConfirmAndSignOffModal = (props: any) => {
    const { open, onCancel, heading, ConfirmButton, CancelButton} = props;
  
  
  
    return (
        <>
            <Modal open={open} onCancel={onCancel} className="confirm-modal-off-wrapper" footer={false} width={600}>
                <div className='confirm-content text-center'>
                    <h2 className='fs-20 fw-500 line-height-28 m-0 form-heading-color'>{heading}</h2>
                    <div className='confirm-content-btn d-flex align-center justify-center'>
                        <Button className='yes-color white-color' onClick={ConfirmButton}>Yes</Button>
                        <Button className='no-color white-color' onClick={CancelButton}>No</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ConfirmAndSignOffModal