import userProfile from '../../../../../assets/images/manageShift/user-photo.png'
import mobileIcon from '../../../../../assets/icons/ShiftManger/mobile-icon.png'
import pickAppIcon from '../../../../../assets/icons/ShiftManger/pick-ap.png'
import crossIcon from '../../../../../assets/icons/ShiftManger/cross-icon.png'

import './PhoneModal.scss'

const PhoneModal = ({ setIsPhoneModal }: any) => {
  return (
    <div className='phone-modal-wrapper'>
      <div className='modal-header'>
        <img className='cross-icon' onClick={() => setIsPhoneModal(false)} src={crossIcon} alt="" />
        <div className='profile text-center'>
          <img src={userProfile} alt="" />
        </div>
      </div>
      <div className='modal-body'>
        <h2 className='title fs-16 fw-500'>Make a Call from</h2>
        <div className='devices-wraper'>
          <div className='d-flex align-center' style={{ gap: '12px' }}>
            <div>
              <img src={mobileIcon} alt="" />
            </div>
            <h3 className='fw-400 fs-14 text'>Redmi Note 10</h3>
          </div>
          <div className='d-flex align-center' style={{ gap: '12px' }}>
            <div>
              <img src={pickAppIcon} alt="" />
            </div>
            <h3 className='fw-400 fs-14 text'>Pick an app</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhoneModal