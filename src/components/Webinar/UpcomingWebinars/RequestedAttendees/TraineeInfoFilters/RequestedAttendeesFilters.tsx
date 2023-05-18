import { Select } from 'antd';
import React from 'react'
import "./RequestedAttendeesFilters.scss"
import arrowDownSmall from '../../../../../assets/icons/arrow-small-down.svg'

const RequestedAttendeesFilters = () => {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      }

  return (
    <div className="wrapper-fliters">
      <div className="flex-filters">

        <div className='inner-flex-filters'>
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Webinar title</div>
              <Select
                placeholder="All"
                style={{ width: '100%' }}
                onChange={handleChange}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={[
                  { value: 'Option One', label: 'Option One' },
                  { value: 'Option Two', label: 'Option Two' },
                ]}
              />
              
            </div>
          </div>
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Date</div>
              <Select
                placeholder="All"
                style={{ width: '100%' }}
                onChange={handleChange}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={[
                  { value: 'Option One', label: 'Option One' },
                  { value: 'Option Two', label: 'Option Two' },
                ]}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RequestedAttendeesFilters