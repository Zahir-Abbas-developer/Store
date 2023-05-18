import { Select } from 'antd';
import React from 'react'
import "./ManageCoursesFilters.scss"
import arrowDownSmall from '../../../assets/icons/arrow-small-down.svg'

const ManageCoursesFilters = ({setsearchFilters}:any) => {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        setsearchFilters(value)
      }

  return (
    <div className="wrapper-fliters">
      <div className="flex-filters">

        <div className='inner-flex-filters'>
          {/* <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Course Type</div>
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
          </div> */}
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Category</div>
              <Select
                placeholder="All"
                style={{ width: '100%' }}
                onChange={handleChange}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={[
                  { value: 'All', label: 'All' },
                  { value: 'OPTIONAL', label: 'Optional' },
                  { value: 'MANDATORY', label: 'Mandatory' },
                ]}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ManageCoursesFilters