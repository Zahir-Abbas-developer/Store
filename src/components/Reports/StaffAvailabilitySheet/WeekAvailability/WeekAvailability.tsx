import React, { useState } from "react";
import { Col, Row,  Table } from "antd";
import dayjs from "dayjs";
import StaffAvailabilitySheetCommonFilter from "../StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter";
import { useGetStaffWeekAvailabilityQuery } from "../../../../store/Slices/Reports";
import { isNullOrEmpty } from "../../../../utils/utils";



const WeekAvailability = () => {
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });
  const [filterStaffName ,setFilterStaffName]=useState("")
  const [filterValues, setFilterValues] = useState({ startDate: dayjs().format('YYYY-MM-DD'), endDate: dayjs().format('YYYY-MM-DD') });
  const paramObjs:any={}
  if (filterStaffName) paramObjs['search']=filterStaffName
  const query = "&" + new URLSearchParams(paramObjs).toString();
  const {
    data: availabilitySheetDetails,
    
  }: any = useGetStaffWeekAvailabilityQuery({
    refetchOnMountOrArgChange: true, pagination: pagination?.page, limit: pagination?.limit,filterValues,query
  });

  const removeDuplicate = (text: string = "") => {
    let arr = text ? text.split(",") : [];
    return arr.filter((value:string, index:number) => arr.indexOf(value) === index).join(", ");
  }
  const total=availabilitySheetDetails?.data?.metadata?.total;
  const header = availabilitySheetDetails?.data?.header || [];
  
  console.log("availabilitySheetDetails", availabilitySheetDetails?.data?.metadata?.total)
  const dataSource = availabilitySheetDetails?.data?.objectData?.map((item: any) => {
    const rowData: any = { key: item.userName };
    rowData["Name"] = item.userName; 
    rowData["Designation"] = item.userTypeshortForm;
    rowData["Phone"] = item.phone;
    header.forEach((headerItem: any) => {
      if (headerItem !== "Name" && headerItem !== "Designation" && headerItem !== "Phone"  ) {
        rowData[headerItem] = item[headerItem];
      }
    });
    return rowData;
});
 
  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (text:any,photo:any) => (
        <div className="cursor-pointer d-flex align-center">       
        <img src={ isNullOrEmpty(photo?.profilePhoto?.profilepic)? `https://ui-avatars.com/api/?rounded=true&name=${text}` : `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${photo?.profilePhoto?.profilepic}`} height={34} width={34} alt="avatar" style={{borderRadius:"50%"}}
         onError={(e:any) => {
          e.target.onerror = null; 
           e.target.src = `https://ui-avatars.com/api/?rounded=true&name=${text}`;
          }}/>
        <span className='fs-14 fw-400 title-color' style={{ marginLeft: "10px" }}>
        {text}
        </span>
      </div>
    )
    
    },
    {
      title: "Designation",
      dataIndex: "Designation",
      key: "Designation",
      render: (userTypeshortForm: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{userTypeshortForm}</span>
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      render: (phone: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{phone.toString()}</span>
    },
    ...header
      .filter((item: any) => item !== "Name" && item !== "Designation" && item !== "Phone" && item !== "profilePhoto")
      .map((item: any) => ({
        title: (
          <div className="d-flex flex-column">
            {dayjs(item, "YYYY-MM-DD").format("dddd")}
            <span className="fs-12 fw-400">{item}</span>
          </div>
        ),
        dataIndex: item,
        key: item,
        render: (text:string) => (
          <div>
           
            <span className="fs-14 fw-400 m-0 line-height-22 title-color" data-key={item}>{removeDuplicate(text)}</span>
          </div>
        )
      }))
  ];
 
  
 
  
  
  
  
 

  return (
    <div className="reports-child-wrapper-class" style={{ padding: "1.25rem" }}>
      <Row>
        <Col xs={24}>
          <StaffAvailabilitySheetCommonFilter setFilterValues={setFilterValues} setFilterStaffName={setFilterStaffName}/>
        </Col>
        <Col xs={24}>
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
        </Col>
      </Row>
    </div>
  );
};

export default WeekAvailability;