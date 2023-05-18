import { Select } from 'antd';
import React from 'react'
import "./UpcomingWebinarsFilters.scss"
import arrowDownSmall from '../../../../assets/icons/arrow-small-down.svg'
import { useGetAttendessDataQuery } from '../../../../store/Slices/Webinar/UpcommingWebinar';


const { Option } = Select;


const UpcomingWebinarsFilters = ({setFilterAttendees}:any) => {


  const { data, isLoading, isError, isSuccess } = useGetAttendessDataQuery([])

  let getAttendeesData: any;
  if (isLoading) {
    getAttendeesData = <p>Loading...</p>
  }
  else if (isSuccess) {
    getAttendeesData = data
  }
  else if (isError) {
    getAttendeesData = <p>Error...</p>
  }
  console.log("getAttendeesData", getAttendeesData?.data?.result)


  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setFilterAttendees(value)
  }

  return (
    <div className="wrapper-fliters">
      <div className="flex-filters">

        <div className='inner-flex-filters'>
          {/* <div className="col-box">
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
          </div> */}
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Attendees</div>
              <Select
                placeholder="All"
                style={{ width: '100%' }}
                onChange={handleChange}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
              >
                <Option value="">All</Option>
                {getAttendeesData?.data?.result.map((item: any, index: any) => (
                  <Option key={item?._id} value={item?.userRole}>
                    {item?.userRole}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UpcomingWebinarsFilters