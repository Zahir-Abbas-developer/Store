import { Select, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";

import Arrow from "../../../assets/images/OnBoarding/arrow.svg";
import "./CarerTraining.scss";
import CoursesList from "./CoursesCards/CoursesList";
import { useGetCarerInfoQuery } from "../../../store/Slices/Training";

const { Option } = Select;

const CarerTraining = () => {



  const { data, isLoading, isError, isSuccess } = useGetCarerInfoQuery([])

  let getCarerData: any;
  if (isLoading) {
    getCarerData = <p>Loading...</p>
  }
  else if (isSuccess) {
    getCarerData = data
  }
  else if (isError) {
    getCarerData = <p>Error...</p>
  }

  const dataCheck = getCarerData?.data?.length


  const [activeTab, setActiveTab] = useState("ENROLLED");

  const [carerSelectedId, setcarerSelectedId] = useState<any>()

  const items: TabsProps["items"] = [
    {
      key: "ENROLLED",
      label: `Enrolled`,
      children: <CoursesList carerSelectedId={carerSelectedId} activeTab={activeTab} />,
    },
    {
      key: "INPROGRESS",
      label: `In Progress`,
      children: <CoursesList carerSelectedId={carerSelectedId} activeTab={activeTab} />,
    },
    {
      key: "COMPLETED",
      label: `Completed`,
      children: <CoursesList carerSelectedId={carerSelectedId} activeTab={activeTab} />,
    },
    {
      key: "PENDING",
      label: `Pending`,
      children: <CoursesList carerSelectedId={carerSelectedId} activeTab={activeTab} />,
    },
  ];
  const onChange = (key: string) => {
    setActiveTab(key);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setcarerSelectedId(value)
  }


  useEffect(() => {

  }, [data, getCarerData])


  return (
    <div className="carer-training-wrapper">
      <div className="top-header">
        <div>
          <span className="fw-600 fs-14 label">Carer</span>
        </div>
        <Select
          placeholder="Carer Name"
          className="select"
          suffixIcon={<img src={Arrow} alt="arrow icon" />}
          onChange={handleChange}
        >
          {getCarerData?.data && getCarerData?.data?.map((carer: any, index: any) => (
            <Option value={carer?._id}>{carer?.firstName}&nbsp;{carer?.lastName}</Option>
          ))}
        </Select>
      </div>



      <div className="main-section">
        <Tabs defaultActiveKey="Enrolled" items={items} onChange={onChange} />
      </div>
    </div>
  );
};

export default CarerTraining;
