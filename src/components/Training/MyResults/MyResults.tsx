import { Input } from "antd";

import SearchIcon from "../../../assets/icons/Search.png";

import ResultsTable from "./ResultsTable/ResultsTable";
import "./MyResults.scss";
import { useGetMyResultsDataQuery } from "../../../store/Slices/Training";
import { debouncedSearch } from "../../../utils/utils";
import { useState } from "react";
import ResulsFilters from "./ResultsTable/ResulsFilters/ResulsFilters";

const MyResults = () => {



  const [searchMyResults, setsearchMyResults] = useState()
  const [filterCourseType ,setfilterCourseType]=useState("ALL")
  const [filterCourseCategory ,setfilterCourseCategory]=useState("")
const debouncedResults = (event:any) => {
  const { value } = event.target;
  debouncedSearch(value, setsearchMyResults);
};


const paramsObj: any = {};
if (searchMyResults) paramsObj["search"] = searchMyResults;
if(filterCourseType) paramsObj["courseType"]=filterCourseType;
if(filterCourseCategory) paramsObj["courseCategory"]=filterCourseCategory;
const query =  "&" + new URLSearchParams(paramsObj).toString();


  const { data, isLoading, isError, isSuccess } = useGetMyResultsDataQuery({query:query})
  let getMyResultData: any;
  if (isLoading) {
    getMyResultData = <p>Loading...</p>
  }
  else if (isSuccess) {
    getMyResultData = data
  }
  else if (isError) {
    getMyResultData = <p>Error...</p>
  }
  console.log("getMyResultData =>>", getMyResultData?.data?.result)



  return (
    <div className="my-results-wrapper">
      <div className="top-header">
        <div className="content">
          <div className="select-wrapper">
            {/* <CommonReportChildFilters filtersArray={myResultsFilter} setfilterCourseType={setfilterCourseType} setfilterCourseCategory={setfilterCourseCategory} /> */}
            <div className="wrapper-filters-results">
            <ResulsFilters setfilterCourseType={setfilterCourseType} setfilterCourseCategory={setfilterCourseCategory}/>
            </div>
          </div>
          <div className="input-search-wrapper">
            <Input
              placeholder="Search"
              prefix={<img src={SearchIcon} alt="search icon" className="icon" />}
              onChange={debouncedResults}
            />
          </div>
        </div>
      </div>
      <div className="results-table-wrapper">
        <ResultsTable tableData={getMyResultData?.data?.result}/>
      </div>
    </div>
  );
};

export default MyResults;
