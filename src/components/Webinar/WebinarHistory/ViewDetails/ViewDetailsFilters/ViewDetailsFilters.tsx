import { Select } from 'antd';
import React from 'react'
import "./ViewDetailsFilters.scss"
import arrowDownSmall from '../../../../../assets/icons/arrow-small-down.svg'

const ViewDetailsFilters = ({setwebinarDuration, setwebinarCertificateStatus}:any) => {
  const handleChangeDuration = (value: string) => {
    console.log(`selected ${value}`);
    setwebinarDuration(value)
  }
  const handleChangeCertificateStatus = (value: string) => {
    console.log(`selected ${value}`);
    setwebinarCertificateStatus(value)
  }

  return (
    <div className="wrapper-fliters">
      <div className="flex-filters">

        <div className='inner-flex-filters'>
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Duration</div>
              <Select
                placeholder="All"
                style={{ width: '100%' }}
                onChange={handleChangeDuration}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={[
                  { value: '', label: 'All' },
                  { value: '10', label: '10' },
                  { value: '20', label: '20' },
                  { value: '30', label: '30' },
                  { value: '40', label: '40' },
                  { value: '50', label: '50' },
                  { value: '60', label: '60' },
                  { value: '70', label: '70' },
                  { value: '80', label: '80' },
                ]}
              />

            </div>
          </div>
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Certificate Status</div>
              <Select
                placeholder="All"
                style={{ width: '100%' }}
                onChange={handleChangeCertificateStatus}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={[
                  { value: 'All', label: 'All' },
                  { value: 'Available', label: 'Available' },
                  { value: 'Unavailable', label: 'Unavailable' },
                ]}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ViewDetailsFilters