import React, { useState } from "react";
import { Table } from "antd";
import dayjs from "dayjs";
import AvailabilitySheetModal from "./AvailabilitySheetModal/AvailabilitySheetModal";
import StaffAvailabilitySheetCommonFilter from "../StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter";

import { useGetStaffAvailabilitySheetQuery } from "../../../../store/Slices/Reports";
import { isNullOrEmpty } from "../../../../utils/utils";


const AvailabilitySheet = () => {
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });
  const [filterStaffName ,setFilterStaffName]=useState("")
  const [filterValues, setFilterValues] = useState({ startDate: dayjs().format('YYYY-MM-DD'), endDate: dayjs().format('YYYY-MM-DD') });
 const paramObjs:any={}
 if (filterStaffName) paramObjs['search']=filterStaffName
 const query = "&" + new URLSearchParams(paramObjs).toString();
  const { data: availabilitySheetDetails }: any =
    useGetStaffAvailabilitySheetQuery({ refetchOnMountOrArgChange: true, pagination: pagination?.page, limit: pagination?.limit,filterValues ,query});
  const [availability, setAvailability] = useState<string>("");
  const [shiftDate, setShiftDate] = useState<any>("");
  const [isAvailability, setIsAvailability] = useState<boolean>(false);

  const total=availabilitySheetDetails?.data?.metadata?.total;
  const dataSource = availabilitySheetDetails?.data?.objectData?.map(
    (item: any) => {
      const rowData: any = { key: item.userName };
      availabilitySheetDetails?.data?.header?.forEach(
        (headerItem: any, index: any) => {
          rowData[headerItem] = item[headerItem];
        }
      );
      return rowData;
    }
  );

  type MapItemClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
  const handleMapItemClick = (event: MapItemClickEvent, obj: any) => {
    const clickedElement = event.currentTarget as HTMLDivElement;
    const key = clickedElement.getAttribute("data-key");
    key && setAvailability(obj[key] ?? "");
    setShiftDate(key);

  };
  const columns = availabilitySheetDetails?.data?.header.map((item: any) => ({
    title: (
      <div className="d-flex flex-column">
        {!(item === "Name" || item === "Designation" || item === "Phone" && item === "profilepic") &&
          dayjs(item, "YYYY-MM-DD").format("dddd")}

        <span className="fs-14 fw-600">{item}</span>
      </div>
    ),
    dataIndex: item,
    key: item,
    render: (text: any, obj: any) =>
      item !== "Name" ? (
        <div
          className="weather-update-wrapper d-flex align-item-center"
          style={{ gap: "2px", cursor: "pointer" }}
          data-key={item}
          onClick={(event) => { setIsAvailability(true); handleMapItemClick(event, obj) }}
        >
          <div
            className={`${text?.includes("LONGDAY") && "long-day-active"
              } long-day`}
          ></div>
          <div
            className="am-update d-flex justify-center align-center"
            style={{
              backgroundColor: `${text?.includes("MORNING") && "#E6B15D"}  `,
            }}
          >
            <h3 className="m-0 fs-14 fw-600 line-height-17">A M</h3>
          </div>
          <div
            className="pm-update d-flex justify-center align-center"
            style={{
              backgroundColor: `${text?.includes("AFTERNOON") && "#F89A0C"}  `,
            }}
          >
            <h3 className="m-0 fs-14 fw-600 line-height-17 ">P M</h3>
          </div>
          <div
            className={`${text?.includes("NIGHT") && "active-moon"
              } moon-update`}
          ></div>

        </div>
      ) : (

        <div className="cursor-pointer d-flex align-center">
          <img src={isNullOrEmpty(text?.profilePhoto?.profilepic) ? `https://ui-avatars.com/api/?rounded=true&name=${text}` : `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${text?.profilePhoto?.profilepic}`} height={34} width={34} alt="avatar" style={{ borderRadius: "50%" }}
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?rounded=true&name=${text}`;
            }} />
          <span className='fs-14 fw-400 title-color' style={{ marginLeft: "13px" }}>
            {text}
          </span>
        </div>

      ),
  }));

  return (
    <div style={{ padding: "1.25rem" }}>
      <StaffAvailabilitySheetCommonFilter setFilterValues={setFilterValues} filterValues={filterValues} setFilterStaffName={setFilterStaffName}/>
      <Table
        tableLayout="fixed"
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current: pagination?.page,
          pageSize: pagination?.limit,
          total: total,
          onChange: (page, limit) => setPagination({ page, limit }),
        }}
        className="staff-availability-sheet-table"
        style={{ marginTop: "1rem" }}
        scroll={{ x: "max-content", scrollToFirstRowOnChange: true }}

      />

      <AvailabilitySheetModal
        isAvailability={isAvailability} setIsAvailability={setIsAvailability} shiftDate={shiftDate} availability={availability}
      />
    </div>
  );
};

export default AvailabilitySheet;