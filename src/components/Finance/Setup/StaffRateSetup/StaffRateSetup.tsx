import { useState } from "react";
import { Input } from "antd";
import { useGetStaffRateQuery } from "../../../../store/Slices/FinanceSetup";
import StaffRateSetupAccordians from "./StaffRateSetupAccordians";
import { debouncedSearch } from "../../../../utils/utils";
import AccordianYellowImg from "../../../../assets/icons/finance-setup/accordianArrowYellow.png";
import AccordianLBlueImg from "../../../../assets/icons/finance-setup/accordianArrowLBlue.png";
import AccordianPinkImg from "../../../../assets/icons/finance-setup/accordianArrowPink.png";
import Search from "../../../../assets/icons/Search.png";
import './StaffRateSetup.scss';

const StaffRateSetup = () => {
  const [searchValue, setSearchValue] = useState('')

  //***************************Staff Rate Data */
  const paramsObj: any = {
    rateType: 'staff_rate'
  };

  if (searchValue) {
    paramsObj['staffName'] = searchValue
  }
  const query = "&" + new URLSearchParams(paramsObj).toString();

  const { data, isSuccess } = useGetStaffRateQuery({ refetchOnMountOrArgChange: true, query })

  let staffRateData: any;
  if (isSuccess) {
    staffRateData = data
  }
  //***************************Client Based Rate Data */
  const paramsObject: any = {
    rateType: 'client_based_rate'
  };

  if (searchValue) {
    paramsObj['clientName'] = searchValue
  }
  const clientQuery = "&" + new URLSearchParams(paramsObject).toString();

  const { data: clientBasedData, isSuccess: clientBasedSuccess } = useGetStaffRateQuery({ refetchOnMountOrArgChange: true, query: clientQuery })

  let clientBasedRateData: any;
  if (clientBasedSuccess) {
    clientBasedRateData = clientBasedData
  }

  //***************************Staff Category Rate Data */
  const categoryParams: any = {
    rateType: 'staff_category_rate'
  };

  if (searchValue) {
    categoryParams['staffName'] = searchValue
  }
  const categoryQuery = "&" + new URLSearchParams(categoryParams).toString();

  const { data: staffCategoryData, isSuccess: staffCategorySuccess } = useGetStaffRateQuery({ refetchOnMountOrArgChange: true, query: categoryQuery })

  let staffCategoryRateData: any;
  if (staffCategorySuccess) {
    staffCategoryRateData = staffCategoryData
  }

  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  return (
    <div className="staff-rate-main">
      <div className="d-flex justify-end align-center">
        <div className="input-search-wrapper">
          <Input placeholder="search" onChange={debouncedResults} className="staff-rate-search" prefix={<img src={Search} alt="search icon" className="icon" />} />
        </div>
      </div>
      <div style={{ marginBlock: "20px" }}>
        <StaffRateSetupAccordians img={AccordianYellowImg} staffRateData={staffRateData} name={`Staff Rate`} id='staff_rate' />
      </div>
      <div style={{ marginBlock: "20px" }}>
        <StaffRateSetupAccordians img={AccordianLBlueImg} staffRateData={clientBasedRateData} name={`Client Based Rate`} id='client_based_rate' />
      </div>
      <div style={{ marginBlock: "20px" }}>
        <StaffRateSetupAccordians img={AccordianPinkImg} staffRateData={staffCategoryRateData} name={`Staff Category Rate`} id='staff_category_rate' />
      </div>
      {/* <StaffRateSetUpNew heading={'Client Name'} /> */}
    </div>
  );
};

export default StaffRateSetup;
