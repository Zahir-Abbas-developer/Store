import { Select } from 'antd'
import arrowDownSmall from '../../../../assets/icons/arrow-small-down.svg'
import "./StaffAllocationInnerFilters.scss"

const StaffAllocationInnerFilters = (props:any) => {
  const {careHomeOptions,userTypeOptions,filterValues,setFilterValues } = props

  return (
    <div className="wrapper-fliters">
      <div className="flex-filters">

        <div className='inner-flex-filters'>
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Care Home</div>
              <Select
                placeholder="Select Care Home"
                style={{ width: '100%' }}
                onChange={(value:string) => setFilterValues({...filterValues, careHome : value})}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={careHomeOptions}
              />
              
            </div>
          </div>
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Allocation Status</div>
              <Select
                placeholder="All"
                style={{ width: '100%' }}
                onChange={(value:string) => setFilterValues({...filterValues, allocationStatus : value})}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={[
                  { value: 'All', label: 'All' },
                  { value: 'allocated', label: 'Allocated' },
                  { value: 'non-allocated', label: 'Non Allocated' },
                  { value: 'new', label: 'New' },
                ]}
              />
            </div>
          </div>
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>User Type</div>
              <Select
                placeholder="All"
                style={{ width: '100%' }}
                onChange={(value:string) => setFilterValues({...filterValues, userType : value})}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={userTypeOptions}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default StaffAllocationInnerFilters