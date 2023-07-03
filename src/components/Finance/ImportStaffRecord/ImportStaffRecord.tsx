import { useState } from 'react'
import { Button, Modal, Progress } from 'antd'
import UploadImage from '../../Setting/SettingKeyInfo/UploadImage/UploadImage'
import { ReactComponent as CloseIcon } from '../../../assets/icons/close-icon.svg'
import './ImportStaffRecord.scss'

const ImportStaffRecordModal = ({ isModalOpen, setIsModalOpen }: any) => {
  const [progressPrecent, setProgressPrecent] = useState(0)
  return (
    <>
      <Modal className='import-staff-record-modal' centered title="Import Record" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)} footer={false} closeIcon={<CloseIcon />}>
        <UploadImage id={'1'} />
        <Progress
          percent={progressPrecent}
          strokeColor='#1FB036'
          strokeWidth={19}
          // width={50}
          showInfo={false}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button type='primary' style={{ background: "#A0A3BD", marginTop: "22px" }}>Upload</Button>
        </div>
      </Modal>
    </>
  )
}

export default ImportStaffRecordModal