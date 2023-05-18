import { Select } from 'antd';
import React from 'react'
import "./ResulsFilters.scss"
import arrowDownSmall from '../../../../../assets/icons/arrow-small-down.svg'

const { Option } = Select;

const ResulsFilters = ({setfilterCourseType, setfilterCourseCategory}:any) => {

    const handleCourseTypeChange = (value: string) => {
        // console.log(`selected ${value}`);
        setfilterCourseType(value)
      }
    const handleCourseCategoryChange = (value: string) => {
        // console.log(`selected ${value}`);
        setfilterCourseCategory(value)
      }

  return (
    <div className="wrapper-fliters">
      <div className="flex-filters">

        <div className='inner-flex-filters'>
          
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Course Type</div>
              <Select
                placeholder="Course Type"
                style={{ width: '100%' }}
                onChange={handleCourseTypeChange}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={[
                  { value: 'ALL', label: 'All' },
                  { value: 'OPTIONAL', label: 'Optional' },
                  { value: 'MANDATORY', label: 'Mandatory' },
                  // { value: 'Optional', label: 'Optional' },
                ]}
              />
            </div>
          </div>


          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Category</div>
              <Select
                placeholder="Category"
                style={{ width: '100%' }}
                onChange={handleCourseCategoryChange}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={[
                  { value: '', label: 'Everyone' },
                  { value: 'All Carer Types', label: 'All Carer Types' },
                  // { value: 'Optional', label: 'Optional' },
                ]}
              />
            </div>
          </div>
          
        </div>

      </div>
    </div>
  )
}

export default ResulsFilters