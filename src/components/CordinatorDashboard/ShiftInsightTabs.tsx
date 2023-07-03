import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card } from "antd";
import { useGetCoordinatorShiftInsightsQuery } from "../../store/Slices/CoordinatorDashboard";


const tabs = ["Day", "Week", "Month"];

const ShiftInsightTabs = () => {
  
  const [activeTab, setActiveTab] = useState<string>("Day");
  const paramsObj: any = {};
   paramsObj["type"] = activeTab.toLowerCase();
  const query = "&" + new URLSearchParams(paramsObj).toString();

  const { data, isLoading, isSuccess, isError } = useGetCoordinatorShiftInsightsQuery({ refetchOnMountOrArgChange: true, query });


  let coordinatorShiftInsightsData: any;

  if (isLoading) {
    coordinatorShiftInsightsData = <p>Loading...</p>
  }

  else if (isSuccess) {
    coordinatorShiftInsightsData = data;
  }

  else if (isError) {
    coordinatorShiftInsightsData = <p>Error...</p>
  }

  const shifts = [
  { title: "Created Shifts", total: coordinatorShiftInsightsData?.data?.createdShifts, background: "#E5F7FF" },
  { title: "Booked Shifts", total: coordinatorShiftInsightsData?.data?.bookedShifts, background: "#EFFFF4" },
  { title: "Cancelled Shifts", total: coordinatorShiftInsightsData?.data?.cancelledShifts, background: "#ECEAFE" },
  { title: "Unfilled Shifts", total: coordinatorShiftInsightsData?.data?.unfilledShifts, background: "#FFF0F7" },
  { title: "Directly Booked & Awaiting", total: coordinatorShiftInsightsData?.data?.directlyBookAwaiting, background: "#F3F1FF" },
  { title: "Directly Booked & Confirmed", total:coordinatorShiftInsightsData?.data?.directlyBookConfimed, background: "#EFFFF4" },
  { title: "Directly Booked", total: coordinatorShiftInsightsData?.data?.directlyBookConfimed, background: "#FFF0E6" },
];

  return (
    <div className="shifts w-100">
      <div className="card-title d-flex" style={{ marginBottom: "30px" }}>
        <h3 className="fs-20 m-0 line-height-28 fw-500 title-color">
          Shifts Insight
        </h3>
        <div className="d-flex" style={{ gap: "10px" }}>
          {tabs.map((item: any) => (
            <span className="cursor-pointer" key={uuidv4()} onClick={() => setActiveTab(item)} style={{ fontWeight: `${activeTab === item && "600"}`}}>{item}</span>
          ))}
        </div>
      </div>
      <div>
        {shifts.map((item) => (
          <Card style={{ backgroundColor: item.background }} key={uuidv4()}>
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <span className='fs-12 fw-400 title-color'>{item.title}</span>
              <span className='fs-12 fw-400 title-color'>{item.total}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
};

export default ShiftInsightTabs;
