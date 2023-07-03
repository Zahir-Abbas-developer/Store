import { useState } from "react";
import { Button, Checkbox, Col, Modal, Row } from "antd";
import { Collapse } from "antd";
import DownArrowIcon from "../../../../../assets/icons/ShiftManger/downArrowIcon.svg";
import UpArrowIcon from "../../../../../assets/icons/ShiftManger/upArrowIcon.svg";
import "./AdvanceStaffSearch.scss";
import InputWrapper from "../../../../../shared/InputWrapper/InputWrapper";
import SelectWrapper from "../../../../../shared/SelectWrapper/SelectWrapper";
import AdvanceStaffCard from "./AdvanceStaffCard";
import CollapseIcon from "../../../../../assets/icons/ShiftManger/collapse-icon.png";
import AdvanceStaffCollapseCard from "./AdvanceStaffViewCard";
import ToggleIcon from "../../../../../assets/icons/ShiftManger/toggle-icon.png";
import RangerWrapper from "../../../../../shared/RangeWrapper/RangerWrapper";
import CloseIcon from "../../../../../assets/icons/ShiftManger/close-icon.svg";
import { useGetStaffListQuery } from "../../../../../store/Slices/StaffAllocation";
import {
  useAdvanceStaffSearchQuery,
  useGetUserTypesListQuery,
} from "../../../../../store/Slices/ShiftManager";

const { Panel } = Collapse;

const AdvanceStaffSearch = (props: any) => {
  const { isAdvanceSearchModalOpen, setIsAdvanceSearchModalOpen,setSelectedStaffList }:any = props;

  const [isToggleBtn, setIsToggleBtn] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState(100);
  const [skip, setSkip] = useState(false);
  const [advanceStaffSearchData, setAdvanceStaffSearchData] = useState({
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
  const { data, refetch } :any = useAdvanceStaffSearchQuery({ query, skip });

  const handleAdvanceFilter = () => {
    setSelectedStaffList(data?.data?.staff)
    setIsAdvanceSearchModalOpen(false)
    setSkip(true);
    refetch();
  };
  
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

  return (
    <>
      <Modal
        title="Advance Staff Search"
        open={isAdvanceSearchModalOpen}
        onOk={() => setIsAdvanceSearchModalOpen(false)}
        onCancel={() => setIsAdvanceSearchModalOpen(false)}
        width="1500px"
        className="advance-staff-modal-wrapper"
        centered
        footer={false}
        closeIcon={<img src={CloseIcon} alt="close" />}
      >
        <Row gutter={[40, 40]}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <div className="search-collapse-wrapper">
              <Collapse
                defaultActiveKey={["0"]}
                bordered={false}
                expandIconPosition="end"
                expandIcon={({ isActive }) => {
                  return (
                    <>
                      {isActive && <img src={UpArrowIcon} alt="" />}
                      {!isActive && <img src={DownArrowIcon} alt="" />}
                    </>
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
                    <label className="fs-12 fw-400 title-color">
                      Select Staff Location range
                    </label>
                    <RangerWrapper
                      value={inputValue}
                      onChange={handleProgressBar}
                      text={`${inputValue} miles`}
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
                      options={userTypesListOptions}
                      // defaultValue={["Domestic - (DOM)"]}
                      onChange={(val: any) => handleAdvanceSearch(val, "userType")}
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
                      placeHolder="Select Experience From"
                    />
                    <InputWrapper
                      name="experience"
                      onChange={(val: any) =>
                        handleAdvanceSearch(val, "experienceTo")
                      }
                      size="large"
                      type="number"
                      placeHolder="Select Experience To"
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
                      onChange={(val: any) =>
                        handleAdvanceSearch(val, "gender")
                      }
                    />
                  </div>
                </Panel>
              </Collapse>
            </div>
              <Button
                onClick={handleAdvanceFilter}
                type="primary"
              >
                Apply Search
              </Button>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24} className="staff-cards">
            {/* <div className='advance-staff-data d-flex align-center justify-center'>
                            <span className='fs-12 fw-600'>No Data Avaliable</span>
                        </div> */}
            <div
              className="advance-collapse-icon d-flex align-center cursor-pointer"
              onClick={() => setIsToggleBtn((prev) => !prev)}
            >
              <img src={`${!isToggleBtn ? CollapseIcon : ToggleIcon}`} alt="" />
            </div>
            {!isToggleBtn ? (
              <AdvanceStaffCard staffData={data?.data?.staff} />
            ) : (
              <AdvanceStaffCollapseCard staffData={data?.data?.staff} />
            )}
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AdvanceStaffSearch;
