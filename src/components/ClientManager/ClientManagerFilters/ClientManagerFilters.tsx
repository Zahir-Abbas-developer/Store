import React, { useState } from 'react'
import "./ClientManagerFilters.scss"
import arrowDownSmall from '../../../assets/icons/arrow-small-down.svg'
import { Select } from 'antd'
import { useGetManageGroupDataQuery } from '../../../store/Slices/ClientManager';
const { Option } = Select;


const ClientManagerFilters = ({setFilterValue}:any) => {
const [isSelectId,setIsSelectId]= useState("");

//query parameters of search and filter
   const paramsObj: any = {}; 
   if (isSelectId) paramsObj["groupId"] = isSelectId; 
   const query = "&" + new URLSearchParams(paramsObj).toString(); 
   
   const { data, isSuccess} = useGetManageGroupDataQuery({ refetchOnMountOrArgChange: true });
   let clientManagerFilterData: any;

   if (isSuccess) {
    clientManagerFilterData = data
   }
  
const getCreateGroupData = clientManagerFilterData?.data?.result ?? [];
const getGroupNameData = getCreateGroupData?.map((data:any) => ({ value: data._id, label: data.name })) ?? [];

const handleChange = (value: string) => {
  setFilterValue(value)
}

  return (
    <div className="wrapper-fliters">
      <div className="flex-filters">

        <div className='inner-flex-filters'>
          <div className="col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Group Name</div>
                  <Select
                    placeholder="Select Group Name"
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    suffixIcon={<img src={arrowDownSmall} alt="" />}
                    // options={getGroupNameData}
                  >  
                  <Option selected value="">All</Option>
                  {getCreateGroupData?.map((item:any)=> (
                    <Option value={item?._id}>{item?.name}</Option>
                  ))}
                  
                  </Select>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ClientManagerFilters


