import React, { useState } from "react";

// Ant Components
import { Checkbox, Col, Row, Collapse } from "antd";

// Components
import AdvanceStaffCard from "./AdvanceStaffCard/AdvanceStaffCard";
import AdvanceStaffCollapseCard from "./AdvanceStaffCollapseCard/AdvanceStaffCollapseCard";
import InputWrapper from "../../../shared/InputWrapper/InputWrapper";
import RangerWrapper from "../../../shared/RangeWrapper/RangerWrapper";
import SelectWrapper from "../../../shared/SelectWrapper/SelectWrapper";
import { useGetStaffListQuery } from "../../../store/Slices/StaffAllocation";
import {
  useAdvanceStaffSearchQuery,
  useGetUserTypesListQuery,
} from "../../../store/Slices/ShiftManager";

// Options and Mock Data
import { AdvanceStaffReportOptionsData } from "../../../mock/ReportMockData/AdvanceStaffReportMockData";

// Assets
import CollapseIcon from "../../../assets/icons/ShiftManger/collapse-icon.png";
import ToggleIcon from "../../../assets/icons/ShiftManger/toggle-icon.png";
import DownArrowIcon from "../../../assets/icons/ShiftManger/downArrowIcon.svg";

// SCSS
import "./AdvanceStaffReport.scss";
import { renderDashboard } from "../../../utils/useRenderDashboard";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import path from "path";

const { Panel } = Collapse;

// state interface
interface setAdvanceStaffSearchDataInterface {
  searchClients: string;
  location: string;
  userType: string;
  vaccination: string;
  experienceFrom: string;
  experienceTo: string;
  drivingLicence: string;
  gender: string;
}

const AdvanceStaffReport = () => {
  const [isToggleBtn, setIsToggleBtn] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(100);

  const [advanceStaffSearchData, setAdvanceStaffSearchData] =
    useState<setAdvanceStaffSearchDataInterface>({
      searchClients: "",
      location: "",
      userType: "",
      vaccination: "",
      experienceFrom: "",
      experienceTo: "",
      drivingLicence: "",
      gender: "",
    });

  const handleAdvanceSearch = (value: any, type: string) => {
    setAdvanceStaffSearchData({ ...advanceStaffSearchData, [type]: value });
  };

  //query parameters of search and filter
  const paramsObj: any = {};
  if (advanceStaffSearchData?.searchClients)
    paramsObj["clientId"] = advanceStaffSearchData?.searchClients;
  if (advanceStaffSearchData?.userType)
    paramsObj["userType"] = advanceStaffSearchData?.userType;
  if (advanceStaffSearchData?.vaccination)
    paramsObj["vaccination"] = advanceStaffSearchData?.vaccination;
  if (advanceStaffSearchData?.gender)
    paramsObj["gender"] = advanceStaffSearchData?.gender;
  if (advanceStaffSearchData?.drivingLicence)
    paramsObj["licence"] = advanceStaffSearchData?.drivingLicence;

  const query = "&" + new URLSearchParams(paramsObj).toString();
  const { data }: any = useAdvanceStaffSearchQuery({ query });

  const handleProgressBar = (newValue: number) => {
    setInputValue(newValue);
  };

  const { data: careHomes }: any = useGetStaffListQuery({});
  const { data: userTypesList }: any = useGetUserTypesListQuery({});

  const clientListOptions = careHomes?.data?.result?.map((item: any) => {
    return {
      value: item?._id,
      label: item?.clientName,
    };
  });

  const userTypesListOptions = userTypesList?.data?.result?.map(
    (userTypeDetails: any) => {
      return {
        value: userTypeDetails?._id,
        label: `${userTypeDetails?.name} (${userTypeDetails?.shortForm})`,
      };
    }
  );

  const userData: any = localStorage.getItem("careUserData");
  const { role }: any = JSON.parse(userData);
  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Advance Staff Report",
      path: "",
    },
    {
      title: "Dashboard",
      path: renderDashboard(role),
    },
    {
      title: role==="admin"? "Admin Reports":"Reports",
      path: "/reports",
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <Row gutter={[40, 40]} className="advance-staff-report-wrapper">
        <Col xs={24} md={12}>
          <div className="search-collapse-wrapper">
            <Collapse
              defaultActiveKey={["0"]}
              bordered={false}
              expandIconPosition="end"
              expandIcon={({ isActive }) => {
                return (
                  <img
                    src={DownArrowIcon}
                    className={`${isActive && "is-active"} down-arrow`}
                    alt="down arrow"
                  />
                );
              }}
            >
              <Panel header="search by clients" key="1">
                <div className="search-clients-field">
                  <SelectWrapper
                    name="clients"
                    placeHolder="Search by clients"
                    required={false}
                    size="large"
                    options={clientListOptions}
                    onChange={(val: any) =>
                      handleAdvanceSearch(val, "searchClients")
                    }
                  />
                </div>
              </Panel>
              <Panel header="search by location" key="2">
                <div className="search-client-progress">
                  <label className="fs-12 fw-400 title-color line-height-20">
                    Select Staff Location range
                  </label>
                  <RangerWrapper
                    value={inputValue}
                    onChange={handleProgressBar}
                    text={
                      <>
                        <span className="fs-12 fw-400 title-color line-height-20">
                          {inputValue} miles
                        </span>
                      </>
                    }
                  />
                </div>
              </Panel>
              <Panel header="search by usertype" key="3">
                <div className="search-client-usertype">
                  <SelectWrapper
                    name="userType"
                    placeHolder="Search by user type"
                    required={false}
                    size="large"
                    options={userTypesListOptions}
                    onChange={(val: any) =>
                      handleAdvanceSearch(val, "userType")
                    }
                  />
                  {/* <Checkbox.Group
                    options={AdvanceStaffReportOptionsData}
                    defaultValue={["Domestic - (DOM)"]}
                    onChange={(val: any) =>
                      handleAdvanceSearch(val, "userType")
                    }
                  /> */}
                </div>
              </Panel>
              <Panel header="search by vaccination" key="4">
                <div className="search-client-vaccination">
                  <SelectWrapper
                    name="vaccination"
                    placeHolder="Search by vaccination"
                    required={false}
                    size="large"
                    options={[
                      { label: "Tetanus", value: "tetanus" },
                      { label: "Hepatitis B", value: "hepatitis b" },
                      { label: "Polio", value: "polio" },
                      { label: "Vericella(Chickenpox)", value: "vericella" },
                      {
                        label: "Measles, mumps and rubella(MMR)",
                        value: "measles, mumps and rubella",
                      },
                      {
                        label: "Annual Influenza Vaccine",
                        value: "annual influenza vaccine",
                      },
                      {
                        label: "Covid Vaccination",
                        value: "covid vaccination",
                      },
                      {
                        label: "Bacillus Calmette-Guerin(BCG)",
                        value: "bacillus calmette-guerin",
                      },
                    ]}
                    onChange={(val: any) =>
                      handleAdvanceSearch(val, "vaccination")
                    }
                  />
                </div>
              </Panel>
              <Panel header="search by experience" key="5">
                <div className="search-by-experience">
                  <InputWrapper
                    name="experienceFrom"
                    onChange={(val: any) =>
                      handleAdvanceSearch(val, "experienceFrom")
                    }
                    size="large"
                    type="number"
                    placeHolder="Select experience from"
                  />
                  <InputWrapper
                    name="experience"
                    onChange={(val: any) =>
                      handleAdvanceSearch(val, "experienceTo")
                    }
                    size="large"
                    type="number"
                    placeHolder="Select experience to"
                  />
                </div>
              </Panel>
              <Panel header="search by driving licence" key="6">
                <div className="search-client-driving">
                  <SelectWrapper
                    name="drivingLicence"
                    placeHolder="Have Driving Licence?"
                    required={false}
                    size="large"
                    options={[
                      { label: "Yes", value: "yes" },
                      { label: "No", value: "no" },
                    ]}
                    onChange={(val: any) =>
                      handleAdvanceSearch(val, "drivingLicence")
                    }
                  />
                </div>
              </Panel>
              <Panel header="search by gender" key="7">
                <div className="search-client-gender">
                  <SelectWrapper
                    name="gender"
                    placeHolder="Select"
                    required={false}
                    size="large"
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                      { label: "Other", value: "other" },
                    ]}
                    onChange={(val: any) => handleAdvanceSearch(val, "gender")}
                  />
                </div>
              </Panel>
            </Collapse>
          </div>
        </Col>
        <Col xs={24} md={12} className="staff-cards">
          {/* <div className='advance-staff-data d-flex align-center justify-center'>
            <span className='fs-12 fw-600'>No Data Avaliable</span>
        </div> */}
          <div className="advance-collapse-icon d-flex align-center">
            <img
              src={`${!isToggleBtn ? CollapseIcon : ToggleIcon}`}
              alt="toggler"
              className="cursor-pointer"
              onClick={() => setIsToggleBtn((prev) => !prev)}
            />
          </div>
          {!isToggleBtn ? (
            <AdvanceStaffCard staffData={data?.data?.staff} />
          ) : (
            <AdvanceStaffCollapseCard staffData={data?.data?.staff} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default AdvanceStaffReport;
